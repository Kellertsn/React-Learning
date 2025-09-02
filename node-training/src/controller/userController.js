const register = async (req, res) => {
  const { username, password, role } = req.body;

  // 檢查必填
  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try {
    const userInfo = await createUser({ username, password, role });
    res.status(201).json({
    message: "User registered successfully",
    user: userInfo,
  });
  } catch (error) {
    console.log("error", error.message);
    return res.status(500).json({ message: error.message });
  }

  
};

module.exports = {
  register,
};
