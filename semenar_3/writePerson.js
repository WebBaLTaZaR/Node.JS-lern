const fs = require("fs");
const path = require("path");
const person = {
  name: "Ivan",
  surname: "Ivanos",
  age: 18,
  sity: "Moscow",
};
fs.writeFileSync(
  path.join(__dirname, "person.json"),
  JSON.stringify(person, null, 2)
);
