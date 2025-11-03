const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Enquiry = sequelize.define("Enquiry", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  courseInterest: DataTypes.STRING,
  claimed: { type: DataTypes.BOOLEAN, defaultValue: false },
  counselorId: { type: DataTypes.INTEGER, allowNull: true },
});

module.exports = Enquiry;
