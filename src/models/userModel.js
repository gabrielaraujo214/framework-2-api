const users = [];

function findUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function createUser(email, passwordHash) {
  const newUser = { email, passwordHash };
  users.push(newUser);
  return newUser;
}

module.exports = { findUserByEmail, createUser };
