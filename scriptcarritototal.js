document.addEventListener('DOMContentLoaded', function() {
    // 1. ELEMENTOS DEL DOM
    const totalElement = document.getElementById('total');
    const aplicarCuponBtn = document.getElementById('aplicar-cupon');
    const pagarBtn = document.getElementById('pagar');
    const main = document.querySelector('main');
    const resumen = document.querySelector('.cart-summary');
    const btnAñadir = document.querySelectorAll('.btnAñadir');

    // 2. FUNCIONES DE AYUDA
    const getCarrito = () => JSON.parse(localStorage.getItem('carrito')) || [];
    const saveCarrito = (carrito) => localStorage.setItem('carrito', JSON.stringify(carrito));
    const updateCartCount = () => {
        const carrito = getCarrito();
        document.getElementById('cart-count').textContent = carrito.length;
    };
    const actualizarTotal = () => {
        let total = 0;
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            const precio = parseFloat(item.querySelector('.cart-price').dataset.price);
            const cantidad = parseFloat(item.querySelector('.cart-qty').value);
            total += precio * cantidad;
        });
        totalElement.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
    };

    // 3. RENDERIZADO Y EVENTOS
const renderCarrito = () => {
    const carrito = getCarrito();
    // 1. Obtiene el contenedor donde se agregarán los productos
    const cartItemsContainer = document.querySelector('.cart-items'); 

    // 2. Asegura que el contenedor exista en el HTML antes de manipularlo
    if (cartItemsContainer) {
        // 3. Limpia el contenedor para evitar productos duplicados
        cartItemsContainer.innerHTML = ''; 

        // 4. Itera sobre el array del carrito para crear los elementos HTML
        carrito.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}" class="cart-img">
                <div class="cart-info">
                    <a href="#"><h3>${producto.nombre}</h3></a>
                    <p>${producto.descripcion || ''}</p>
                    <span class="cart-price" data-price="${producto.precio}">USD ${producto.precio.toFixed(2)}</span>
                </div>
                <div class="cart-actions">
                    <button class="btn-minus">➖</button>
                    <input type="text" value="${producto.cantidad}" readonly class="cart-qty">
                    <button class="btn-plus">➕</button>
                    <button class="btn-remove">🗑</button>
                </div>
            `;
            // 5. Agrega el nuevo producto al contenedor de ítems
            cartItemsContainer.appendChild(div);
        });

        // 6. Inicializa los eventos y actualiza el total
        inicializarBotones();
        actualizarTotal();
    }
    // Siempre actualiza el contador del carrito en la barra de navegación
    updateCartCount();
};

    const inicializarBotones = () => {
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            const btnMinus = item.querySelector('.btn-minus');
            const btnPlus = item.querySelector('.btn-plus');
            const btnRemove = item.querySelector('.btn-remove');
            const qtyInput = item.querySelector('.cart-qty');
            const nombre = item.querySelector('.cart-info h3').textContent;

            btnMinus.onclick = () => {
                let cantidad = parseInt(qtyInput.value);
                if (cantidad > 1) {
                    qtyInput.value = cantidad - 1;
                    actualizarTotal();
                    let carrito = getCarrito();
                    let producto = carrito.find(p => p.nombre === nombre);
                    producto.cantidad = parseInt(qtyInput.value);
                    saveCarrito(carrito);
                }
            };
            btnPlus.onclick = () => {
                let cantidad = parseInt(qtyInput.value);
                qtyInput.value = cantidad + 1;
                actualizarTotal();
                let carrito = getCarrito();
                let producto = carrito.find(p => p.nombre === nombre);
                producto.cantidad = parseInt(qtyInput.value);
                saveCarrito(carrito);
            };
            btnRemove.onclick = () => {
                let carrito = getCarrito();
                const nuevoCarrito = carrito.filter(p => p.nombre !== nombre);
                saveCarrito(nuevoCarrito);
                item.remove();
                actualizarTotal();
                updateCartCount();
            };
        });
    };

    // 4. EVENTOS DE AÑADIR PRODUCTO
btnAñadir.forEach(btn => {
  btn.addEventListener('click', () => {
    const nombre = btn.dataset.nombre;
    const precio = parseFloat(btn.dataset.precio); // Convierte el string a número
    const img = btn.dataset.img;
    const descripcion = btn.dataset.descripcion;

    // Validación para evitar que el precio sea NaN (Not a Number)
    if (isNaN(precio)) {
      console.error("Error: El precio del producto no es un número válido.");
      return; // Detiene la ejecución si el precio no es válido
    }

    let carrito = getCarrito();
    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ nombre, precio, img, cantidad: 1, descripcion: descripcion });
    }

    saveCarrito(carrito);
    alert(`${nombre} agregado al carrito`);
    updateCartCount();
    window.location.href = 'carritoCompra.html'; 
  });
});

    // 5. EVENTOS DEL RESUMEN DEL CARRITO 
    if (aplicarCuponBtn) { // Verifica si los botones existen
        aplicarCuponBtn.addEventListener('click', () => {
            const cuponInput = document.getElementById('cupon');
            const cupon = cuponInput.value.trim().toUpperCase();
            let total = 0;
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach(item => {
                const precio = parseFloat(item.querySelector('.cart-price').dataset.price);
                const cantidad = parseFloat(item.querySelector('.cart-qty').value);
                total += precio * cantidad;
            });
            if (cupon === 'DESCUENTO10') {
                total *= 0.9;
                alert('Cupón aplicado: 10% de descuento');
            } else if (cupon !== '') {
                alert('Cupón inválido');
            }
            totalElement.textContent = total.toLocaleString('en-US', { minimumFractionDigits: 2 });
            cuponInput.value = '';
        });
    }

    if (pagarBtn) {
        pagarBtn.addEventListener('click', () => {
            const totalNum = parseFloat(totalElement.textContent.replace(/,/g, ''));
            if (totalNum === 0) {
                alert('No hay productos en el carrito');
            } else {
                alert(`Total a pagar: USD ${totalElement.textContent}`);
            }
        });
    }

    // 6. INICIALIZACIÓN
    // Llama a renderCarrito() para inicializar la vista del carrito al cargar la página
    renderCarrito();
});