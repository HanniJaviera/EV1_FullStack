document.addEventListener('DOMContentLoaded', () => {
    // Código para la sección de Hollow Knight (si está en la misma página)

    // Código para la sección de Borderlands
    const mainBonderlandsImage = document.getElementById('mainBonderlandsImage');
    const galleryBonderlandsImages = document.querySelectorAll('.image-gallery img');

    galleryBonderlandsImages.forEach(image => {
        image.addEventListener('click', () => {
            if (mainBonderlandsImage) {
                // Guarda la fuente actual de la imagen grande de Borderlands
                const tempSrc = mainBonderlandsImage.src;
                
                // Asigna la fuente de la miniatura a la imagen grande
                mainBonderlandsImage.src = image.src;
                
                // Devuelve la imagen grande a la miniatura que se hizo clic
                image.src = tempSrc;
            }
        });
    });
});