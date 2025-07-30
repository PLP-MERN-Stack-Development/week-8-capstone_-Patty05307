// server/app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./utils/database");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3300;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/posts", require("./routes/postRoutes")); // Example route

// Connect DB and start server
(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
  }
})();
