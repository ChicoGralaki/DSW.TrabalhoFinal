import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Podcast } from "./Podcast";

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  descricao!: string;

  @Column()
  duracao!: string;

  @Column({type: "date"})
  data_publicacao!: string;

  @Column()
  convidados!: string;

  @ManyToOne(() => Podcast, podcast => podcast.episodios, { onDelete: "CASCADE" })
  podcast!: Podcast;

  @Column()
  podcastId!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}