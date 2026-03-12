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
    const form = document.getElementById('registroForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');

    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        hideErrors();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Obtener usuarios existentes
        let users = JSON.parse(localStorage.getItem('usersMarketplace')) || [];

        // Verificar si el correo ya existe
        const userExists = users.find(u => u.email === email);
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

        // Iniciar sesión automáticamente
        localStorage.setItem('currentUser', email);
        localStorage.setItem('currentUserName', name);

        alert('Registro exitoso! Iniciando sesión...');
        window.location.replace('index.html');
    });

    function showError(el, text) {
        el.textContent = text;
        el.style.display = 'block';
    }

    function hideErrors() {
        emailError.style.display = 'none';
    }
})();
