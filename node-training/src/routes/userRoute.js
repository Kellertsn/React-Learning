const { Router } = require("express");
const { register } = require("../controller/userController");

const router = Router();

// Register route
router.post("/", register);

module.exports = router;
