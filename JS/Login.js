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
			// legacy key `user` (solo email)
			const legacy = localStorage.getItem('user') || sessionStorage.getItem('user');
			if(legacy) email.value = legacy;
		}
	} catch(e){/* ignore */}

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
		let ok = true;

		const mail = email.value.trim();
		const pass = password.value.trim();

		if(!validarEmail(mail)){
			showError(emailError, 'Introduce un correo válido.');
			ok = false;
		}

		if(pass.length === 0){
			showError(passError, 'Introduce la contraseña.');
			ok = false;
		}

		if(!ok) return;

		// If a registered user exists, require matching credentials
		const registered = JSON.parse(localStorage.getItem('registeredUser') || 'null');
		if(registered){
			if(registered.email !== mail || registered.password !== pass){
				showError(passError, 'Correo o contraseña incorrectos.');
				return;
			}
		}

		// store based on "remember"
		if(remember.checked){
			localStorage.setItem('rememberedCredentials', JSON.stringify({email: mail, password: pass}));
			// keep a simple `user` key for compatibility
			localStorage.setItem('user', mail);
		} else {
			sessionStorage.setItem('user', mail);
			localStorage.removeItem('rememberedCredentials');
		}

		const btn = form.querySelector('button[type="submit"]');
		btn.textContent = 'Entrando...';
		btn.disabled = true;

		setTimeout(()=> window.location.href = 'index.html', 700);
	});

	// Nota: la funcionalidad de registro se ha eliminado; solo queda iniciar sesión.

})();