# WALLAPP API

REST API para autenticación de usuarios y publicación de comentarios.

## Tecnologías

- NestJS v10
- TypeORM
- SQLite (better-sqlite3)
- TypeScript

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3001`.

## Endpoints

- AUTH:
- POST (register): /auth/register
- POST (login): /auth/login

- COMMENTS:
- GET (all comments): /comments
- POST (create comment): /comments
- DELETE (delete comment): /comments/:id

## Deploy en Railway

1. Asegúrate de tener el `Procfile` en la raíz:
   ```
   web: npm run start:prod
   ```
2. Instalar CLI de railway e iniciar sesión

```
npm install -g @railway/cli
railway login
```

3. Crear Proyecto en Railway y deployearlo

```
railway init
railway up
```

4. En **Settings → Networking → Generate Domain** obtén tu URL pública
5. Actualiza el CORS en `main.ts` con el dominio de tu frontend (front en netlify):
   ```ts
   app.enableCors({
     origin: ['https://tu-frontend.netlify.app'],
     methods: ['GET', 'POST', 'DELETE'],
     allowedHeaders: ['Content-Type'],
   });
   ```
