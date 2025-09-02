const { Router } = require("express");

const { login, logout } = require("../controller/authController");
const router = Router();


// 登入 API
router.post("/login", login);

router.post("/logout", logout);

module.exports = router;
