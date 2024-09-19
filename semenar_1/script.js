"use strict";
const http = require("http");
const pagesViews = {
  "/": 0,
  "/about": 0,
};

const server = http.createServer((req, res) => {
  if (pagesViews.hasOwnProperty) {
    pagesViews[req.url] += 1;
    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    if (req.url === "/") {
      res.end(
        `<h1>Добро пожаловать на мой сайт! 
		</h1> <a href='/about'>О Нас!</a>
		<p>Количество просмотров этой страницы: ${pagesViews["/"]}</p>`
      );
    } else if (req.url === "/about") {
      res.end(`<h1>О нас!</h1> 
		<a href='/'>На главную!</a>
		<p>Количество просмотров этой страницы: ${pagesViews["/about"]}</p>`);
    } else {
      res.end(`<h1>Упс, что-то пошло не так!</h1>`);
    }
  }
});
const port = 3000;
server.listen(port, () => {
  console.log(`Запущен сервер на ${port} порту!`);
});
