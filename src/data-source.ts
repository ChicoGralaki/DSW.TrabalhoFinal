import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "meuusuario",
  password: "minhasenha",
  database: "podcast_db",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
});