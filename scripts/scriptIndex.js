const barra = document.querySelector("nav");
const carousel = document.querySelectorAll(".c-item");

carousel.forEach(function(elemento) {
  elemento.style.height = "calc(100vh - " + barra.clientHeight + "px)";
});