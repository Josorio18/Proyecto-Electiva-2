/**
 * Service to manage localStorage operations as a simulated database.
 */

const STORAGE_KEYS = {
    USERS: 'urbanstyle_users',
    CURRENT_USER: 'urbanstyle_current_user',
    CART: 'urbanstyle_cart',
};

export const storageService = {
    // --- USER CRUD ---
    getUsers: () => {
        const users = localStorage.getItem(STORAGE_KEYS.USERS);
        return users ? JSON.parse(users) : [];
    },

    saveUser: (user) => {
        const users = storageService.getUsers();
        // Check if user already exists
        const index = users.findIndex(u => u.email === user.email);
        if (index !== -1) {
            users[index] = { ...users[index], ...user }; // Update
        } else {
            users.push(user); // Create
        }
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        return user;
    },

    deleteUser: (email) => {
        let users = storageService.getUsers();
        users = users.filter(u => u.email !== email);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        
        // If current user is deleted, logout
        const currentUser = storageService.getCurrentUser();
        if (currentUser && currentUser.email === email) {
            storageService.logout();
        }
    },

    login: (email, password) => {
        const users = storageService.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
            return user;
        }
        return null;
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    },

    getCurrentUser: () => {
        const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    },

    // --- CART MANAGEMENT ---
    getCart: () => {
        const cart = localStorage.getItem(STORAGE_KEYS.CART);
        return cart ? JSON.parse(cart) : [];
    },

    saveCart: (cart) => {
        localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    },

    clearCart: () => {
        localStorage.removeItem(STORAGE_KEYS.CART);
    }
};
