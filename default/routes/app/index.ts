import * as express from "express";
const router = express.Router();
const upload = require("./upload");
const users = require("./users");

router.use("/upload", upload);
router.use("/users", users);

module.exports = router;
