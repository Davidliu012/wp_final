import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    hint: { type: String, required: true },
    email: { type: String, required: true }
  },{
    collection: "user",
  }
);

export default mongoose.model("user", userSchema);