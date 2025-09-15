document.addEventListener('DOMContentLoaded', () => {
    // Selecciona la imagen principal y todas las imágenes de la galería
    const mainImage = document.getElementById('mainPeak');
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