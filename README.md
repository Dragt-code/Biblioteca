# Mundo de Letras

Web infantil desarrollada con React, Vite y Tailwind CSS.

## Imágenes y animaciones

- `src/components/MediaImage.jsx` exporta `buscarImagenesSeguras(palabraClave)`, reutilizable desde cualquier componente. Consulta `/api/media` y conserva los resultados en memoria durante 24 horas.
- `functions/api/media.js` consulta Pixabay desde Cloudflare Pages. `safesearch=true`, `image_type=illustration`, una lista de términos bloqueados y un máximo de ocho resultados se aplican en el servidor.
- `functions/api/media/image.js` sirve las imágenes a través del sitio y usa Cloudflare Cache API durante 24 horas. Así el navegador no recibe la clave ni apunta directamente al CDN de Pixabay.
- `MediaImage` usa `IntersectionObserver` e `img loading="lazy"`. Mientras carga o si no hay clave, muestra una ilustración local de respaldo.
- Las tarjetas de cuentos y extras, la portada, el espacio de galería, los personajes del hero, el fondo decorativo y el pie de página están ilustrados. Solo se mueven los dos personajes del hero a la vez; el resto es estático. Se respeta `prefers-reduced-motion`.
- Las animaciones de personajes son locales y CSS, sin archivos de terceros ni licencia adicional. El fondo existente también es local. La búsqueda de Pixabay entrega ilustraciones estáticas.
- El logo existente está en `src/assets/Log.png` (no había un archivo `logo.png`).

Pixabay pide que se muestre el origen de las imágenes y no permite hotlinking permanente. La aplicación muestra el usuario y enlace de cada imagen; el proxy del servidor cachea sus bytes por 24 horas. Consulta [la documentación oficial](https://pixabay.com/api/docs/) para confirmar las condiciones actuales antes de desplegar cambios al flujo de medios.

El filtro de seguridad reduce el riesgo, pero ningún filtro automático garantiza por sí solo que cada imagen aportada por usuarios sea apropiada. Los términos que se envían están definidos por el sitio y los resultados con etiquetas sensibles se descartan. Para un lanzamiento infantil con tolerancia cero a contenido inapropiado, revisa y aprueba manualmente las imágenes de Pixabay antes de mostrarlas o usa únicamente recursos locales previamente aprobados.

## Configuración de Pixabay

1. Crea una cuenta gratuita en [Pixabay](https://pixabay.com/) e inicia sesión.
2. Entra a [Pixabay API](https://pixabay.com/api/docs/) y solicita tu API key gratuita.
3. Para desarrollo local, crea `.dev.vars` en la raíz del proyecto (está ignorado por Git) y agrega:

   ```dotenv
   PIXABAY_API_KEY=tu_clave
   ```

4. La clave de desarrollo ya está en `.dev.vars` (archivo ignorado por Git). Para que las funciones de Pixabay respondan en local, ejecuta `npm.cmd run preview:cloudflare`; `npm.cmd run dev` inicia solo Vite y no ejecuta las Pages Functions.
5. Para Cloudflare Pages, guarda la clave como secret:

   ```powershell
   npx.cmd wrangler pages secret put PIXABAY_API_KEY --project-name biblioteca
   ```

   Pega la clave cuando Wrangler la solicite. No la agregues a `VITE_*`, React ni archivos versionados.
6. Ejecuta `npm.cmd run dev` para cambios visuales sin API. Usa `npm.cmd run preview:cloudflare` para revisar el sitio con la API de imágenes activa.

El plan gratuito de Pixabay documenta hasta 100 solicitudes por minuto por clave y exige almacenar las respuestas de búsqueda en caché durante 24 horas. En caso de API ausente, límite excedido o error de red, se conservan las ilustraciones de respaldo.

## Comandos

- `npm.cmd run dev`: inicia Vite.
- `npm.cmd run build`: genera la compilación de producción.
- `npm.cmd run preview:cloudflare`: prepara y sirve la compilación con Pages.
- `npm.cmd run deploy:cloudflare`: publica en Cloudflare Pages.
- `npm.cmd run lint`: ejecuta Oxlint.

## Despliegue en Cloudflare Pages

1. Inicia sesión con `npx.cmd wrangler login`.
2. Crea el proyecto si aún no existe: `npx.cmd wrangler pages project create biblioteca`.
3. Configura `PIXABAY_API_KEY` siguiendo el paso anterior.
4. Publica con `npm.cmd run deploy:cloudflare`.

La API de Pixabay da hasta 100 solicitudes por minuto de forma predeterminada. Sus resultados deben cachearse por 24 horas; las imágenes no se deben insertar mediante hotlink permanente. No se integra GIPHY porque exige marca y atribución y su catálogo dinámico es menos adecuado para la curación infantil. Las animaciones locales no usan LottieFiles, por lo que no introducen cuotas ni licencias de assets externos.
