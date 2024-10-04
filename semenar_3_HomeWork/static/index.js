function updateViewCount(page) {
  fetch(`/api/views/${page}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("viewCount").textContent = data.views;
    })
    .catch((err) => console.error("Ошибка загрузки данных:", err));
}

window.onload = () => {
  if (window.location.pathname === "/about.html") {
    updateViewCount("about");
  } else {
    updateViewCount("index");
  }
};
