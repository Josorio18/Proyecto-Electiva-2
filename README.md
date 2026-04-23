# UrbanStyle - E-commerce

Este proyecto es una plataforma de comercio electrónico moderna y funcional, migrada completamente a **TypeScript** para garantizar robustez, mantenibilidad y escalabilidad.

## 🚀 Características Principales

- **Flujo 100% TypeScript**: Todo el código lógico reside en la carpeta `TS/` y se compila automáticamente a JavaScript moderno (ESM).
- **Gestión de Carrito**: Sistema de carrito persistente mediante `localStorage`, con soporte para usuarios invitados y registrados.
- **Autenticación de Usuarios**: Funcionalidad completa de Registro y Login con validación de datos.
- **Diseño Responsivo**: Interfaz atractiva y adaptativa para diferentes dispositivos.
- **Simulación de Pago**: Proceso de Checkout completo con un modal de pago simulado.

## 📁 Estructura del Proyecto

- `TS/js/`: Archivos fuente de TypeScript.
  - `app.ts`: Lógica global, navegación y contador de carrito.
  - `Carrito.ts`: Gestión detallada de artículos, renderizado y checkout.
  - `Login.ts` & `Registro.ts`: Manejo de sesiones de usuario.
  - `hombres.ts` & `Mujer.ts`: Lógicas específicas de categorías de productos.
- `dist/`: Archivos listos para producción.
  - `html/`: Páginas del sitio (`index.html`, `Hombre.html`, etc.).
  - `js/`: Código TypeScript compilado.
  - `CSS/`: Estilos visuales.
- `package.json`: Configuración de scripts de construcción.

## 🛠️ Cómo Ejecutar el Proyecto

1. **Instalar Dependencias**:
   ```bash
   npm install
   ```

2. **Compilar el Código**:
   Para realizar una compilación única:
   ```bash
   npm run build
   ```
   Para mantener una compilación en tiempo real durante el desarrollo:
   ```bash
   npm run watch
   ```

3. **Previsualizar**:
   Abre cualquier archivo en `dist/html/` (preferiblemente `index.html`) usando un servidor local (como "Live Server" en VS Code).

---
© 2026 UrbanStyle - Proyecto Electiva II
