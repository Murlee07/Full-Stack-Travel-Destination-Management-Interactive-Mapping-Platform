
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
}

async function signup(req, res) {
  try {
    const { name, email, password, username } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      password.length < 8 ||
      password.length > 72
    ) {
      return res.status(400).json({
        message: "Name, email, and password (8–72 characters) are required."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername =
      typeof username === "string" && username.trim()
        ? username.trim()
        : null;

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      `INSERT INTO users
       (name, username, email, password_hash, role, status)
       VALUES (?, ?, ?, ?, 'USER', 'ACTIVE')`,
      [
        name.trim(),
        normalizedUsername,
        normalizedEmail,
        passwordHash
      ]
    );

    const user = {
      id: result.insertId,
      name: name.trim(),
      email: normalizedEmail,
      role: "USER"
    };

    return res.status(201).json({
      message: "Account created successfully",
      token: createToken(user),
      user
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Email or username is already registered."
      });
    }

    console.error("Signup error:", error.message);
    return res.status(500).json({
      message: "Unable to create account."
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required."
      });
    }

    const [rows] = await pool.execute(
      `SELECT id, name, email, password_hash, role, status
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [email.trim().toLowerCase()]
    );

    const user = rows[0];

    if (
      !user ||
      user.status !== "ACTIVE" ||
      !(await bcrypt.compare(password, user.password_hash))
    ) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    return res.json({
      message: "Login successful",
      token: createToken(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Unable to log in."
    });
  }
}

module.exports = { signup, login };
