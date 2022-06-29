import config from "../config/config.js";
import jwt from "jsonwebtoken";

const generateAuthToken = function (user) {
  const token = jwt.sign({ _id: user._id }, config.JWT_KEY);
  return token;
};
export default generateAuthToken;
