# 🎬 Book That Show - Movie Ticket Booking Website

A fullstack movie ticket booking application inspired by BookMyShow, built as a Capstone Project. Users can select a movie, pick a time slot, choose seat types, and book tickets all persisted in a MongoDB database.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)

## 🛠 Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Frontend   | React 16, Webpack, Babel, CSS     |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB (Mongoose ODM)            |
| API Docs   | Swagger (OpenAPI 3.0)             |

## 📁 Project Structure

```
├── .env                        # Environment variables (MongoDB URI)
├── src/
│   ├── index.js                # Express server (port 8080)
│   ├── connector.js            # MongoDB connection setup
│   ├── schema.js               # Mongoose schema for bookings
│   ├── config/
│   │   └── swagger.js          # Swagger/OpenAPI configuration
│   └── client/                 # React frontend
│       ├── webpack.config.js   # Webpack config with proxy to backend
│       └── src/
│           ├── index.html      # HTML entry point
│           ├── index.js        # React entry point
│           ├── components/
│           │   ├── App.js      # Main application component
│           │   └── data.js     # Movies, slots & seat types data
│           └── styles/
│               └── App.css     # Application styles
```

## ✨ Features

- **Movie Selection** — Choose from a list of 5 movies by clicking
- **Time Slot Selection** — Pick from 4 available time slots (10:00 AM, 01:00 PM, 03:00 PM, 08:00 PM)
- **Seat Booking** — Select number of seats across 6 seat types (A1, A2, A3, A4, D1, D2)
- **Persistent Selections** — Selections are saved to `localStorage` and persist across page reloads
- **Last Booking Display** — Shows details of the most recent booking
- **Database Storage** — All bookings are stored in MongoDB
- **API Documentation** — Interactive Swagger docs available at `/api-docs`

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas connection string)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Book-A-Movie-Ticket-Fullstack-Boilerplate-main
   ```

2. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```env
   MONGODB_URL=mongodb://localhost:27017/bookMovie
   ```

3. **Install backend dependencies & start the server**

   ```bash
   cd src
   npm install
   npm start
   ```

   The backend server will start on **http://localhost:8080**

4. **Install frontend dependencies & start the client** (in a new terminal)

   ```bash
   cd src/client
   npm install
   npm start
   ```

   The frontend will open on **http://localhost:3000**

## 📡 API Endpoints

### `POST /api/booking`

Create a new movie booking.

**Request Body:**

```json
{
  "movie": "Tenet",
  "slot": "10:00 AM",
  "seats": {
    "A1": 2,
    "A2": 1,
    "A3": 0,
    "A4": 0,
    "D1": 3,
    "D2": 0
  }
}
```

**Response (200):**

```json
{
  "message": "Booking successful",
  "data": { "movie": "Tenet", "slot": "10:00 AM", "seats": { ... } }
}
```

---

### `GET /api/booking`

Retrieve the last booking.

**Response (200):**

```json
{
  "movie": "Tenet",
  "slot": "10:00 AM",
  "seats": { "A1": 2, "A2": 1, "A3": 0, "A4": 0, "D1": 3, "D2": 0 }
}
```

**Response (200) — No previous booking:**

```json
{
  "message": "no previous booking found"
}
```

## 🔐 Environment Variables

| Variable      | Description                    | Default                              |
| ------------- | ------------------------------ | ------------------------------------ |
| `MONGODB_URL` | MongoDB connection string      | `mongodb://localhost:27017/bookMovie`|
