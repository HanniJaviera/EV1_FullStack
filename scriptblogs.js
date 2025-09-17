function initCarousel(id) {
    const carousel = document.getElementById(id);
    const carouselImages = carousel.querySelector(".carousel-images");
    const images = carousel.querySelectorAll(".carousel-images img");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    let index = 0;

    function showSlide(i) {
        index = (i + images.length) % images.length;
        carouselImages.style.transform = `translateX(${-index * 100}%)`;
    }

    prevBtn.addEventListener("click", () => showSlide(index - 1));
    nextBtn.addEventListener("click", () => showSlide(index + 1));

    // Cambio automático cada 5 segundos
    setInterval(() => showSlide(index + 1), 5000);
}

// Inicializa cada carrusel con su id
initCarousel("carousel1");
initCarousel("carousel2");

//Script de comentarios que me dio el Chat gpt; No esta desarrollado como corresponde pero es una idea

const form = document.getElementById("form-comentarios");
const lista = document.getElementById("lista-comentarios");
let contadorComentarios = 1;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (nombre && comentario) {
        contadorComentarios++;

        const div = document.createElement("div");
        div.classList.add("comentario");
        div.innerHTML = `
      <img src="https://i.pravatar.cc/50?img=${Math.floor(Math.random() * 70)}" alt="Perfil" class="avatar">
      <div class="comentario-contenido">
        <p class="nombre">${nombre}</p>
        <p class="numero-comentario">Comentario #${contadorComentarios}</p>
        <p class="texto-comentario">${comentario}</p>
        <div class="acciones-comentario">
          <span class="responder">Responder</span> | <span class="like">❤️ Like</span>
        </div>
      </div>
    `;
        lista.appendChild(div);

        form.reset();
    }
});