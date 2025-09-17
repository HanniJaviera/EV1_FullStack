document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.btnAñadir');

  btn.addEventListener('click', () => {
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio);
    const img = btn.dataset.img;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ nombre, precio, img, cantidad: 1 });
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`${nombre} agregado al carrito`);
  });
});
