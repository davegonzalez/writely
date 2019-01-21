require('module-alias/register');

const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');

const server = new GraphQLServer({
  typeDefs: './api/src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './api/src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
      secret: `${process.ENV.PRISMA_SECRET}`,
      debug: true
    })
  })
});

server.start(() => console.log('API is running on 4000'));
