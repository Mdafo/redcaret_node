require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { sequelize1, sequelize2 } = require("./config/db_connection");
const commonRoutes = require("./src/routes/commonRoute");
const loginRoutes = require("./src/routes/loginRoute");


const app = express();

//
// Middleware
//

// Parse JSON
app.use(express.json());

// CORS Configuration
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );
app.use(cors({
  origin: ['http://redcarat.ae', 'https://redcarat.ae', 'http://www.redcarat.ae', 'https://www.redcarat.ae'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Manual Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/api", commonRoutes);
app.use("/api", loginRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running successfully",
  });
});

//
// Global Error Handler
//

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

//
// Database + Server Initialization
//

async function init() {
  try {
    // DB1 Connection
    await sequelize1.authenticate();
    console.log("✅ Connection to DB1 established");

    // DB2 Connection
    await sequelize2.authenticate();
    console.log("✅ Connection to DB2 established");

    // Start Server
    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

init();

