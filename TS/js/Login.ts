import { 
    transferGuestCart,
    showToast
} from './Common.js';

/**
 * Login.ts
 * 
 * Maneja el inicio de sesión de usuarios, validación de credenciales
 * y persistencia de sesión. También integra la transferencia del carrito.
 */

interface User {
    email: string;
    password: string;
    name?: string;
}

document.addEventListener('DOMContentLoaded', () => {
    // Redirigir si ya hay un usuario logueado
    if (localStorage.getItem('currentUser')) {
        window.location.replace('index.html');
        return;
    }

    const form = document.getElementById('loginForm') as HTMLFormElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const passError = document.getElementById('passError') as HTMLElement;
    const rememberCheckbox = document.getElementById('remember') as HTMLInputElement;

    // Rellenar credenciales si fueron recordadas previamente
    try {
        const saved = JSON.parse(localStorage.getItem('rememberedCredentials') || 'null');
        if (saved && saved.email) {
            if (emailInput) emailInput.value = saved.email;
            if (passwordInput) passwordInput.value = saved.password || '';
            if (rememberCheckbox) rememberCheckbox.checked = true;
        }
    } catch (e) {
        console.error('Error al cargar credenciales recordadas:', e);
    }

    if (form) {
        form.addEventListener('submit', (ev: Event) => {
            ev.preventDefault();
            
            if (passError) passError.style.display = 'none';

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                showToast('Por favor, completa todos los campos.', 'error');
                return;
            }

            // Obtener base de datos de usuarios
            const users: User[] = JSON.parse(localStorage.getItem('usersMarketplace') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                if (passError) {
                    passError.textContent = 'Correo o contraseña incorrectos.';
                    passError.style.display = 'block';
                }
                return;
            }

            // Gestionar "Recordarme"
            if (rememberCheckbox && rememberCheckbox.checked) {
                localStorage.setItem('rememberedCredentials', JSON.stringify({ email, password }));
            } else {
                localStorage.removeItem('rememberedCredentials');
            }
            
            // Establecer sesión
            const userName = user.name ? user.name : (email.split('@')[0] || 'Usuario');
            localStorage.setItem('currentUser', email);
            localStorage.setItem('currentUserName', userName);
            
            // Fusionar carrito del invitado
            if (email && typeof email === 'string') {
                transferGuestCart(email);
            }

            showToast(`¡Bienvenido de nuevo, ${userName}!`);
            setTimeout(() => {
                window.location.replace('index.html');
            }, 1000);
        });
    }
});