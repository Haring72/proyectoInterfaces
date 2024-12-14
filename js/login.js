'use strict'

document.addEventListener('DOMContentLoaded', function() {
	const form = document.getElementById('formularioLogin');
	const nombreInput = document.getElementById('nombre');
	const contrasenhaInput = document.getElementById('contrasenha');
	const limpiarBtn = document.getElementById('limpiar');
	const errorName = document.getElementById('errorName');
	const errorPassword = document.getElementById('errorPassword');

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		if (validarFormulario()) {
			alert('Login exitoso');
			window.location.href = 'productos.html';
		}
	});

	function validarFormulario() {
		let esValido = true;


		// Para validar el nombre

		if (nombreInput.value.trim() === '') {
			mostrarError(errorName, 'Nombre obligatorio');
			esValido = false;
		} else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombreInput.value)) {
			mostrarError(errorName, 'Nombre inválido');
			esValido = false;
		} else if (nombreInput.value.length > 20) {
			mostrarError(errorName, 'El nombre no puede tener más de 20 caracteres');
			esValido = false;
		} else {
			errorName.textContent = '';
		}


		// Para validar la contraseña


		if (contrasenhaInput.value === '') {
			mostrarError(errorPassword, 'La contraseña es obligatoria');
			esValido = false;
		} else if (!/^[A-Za-z0-9.]{8,16}$/.test(contrasenhaInput.value)) {
			mostrarError(errorPassword, 'La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y el carácter "."');
			esValido = false;
		} else {
			errorPassword.textContent = '';
		}

		return esValido;
	}

	function mostrarError(elemento, mensaje) {
		elemento.textContent = mensaje;
	}

	function limpiarFormulario() {
		form.reset();
		errorName.textContent = '';
		errorPassword.textContent = '';
	}

	limpiarBtn.addEventListener('click', limpiarFormulario);
});
