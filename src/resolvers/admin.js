import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { isAdmin, isAuthenticated } from './authorization';
import Admin from '../models/admin';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, name } = user;
  return await jwt.sign({ id, email, name }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return await Admin.findById(me.id);
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { name, email, password },
      { models, secret }
    ) => {
      const admin = Admin.create({
        username,
        email,
        password,
      });

      return { token: createToken(admin, secret, '5 days') };
    },

    signIn: async (
      parent,
      { email, password },
      { models, secret }
    ) => {
      const admin = await Admin.findByLogin(email);

      if (!admin) {
        throw new UserInputError(
          'No user found with this login credentials.'
        );
      }

      const isValid = await admin.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(admin, secret, '5 days') };
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { name }, { me }) => {
        const admin = await Admin.findOne({ where: { id: me.id } });
        return admin
          .update({ username })
          .then(() => true)
          .catch(() => false);
      }
    ),

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, ctx) => {
        return await Admin.destroy({
          where: { id },
        })
          .then(() => true)
          .catch(() => false);
      }
    ),
  },
};
