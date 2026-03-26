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
    const form = document.getElementById('registroForm') as HTMLFormElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const emailError = document.getElementById('emailError') as HTMLElement;

    if (form) form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        hideErrors();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Obtener usuarios existentes
        let users = JSON.parse(localStorage.getItem('usersMarketplace') || '[]');

        // Verificar si el correo ya existe
        const userExists = users.find((u: any) => u.email === email);
        if (userExists) {
            showError(emailError, 'El correo ya está registrado.');
            return;
        }

        // Crear nuevo usuario
        const newUser = {
            name: name,
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem('usersMarketplace', JSON.stringify(users));

        // Fusionar carrito del guest al nuevo usuario
        const guestCart = JSON.parse(localStorage.getItem('shoppingCart_guest') || '[]');
        localStorage.setItem('currentUser', email);
        localStorage.setItem('currentUserName', name);
        
        if (guestCart.length > 0) {
            const userCartKey = 'shoppingCart_' + email;
            // Para registro es usuario nuevo seguro el carrito nativo está vacío
            localStorage.setItem(userCartKey, JSON.stringify(guestCart));
            localStorage.removeItem('shoppingCart_guest'); // Limpiar
        }

        alert('Registro exitoso! Iniciando sesión...');
        window.location.replace('index.html');
    });

    function showError(el: HTMLElement, text: string) {
        el.textContent = text;
        el.style.display = 'block';
    }

    function hideErrors() {
        if (emailError) emailError.style.display = 'none';
    }
})();
