const express = require("express");
const app = express();

const pagesViews = {
  "/": 0,
  "/about": 0,
};
app.use(express.static("statick"));
// Обработчик для главной страницы "/"
app.get("/", (req, res) => {
  pagesViews["/"] += 1;
  res.sendFile(__dirname + "/index.html");
});

// Обработчик для страницы "/about"
app.get("/about", (req, res) => {
  pagesViews["/about"] += 1;
  res.sendFile(__dirname + "/about.html");
});

// Обработчик для всех остальных маршрутов
app.use((req, res) => {
  res.status(404).send("<h1>Упс, что-то пошло не так!</h1>");
});

// Запуск сервера на порту 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
