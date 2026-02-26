(function(){
	const form = document.getElementById('loginForm');
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const emailError = document.getElementById('emailError');
	const passError = document.getElementById('passError');

	function validarEmail(e){
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(e);
	}

	form.addEventListener('submit', function(ev){
		ev.preventDefault();
		let ok = true;

		emailError.style.display = 'none';
		passError.style.display = 'none';

		if(!validarEmail(email.value.trim())){
			emailError.style.display = 'block';
			ok = false;
		}

		if(password.value.trim().length === 0){
			passError.style.display = 'block';
			ok = false;
		}

		if(!ok) return;

		if(document.getElementById('remember').checked){
			localStorage.setItem('user', email.value.trim());
		} else {
			sessionStorage.setItem('user', email.value.trim());
		}

		const btn = form.querySelector('button[type="submit"]');
		btn.textContent = 'Entrando...';
		btn.disabled = true;

		setTimeout(()=> window.location.href = 'index.html', 700);
	});
})();