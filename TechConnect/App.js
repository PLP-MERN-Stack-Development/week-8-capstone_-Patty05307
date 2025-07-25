 require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
const admin = require('./routes/main');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const sequelize = require('./utils/database')
const Product = require('./models/user')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(admin)





const connect = (async () => {
  try {
    await sequelize.authenticate();
    console.log(' Connected to PostgreSQL');

    // Sync tables — creates table if it doesn't exist
    await sequelize.sync({ alter: true }); // use { force: true } to DROP and recreate tables
    console.log(' Tables synced')

  } catch (error) {
    console.error(' Unable to connect to DB:', error);
  }
})();


app.listen(3300, () => {  
    console.log('Server is running on port 3300');
});