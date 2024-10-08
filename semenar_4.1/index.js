const express = require("express");
const fs = require("fs");
const path = require("path");
const joi = require("joi");

const app = express();
const filePath = path.join(__dirname, "users.json");
app.use(express.json());

let uniqueID = 1;

const userShema = joi.object({
  firstname: joi.string().min(1).required(),
  secondname: joi.string().min(1).required(),
  age: joi.number().min(0).max(100).required(),
  city: joi.string().min(1),
});

function readUsersFromFile() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeUsersToFile(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf8");
}

app.get("/users", (req, res) => {
  const users = readUsersFromFile();
  res.send({ users });
});

app.get("/users/:id", (req, res) => {
  const users = readUsersFromFile();
  const userID = +req.params.id;
  const user = users.find((user) => user.id === userID);
  if (user) {
    res.send({ user });
  } else {
    res.status(404).res.send({ user: null });
  }
});

app.post("/users", (req, res) => {
  const result = userShema.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }
  const users = readUsersFromFile();
  const newUser = {
    id: uniqueID++,
    ...req.body,
  };
  users.push(newUser);
  writeUsersToFile(users);
  res.send({ id: newUser.id });
});

app.put("/users/:id", (req, res) => {
  const result = userShema.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }
  const users = readUsersFromFile();
  const userID = +req.params.id;
  const user = users.find((user) => user.id === userID);
  if (user) {
    user.firstname = req.body.firstname;
    user.secondname = req.body.secondname;
    user.age = req.body.age;
    user.city = req.body.city;
    writeUsersToFile(users);
    res.send({ user });
  } else {
    res.status(404).send({ user: null });
  }
});

app.delete("/users/:id", (req, res) => {
  const users = readUsersFromFile();
  const userID = +req.params.id;
  const user = users.find((user) => user.id === userID);
  if (user) {
    const userIndex = users.indexOf(user);
    users.splice(userIndex, 1);
    writeUsersToFile(users);
    res.send({ user });
  } else {
    res.status(404);
    res.send({ user: null });
  }
});

app.listen(3000);
