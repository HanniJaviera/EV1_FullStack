document.addEventListener('DOMContentLoaded', function() {
  const cartItems = document.querySelectorAll('.cart-item');
  const totalElement = document.getElementById('total');
  const aplicarCuponBtn = document.getElementById('aplicar-cupon');
  const pagarBtn = document.getElementById('pagar');

  // Función para actualizar total
  function actualizarTotal() {
    let total = 0;
    cartItems.forEach(item => {
      const precio = parseFloat(item.querySelector('.cart-price').dataset.price);
      const cantidad = parseFloat(item.querySelector('.cart-qty').value);
      total += precio * cantidad;
    });
    // Mostrar total en USD con dos decimales
    totalElement.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
  }

  // Botones + y -
  cartItems.forEach(item => {
    const btnMinus = item.querySelector('.btn-minus');
    const btnPlus = item.querySelector('.btn-plus');
    const btnRemove = item.querySelector('.btn-remove');
    const qtyInput = item.querySelector('.cart-qty');

    btnMinus.addEventListener('click', () => {
      let cantidad = parseFloat(qtyInput.value);
      if (cantidad > 1) {
        qtyInput.value = (cantidad - 1).toFixed(2);
        actualizarTotal();
      }
    });

    btnPlus.addEventListener('click', () => {
      let cantidad = parseFloat(qtyInput.value);
      qtyInput.value = (cantidad + 1).toFixed(2);
      actualizarTotal();
    });

    btnRemove.addEventListener('click', () => {
      item.remove();
      actualizarTotal();
    });
  });

  // Aplicar cupón de descuento
  aplicarCuponBtn.addEventListener('click', () => {
    const cuponInput = document.getElementById('cupon');
    const cupon = cuponInput.value.trim().toUpperCase();
    let total = 0;

    cartItems.forEach(item => {
      const precio = parseFloat(item.querySelector('.cart-price').dataset.price);
      const cantidad = parseFloat(item.querySelector('.cart-qty').value);
      total += precio * cantidad;
    });

    if (cupon === 'DESCUENTO10') {
      total *= 0.9; // 10% de descuento
      alert('Cupón aplicado: 10% de descuento');
    } else if (cupon !== '') {
      alert('Cupón inválido');
      return;
    }

    totalElement.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
    cuponInput.value = '';
  });

  // Botón pagar
  pagarBtn.addEventListener('click', () => {
    const totalNum = parseFloat(totalElement.textContent.replace(/,/g, ''));
    if (totalNum === 0) {
      alert('No hay productos en el carrito');
    } else {
      alert(`Total a pagar: USD ${totalElement.textContent}`);
    }
  });

  // Inicializar total al cargar
  actualizarTotal();
});
