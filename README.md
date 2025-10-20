# 🏪 Sistema de Gestión de Inventario

<div align="center">

![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NgRx](https://img.shields.io/badge/NgRx-18-BA2BD2?style=for-the-badge&logo=ngrx&logoColor=white)
![PrimeNG](https://img.shields.io/badge/PrimeNG-17-007EC6?style=for-the-badge&logo=primeng&logoColor=white)

*Sistema moderno de gestión de productos e inventario con arquitectura escalable*

[Características](#-características) • [Instalación](#-instalación) • [Documentación](#-estructura-del-proyecto)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura](#-arquitectura)
- [API Backend](#-api-backend)
- [Buenas Prácticas Implementadas](#-buenas-prácticas-implementadas)
- [Scripts Disponibles](#-scripts-disponibles)
- [Solución de Problemas](#-solución-de-problemas)
- [Deployment](#-deployment)
- [Autor](#-autor)

---

## ✨ Características

### 📦 Gestión de Productos
- ✅ CRUD completo de productos
- ✅ Búsqueda y filtrado en tiempo real
- ✅ Categorización de productos
- ✅ Validación de formularios reactivos
- ✅ Gestión de stock e inventario
- ✅ Estados activo/inactivo
- ✅ Dashboard con KPIs (Total productos, valor inventario, stock)
- ✅ Vista previa de productos en formulario

### 📊 Gestión de Movimientos
- ✅ Registro de entradas y salidas de stock
- ✅ Historial completo de movimientos
- ✅ Tipos: Entrada, Salida, Ajuste, Devolución
- ✅ Actualización automática de stock
- ✅ Búsqueda de productos con autocomplete
- ✅ Validaciones de negocio
- ✅ Cálculo automático de nuevo stock

### 🎨 Interfaz de Usuario
- ✅ Diseño moderno y responsivo
- ✅ Componentes reutilizables (tabla genérica)
- ✅ Notificaciones toast profesionales
- ✅ Diálogos de confirmación con animaciones
- ✅ Loading states con spinners
- ✅ Animaciones suaves
- ✅ Tema profesional con PrimeNG

### 🏗️ Arquitectura
- ✅ Arquitectura modular por features
- ✅ State Management con NgRx (Redux pattern)
- ✅ Lazy Loading de módulos
- ✅ Manejo centralizado de errores
- ✅ Effects para operaciones asíncronas
- ✅ Selectors memoizados optimizados
- ✅ Limpieza de suscripciones (memory leaks prevention)
- ✅ Separación de componentes Smart/Dumb

---

## 🛠 Tecnologías

### Frontend
- **Framework**: Angular 19.0.5
- **Lenguaje**: TypeScript 5.7.2
- **State Management**: NgRx 18.1.1
- **UI Components**: PrimeNG 17.18.11
- **Iconos**: PrimeIcons 7.0.0
- **Estilos**: SCSS
- **Animaciones**: Angular Animations
- **Formularios**: Reactive Forms

### Backend API
- **Framework**: ASP.NET Core
- **URL Base**: https://localhost:7131/api
- **Protocolo**: HTTPS

### Herramientas de Desarrollo
- **Build**: Angular CLI 19.0.6
- **Linter**: ESLint
- **Package Manager**: npm
- **Control de Versiones**: Git

---

## 📋 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js**: v18.x o superior
- **npm**: v9.x o superior
- **Angular CLI**: v19.x
- **Backend API**: ASP.NET Core ejecutándose en https://localhost:7131
```bash
# Verificar versiones
node --version
npm --version
ng version
```

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/obringas/sistema-inventario.git
cd sistema-inventario
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar el Backend

Asegúrate de tener el backend ASP.NET Core ejecutándose en:
```
https://localhost:7131/api
```

La configuración se encuentra en:
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7131/api'
};
```

---

## ▶️ Ejecución

### Desarrollo
```bash
ng serve
```

La aplicación estará disponible en:
- 🌐 **Frontend**: http://localhost:4200

**Nota:** Asegúrate de que el backend esté ejecutándose en `https://localhost:7131`

### Desarrollo con puerto personalizado
```bash
ng serve --port 4300
```

### Abrir navegador automáticamente
```bash
ng serve --open
```

### Build de Producción
```bash
ng build --configuration production
```

Los archivos de producción se generarán en `dist/`

---

## 📁 Estructura del Proyecto
```
technical-tests-frontend-ssr/
│
├── src/
│   ├── app/
│   │   ├── core/                      # Servicios y guards core
│   │   │   └── services/
│   │   │
│   │   ├── features/                  # Módulos por feature
│   │   │   ├── productos/
│   │   │   │   ├── components/        # Componentes de productos
│   │   │   │   │   ├── producto-form/
│   │   │   │   │   └── producto-list/
│   │   │   │   ├── models/            # Interfaces y tipos
│   │   │   │   │   └── producto.model.ts
│   │   │   │   ├── pages/             # Páginas principales
│   │   │   │   │   └── productos-page/
│   │   │   │   ├── services/          # Servicios de productos
│   │   │   │   │   └── producto-api.service.ts
│   │   │   │   └── store/             # NgRx Store
│   │   │   │       ├── productos.actions.ts
│   │   │   │       ├── productos.effects.ts
│   │   │   │       ├── productos.reducer.ts
│   │   │   │       └── productos.selectors.ts
│   │   │   │
│   │   │   └── movimientos/
│   │   │       ├── components/
│   │   │       │   ├── movimiento-form/
│   │   │       │   └── movimiento-list/
│   │   │       ├── models/
│   │   │       ├── pages/
│   │   │       ├── services/
│   │   │       └── store/
│   │   │
│   │   ├── shared/                    # Componentes compartidos
│   │   │   ├── components/
│   │   │   │   ├── generic-table/    # Tabla reutilizable
│   │   │   │   ├── header/
│   │   │   │   └── footer/
│   │   │   └── models/               # Interfaces compartidas
│   │   │       └── table.model.ts
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── assets/                        # Recursos estáticos
│   ├── environments/                  # Configuración de entornos
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── styles.scss                    # Estilos globales
│
├── .gitignore
├── angular.json                       # Configuración Angular
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🏛️ Arquitectura

### Patrón de Diseño

El proyecto sigue una arquitectura **modular** basada en:

- **Feature Modules**: Módulos independientes por funcionalidad (Productos, Movimientos)
- **Lazy Loading**: Carga diferida de módulos para optimizar rendimiento
- **State Management**: NgRx con patrón Redux para estado predecible
- **Smart/Dumb Components**: Separación clara entre lógica y presentación
- **Reactive Programming**: RxJS para programación reactiva

### NgRx Flow
```
Component → Action → Effect → API → Success/Failure Action → Reducer → Selector → Component
```

### Ejemplo: Crear Producto
```typescript
1. Usuario completa formulario → ProductoFormComponent.onSubmit()
2. Dispatch action → createProducto({ producto })
3. Effect intercepta → ProductosEffects.createProducto$
4. Llamada HTTP → productoApiService.create()
5. API Response → createProductoSuccess({ producto })
6. Reducer actualiza → State inmutable
7. Selector emite → selectAllProductos
8. Component recibe → Lista actualizada
9. Toast muestra → Notificación de éxito
10. Dialog cierra → Automáticamente
```

### Componente Genérico: Tabla Reutilizable
```typescript
<app-generic-table
  [config]="tableConfig"
  [loading]="loading$ | async"
  (rowSelect)="onRowSelect($event)">
</app-generic-table>
```

---

## 🔌 API Backend

### Base URL
```
https://localhost:7131/api
```

### Endpoints Disponibles

#### Productos
```http
GET    /api/productos           # Listar todos los productos
GET    /api/productos/{id}      # Obtener producto por ID
POST   /api/productos           # Crear nuevo producto
PUT    /api/productos/{id}      # Actualizar producto
DELETE /api/productos/{id}      # Eliminar producto
```

#### Movimientos
```http
GET    /api/movimientos         # Listar todos los movimientos
GET    /api/movimientos/{id}    # Obtener movimiento por ID
POST   /api/movimientos         # Crear nuevo movimiento
PUT    /api/movimientos/{id}    # Actualizar movimiento
DELETE /api/movimientos/{id}    # Eliminar movimiento
```

### Ejemplo de Request/Response

#### Crear Producto

**Request:**
```http
POST /api/productos
Content-Type: application/json

{
  "nombre": "Laptop Dell XPS 15",
  "descripcion": "Laptop de alto rendimiento con procesador Intel i7",
  "precio": 1299.99,
  "stock": 10,
  "categoria": "Electrónica",
  "activo": true
}
```

**Response:**
```json
{
  "id": 1,
  "nombre": "Laptop Dell XPS 15",
  "descripcion": "Laptop de alto rendimiento con procesador Intel i7",
  "precio": 1299.99,
  "stock": 10,
  "categoria": "Electrónica",
  "activo": true,
  "fechaCreacion": "2025-01-20T10:30:00Z"
}
```

#### Crear Movimiento

**Request:**
```http
POST /api/movimientos
Content-Type: application/json

{
  "productoId": 1,
  "tipo": "ENTRADA",
  "cantidad": 5,
  "motivo": "Compra a proveedor",
  "fecha": "2025-01-20T10:30:00Z",
  "stockAnterior": 10,
  "stockNuevo": 15
}
```

---

## ✅ Buenas Prácticas Implementadas

### 🧹 Limpieza de Código
- ✅ `OnDestroy` implementado en todos los componentes
- ✅ `takeUntil()` con Subject para evitar memory leaks
- ✅ Unsubscribe automático de observables
- ✅ Código limpio y bien documentado
- ✅ Naming conventions consistentes

### 🎯 TypeScript
- ✅ Tipado estricto habilitado
- ✅ Interfaces para todos los modelos
- ✅ DTOs separados (Create, Update)
- ✅ Enums para constantes
- ✅ Type safety en NgRx

### 🏗️ Arquitectura
- ✅ Separación de responsabilidades (SRP)
- ✅ Single Responsibility Principle
- ✅ Dependency Injection
- ✅ Inmutabilidad en NgRx (no mutations)
- ✅ Entity Adapter para normalización

### 🎨 UI/UX
- ✅ Feedback visual constante (loading, toasts)
- ✅ Validaciones en tiempo real
- ✅ Mensajes de error descriptivos
- ✅ Confirmaciones antes de acciones destructivas
- ✅ Animaciones suaves
- ✅ Diseño responsivo

### 🔒 Seguridad
- ✅ Sanitización de inputs
- ✅ Validaciones client-side
- ✅ Manejo robusto de errores HTTP
- ✅ Mensajes de error sin exponer detalles técnicos

### 📊 Rendimiento
- ✅ Lazy Loading de módulos
- ✅ OnPush Change Detection (cuando es posible)
- ✅ Selectors memoizados
- ✅ TrackBy en ngFor
- ✅ Debounce en búsquedas

---

## 📜 Scripts Disponibles
```bash
# Desarrollo
ng serve                    # Inicia servidor de desarrollo
ng serve --open            # Abre navegador automáticamente
ng serve --port 4300       # Puerto personalizado

# Build
ng build                                    # Build de desarrollo
ng build --configuration production         # Build de producción

# Calidad de Código
ng lint                   # Linter
ng lint --fix            # Fix automático

# Generadores
ng generate component nombre  # Generar componente
ng generate service nombre    # Generar servicio
ng generate module nombre     # Generar módulo
```

---

## 🐛 Solución de Problemas

### Error de CORS

Si encuentras errores de CORS al conectar con el backend:
```csharp
// Backend debe permitir origen: http://localhost:4200
// Configurar CORS en ASP.NET Core Startup.cs o Program.cs
```

### Puerto ocupado

Si el puerto 4200 está ocupado:
```bash
ng serve --port 4300
```

### Certificado SSL no confiable

Para desarrollo local con HTTPS del backend:
```bash
# Acepta el certificado SSL en el navegador
# O configura el backend para usar HTTP en desarrollo
```

### Problemas con node_modules

Si hay errores después de clonar:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🚀 Deployment

### Compilar para producción
```bash
ng build --configuration production
```

### Desplegar en servidor

Los archivos compilados estarán en `dist/`. Copia estos archivos a tu servidor web (Apache, Nginx, IIS, etc.).

### Variables de entorno

Configura la URL del backend en producción:
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://tu-api-produccion.com/api'
};
```

### Configuración de servidor web

#### Nginx
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

---

## 👤 Autor

**Oscar Bringas**

- 🌐 GitHub: [@obringas](https://github.com/obringas)
- 💼 LinkedIn: [Oscar Bringas](https://www.linkedin.com/in/oscarbringas/)
- 📧 Email: oscarbringas@gmail.com

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🙏 Agradecimientos

- [Angular Team](https://angular.io/) - Por el increíble framework
- [NgRx Team](https://ngrx.io/) - Por el poderoso state management
- [PrimeNG Team](https://primeng.org/) - Por los componentes UI profesionales
- [TypeScript](https://www.typescriptlang.org/) - Por el tipado estático

---

## 📝 Funcionalidades Destacadas

### 🎯 Tabla Genérica Reutilizable
Componente altamente configurable para mostrar cualquier tipo de datos con:
- Ordenamiento por columnas
- Paginación
- Acciones personalizables
- Diferentes tipos de columna (texto, número, moneda, fecha, badge, botones)
- Loading states
- Mensajes personalizables

### 🔄 Estado Sincronizado
NgRx mantiene el estado consistente en toda la aplicación:
- Store centralizado
- Actions tipadas
- Effects para side effects
- Selectors memoizados
- DevTools integrado

### 🎨 Diseño Profesional
Interfaz moderna usando PrimeNG y SCSS personalizado:
- Tema consistente
- Componentes responsivos
- Animaciones fluidas
- Feedback visual claro

### ⚡ Performance Optimizada
- Lazy loading de módulos
- Change detection optimizada
- Selectors memoizados
- TrackBy en listas
- Debounce en búsquedas

---

## 🔜 Próximas Mejoras

- [ ] Autenticación y autorización JWT
- [ ] Paginación server-side
- [ ] Exportación a Excel/PDF
- [ ] Dashboard con gráficos (Chart.js)
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)
- [ ] Filtros avanzados
- [ ] Reportes personalizados

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella en GitHub ⭐**

Desarrollado con ❤️ y ☕ por Oscar Bringas

</div>