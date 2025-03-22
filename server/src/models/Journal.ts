import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Journal", JournalSchema);
