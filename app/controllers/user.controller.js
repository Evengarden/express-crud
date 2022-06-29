import User from "../models/user.model.js";
import sha1 from "sha1";
import generateAuthToken from "../services/generateToken.js";
import * as fs from "fs";

export const create = (req, res) => {
  const hashPass = sha1(req.body.password);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  })
    .then(function () {
      return res.status(200).send("User successfully registered");
    })
    .catch(function (err) {
      return res.status(401).send(`error: ${err.message}`);
    });
};

export const login = async (req, res) => {
  const hashPass = sha1(req.body.password);

  const user = await User.findOne({
    where: { email: req.body.email, password: hashPass },
  });
  if (!user) {
    return res.status(401).send({ error: "Login failed" });
  }
  const token = generateAuthToken(user);
  res.send(token);
};

export const edit = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  if (!user) {
    return res.status(401).send({ error: "User not found" });
  }
  let __dirname = process.cwd();
  const sampleFile = req.files.photo;
  if (
    sampleFile.mimetype !== "image/png" &&
    sampleFile.mimetype !== "image/jpg"
  ) {
    return res.status(401).send(`Too big or wrong format image`);
  }
  const uploadPath = __dirname + "/static/" + sampleFile.name;

  if (!fs.existsSync(__dirname + "/static/")) {
    fs.mkdirSync(__dirname + "/static/");
  }

  user
    .update(
      {
        name: req.body.name ? req.body.name : user.name,
        surname: req.body.surname ? req.body.surname : user.surname,
        email: req.body.email ? req.body.email : user.email,
        sex: req.body.sex ? req.body.sex : user.sex,
        photo: sampleFile ? sampleFile.name : user.photo,
      },
      { where: { id: req.params.id } }
    )
    .then(function (user) {
      sampleFile.mv(uploadPath);
      return res.status(200).send(`User successfully updated`);
    })
    .catch(function (err) {
      return res.status(401).send(`error: ${err.message}`);
    });
};

export const getProfileById = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
  });

  if (!user) {
    return res.status(401).send({ error: "User not found" });
  }
  res.send(user);
};

export const getProfiles = async (req, res) => {
  const rows_on_page = 10;
  const page = req.query.page - 1;
  const users = await User.findAll({
    offset: rows_on_page * page,
    limit: rows_on_page,
    order: [["createdAt", "ASC"]],
  });

  if (!users) {
    return res.status(401).send({ error: "Users not found" });
  }
  res.send(users);
};
