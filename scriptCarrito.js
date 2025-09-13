function actualizarTotal() {
  let total = 0;
  let count = 0;
  document.querySelectorAll(".cart-item").forEach(item => {
    let price = parseInt(item.querySelector(".price").dataset.price);
    let quantity = parseInt(item.querySelector("input").value);
    total += price * quantity;
    count += quantity;
  });

  document.getElementById("total").textContent = total.toLocaleString("es-CL");
  document.getElementById("cart-count").textContent = count;
}

// Manejo de botones ➖ y ➕
document.querySelectorAll(".plus").forEach(btn => {
  btn.addEventListener("click", () => {
    let input = btn.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    actualizarTotal();
  });
});

document.querySelectorAll(".minus").forEach(btn => {
  btn.addEventListener("click", () => {
    let input = btn.nextElementSibling;
    if (parseInt(input.value) > 1) {
      input.value = parseInt(input.value) - 1;
      actualizarTotal();
    }
  });
});

// Cupón de descuento (ejemplo simple)
document.getElementById("aplicar-cupon").addEventListener("click", () => {
  let cupon = document.getElementById("cupon").value;
  let total = parseInt(document.getElementById("total").textContent.replace(/\./g, ""));
  if (cupon === "DESCUENTO10") {
    total = total * 0.9; // 10% descuento
    document.getElementById("total").textContent = total.toLocaleString("es-CL");
    alert("Cupón aplicado: 10% descuento");
  } else {
    alert("Cupón inválido");
  }
});

// Inicializar total
actualizarTotal();
