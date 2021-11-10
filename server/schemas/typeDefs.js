// import gql tagged template function
const { gql } = require('apollo-server-express');

// create typedefs
const typeDefs = gql `
    type User {
        _id: ID
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    input SaveBookRequest {
        authors: [String]
        description: String!
        title: String!
        bookId: ID!
        image: String!
        link: String!
    }

    type Query {
        me: User
        allUsers: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: SaveBookRequest!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;