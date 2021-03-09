const { findUser } = require("./users/findUser");

const services = {
  users: {
    findUser,
  },
};

module.exports = services;
