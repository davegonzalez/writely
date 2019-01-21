const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  APP_SECRET,
  getUserId,
} = require('root/api/src/utils');

const signup = async function(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser({
    data: { ...args, password }
  }, `{ id }`);

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async function(parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `);

  if (!user) {
    throw new Error('No such user found')
  }

  const validPassword = await bcrypt.compare(args.password, user.password)
  if (!validPassword) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user,
  }
}

const Auth = {
  login,
  signup,
};

module.exports = { Auth };
