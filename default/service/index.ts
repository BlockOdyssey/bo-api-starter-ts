const { getUsers } = require("./users/getUsers");

const services = {
    users: {
        getUsers,
    },
};

module.exports = services;
