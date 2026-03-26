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

	interface User {
		email: string;
		password: string;
		name?: string;
	}

<<<<<<< HEAD
	function validarEmail(e: string): boolean {
=======
	const form = document.getElementById('loginForm') as HTMLFormElement;
	const email = document.getElementById('email') as HTMLInputElement;
	const password = document.getElementById('password') as HTMLInputElement;
	const emailError = document.getElementById('emailError') as HTMLElement;
	const passError = document.getElementById('passError') as HTMLElement;
	const remember = document.getElementById('remember') as HTMLInputElement;

	function validarEmail(e: string) {
>>>>>>> 40ec483b8f0444b7dc966516ce7d0863691327d1
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

<<<<<<< HEAD
	function showError(el: HTMLElement | null, text: string): void {
		if (el) {
			el.textContent = text;
			el.style.display = 'block';
		}
=======
	function showError(el: HTMLElement, text: string) {
		el.textContent = text;
		el.style.display = 'block';
>>>>>>> 40ec483b8f0444b7dc966516ce7d0863691327d1
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

<<<<<<< HEAD
			const usersMarketplaceRaw = localStorage.getItem('usersMarketplace');
			let users: any[] = usersMarketplaceRaw ? JSON.parse(usersMarketplaceRaw) : [];
			const user = users.find(u => u.email === mail && u.password === pass);
=======
		let users: User[] = JSON.parse(localStorage.getItem('usersMarketplace') || '[]');
		const user = users.find((u: User) => u.email === mail && u.password === pass);
>>>>>>> 40ec483b8f0444b7dc966516ce7d0863691327d1

			if (!user) {
				showError(passError as HTMLElement, 'Correo o contraseña incorrectos.');
				return;
			}

<<<<<<< HEAD
			if (remember instanceof HTMLInputElement && remember.checked) {
				localStorage.setItem('rememberedCredentials', JSON.stringify({ email: mail, password: pass }));
			} else {
				localStorage.removeItem('rememberedCredentials');
			}
=======
		if (remember.checked) {
			localStorage.setItem('rememberedCredentials', JSON.stringify({ email: mail, password: pass }));
		} else {
			localStorage.removeItem('rememberedCredentials');
		}
		
		// Fusionar carrito del guest al nuevo usuario
		const guestCart = JSON.parse(localStorage.getItem('shoppingCart_guest') || '[]');
		localStorage.setItem('currentUser', mail);
		localStorage.setItem('currentUserName', (user.name || mail.split('@')[0]) as string);
		
		if (guestCart.length > 0) {
			// El actual usuario logueado
			const userCartKey = 'shoppingCart_' + mail;
			let userCart = JSON.parse(localStorage.getItem(userCartKey) || '[]');
>>>>>>> 40ec483b8f0444b7dc966516ce7d0863691327d1
			
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