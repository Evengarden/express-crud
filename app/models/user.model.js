import { Sequelize, Model, DataTypes } from "sequelize";
import conn from "../db.js";
const sequelize = conn;
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },
    password: { type: DataTypes.STRING, allowNull: false },
    email: DataTypes.STRING,
    sex: DataTypes.STRING,
    photo: DataTypes.STRING,
  },
  {
    indexes: [{ fields: ["email"], unique: true }],
  }
);

sequelize.sync();

export default User;
