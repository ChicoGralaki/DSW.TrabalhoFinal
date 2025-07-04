/// <reference path="../@types/express/index.d.ts" />
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const [, token] = authHeader.split(" ");
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = { id: decoded.id };
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}