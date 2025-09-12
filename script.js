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