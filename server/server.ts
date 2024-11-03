import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import ConnectDB from "./config/db.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

ConnectDB()

app.use(express.json())

//temp syntax to ensure database is working
app.get('/', (req: Request, res: Response) => {
  res.send('Oh wow, your server is up and running. Ready to make something beautiful?')
})

app.listen(PORT, () => {
  console.log(`Server is up and running on http://localhost:${PORT}`)
})