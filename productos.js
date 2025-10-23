// === CARRITO DE COMPRAS ===
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Actualiza el total del header
function actualizarTotal() {
  const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  const totalElement = document.querySelector(".cart span");
  if (totalElement) {
    totalElement.textContent = `${total.toLocaleString()}₡`;
  }
}

// Guarda carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Muestra un mensaje temporal (toast)
function mostrarMensaje(texto, tipo = "exito") {
  const mensaje = document.createElement("div");
  mensaje.className = `toast ${tipo}`;
  mensaje.textContent = texto;
  document.body.appendChild(mensaje);

  // Animación y eliminación automática
  setTimeout(() => {
    mensaje.classList.add("visible");
  }, 100);

  setTimeout(() => {
    mensaje.classList.remove("visible");
    setTimeout(() => mensaje.remove(), 500);
  }, 2000);
}

// Agrega producto
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  guardarCarrito();
  actualizarTotal();
  renderizarCarrito();
  mostrarMensaje(`${nombre} añadido al carrito 🛒`);
}

// Elimina producto por índice
function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarTotal();
  renderizarCarrito();
  mostrarMensaje("Producto eliminado ❌", "error");
}

// Vacía todo el carrito
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarTotal();
  renderizarCarrito();
  mostrarMensaje("Carrito vaciado 🧹", "error");
}

// Renderiza los productos dentro del modal
function renderizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalEl = document.getElementById("total-carrito");

  lista.innerHTML = "";
  carrito.forEach((item, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - ${item.precio.toLocaleString()}₡
      <button onclick="eliminarProducto(${i})">X</button>
    `;
    lista.appendChild(li);
  });

  totalEl.textContent = `${carrito.reduce((sum, item) => sum + item.precio, 0).toLocaleString()}₡`;
}


document.addEventListener("DOMContentLoaded", () => {
  // Botones de agregar
  const botones = document.querySelectorAll(".add-to-cart, .card-button button");
  botones.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const nombre = btn.dataset.producto || btn.closest(".card").querySelector(".card-title").textContent;
      const precio = parseInt(btn.dataset.precio) || 25000;
      agregarAlCarrito(nombre, precio);
    });
  });

  // Modal
  const modal = document.getElementById("modal-carrito");
  const cerrarModal = document.getElementById("cerrar-modal");
  const iconoCarrito = document.querySelector(".cart img");
  const vaciarBtn = document.getElementById("vaciar-carrito");

  iconoCarrito.addEventListener("click", () => {
    renderizarCarrito();
    modal.style.display = "flex";
  });

  cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  vaciarBtn.addEventListener("click", () => {
    if (confirm("¿Seguro que quieres vaciar el carrito?")) {
      vaciarCarrito();
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  actualizarTotal();
});
