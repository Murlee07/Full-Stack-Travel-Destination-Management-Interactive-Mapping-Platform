
const pool = require("../config/db");

async function getApprovedDestinations({ search = "", categoryId = "" } = {}) {
  let sql = `
    SELECT
      d.id,
      d.name,
      d.country,
      d.city,
      d.description,
      d.latitude,
      d.longitude,
      d.image_url,
      d.category_id,
      c.name AS category_name
    FROM destinations d
    LEFT JOIN categories c ON d.category_id = c.id
    WHERE d.status = 'APPROVED'
  `;

  const params = [];

  if (search.trim()) {
    sql += ` AND (
      d.name LIKE ?
      OR d.country LIKE ?
      OR d.city LIKE ?
    )`;

    const term = `%${search.trim()}%`;
    params.push(term, term, term);
  }

  if (categoryId !== "") {
    sql += " AND d.category_id = ?";
    params.push(categoryId);
  }

  sql += " ORDER BY d.name ASC";

  const [rows] = await pool.execute(sql, params);
  return rows;
}

async function getDestinationById(id) {
  const [rows] = await pool.execute(
    `SELECT d.*, c.name AS category_name
     FROM destinations d
     LEFT JOIN categories c ON d.category_id = c.id
     WHERE d.id = ? AND d.status = 'APPROVED'`,
    [id]
  );

  return rows[0] || null;
}

module.exports = {
  getApprovedDestinations,
  getDestinationById
};
