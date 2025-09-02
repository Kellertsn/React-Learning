const bcrypt = require("bcrypt");
const saltRounds = 10;

// --- 同步版 ---
// const encryptPasswordSync = (password) => {
//   const hash = bcrypt.hashSync(password, saltRounds);
//   return hash;
// };

// const comparePasswordSync = (password, hash) => {
//   return bcrypt.compareSync(password, hash);
// };

// --- 非同步版 (推薦用 async/await) ---
const encryptPassword = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  encryptPasswordSync,
  comparePasswordSync,
  encryptPassword,
  comparePassword,
};