require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const adminRoutes = require('./routes/main');
app.use(adminRoutes);

// Sequelize DB connection
const sequelize = require('./utils/database');

// Port
const PORT = process.env.PORT || 3300;

// Connect to DB and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');

    await sequelize.sync({ alter: true });
    console.log('✅ Tables synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ DB Connection Failed:', error);
  }
})();
