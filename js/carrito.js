document.addEventListener('DOMContentLoaded', function() {
	let carrito = [];
	const listaCarrito = document.getElementById('listaCarrito');
	const precioTotal = document.getElementById('precioTotal');
	const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
	const comprarAhoraBtn = document.getElementById('comprarAhora');

	function cargarCarrito() {
		const carritoGuardado = localStorage.getItem('carrito');

		if (carritoGuardado) {
			carrito = JSON.parse(carritoGuardado);
			actualizarCarritoUI();
		}
	}

	function actualizarCarritoUI() {
		let total = 0;

		listaCarrito.innerHTML = '';

		carrito.forEach(producto => {
			const subtotal = producto.precio * (producto.cantidad || 1);
			const productoElement = document.createElement('div');
			productoElement.className = 'productoCarrito';
			productoElement.innerHTML = `
				<img src="${producto.imagen}" alt="${producto.titulo}">
				<h3>${producto.titulo}</h3>
				<p>Precio: ${producto.precio}€</p>
				<p>Cantidad: ${producto.cantidad || 1}</p>
				<p>Subtotal: ${subtotal.toFixed(2)}€</p>
				<button onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
			`;
			listaCarrito.appendChild(productoElement);
			total += subtotal;
		});

		precioTotal.textContent = `Total: ${total.toFixed(2)}€`;
	}

	window.eliminarDelCarrito = function(id) {
		carrito = carrito.filter(producto => producto.id !== id);
		localStorage.setItem('carrito', JSON.stringify(carrito));
		actualizarCarritoUI();
	};

	vaciarCarritoBtn.addEventListener('click', function() {
		carrito = [];
		localStorage.removeItem('carrito');
		actualizarCarritoUI();
	});

	comprarAhoraBtn.addEventListener('click', function() {
		if (carrito.length > 0) {
			alert('Compra realizada con éxito');
			carrito = [];
			localStorage.removeItem('carrito');
			actualizarCarritoUI();
		} else {
			alert('El carrito está vacío');
		}
	});

	cargarCarrito();
});