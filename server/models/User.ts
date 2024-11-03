import mongoose, { Document, Types, Schema, Model } from 'mongoose';import bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
  activities: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  activities: [{ type: Types.ObjectId, ref: 'Activity' }],
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
