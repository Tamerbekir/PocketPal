import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import ConnectDB from "./config/db.js"

//apollo server, graphql
import {ApolloServer} from 'apollo-server-express'
import { userResolver } from './graphql/resolvers/userResolvers';
import { typeDefs } from './graphql/typeDefs/typeDef.js'


//brining in token
import { verifyToken } from './utils/generateToken.js'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

ConnectDB()

app.use(express.json())

const apolloServer = new ApolloServer({
  typeDefs,
  userResolver,
  context: ({ req }) => {
    const token = req.headers.authorization || ''
    const decoded = verifyToken(token.replace('Bearer ', ''))
    // console.log('decoded',decoded.userId)
    return { userId: decoded ? decoded.userId : null }
  }
})

async function startServer() {
  await apolloServer.start()
  apolloServer.applyMiddleware({app})
  
  //temp syntax to ensure database is working
  app.get('/', (req: Request, res: Response) => {
    res.send('Oh wow, your server is up and running. Ready to make something beautiful?')
})

  app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`)
    console.log(`GraphQL is on http://localhost:${PORT}${apolloServer.graphqlPath}`)
  })
}

  startServer().catch((error) => {
    console.error(`Error starting the server`, error)
  })