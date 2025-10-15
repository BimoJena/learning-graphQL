import express from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// create server
const graphqlserver = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
            say(name: String): String 
        }
    `, // schema
    resolvers: {
        Query: {
            hello: () => `hii i am a graphql server`,
            say: (_, {name}) => `hii ${name}`
        }
    }
})

// start server

await graphqlserver.start()

app.get('/',(req,res)=>{
    res.json({message: 'app running successfully'})
})
app.use('/graphql', expressMiddleware(graphqlserver))

app.listen(PORT, () => console.log(`server is running at port: ${PORT}`))