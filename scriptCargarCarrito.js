document.addEventListener('DOMContentLoaded', () => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const main = document.querySelector('main');
  const resumen = document.querySelector('.cart-summary');

  carrito.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}" class="cart-img">
      <div class="cart-info">
        <a href="#"><h3>${producto.nombre}</h3></a>
        <p>${producto.descripcion || 'Descripción del producto...'}</p>
        <span class="cart-price" data-price="${producto.precio}">USD ${producto.precio.toFixed(2)}</span>
      </div>
      <div class="cart-actions">
        <button class="btn-minus">➖</button>
        <input type="text" value="${producto.cantidad}" readonly class="cart-qty">
        <button class="btn-plus">➕</button>
        <button class="btn-remove">🗑</button>
      </div>
    `;
    main.insertBefore(div, resumen);
  });

  // Actualizar contador en la barra
  document.getElementById('cart-count').textContent = carrito.length;
});
