import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Podcast } from "../entities/Podcast";

export class PodcastController {
  static async create(req: Request, res: Response) {
    const { nome, apresentador, categoria, plataforma, periodicidade } = req.body;
    const repo = AppDataSource.getRepository(Podcast);

    const podcast = repo.create({ nome, apresentador, categoria, plataforma, periodicidade });
    await repo.save(podcast);

    res.status(201).json(podcast);
  }

  static async findAll(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Podcast);
    const podcasts = await repo.find({ relations: ["episodios"] });
    res.json(podcasts);
  }

  static async findOne(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Podcast);
    const podcast = await repo.findOne({ where: { id: Number(req.params.id) }, relations: ["episodios"] });
    if (!podcast) return res.status(404).json({ message: "Podcast não encontrado" });
    res.json(podcast);
  }

  static async update(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Podcast);
    const podcast = await repo.findOneBy({ id: Number(req.params.id) });
    if (!podcast) return res.status(404).json({ message: "Podcast não encontrado" });

    repo.merge(podcast, req.body);
    await repo.save(podcast);

    res.json(podcast);
  }

  static async delete(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Podcast);
    const podcast = await repo.findOneBy({ id: Number(req.params.id) });
    if (!podcast) return res.status(404).json({ message: "Podcast não encontrado" });

    await repo.delete(podcast.id);
    res.status(204).send();
  }
}