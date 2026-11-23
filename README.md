# Un jardín para nosotros — 10 meses

Versión revisada: **sin diez razones ni tarjetas repetidas**. La canción acompaña una experiencia interactiva en la que plantas flores y haces crecer un jardín. Cada una de las diez rosas representa un mes. Al completar las diez se revela la carta. Incluye espacio para su fotografía favorita y diseño adaptable a celular.

## Cómo abrir

1. Extrae el ZIP.
2. Abre la carpeta `10_meses_web` en VS Code.
3. Abre `index.html` en el navegador o usa Live Server.

## Cómo personalizar

- **Textos y carta**: modifica `index.html`.
- **Foto**: pon tu fotografía en `assets/nuestra-foto.jpg`; aparecerá automáticamente cuando abras la página.
- **Música**: coloca un archivo que tengas permiso de usar en `assets/cancion.mp3`. El navegador no puede obtener por sí solo la música de Spotify o YouTube ni sincronizarse libremente con ellos. Sin archivo, la experiencia funciona igualmente y permite plantar flores manualmente.
- **Frases cortas del jardín y colores**: `script.js`.

## Sincronización musical

Al reproducirse un archivo local autorizado, la barra indica el progreso de la canción y el jardín planta flores en determinados porcentajes de duración. El jardín crece con el avance del audio; la letra usa marcas de tiempo independientes. Puedes modificar los disparadores en `script.js`.

## Estructura

- `index.html`: contenido
- `styles.css`: estilos y versión móvil
- `script.js`: comportamiento del jardín y reproductor
- `assets/`: música e imagen opcionales

La carta final contiene el texto personal aprobado por el usuario.

## Sección de letra

La tarjeta usa tonos rosa y crema. Contiene las 57 líneas proporcionadas por el usuario en index.html, con data-start y data-end en segundos. script.js resalta la frase actual usando el tiempo del audio, permite saltar a una frase y desplaza solo la tarjeta. Desplazarse manualmente suspende el seguimiento; «Retomar seguimiento» lo activa de nuevo.

Marcas de referencia: https://lrclib.net/api/get/1177123 (Martín Elías y Juancho de la Espriella, duración declarada 316 s). El MP3 local mide aproximadamente 325,968 s contando sus tramas MPEG. No se ha verificado auditivamente la coincidencia ni se han escalado los tiempos para compensar esa diferencia. El ajuste inicial es 0 s; en «Ajustar sincronización» se puede adelantar o retrasar en pasos de 0,5 s hasta ±30 s. Se guarda en este navegador si permite almacenamiento local; no modifica el archivo ni se comparte con otros dispositivos.

Las pausas de la referencia no mantienen una frase resaltada. Al pausar, retroceder o reiniciar, el resaltado se calcula de nuevo. Los saltos desde la letra conservan el estado de reproducción.

## Jardín de diez meses

- Puedes plantar manualmente o dejar que el audio haga crecer una rosa por cada 10 % de progreso. Ambos controles comparten el avance, sin duplicar rosas.
- La carta se revela con diez rosas; el enlace «Leer tu carta» permite ir a ella sin desplazar la página automáticamente.
- «Volver a empezar» reinicia el jardín, pausa la canción y la devuelve al comienzo. Recargar también reinicia la experiencia.
- La cantidad y la lógica están en TOTAL_FLOWERS, plantFlower() y updateGarden() en script.js. Los pétalos se dibujan con CSS.
- Audio y fotografía incorporados en assets/cancion.mp3 y assets/nuestra-foto.jpg. Carta personal aprobada e incorporada en index.html.
