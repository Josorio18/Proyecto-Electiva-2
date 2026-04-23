import { transferGuestCart, showToast } from './Common.js';
document.addEventListener('DOMContentLoaded', () => {
    // Redirigir si ya hay un usuario logueado
    if (localStorage.getItem('currentUser')) {
        window.location.replace('index.html');
        return;
    }
    const form = document.getElementById('registroForm') || document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    if (form) {
        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            if (emailError)
                emailError.style.display = 'none';
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            if (!name || !email || !password) {
                showToast('Por favor, completa todos los campos.', 'error');
                return;
            }
            // Obtener usuarios existentes
            const users = JSON.parse(localStorage.getItem('usersMarketplace') || '[]');
            // Verificar duplicados
            if (users.some(u => u.email === email)) {
                if (emailError) {
                    emailError.textContent = 'El correo ya está registrado.';
                    emailError.style.display = 'block';
                }
                return;
            }
            // Registrar nuevo usuario
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('usersMarketplace', JSON.stringify(users));
            // Iniciar sesión automáticamente
            localStorage.setItem('currentUser', email);
            localStorage.setItem('currentUserName', name);
            // Fusionar carrito del invitado (si existe)
            transferGuestCart(email);
            showToast('¡Registro exitoso! Bienvenido a UrbanStyle.');
            setTimeout(() => {
                window.location.replace('index.html');
            }, 1000);
        });
    }
});
