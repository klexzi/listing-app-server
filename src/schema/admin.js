import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: Admin
  }

  extend type Mutation {
    signIn(email: String!, password: String!): Token!
    signUp(name: String!, email: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
    updateUser(id: ID!, name: String!): Boolean!
  }

  type Token {
    token: String!
  }

  type Admin {
    id: ID!
    name: String!
    email: String!
  }
`;
