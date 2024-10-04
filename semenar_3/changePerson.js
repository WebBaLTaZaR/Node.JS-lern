const fs = require("fs");
const path = require("path");
const person = {
  name: "Ivan",
  surname: "Ivanos",
  age: 10,
  sity: "Ekaterinburg",
};
fs.writeFileSync(
  path.join(__dirname, "person.json"),
  JSON.stringify(person, null, 2)
);
