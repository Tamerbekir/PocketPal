import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? 'No URI Found!');
    console.log('Database is connected! Woohoo!');
  } catch (error) {
    console.error('There was an error connecting to the the database:', error.message);
    console.log('MONGODB URI =>', process.env.MONGODB_URI)
    process.exit(1);
  }
};

export default connectDB;
