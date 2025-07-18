# La guarida del Lobo – Proyecto en React + TypeScript

Este proyecto es una tienda virtual de cómics, desarrollada con **React**, **TypeScript** y **Vite**, donde cada cómic muestra su imagen, título, precio, descripción y una sección de cómics relacionados.

---

## Requisitos

Antes de comenzar, asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (versión recomendada: LTS 18+)
- npm (se instala junto con Node)
- [GIT](https://git-scm.com/) (versión recomendada: 2.34+)
- Un entorno local como [XAMPP](https://www.apachefriends.org/es/index.html) o [MAMP](https://www.mamp.info/en/) para levantar la base de datos MySQL

Verifica las versiones con:

```bash
node -v
npm -v
git --version
```
Clonar proyecto
```
git clone https://github.com/BukiLopez/Guarida_Lobo.git
cd Guarida_Lobo
git checkout main
```
Inicio del servidor frontend
```
cd Guarida_Lobo
npm install
npm run dev
```
Inicio del servidor backend
```
cd backend
npm install
node index.cjs
```
📦 Guarida_Lobo/
 ┣ 📂 db/                   # Archivo .sql
 ┣ 📂 src/                  # Código fuente del frontend
 ┃ ┣ 📂 components/         # Componentes reutilizables (Header, ComicPanel, RelatedComics, etc.)
 ┃ ┣ 📂 types/              # Interfaces de datos (Comic, etc.)
 ┃ ┣ 📄 App.tsx             # Componente principal
 ┃ ┣ 📄 main.tsx            # Punto de entrada del proyecto
 ┃ ┗ 📄 index.css           # Estilos base
 ┣ 📂 backend/              # API REST con Express y MySQL
 ┃ ┗ 📄 index.cjs           # Archivo principal del servidor
 ┣ 📄 package.json          # Configuración de dependencias del frontend
 ┗ 📄 README.md             # Documentación del proyecto

En caso de necesitar modificar las credenciales de la base de datos, estas se encuentran en backend/.env
