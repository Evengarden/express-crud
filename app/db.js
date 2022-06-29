import sequelize from "sequelize";
import config from "./config/config.js";
const Sequelize = sequelize;
const conn = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

export default conn;
