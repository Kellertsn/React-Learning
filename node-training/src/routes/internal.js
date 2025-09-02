const { Router } = require("express");
const authorizeRoles = require("../middlewares/authorizeRoles");

const router = Router();

// Application logics
// admins can do everything
// mods can ban users

// admin only
router.get("/control-board", authorizeRoles('admin'), (req, res) => {
  // if (req.user !== "admin") {
  //   return res.status(403).json({ message: "Access denied" });
  // }
  return res.status(200).json({
    message: "This is the control board",
    data: {
      users: 100,
      activeUsers: 75,
      inactiveUsers: 25,
      newRegistrations: 10,
    },
  });
});

// admin and mod only
router.patch("/ban-user/:id", authorizeRoles("admin", "mod"), (req, res) => {
  // if (req.user !== "admin" && req.user !== "mod") {
  //   return res.status(403).json({ message: "Access denied" });
  // }
  console.log("Banning user...");
  const userId = req.params.id;

  return res.status(200).json({ message: `User ${userId} has been banned successfully`,
  });
});

module.exports = router;
