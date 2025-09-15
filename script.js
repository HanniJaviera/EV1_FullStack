document.addEventListener('keydown', function(event) {
    const customCarousel = document.getElementById('customCarousel');
    const carouselInstance = bootstrap.Carousel.getInstance(customCarousel);

    if (carouselInstance) {
        // Pausa el carrusel para detener el avance automático
        carouselInstance.pause();

        if (event.key === 'ArrowLeft') {
            // Mueve a la diapositiva anterior
            carouselInstance.prev();
        } else if (event.key === 'ArrowRight') {
            // Mueve a la diapositiva siguiente
            carouselInstance.next();
        }
        
        // Reinicia el avance automático sin retraso.
        // Bootstrap ya maneja el temporizador de forma inteligente.
        carouselInstance.cycle();
    }
});

/* Cambio de imagenes */ 

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona la imagen principal y todas las imágenes de la galería
    const mainImage = document.getElementById('cambioImagen');
    const galleryImages = document.querySelectorAll('.image-gallery img');

    // Itera sobre cada imagen de la galería y le añade un "escuchador de eventos"
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            // Guarda la fuente actual de la imagen principal en una variable temporal
            const tempSrc = mainImage.src;

            // Cambia la fuente de la imagen principal por la de la imagen en la que se hizo clic
            mainImage.src = image.src;

            // Cambia la fuente de la imagen en la que se hizo clic por la que estaba en la imagen principal
            image.src = tempSrc;
        });
    });
});