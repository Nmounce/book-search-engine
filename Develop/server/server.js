const express = require('express');
// const path = require('path');
// const routes = require('./routes');

const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//new instance of apollo server with GraphQL schema 
const server = new ApolloServer({ typeDefs, resolvers });

//update express.js to use Apollo Features
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server listening on ${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
