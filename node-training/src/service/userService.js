const shortid = require("shortid");
const { encryptPassword, comparePassword } = require("../util/password");
const users = require("../repository/userRepo");



const createUser = async (username, password, role) => {
  const {username, password, role} = user || {};
  // 檢查是否已存在
  const userExists = users.some((_user) => _user.username === username);
  if (userExists) {
    // return res.status(409).json({ message: "Username already exists" });
    throw new Error("Username already exists");
  }

  // 建立新使用者
  const newUser = {
    id: shortid.generate(),
    username,
    role: role || "user",
    password: encryptPassword(password), //Assume this function encrypts the password
  };

  users.push(newUser);


  const { password: _, ...userInfo } = newUser;
  return newInfo;
};

module.exports = {
    createUser,
}