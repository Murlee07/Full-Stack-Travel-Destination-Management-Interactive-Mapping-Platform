
const express = require("express");
const {
  getAllDestinations,
  createDestination,
  updateDestination,
  updateDestinationStatus,
  deleteDestination,
} = require("../controllers/adminDestinationController");

const {
  authenticateToken,
  requireAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Every endpoint in this router requires a valid admin token.
router.use(authenticateToken, requireAdmin);

router.get("/", getAllDestinations);
router.post("/", createDestination);
router.put("/:id", updateDestination);
router.patch("/:id/status", updateDestinationStatus);
router.delete("/:id", deleteDestination);

module.exports = router;
