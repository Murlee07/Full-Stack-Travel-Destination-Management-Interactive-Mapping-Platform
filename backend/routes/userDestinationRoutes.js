const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  submitDestination,
} = require("../controllers/userDestinationController");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  (req, res, next) => {
    if (req.user?.role !== "USER") {
      return res.status(403).json({
        message: "Only regular users can submit destinations.",
      });
    }

    next();
  },
  submitDestination
);

module.exports = router;