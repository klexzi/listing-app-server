import { combineResolvers } from 'graphql-resolvers';
import Category from '../models/category';
import { isAuthenticated } from './authorization';

export default {
  Query: {
    categories: async (parent, args, ctx) => {
      return await Category.findAll();
    },
    category: async (parent, { id }, ctx) => {
      return await Category.findOne({ where: { id } });
    },
  },

  Mutation: {
    createCategory: combineResolvers(
      isAuthenticated,
      async (parent, { title }, ctx) => {
        const category = await Category.create({
          title,
        });
        return category;
      }
    ),
    updateCategory: combineResolvers(
      isAuthenticated,
      async (parent, { id, title }, ctx) => {
        return Category.update({ title }, { where: { id } })
          .then(() => true)
          .catch(() => false);
      }
    ),
    deleteCategory: combineResolvers(
      isAuthenticated,
      async (parent, { id }, ctx) => {
        return Category.destroy({ where: { id } })
          .then(() => true)
          .catch(() => false);
      }
    ),
  },
};
