// Array con las URL de las imágenes que quieres rotar
const images = [
  'https://i.pinimg.com/1200x/42/85/64/428564436559faf179177a5fa39fb7f7.jpg',
  'https://i.pinimg.com/1200x/1d/8d/b2/1d8db24b3990ca5beb73bc7d40e0b6fa.jpg',
  'https://imagenes.elpais.com/resizer/v2/Q2SQEBBHJ5FRBEZXZGIW6WVCQQ.jpeg?auth=16591cf712022fc6ca98fb4c5c0e981903f213b63594637c5688690122758c53&width=1200',
  // Agrega más URL de imágenes aquí si lo deseas
];

// Obtén el elemento del header
const header = document.querySelector('.header');

// Inicializa un contador para saber qué imagen mostrar
let currentIndex = 0;

// Función para cambiar la imagen de fondo
function changeImage() {
  // Construye la URL del fondo con el gradiente y la nueva imagen
  const newBackgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${images[currentIndex]}')`;
  
  // Asigna el nuevo fondo al header
  header.style.backgroundImage = newBackgroundImage;
  
  // Incrementa el índice y vuelve al inicio si llegas al final
  currentIndex = (currentIndex + 1) % images.length;
}

// Llama a la función al cargar la página para establecer la primera imagen
document.addEventListener('DOMContentLoaded', () => {
  changeImage();
});

// Cambia la imagen cada 5000 milisegundos (5 segundos)
setInterval(changeImage, 5000);