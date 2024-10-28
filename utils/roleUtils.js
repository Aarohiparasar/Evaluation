module.exports = {
  isAdmin: (user) => {
    return user.role === "admin";
  },

  isUser: (user) => {
    return user.role === "user";
  },
};
