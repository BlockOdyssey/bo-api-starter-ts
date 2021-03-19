const { getUser } = require("./users/getUser");

const services = {
    users: {
        getUser,
    },
};

module.exports = services;
