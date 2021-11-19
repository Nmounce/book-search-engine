const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');

const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

async function apolloServer() {
//new instance of apollo server with GraphQL schema 
  const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware });
    await server.start();
    //update express.js to use Apollo Features
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
}

apolloServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server listening on ${PORT}`);
  });
});
