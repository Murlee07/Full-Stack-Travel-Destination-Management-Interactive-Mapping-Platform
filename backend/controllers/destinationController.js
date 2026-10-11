
const destinationModel = require("../models/destinationModel");

async function listDestinations(req, res) {
  try {
    const destinations = await destinationModel.getApprovedDestinations({
      search: typeof req.query.search === "string" ? req.query.search : "",
      categoryId:
        typeof req.query.categoryId === "string"
          ? req.query.categoryId
          : ""
    });

    res.json({
      count: destinations.length,
      destinations
    });
  } catch (error) {
    console.error("List destinations error:", error.message);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
}

async function getDestination(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({ message: "Invalid destination ID" });
    }

    const destination = await destinationModel.getDestinationById(id);

    if (!destination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    res.json({ destination });
  } catch (error) {
    console.error("Get destination error:", error.message);
    res.status(500).json({ message: "Failed to fetch destination" });
  }
}

module.exports = {
  listDestinations,
  getDestination
};
