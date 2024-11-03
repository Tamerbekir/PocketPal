import mongoose from 'mongoose'
import dotenv from 'dotenv'


dotenv.config()


const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database from MongoDB connected! :)')
  } catch (error) {
    console.log('Error connecting to database', error.message)
    process.exit(1)
  }
}


export default ConnectDB