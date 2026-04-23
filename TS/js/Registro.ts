import { 
    transferGuestCart,
    showToast
} from './Common.js';

/**
 * Registro.ts
 * 
 * Maneja el registro de nuevos usuarios, asegurando que no existan correos duplicados
 * y estableciendo automáticamente la sesión tras un registro exitoso.
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

    const form = document.getElementById('registroForm') || document.getElementById('registrationForm');
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const emailError = document.getElementById('emailError') as HTMLElement;

    if (form) {
        (form as HTMLFormElement).addEventListener('submit', (ev: Event) => {
            ev.preventDefault();
            
            if (emailError) emailError.style.display = 'none';

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!name || !email || !password) {
                showToast('Por favor, completa todos los campos.', 'error');
                return;
            }

            // Obtener usuarios existentes
            const users: User[] = JSON.parse(localStorage.getItem('usersMarketplace') || '[]');

            // Verificar duplicados
            if (users.some(u => u.email === email)) {
                if (emailError) {
                    emailError.textContent = 'El correo ya está registrado.';
                    emailError.style.display = 'block';
                }
                return;
            }

            // Registrar nuevo usuario
            const newUser: User = { name, email, password };
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
