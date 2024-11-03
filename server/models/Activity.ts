import mongoose, {Schema, Document, Model, Types} from "mongoose";

interface IUser extends Document {
  activityName: String
  activityValue: String
  user: Types.ObjectId[]
}

const ActivitySchema = new Schema<IUser>({
  activityName: { type: String, required: true },
  activityValue: { type: String, required: true },
  user: [{ type: Types.ObjectId, ref: 'User'  }]
})

const Activity: Model<IUser> = mongoose.model<IUser>('Activity', ActivitySchema)
export default Activity