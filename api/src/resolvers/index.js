const { ArticleSubscription } = require('./Subscriptions/ArticleSubs');
const { Auth }                = require('./Mutations/Auth');
const { ArticleMutations }    = require('./Mutations/Articles');
const { ArticleQueries }      = require('./Queries/Articles');
const { AuthPayload }         = require('./AuthPayload');

module.exports = {
  Query: {
    ...ArticleQueries
  },
  Mutation: {
    ...Auth,
    ...ArticleMutations,
  },
  Subscription: {
    ...ArticleSubscription
  },
  AuthPayload,
}
