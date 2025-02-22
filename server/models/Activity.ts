import mongoose, {Schema, Document, Model, Types} from "mongoose";

interface IUser extends Document {
  name: String
  value: Number
  user: Types.ObjectId
}


const ActivitySchema = new Schema<IUser>({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  user: { type: Types.ObjectId, ref: 'User' }
})


const Activity: Model<IUser> = mongoose.model<IUser>('Activity', ActivitySchema)
export default Activity

