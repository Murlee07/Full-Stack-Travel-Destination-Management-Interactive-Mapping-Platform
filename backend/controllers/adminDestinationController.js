
const pool = require("../config/db");

const VALID_STATUSES = ["PENDING", "APPROVED", "REJECTED"];

function validateDestination(body) {
  const { name, country, city, description, latitude, longitude } = body;

  if (
    !name?.trim() ||
    !country?.trim() ||
    !city?.trim() ||
    !description?.trim()
  ) {
    return "Name, country, city, and description are required.";
  }

  if (
    latitude === undefined ||
    longitude === undefined ||
    latitude === null ||
    longitude === null ||
    latitude === "" ||
    longitude === "" ||
    !Number.isFinite(Number(latitude)) ||
    !Number.isFinite(Number(longitude)) ||
    Number(latitude) < -90 ||
    Number(latitude) > 90 ||
    Number(longitude) < -180 ||
    Number(longitude) > 180
  ) {
    return "Enter valid latitude and longitude coordinates.";
  }

  return null;
}

// GET /api/admin/destinations
async function getAllDestinations(req, res) {
  try {
    const [destinations] = await pool.query(`
      SELECT
        d.*,
        c.name AS category_name,
        u.name AS creator_name
      FROM destinations d
      LEFT JOIN categories c ON d.category_id = c.id
      LEFT JOIN users u ON d.created_by = u.id
      ORDER BY d.created_at DESC
    `);

    res.json({ destinations });
  } catch (error) {
    console.error("Get admin destinations error:", error);
    res.status(500).json({ message: "Failed to load destinations." });
  }
}

// POST /api/admin/destinations
async function createDestination(req, res) {
  try {
    const validationError = validateDestination(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const {
      name,
      country,
      city,
      description,
      category_id,
      latitude,
      longitude,
      image_url,
    } = req.body;

    const categoryId =
      category_id === "" || category_id === undefined
        ? null
        : category_id === null
          ? null
          : Number(category_id);

    if (
      categoryId !== null &&
      (!Number.isInteger(categoryId) || categoryId <= 0)
    ) {
      return res.status(400).json({ message: "Invalid category." });
    }

    if (categoryId !== null) {
      const [categories] = await pool.query(
        "SELECT id FROM categories WHERE id = ?",
        [categoryId]
      );

      if (categories.length === 0) {
        return res.status(400).json({ message: "Category does not exist." });
      }
    }

    const [result] = await pool.query(
      `INSERT INTO destinations
        (name, country, city, description, category_id,
         latitude, longitude, image_url, created_by, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'APPROVED')`,
      [
        name.trim(),
        country.trim(),
        city.trim(),
        description.trim(),
        categoryId,
        Number(latitude),
        Number(longitude),
        image_url?.trim() || null,
        req.user.id,
      ]
    );

    res.status(201).json({
      message: "Destination created successfully.",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Create destination error:", error);
    res.status(500).json({ message: "Failed to create destination." });
  }
}

// PUT /api/admin/destinations/:id
async function updateDestination(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid destination ID." });
    }

    const validationError = validateDestination(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const {
      name,
      country,
      city,
      description,
      category_id,
      latitude,
      longitude,
      image_url,
    } = req.body;

    const categoryId =
      category_id === "" || category_id === undefined || category_id === null
        ? null
        : Number(category_id);

    if (
      categoryId !== null &&
      (!Number.isInteger(categoryId) || categoryId <= 0)
    ) {
      return res.status(400).json({ message: "Invalid category." });
    }

    if (categoryId !== null) {
      const [categories] = await pool.query(
        "SELECT id FROM categories WHERE id = ?",
        [categoryId]
      );

      if (categories.length === 0) {
        return res.status(400).json({ message: "Category does not exist." });
      }
    }

    const [result] = await pool.query(
      `UPDATE destinations
       SET name = ?, country = ?, city = ?, description = ?,
           category_id = ?, latitude = ?, longitude = ?, image_url = ?
       WHERE id = ?`,
      [
        name.trim(),
        country.trim(),
        city.trim(),
        description.trim(),
        categoryId,
        Number(latitude),
        Number(longitude),
        image_url?.trim() || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Destination not found." });
    }

    res.json({ message: "Destination updated successfully." });
  } catch (error) {
    console.error("Update destination error:", error);
    res.status(500).json({ message: "Failed to update destination." });
  }
}

// PATCH /api/admin/destinations/:id/status
async function updateDestinationStatus(req, res) {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid destination ID." });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: "Status must be PENDING, APPROVED, or REJECTED.",
      });
    }

    const [result] = await pool.query(
      "UPDATE destinations SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Destination not found." });
    }

    res.json({ message: `Destination status changed to ${status}.` });
  } catch (error) {
    console.error("Update destination status error:", error);
    res.status(500).json({ message: "Failed to update destination status." });
  }
}

// DELETE /api/admin/destinations/:id
async function deleteDestination(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid destination ID." });
    }

    const [result] = await pool.query(
      "DELETE FROM destinations WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Destination not found." });
    }

    res.json({ message: "Destination deleted successfully." });
  } catch (error) {
    console.error("Delete destination error:", error);
    res.status(500).json({ message: "Failed to delete destination." });
  }
}

module.exports = {
  getAllDestinations,
  createDestination,
  updateDestination,
  updateDestinationStatus,
  deleteDestination,
};
