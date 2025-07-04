import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  email!: string;

  @Column()
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @BeforeInsert()

  @Column({ nullable: true })
    resetToken?: string;

  @Column({ type: "timestamp", nullable: true })
    resetTokenExpires?: Date;
    
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}