import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Episode } from "../entities/Episode";
import { Podcast } from "../entities/Podcast";

export class EpisodeController {
  static async create(req: Request, res: Response) {
    const { titulo, descricao, duracao, data_publicacao, convidados, podcastId } = req.body;
    const repo = AppDataSource.getRepository(Episode);

    const podcastRepo = AppDataSource.getRepository(Podcast);
    const podcast = await podcastRepo.findOneBy({ id: podcastId });
    if (!podcast) return res.status(404).json({ message: "Podcast não encontrado" });

    const episode = repo.create({ titulo, descricao, duracao, data_publicacao, convidados, podcast, podcastId });
    await repo.save(episode);

    res.status(201).json(episode);
  }

  static async findAll(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Episode);
    const episodes = await repo.find({ relations: ["podcast"] });
    res.json(episodes);
  }

  static async findOne(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Episode);
    const episode = await repo.findOne({ where: { id: Number(req.params.id) }, relations: ["podcast"] });
    if (!episode) return res.status(404).json({ message: "Episódio não encontrado" });
    res.json(episode);
  }

  static async update(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Episode);
    const episode = await repo.findOneBy({ id: Number(req.params.id) });
    if (!episode) return res.status(404).json({ message: "Episódio não encontrado" });

    repo.merge(episode, req.body);
    await repo.save(episode);

    res.json(episode);
  }

  static async delete(req: Request, res: Response) {
    const repo = AppDataSource.getRepository(Episode);
    const episode = await repo.findOneBy({ id: Number(req.params.id) });
    if (!episode) return res.status(404).json({ message: "Episódio não encontrado" });

    await repo.delete(episode.id);
    res.status(204).send();
  }
}