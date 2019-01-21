function newArticleSubscribe (parent, args, context, info) {
  return context.db.subscription.article(
    { where: { mutation_in: ['CREATED'] } },
    info,
  )
}

const ArticleSubscription = {
  newArticleSubscribe,
}

module.exports = { ArticleSubscription };
