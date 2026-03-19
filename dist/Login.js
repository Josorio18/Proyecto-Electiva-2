(function () {
    // Redirigir si ya hay un usuario logueado
    if (localStorage.getItem('currentUser')) {
        if (window.history.length > 2) {
            window.history.back();
        }
        else {
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
    function validarEmail(e) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(e);
    }
    // Prefill if remembered
    try {
        const saved = JSON.parse(localStorage.getItem('rememberedCredentials') || 'null');
        if (saved && saved.email) {
            email.value = saved.email;
            password.value = saved.password || '';
            remember.checked = true;
        }
        else {
            const legacy = localStorage.getItem('user') || sessionStorage.getItem('user');
            if (legacy)
                email.value = legacy;
        }
    }
    catch (e) { }
    function showError(el, text) {
        el.textContent = text;
        el.style.display = 'block';
    }
    function hideErrors() {
        emailError.style.display = 'none';
        passError.style.display = 'none';
    }
    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        const mail = email.value.trim();
        const pass = password.value.trim();
        let users = JSON.parse(localStorage.getItem('usersMarketplace')) || [];
        const user = users.find(u => u.email === mail && u.password === pass);
        if (!user) {
            showError(passError, 'Correo o contraseña incorrectos.');
            return;
        }
        if (remember.checked) {
            localStorage.setItem('rememberedCredentials', JSON.stringify({ email: mail, password: pass }));
        }
        else {
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
})();
export {};
