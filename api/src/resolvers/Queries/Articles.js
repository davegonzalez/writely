const articles = function(parent, args, context, info) {
  return context.db.query.articles({}, info);
};

const article = function(parent, args, context, info) {
  return context.db.query.article({ where: { id: args.id }}, info);
}

const articleByTitle = function(parent, args, context, info) {
  return context.db.query.articles({ where: { title: args.title }}, info);
}

const ArticleQueries = {
  articles,
  article,
  articleByTitle,
};

module.exports = { ArticleQueries };
