import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Episode } from "./Episode";

@Entity()
export class Podcast {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  apresentador!: string;

  @Column()
  categoria!: string;

  @Column()
  plataforma!: string;

  @Column()
  periodicidade!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToMany(() => Episode, episode => episode.podcast)
  episodios!: Episode[];
}