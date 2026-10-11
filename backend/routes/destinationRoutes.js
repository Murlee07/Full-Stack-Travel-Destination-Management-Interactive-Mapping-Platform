
const express = require("express");
const controller = require("../controllers/destinationController");

const router = express.Router();

router.get("/", controller.listDestinations);
router.get("/:id", controller.getDestination);

module.exports = router;
