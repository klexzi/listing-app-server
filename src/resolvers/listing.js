import { combineResolvers } from 'graphql-resolvers';

import Business from '../models/business';
import { Op } from 'sequelize';
import { isAuthenticated } from './authorization';
import { copyObject } from '../helpers/utils';
import Category from '../models/category';

export default {
  Query: {
    businesses: async (parent, { q }, ctx) => {
      const query = q
        ? {
            where: {
              [Op.or]: [
                {
                  name: {
                    [Op.like]: `%${q}%`,
                  },
                },
                {
                  description: {
                    [Op.like]: `%${q}%`,
                  },
                },
              ],
            },
          }
        : {};
      return await Business.findAll(query);
    },
    business: async (parent, { id }, ctx) => {
      return await Business.findOne({ where: { id } });
    },
  },
  Mutation: {
    createListing: combineResolvers(
      isAuthenticated,
      async (parent, { body }, ctx) => {
        const businessData = copyObject(body, ['categories']);
        const listing = await Business.create(businessData);
        let categories = [];
        for await (let categoryId of body.categories) {
          const category = await Category.findOne({
            where: { id: categoryId },
          });
          if (!category) continue;
          categories.push(category);
        }
        await listing.setCategories(categories);
        return listing;
      }
    ),
    updateListing: combineResolvers(
      isAuthenticated,
      async (parent, { id, body }, ctx) => {
        return Business.update(body, { where: { id } })
          .then(() => true)
          .catch(() => false);
      }
    ),
    deleteListing: combineResolvers(
      isAuthenticated,
      async (parent, { id }, ctx) => {
        return Business.destroy({ where: { id } })
          .then(() => true)
          .false(() => false);
      }
    ),
  },
  Business: {
    categories: async business => {
      return await business.getCategories();
    },
  },
};
