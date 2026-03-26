(function () {
	// Redirigir si ya hay un usuario logueado
	if (localStorage.getItem('currentUser')) {
		if (window.history.length > 2) {
			window.history.back();
		} else {
			window.location.replace('index.html');
		}
		return;
	}

	const form = document.getElementById('loginForm');
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const emailError = document.getElementById('emailError');
	const passError = document.getElementById('passError');
	const remember = document.getElementById('remember');

	function validarEmail(e: string): boolean {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(e);
	}

	// Prefill if remembered
	try {
		const saved = JSON.parse(localStorage.getItem('rememberedCredentials') || 'null');
		if (saved && saved.email) {
			if (email instanceof HTMLInputElement) email.value = saved.email;
			if (password instanceof HTMLInputElement) password.value = saved.password || '';
			if (remember instanceof HTMLInputElement) remember.checked = true;
		} else {
			const legacy = localStorage.getItem('user') || sessionStorage.getItem('user');
			if (legacy && email instanceof HTMLInputElement) email.value = legacy;
		}
	} catch (e) { }

	function showError(el: HTMLElement | null, text: string): void {
		if (el) {
			el.textContent = text;
			el.style.display = 'block';
		}
	}

	function hideErrors(): void {
		if (emailError) emailError.style.display = 'none';
		if (passError) passError.style.display = 'none';
	}

	if (form) {
		form.addEventListener('submit', function (ev: Event) {
			ev.preventDefault();

			const mail = (email instanceof HTMLInputElement) ? email.value.trim() : '';
			const pass = (password instanceof HTMLInputElement) ? password.value.trim() : '';

			const usersMarketplaceRaw = localStorage.getItem('usersMarketplace');
			let users: any[] = usersMarketplaceRaw ? JSON.parse(usersMarketplaceRaw) : [];
			const user = users.find(u => u.email === mail && u.password === pass);

			if (!user) {
				showError(passError as HTMLElement, 'Correo o contraseña incorrectos.');
				return;
			}

			if (remember instanceof HTMLInputElement && remember.checked) {
				localStorage.setItem('rememberedCredentials', JSON.stringify({ email: mail, password: pass }));
			} else {
				localStorage.removeItem('rememberedCredentials');
			}
			
			// Fusionar carrito del guest al nuevo usuario
			const guestCart = JSON.parse(localStorage.getItem('shoppingCart_guest') || '[]');
			localStorage.setItem('currentUser', mail);
			localStorage.setItem('currentUserName', user.name || mail.split('@')[0]);
			
			if (guestCart.length > 0) {
				// El actual usuario logueado
				const userCartKey = 'shoppingCart_' + mail;
				let userCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
				
				// Unir carritos (se podria agrupar por cantidades pero un .concat es seguro para empezar)
				userCart = userCart.concat(guestCart);
				localStorage.setItem(userCartKey, JSON.stringify(userCart));
				localStorage.removeItem('shoppingCart_guest'); // Limpiar el guest cart
			}

			window.location.replace('index.html');
		});
	}

})();