import { gql } from 'apollo-server-express';
import adminSchema from './admin';
import listingSchema from './listing';
import categorySchema from './category';

const linkSchema = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [
  linkSchema,
  listingSchema,
  adminSchema,
  categorySchema,
];
