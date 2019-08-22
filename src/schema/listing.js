import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    businesses(q: String): [Business!]
    business(id: ID!): Business!
  }

  extend type Mutation {
    createListing(body: BusinessCreateInput!): Business!
    updateListing(id: ID!, body: BusinessUpdateInput): Boolean!
    deleteListing(id: ID!): Boolean!
  }

  input BusinessCreateInput {
    name: String!
    description: String!
    phone: String
    images: [String!]
    email: String
    websiteUrl: String
    address: String
    categories: [String!]!
  }

  input BusinessUpdateInput {
    name: String
    description: String
    phone: String
    images: [String!]
    email: String
    websiteUrl: String
    address: String
  }

  type Business {
    id: ID
    name: String
    description: String
    phone: String
    email: String
    images: [String!]
    websiteUrl: String
    address: String
    views: Int
    createdAt: String
    updatedAt: String
    categories: [Category!]
  }
`;
