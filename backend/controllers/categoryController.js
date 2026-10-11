
const pool = require("../config/db");

async function listCategories(req, res) {
  try {
    const [categories] = await pool.execute(
      `SELECT id, name, description
       FROM categories
       ORDER BY name ASC`
    );

    res.json({ categories });
  } catch (error) {
    console.error("List categories error:", error.message);
    res.status(500).json({
      message: "Failed to fetch categories"
    });
  }
}

module.exports = { listCategories };
