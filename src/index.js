import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import jwt from 'jsonwebtoken';
import express from 'express';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import { sequelize } from './models';
import Admin from './models/admin';
// import Category from './models/category';
import Business from './models/business';
import Category from './models/category';

const app = express();

app.use(cors());

app.use(morgan('dev'));

const getMe = async req => {
  const token = req.headers['authorization'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.'
      );
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (req) {
      const me = await getMe(req);

      return {
        me,
        secret: process.env.SECRET,
      };
    } else {
      return {
        secret: process.env.SECRET,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const isTest = !!process.env.TEST_DATABASE;
const isProduction = !!process.env.DATABASE_URL;
const port = process.env.PORT || 8000;

sequelize.sync({ force: !isProduction }).then(async () => {
  if (!isProduction) {
    createUsersWithMessages();
  }

  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`);
  });
});

const createUsersWithMessages = async () => {
  await Admin.create({
    name: 'John Doe',
    email: 'admin@inits.com',
    password: 'admin123',
  });
  const categories = await Category.bulkCreate([
    {
      title: 'fashion',
    },
    { title: 'electronics' },
    { title: 'food' },
  ]);
  const dummyText =
    "it is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English";
  const businesses = await Business.bulkCreate([
    {
      name: 'Kay clothings',
      description: dummyText,
      phone: '0832932232',
      categories: [1],
    },
    {
      name: 'Klapper Electronics Limited',
      description: dummyText,
      address: '3 olumide street, Ikeja lagos',
      phone: '90934030493',
      categories: [1, 2],
      websiteUrl: 'www.klapper.com',
      images: [
        'https://images.unsplash.com/photo-1558981001-1995369a39cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      ],
    },
    {
      name: 'rogue plc',
      description: dummyText,
      address: '3 olumide street, Ikeja lagos',
      phone: '90934030493',
      categories: [1, 3],
      websiteUrl: 'www.Rogue.com',
      images: [
        'https://images.unsplash.com/photo-1562101660-b3a3c873d5f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1558981001-1995369a39cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1566041510380-0e933af79348?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      ],
    },
  ]);
  businesses.forEach(async business => {
    await business.setCategories([
      categories[0],
      categories[1],
      categories[2],
    ]);
  });
};
