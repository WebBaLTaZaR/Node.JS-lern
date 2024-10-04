const express = require("express");
const app = express();

const pagesViews = {
  "/": 0,
  "/about": 0,
};
app.use(express.static("static"));

app.get("/api/views/index", (req, res) => {
  pagesViews["/"] += 1;
  res.json({ views: pagesViews["/"] });
});
app.get("/api/views/about", (req, res) => {
  pagesViews["/about"] += 1;
  res.json({ views: pagesViews["/about"] });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
