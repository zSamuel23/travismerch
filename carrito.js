
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Actualiza total en header
function actualizarTotal() {
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  const totalElement = document.querySelector(".cart span");
  if (totalElement) totalElement.textContent = `${total.toLocaleString()}₡`;
}

// Renderiza productos en modal
function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalEl = document.getElementById("total-carrito");

  lista.innerHTML = "";
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - ${item.precio.toLocaleString()}₡`;
    lista.appendChild(li);
  });

  totalEl.textContent = `${carrito.reduce((sum, item) => sum + item.precio, 0).toLocaleString()}₡`;
}

// Eventos
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-carrito");
  const cerrarModal = document.getElementById("cerrar-modal");
  const iconoCarrito = document.querySelector(".cart img");

  // Abrir modal
  iconoCarrito.addEventListener("click", () => {
    renderizarCarrito();
    modal.style.display = "flex";
  });

  // Cerrar modal
  cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar modal al hacer click fuera
  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  actualizarTotal();
});


