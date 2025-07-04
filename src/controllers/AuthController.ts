import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import * as crypto from "crypto";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "E-mail e senha obrigatórios" });

    const repo = AppDataSource.getRepository(User);

    const exists = await repo.findOneBy({ email });
    if (exists)
      return res.status(400).json({ message: "Usuário já existe" });

    // Hash da senha ao registrar
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = repo.create({ email, password: hashedPassword });
    await repo.save(user);

    res.status(201).json({ id: user.id, email: user.email });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOneBy({ email });
    if (!user)
      return res.status(400).json({ message: "Usuário e/ou senha inválidos" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Usuário e/ou senha inválidos" });

    const token = generateToken(user.id);

    res.json({ token });
  }

  // =============================
  // RECUPERAÇÃO DE SENHA
  // =============================

  // POST /auth/forgot-password
  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOneBy({ email });
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    // Gera token único e validade de 1 hora
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    user.resetToken = token;
    user.resetTokenExpires = expires;
    await repo.save(user);

    // Em produção, envie o token por e-mail. Para testes, retorne na resposta:
    res.json({
      message: "Token de recuperação gerado (em produção seria enviado por e-mail)",
      token,
    });
  }

  // POST /auth/reset-password
  static async resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;
    const repo = AppDataSource.getRepository(User);

    const user = await repo.findOneBy({ resetToken: token });
    if (
      !user ||
      !user.resetTokenExpires ||
      user.resetTokenExpires < new Date()
    ) {
      return res.status(400).json({ message: "Token inválido ou expirado" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await repo.save(user);

    res.json({ message: "Senha redefinida com sucesso!" });
  }
}