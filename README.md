This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Nombre del proyecto
E-commerce de productos

### Descripción
Este proyecto es una aplicación web de e-commerce para la compra de productos. Se utilizó la metodología Atomic Design para estructurar los componentes y el framework de CSS MUI para acelerar el proceso de diseño y desarrollo. La aplicación se desarrolló utilizando React y Next.js.

### Diseño de layout
El diseño de la página frontend Mentor fue utilizado como referencia para la creación del proyecto. Puedes encontrar el diseño en este enlace. El diseño fue utilizado para el detalle del producto, pero los estilos se utilizaron como referencia para crear las demás vistas. Para mostrar la vista general de los productos, se utilizó una grilla para mostrar cada uno de los productos traídos por la API.

##Arquitectura de estilos
Se utilizó el framework de CSS MUI debido a que cuenta con una amplia variedad de componentes pre-diseñados y personalizables que se adaptan a las necesidades del proyecto. Además, es compatible con React, lo que facilitó la integración de componentes y el desarrollo en general.

La tipografía utilizada en el proyecto es Kumbh Sans, que puedes encontrar en este enlace.

La nomenclatura para los colores utilizados en el proyecto es la siguiente:

-[x] background-primary: #F2F2F2
-[x] background-secondary: #F6F8D
-[x] accent-primary: #FF7E1B
-[x] accent-secondary: #FFAB6A
-[x] text-color-bold: #1D2026
-[x] text-color-secondary: #68707D
-[x] La estructura de carpetas sigue la metodología Atomic Design y existen cuatro carpetas principales:

## Carpeta de átomos: Contiene los elementos más básicos y simples, como botones, inputs, iconos, etc.
## Carpeta de moléculas: Contiene componentes más complejos formados por una combinación de elementos atómicos, como un input con un botón de búsqueda.
## Carpeta de organismos: Contiene componentes aún más complejos formados por la combinación de moléculas y átomos, como una barra de navegación con menús desplegables.
## Carpeta de plantillas: Contiene diseños más completos y complejos, que se utilizan como base para las páginas finales de la aplicación.
## La carpeta de páginas utiliza el sistema de enrutamiento de Next.js. Cada página tiene su propia carpeta y archivo, y contiene los componentes necesarios para mostrar la información requerida. Además, se utiliza el estado global de la aplicación para gestionar la información del usuario y del carrito de compras en todas las páginas.

## Componentes
Lista de componentes necesarios
Navbar: Barra de navegación que contiene los links a diferentes secciones de la aplicación, como el catálogo de productos, el carrito de compras y el perfil del usuario.
ProductCard: Tarjeta que muestra la información básica de un producto, como su imagen, nombre y precio.
ProductList: Lista de productos que se muestra en la página principal de la aplicación.
ProductDetail: Página que muestra la información detallada de un producto, incluyendo su descripción, imágenes y opciones de compra.
