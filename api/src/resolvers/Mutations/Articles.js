const getUserId = require('../../utils');

const createArticle = function(parent, args, context, info) {
  const userId = getUserId(context);

  return context.db.mutation.createArticle({
    data: {
      title: args.title,
      body: args.body,
      postedBy: { connect: { id: userId } },
    },
  }, info);
};

const updateArticle = function(parent, args, context, info) {
  const userId  = getUserId(context);
  const article = context.db.query.article({ where: { id: args.id }});

  return context.db.mutation.updateArticle({
    data: {
      title: args.title,
      body: args.body,
      postedBy: { connect: { id: userId } },
    },
  }, info);
};

const ArticleMutations = {
  createArticle,
  updateArticle,
};

module.exports = { ArticleMutations };
