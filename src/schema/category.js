import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    categories: [Category!]
    category(id: ID!): Category!
  }
  extend type Mutation {
    createCategory(title: String!): Category!
    updateCategory(id: ID!, title: String!): Category!
    deleteCategory(id: ID!): Boolean
  }

  type Category {
    id: ID!
    title: String!
    createdAt: String
    updatedAt: String
  }
`;
