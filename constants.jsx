// Constants for UrbanStyle Application

export const APP_NAME = 'UrbanStyle';
export const APP_VERSION = '1.0.0';
export const COMPANY_EMAIL = 'info@urbanstyle.com';
export const COMPANY_PHONE = '+57 (1) 234-5678';
export const COMPANY_ADDRESS = 'Bogotá, Colombia';

// Storage Keys
export const STORAGE_KEYS = {
    CURRENT_USER: 'currentUser',
    CURRENT_USER_NAME: 'currentUserName',
    CART: 'cart',
    FAVORITES: 'favorites',
    THEME: 'theme'
};

// Product Categories
export const CATEGORIES = {
    HOMBRES: 'hombres',
    MUJERES: 'mujeres',
    ACCESORIOS: 'accesorios'
};

// Routes
export const ROUTES = {
    HOME: '/',
    HOMBRES: '/hombres',
    MUJERES: '/mujeres',
    ACCESORIOS: '/accesorios',
    CARRITO: '/carrito',
    LOGIN: '/login',
    REGISTRO: '/registro'
};

// Colors (matching the CSS gradient)
export const COLORS = {
    PRIMARY_START: '#667eea',
    PRIMARY_END: '#764ba2',
    DARK_BG: '#2c3e50',
    LIGHT_BG: '#f4f4f4',
    WHITE: '#ffffff',
    TEXT_DARK: '#333333',
    TEXT_LIGHT: '#ecf0f1'
};

// Messages
export const MESSAGES = {
    WELCOME: 'Bienvenido a UrbanStyle',
    PRODUCT_ADDED: 'Producto agregado al carrito',
    PRODUCT_REMOVED: 'Producto eliminado del carrito',
    LOGIN_SUCCESS: 'Has iniciado sesión exitosamente',
    LOGOUT_SUCCESS: 'Has cerrado sesión',
    REGISTER_SUCCESS: 'Tu cuenta ha sido creada',
    ERROR: 'Algo salió mal. Por favor intenta de nuevo'
};

export default {
    APP_NAME,
    APP_VERSION,
    COMPANY_EMAIL,
    COMPANY_PHONE,
    COMPANY_ADDRESS,
    STORAGE_KEYS,
    CATEGORIES,
    ROUTES,
    COLORS,
    MESSAGES
};
