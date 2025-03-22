import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  trackingUnit: { type: Number, required: true },
  startAmount: { type: Number, required: true },
  expirationDate: { type: Date, required: false },

  logs: [{ amountUsed: Number, dateUsed: Date, description: String }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Activity", ActivitySchema);
