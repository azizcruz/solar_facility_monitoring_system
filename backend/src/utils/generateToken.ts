import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export function generateToken(id: mongoose.Types.ObjectId) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET as string, {
    expiresIn: "12h",
  });
}
