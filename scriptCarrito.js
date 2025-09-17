document.addEventListener('DOMContentLoaded', function() {
  const totalElement = document.getElementById('total');
  const aplicarCuponBtn = document.getElementById('aplicar-cupon');
  const pagarBtn = document.getElementById('pagar');

  // Función para obtener los cart-items actuales
  const cartItems = () => document.querySelectorAll('.cart-item');

  // Función para actualizar total
  function actualizarTotal() {
    let total = 0;
    cartItems().forEach(item => {
      const precio = parseFloat(item.querySelector('.cart-price').dataset.price);
      const cantidad = parseFloat(item.querySelector('.cart-qty').value);
      total += precio * cantidad;
    });
    totalElement.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
  }

  // Botones +, - y eliminar
  function inicializarBotones() {
    cartItems().forEach(item => {
      const btnMinus = item.querySelector('.btn-minus');
      const btnPlus = item.querySelector('.btn-plus');
      const btnRemove = item.querySelector('.btn-remove');
      const qtyInput = item.querySelector('.cart-qty');

      btnMinus.onclick = () => {
        let cantidad = parseFloat(qtyInput.value);
        if (cantidad > 1) {
          qtyInput.value = (cantidad - 1).toFixed(2);
          actualizarTotal();
        }
      };

      btnPlus.onclick = () => {
        let cantidad = parseFloat(qtyInput.value);
        qtyInput.value = (cantidad + 1).toFixed(2);
        actualizarTotal();
      };

      btnRemove.onclick = () => {
        item.remove();
        actualizarTotal();

        // Actualizar localStorage y contador
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const nombre = item.querySelector('.cart-info h3').textContent;
        const nuevoCarrito = carrito.filter(p => p.nombre !== nombre);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        document.getElementById('cart-count').textContent = nuevoCarrito.length;
      };
    });
  }

  // Aplicar cupón
  aplicarCuponBtn.addEventListener('click', () => {
    const cuponInput = document.getElementById('cupon');
    const cupon = cuponInput.value.trim().toUpperCase();
    let total = 0;

    cartItems().forEach(item => {
      const precio = parseFloat(item.querySelector('.cart-price').dataset.price);
      const cantidad = parseFloat(item.querySelector('.cart-qty').value);
      total += precio * cantidad;
    });

    if (cupon === 'DESCUENTO10') {
      total *= 0.9;
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

  // Inicializar botones y total
  inicializarBotones();
  actualizarTotal();
});
