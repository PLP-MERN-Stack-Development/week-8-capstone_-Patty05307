

const Sequelize = require('sequelize');
const sequelize = require('../utils/database');


const User = sequelize.define('user', {
 id:{
     type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
 },
 name:{
    type: Sequelize.STRING,
        allowNull: false
 },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
   location: {
    type: Sequelize.STRING, 
    allowNull: true,
  },
   primarySkill: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  otherSkills: {
    type: Sequelize.ARRAY(Sequelize.STRING), 
    allowNull: true,
  },
  experienceYears: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  availability: {
    type: Sequelize.STRING, // e.g. "Weekdays only"
    allowNull: true,
  },
   about: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
 


})

module.exports = User