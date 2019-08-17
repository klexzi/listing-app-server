import { GraphQLDateTime } from 'graphql-iso-date';

import adminResolvers from './admin';
import listingResolvers from './listing';
import categoryResolvers from './category';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [adminResolvers, listingResolvers, categoryResolvers];
