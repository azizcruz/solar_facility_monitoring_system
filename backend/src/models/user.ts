import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  facilities: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  facilities: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Facility",
    default: [],
  },
});

// Create a hook to hash passowrd using bcrypt before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  next();
});

// Create a method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};

export const User = mongoose.model<UserDocument>("User", userSchema);
