(function(){

	const form = document.getElementById('loginForm');
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const emailError = document.getElementById('emailError');
	const passError = document.getElementById('passError');
	const remember = document.getElementById('remember');

	function validarEmail(e){
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(e);
	}

	// Prefill if remembered
	try{
		const saved = JSON.parse(localStorage.getItem('rememberedCredentials') || 'null');
		if(saved && saved.email){
			email.value = saved.email;
			password.value = saved.password || '';
			remember.checked = true;
		} else {
			const legacy = localStorage.getItem('user') || sessionStorage.getItem('user');
			if(legacy) email.value = legacy;
		}
	} catch(e){}

	function showError(el, text){
		el.textContent = text;
		el.style.display = 'block';
	}

	function hideErrors(){
		emailError.style.display = 'none';
		passError.style.display = 'none';
	}

	form.addEventListener('submit', function(ev){
		ev.preventDefault();
		hideErrors();

		const mail = email.value.trim();
		const pass = password.value.trim();

		// Validar email y contraseña
		if(!validarEmail(mail)){
			showError(emailError, 'Introduce un correo válido.');
			return;
		}

		if(pass.length === 0){
			showError(passError, 'Introduce la contraseña.');
			return;
		}

		// Guardar credenciales si se marca "Recuérdame"
		if(remember.checked){
			localStorage.setItem('rememberedCredentials', JSON.stringify({email: mail, password: pass}));
			localStorage.setItem('user', mail);
		} else {
			sessionStorage.setItem('user', mail);
		}

		// Cambiar estado del botón
		const btn = form.querySelector('button[type="submit"]');
		btn.textContent = 'Entrando...';
		btn.disabled = true;

		// Redirigir a la página principal
		window.location.href = 'index.html';
	});

})();