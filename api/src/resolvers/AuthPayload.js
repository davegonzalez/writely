const user = async function({ user: { id } }, args, ctx, info) {
  return ctx.db.query.user({ where: { id } }, info);
};

const AuthPayload = {
  user,
};

module.exports = { AuthPayload }
