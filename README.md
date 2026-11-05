# Wrb

Proyecto React creado con Vite, TypeScript y Tailwind CSS.

## Comandos

- `npm.cmd run dev`: inicia el servidor de desarrollo.
- `npm.cmd run build`: genera la compilacion de produccion.
- `npm.cmd run preview:cloudflare`: sirve localmente el resultado preparado para Cloudflare Pages.
- `npm.cmd run deploy:cloudflare`: publica en Cloudflare Pages.
- `npm.cmd run lint`: ejecuta las reglas de Oxlint.
- `npm.cmd run preview`: sirve la compilacion de produccion localmente.

## Despliegue en Cloudflare Pages

1. Inicia sesion: `npx.cmd wrangler login`.
2. Crea el proyecto si aun no existe: `npx.cmd wrangler pages project create biblioteca`.
3. Publica manualmente: `npm.cmd run deploy:cloudflare`.
4. Para GitHub Actions, configura estos secretos del repositorio:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

Cada push a `master` o `main` ejecutara el workflow de despliegue automatico.
