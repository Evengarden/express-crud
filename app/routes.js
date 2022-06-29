import { body, validationResult, checkSchema } from "express-validator";

import {
  create,
  edit,
  getProfileById,
  getProfiles,
  login,
} from "./controllers/user.controller.js";

import express from "express";
import config from "./config/config.js";
import jwt from "jsonwebtoken";


const router = express.Router();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.JWT_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//Имя, Email, Пароль
router.post(
  "/user/register",
  body("name").isString().notEmpty(),
  body("email").isEmail(),
  body("password").isString().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    create(req, res);
  }
);
router.post(
  "/user/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    login(req, res);
  }
);

router.put(
  "/profile/:id",
  authenticateJWT,
  checkSchema({
    id: {
      in: ["params", "query"],
      errorMessage: "ID is wrong",
      isInt: true,
      toInt: true,
    },
  }),
  body("name").isString(),
  body("surname").isString(),
  body("email").isEmail(),
  body("sex").isString(),
  (req, res) => {
    edit(req, res);
  }
);
router.get(
  "/profile/:id",
  authenticateJWT,
  checkSchema({
    id: {
      in: ["params", "query"],
      errorMessage: "ID is wrong",
      isInt: true,
      toInt: true,
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    getProfileById(req, res);
  }
);
router.get("/profiles",authenticateJWT, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  getProfiles(req, res);
});

export default router;
