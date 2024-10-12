const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lab = sequelize.define('Lab', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber:{
    type:DataTypes.INTEGER,
    allowNull:true
  }
}, {
  timestamps: true, // Sequelize manage the columns createAt and updateAt
});

module.exports = Lab;
