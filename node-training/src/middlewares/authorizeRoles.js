function authorizeRoles(...roles) {
  return (req, res, next) => {
    console.log("Authorizing roles:", roles);
    console.log("Current user roles:", req.user);
    if (roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({ message: "Access denied" });
  };
}

module.exports = authorizeRoles;
