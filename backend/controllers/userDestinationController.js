
const pool = require("../config/db");

async function submitDestination(req, res) {
  try {
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

    if (
      !name?.trim() ||
      !country?.trim() ||
      !city?.trim() ||
      !description?.trim()
    ) {
      return res.status(400).json({
        message: "Name, country, city, and description are required.",
      });
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
      return res.status(400).json({
        message: "Enter valid latitude and longitude coordinates.",
      });
    }

    const categoryId =
      category_id === undefined || category_id === null || category_id === ""
        ? null
        : Number(category_id);

    if (
      categoryId !== null &&
      (!Number.isInteger(categoryId) || categoryId <= 0)
    ) {
      return res.status(400).json({
        message: "Invalid category.",
      });
    }

    if (categoryId !== null) {
      const [categories] = await pool.query(
        "SELECT id FROM categories WHERE id = ?",
        [categoryId]
      );

      if (categories.length === 0) {
        return res.status(400).json({
          message: "Selected category does not exist.",
        });
      }
    }

    const [result] = await pool.query(
      `INSERT INTO destinations
        (name, country, city, description, category_id,
         latitude, longitude, image_url, created_by, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
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

    return res.status(201).json({
      message: "Destination submitted for admin approval.",
      destinationId: result.insertId,
      status: "PENDING",
    });
  } catch (error) {
    console.error("Submit destination error:", error);

    return res.status(500).json({
      message: "Unable to submit destination.",
    });
  }
}

module.exports = { submitDestination };
