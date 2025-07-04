import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export function generateToken(id: number) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
}