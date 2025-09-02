const userService = require("../service/userService");

const login = async (req, res) => {
  const { username, password } = req.body || {};
  try {
    const { token, user } = await userService.login(username, password);
    // two ways to store the token
    // 1. In httpOnly cookie
    // 2. store in the local storage of the browser
    res
      .cookie("token", token, {
        httpOnly: true,
      }) // 將 JWT 存在 cookie 裡
      .status(200)
      .json({
        message: "Login successful",
        user: {
          message: "Login successful",
          user,
        },
      });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(401).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully" });
};

module.exports = {
  login,
};
