document.addEventListener('DOMContentLoaded', function() {
	const logo = document.querySelector('.atras');
	logo.addEventListener('click', function() {
		window.location.href = 'index.html';
	});

	let productos = [];
	let carrito = [];

	fetch('js/productos.json')
		.then(response => response.json())
		.then(data => {
			productos = data;
			mostrarProductos(productos);

			document.getElementById('mostrarTodos').addEventListener('click', () => mostrarProductos(productos));
			document.getElementById('mostrarMoviles').addEventListener('click', () => filtrarProductos('moviles'));
			document.getElementById('mostrarPortatiles').addEventListener('click', () => filtrarProductos('portatiles'));
			document.getElementById('mostrarTelevisores').addEventListener('click', () => filtrarProductos('televisiones'));
		})
		.catch(error => console.error('Error al cargar productos: ', error));

	function mostrarProductos(productosAMostrar) {
		const listaProductos = document.getElementById('listaProductos');
		listaProductos.innerHTML = '';

		productosAMostrar.forEach(producto => {
			const productoElement = document.createElement('div');
			productoElement.className = 'producto';
			productoElement.innerHTML = `
				<img src="${producto.imagen}" alt="${producto.titulo}">
				<h3>${producto.titulo}</h3>
				<p>${producto.precio}€</p>
				<button onclick="agregarAlCarrito('${producto.id}')">Agregar al carrito</button>
			`;
			listaProductos.appendChild(productoElement);
		});
	}

	function filtrarProductos(categoriaId) {
		const productosFiltrados = productos.filter(producto => producto.categoria.id === categoriaId);
		mostrarProductos(productosFiltrados);
	}

	window.agregarAlCarrito = function(id) {
		const producto = productos.find(p =>p.id === id);
		if (producto) {
			carrito.push(producto);
			actualizarCarrito();
		}
	};

	function actualizarCarrito() {
		const carritoElement = document.getElementById('mostrarCarrito');
		carritoElement.textContent = `Ver carrito (${carrito.length})`;
		localStorage.setItem('carrito', JSON.stringify(carrito));
	}

	const carritoGuardado = localStorage.getItem('carrito');

	if (carritoGuardado) {
		carrito = JSON.parse(carritoGuardado);
		actualizarCarrito();
	}
});
