const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Define which fields are accessible from the User model
  type Books {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  type User {
    _id: String
    username: String
    email: String
    bookCount: Int
    savedBooks: [Books]
  }
  type Auth {
    token: String
    user: User
  }
  input newBook {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  

  # Define which queries the front end is allowed to make and what data is returned
  type Query {
    me: User
  }

  type Mutation {
   login(email: String!, password: String!): Auth
   addUser(username: String!, email: String!, password: String!): Auth
   saveBook(book: newBook!): User
   removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
