# Listing Application Server

[![Build Status](https://travis-ci.org/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate.svg?branch=master)](https://travis-ci.org/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate) [![Slack](https://slack-the-road-to-learn-react.wieruch.com/badge.svg)](https://slack-the-road-to-learn-react.wieruch.com/) [![Greenkeeper badge](https://badges.greenkeeper.io/the-road-to-graphql/fullstack-apollo-express-postgresql-boilerplate.svg)](https://greenkeeper.io/)

Server created with Apollo-Express-Server , Graphql and postgress database


Client Applications:

* [React Client](https://github.com/the-road-to-graphql/fullstack-apollo-react-boilerplate)
* [React Native Client](https://github.com/morenoh149/fullstack-apollo-react-native-boilerplate)


## Installation

* `git clone git@github.com:klexzi/listing-app-server.git`
* `cd listing-app-server`
* `touch .env`
* `yarn install`
* fill out *.env file* (see below)
* start PostgreSQL database
* `yarn run dev`
* visit `http://localhost:8000` for GraphQL playground

#### .env file

Since this boilerplate project is using PostgreSQL, you have to install it for your machine and get a database up and running. After you have created a database and a database user, you can fill out the environment variables in the *server/.env* file.

```
DATABASE=yourdatabasename

DATABASE_USER=yourdatabaseuse
DATABASE_PASSWORD=yourdatasepassword

SECRET=yoursecretkey
```

The `SECRET` is just a random string for your authentication. Keep all these information secure by adding the *.env* file to your *.gitignore* file. No third-party should have access to this information.
