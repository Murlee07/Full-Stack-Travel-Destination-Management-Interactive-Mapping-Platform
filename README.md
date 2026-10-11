# 🌍 Full-Stack Travel Destination Management & Interactive Mapping Platform

A full-stack travel discovery and destination management application built with React, Node.js, Express, MySQL, REST APIs, and Leaflet.

> **Project source:** Keep the `frontend/` and `backend/` folders in this repository. Do not commit credentials, `.env` files, or `node_modules/`.

## Features

- Welcome page with traveller login/signup, administrator login, and guest browsing.
- Destination discovery page with search, category filters, and favourites.
- Individual destination guides for places including Munnar, Alleppey, Pondicherry, Bastar, Jaipur, Tawang, Kodaikanal, Goa, Agra, Ooty, Varanasi, Udaipur, Darjeeling, Rishikesh, Hampi, and Shillong.
- Google Maps links for attractions.
- Leaflet interactive map.
- User-submitted destinations and admin moderation.
- REST API backed by MySQL.
- JWT authentication and role-based access controls.

## Technology Stack

**Frontend:** React, Vite, JavaScript, CSS, Leaflet, React Leaflet, Lucide React  
**Backend:** Node.js, Express.js, REST APIs  
**Database:** MySQL  
**Authentication:** bcryptjs and JSON Web Tokens  
**Tools:** VS Code, Git, GitHub

## Project Structure

```text
Full-Stack-Travel-Destination-Management-Interactive-Mapping-Platform/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the application:

- Node.js (LTS) and npm
- MySQL Server and a database client
- Git

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Murlee07/Full-Stack-Travel-Destination-Management-Interactive-Mapping-Platform.git
cd Full-Stack-Travel-Destination-Management-Interactive-Mapping-Platform
```

### 2. Configure the database

Create the database `travel_destination_platform` in MySQL, then run your project's database schema and seed scripts if included.

### 3. Configure and start the backend

```bash
cd backend
npm install
```

Create a local `.env` file in the backend folder using the variables required by your backend. Example:

```dotenv
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=travel_destination_platform
JWT_SECRET=replace_with_a_long_random_secret
```

Use the exact variable names expected by your `backend/config/db.js` and authentication code. Never commit your actual `.env` file.

Start the backend using the script declared in `backend/package.json`, for example:

```bash
npm run dev
```

### 4. Configure and start the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

Start Vite:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Security Notes

- Keep `.env`, passwords, JWT secrets, database dumps containing private data, and personal credentials out of Git.
- Use a unique, strong JWT secret in your local environment.
- The backend must enforce authentication and role permissions; hiding frontend controls is not an authorization mechanism.
- Do not expose administrator signup publicly.
- Use only sample or anonymized data in screenshots and database seeds.

## Notes

- The destination guide data may be defined in the frontend, while approved destination records are served by the backend.
- Google Maps links open a search for the selected destination or attraction.
- Destination availability, opening hours, entry requirements, and access conditions should be verified before travel.

## Author

**Murlee07**

## Repository

[GitHub repository](https://github.com/Murlee07/Full-Stack-Travel-Destination-Management-Interactive-Mapping-Platform)
