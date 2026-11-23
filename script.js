// Puedes cambiar los textos de la carta en index.html.
// Las flores se pueden plantar manualmente, sin necesidad de tener la canción.
const startButton = document.querySelector('#startButton');
const experience = document.querySelector('#experiencia');
const song = document.querySelector('#song');
const musicButton = document.querySelector('#musicButton');
const musicStatus = document.querySelector('#musicStatus');
const vinyl = document.querySelector('#vinyl');
const songFill = document.querySelector('#songFill');
const songTime = document.querySelector('#songTime');
const songDuration = document.querySelector('#songDuration');
const flowers = document.querySelector('#gardenFlowers');
const plantButton = document.querySelector('#plantButton');
const resetButton = document.querySelector('#resetButton');
const flowerCounter = document.querySelector('#flowerCounter');
const gardenNote = document.querySelector('#gardenNote');
const letter = document.querySelector('#finalLetter');
const letterClosed = document.querySelector('#letterClosed');
const photo = document.querySelector('#memoryPhoto');
const garden = document.querySelector('#garden');
const gardenProgress = document.querySelector('#gardenProgress');
const monthMarkers = document.querySelector('#monthMarkers');
const letterLink = document.querySelector('#letterLink');
const TOTAL_FLOWERS = 10;

const phrases = [
  'Todo lo bonito empieza con algo pequeño.',
  'Hay días que se vuelven especiales sin avisar.',
  'Algunos recuerdos parecen florecer de nuevo.',
  'Lo más bonito no siempre se puede explicar.',
  'Y todavía nos quedan tantas cosas por vivir…',
  'Gracias por hacer que este jardín tenga sentido.'
];
const palette = ['#d88da0', '#f4bd87', '#f2d5d7', '#c88fa9', '#eddba1', '#e5a4ad'];
const positions = [10, 28, 46, 64, 82, 19, 37, 55, 73, 91];
let planted = 0;

for (let month = 0; month < TOTAL_FLOWERS; month++) {
  monthMarkers.appendChild(document.createElement('span'));
}

function updateGarden() {
  const complete = planted === TOTAL_FLOWERS;
  flowerCounter.textContent = `${planted} de ${TOTAL_FLOWERS} rosas · una por cada mes${complete ? '. Tu carta ya está lista.' : ''}`;
  gardenProgress.value = planted;
  [...monthMarkers.children].forEach((marker, index) => {
    marker.classList.toggle('is-grown', index < planted);
  });
  gardenNote.textContent = complete ? 'Diez meses. Y tanto por florecer.' : phrases[Math.floor(planted / 2)];
  garden.classList.toggle('is-complete', complete);
  letter.classList.toggle('is-hidden', !complete);
  letterClosed.classList.toggle('is-hidden', complete);
  letterLink.hidden = !complete;
  plantButton.disabled = complete;
  plantButton.textContent = complete ? 'Diez meses en flor ♡' : planted === 0 ? 'Plantar la primera rosa' : 'Plantar otra rosa';
}

startButton.addEventListener('click', () => {
  experience.classList.remove('is-hidden');
  experience.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'start'});
});

function plantFlower() {
  if (planted >= TOTAL_FLOWERS) return;
  const flower = document.createElement('div');
  flower.className = 'flower';
  flower.style.setProperty('--x', `${positions[planted]}%`);
  flower.style.setProperty('--h', `${planted < 5 ? 175 + (planted % 3) * 15 : 105 + (planted % 3) * 13}px`);
  flower.style.setProperty('--delay', `${planted * -.4}s`);
  flower.style.setProperty('--flower-color', palette[planted % palette.length]);
  flower.innerHTML = '<span class="rose-sway"><span class="stem"></span><span class="leaf"></span><span class="leaf right"></span><span class="bloom"><i></i><i></i><i></i><i></i><i></i><i></i><b></b></span></span>';
  flowers.appendChild(flower);
  planted++;
  updateGarden();
}
plantButton.addEventListener('click', plantFlower);
resetButton.addEventListener('click', () => {
  song.pause();
  if (song.readyState > 0) song.currentTime = 0;
  songFill.style.width = '0%';
  songTime.textContent = '0:00';
  musicStatus.textContent = song.error ? 'La música aún no está disponible. Puedes plantar las diez rosas a tu ritmo.' : 'Cuando quieras, vuelve a darle al play.';
  flowers.replaceChildren();
  planted = 0;
  updateGarden();
});
letterLink.addEventListener('click', () => { letter.focus({preventScroll:true}); });
updateGarden();

function timeLabel(seconds) {
  if (!Number.isFinite(seconds)) return '--:--';
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2,'0')}`;
}
musicButton.addEventListener('click', async () => {
  if (!song.paused) { song.pause(); return; }
  try { await song.play(); }
  catch { musicStatus.textContent = 'La música no está disponible ahora. Puedes seguir plantando rosas a tu ritmo.'; }
});
song.addEventListener('loadedmetadata', () => { songDuration.textContent = timeLabel(song.duration); });
song.addEventListener('play', () => {
  musicButton.textContent = 'Ⅱ'; musicButton.setAttribute('aria-label', 'Pausar la canción');
  vinyl.classList.add('playing'); musicStatus.textContent = 'La canción está sonando. Puedes seguir plantando flores ♡';
});
song.addEventListener('pause', () => {
  musicButton.textContent = '▶'; musicButton.setAttribute('aria-label', 'Reproducir la canción');
  vinyl.classList.remove('playing');
  if (!song.ended) musicStatus.textContent = 'Música en pausa. El jardín puede seguir creciendo contigo.';
});
song.addEventListener('timeupdate', () => {
  songTime.textContent = timeLabel(song.currentTime);
  if (!Number.isFinite(song.duration) || song.duration <= 0) return;
  const fraction = song.currentTime / song.duration;
  songFill.style.width = `${Math.min(100, fraction*100)}%`;
  // El jardín y la letra comparten el reloj del audio.
  // La música establece un mínimo de rosas; plantar a mano no suma duplicados.
  const stage = Math.min(TOTAL_FLOWERS, Math.floor(fraction * TOTAL_FLOWERS));
  while (planted < stage) plantFlower();
});
song.addEventListener('ended', () => {
  while (planted < TOTAL_FLOWERS) plantFlower();
  musicStatus.textContent = 'La canción termina, pero todavía tenemos mucho por florecer ♡';
});
song.addEventListener('error', () => { musicStatus.textContent = 'La música aún no está disponible. Puedes plantar las diez rosas a tu ritmo.'; });
photo.addEventListener('load', () => { photo.hidden = false; });
photo.addEventListener('error', () => { photo.hidden = true; });
if (photo.complete && photo.naturalWidth > 0) photo.hidden = false;

// Tiempos de referencia: LRCLIB 1177123. El texto es el aportado por el usuario.
// No estirar los tiempos según la duración: una edición puede añadir silencio al final.
const lyricLines = [...document.querySelectorAll('.lyric-line')];
const lyricCues = lyricLines.map(line => ({start:Number(line.dataset.start), end:Number(line.dataset.end)}));
const lyricsScroll = document.querySelector('#lyricsScroll');
const lyricsFollow = document.querySelector('#lyricsFollow');
const lyricsStatus = document.querySelector('#lyricsStatus');
const lyricsOffset = document.querySelector('#lyricsOffset');
let lyricOffset = 0;
let followingLyrics = true;
let activeLyric = -1;
try {
  const saved = Number(localStorage.getItem('garden-lyrics-offset-v1'));
  if (Number.isFinite(saved) && Math.abs(saved) <= 30) lyricOffset = saved;
} catch { /* El reproductor funciona también sin almacenamiento local. */ }

function lyricIndexAt(time) {
  return lyricCues.findIndex(cue => time >= cue.start && time < cue.end);
}

function centerLyric(index) {
  const line = lyricLines[index];
  if (!line) return;
  // Desplazar solo la tarjeta, sin arrastrar el resto de la página al reproductor.
  const top = line.getBoundingClientRect().top - lyricsScroll.getBoundingClientRect().top
    + lyricsScroll.scrollTop - lyricsScroll.clientHeight / 2 + line.offsetHeight / 2;
  lyricsScroll.scrollTo({top:Math.max(0,top), behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}

function updateLyrics(force = false) {
  const time = song.currentTime + lyricOffset;
  const index = song.ended ? -1 : lyricIndexAt(time);
  if (index !== activeLyric || force) {
    lyricLines.forEach((line, i) => {
      line.classList.toggle('is-current', i === index);
      line.classList.toggle('is-past', time >= lyricCues[i].end);
      if (i === index) line.setAttribute('aria-current','true');
      else line.removeAttribute('aria-current');
    });
    activeLyric = index;
    if (followingLyrics && index >= 0) centerLyric(index);
  }
  let status = 'Sigue la voz · toca una frase para ir a ella';
  if (song.error) status = 'Audio no disponible. Puedes leer la letra.';
  else if (song.ended) status = 'La canción ha terminado ♡';
  else if (song.paused) status = 'Pulsa play para seguir la canción.';
  else if (index < 0) status = time < lyricCues[0].start ? 'Introducción musical…' : 'La música continúa…';
  if (lyricsStatus.textContent !== status) lyricsStatus.textContent = status;
}

function setLyricOffset(value) {
  lyricOffset = Math.max(-30, Math.min(30, value));
  lyricsOffset.textContent = lyricOffset === 0 ? 'Sin ajuste' : `${Math.abs(lyricOffset).toFixed(1)} s ${lyricOffset > 0 ? 'adelantada' : 'retrasada'}`;
  try { localStorage.setItem('garden-lyrics-offset-v1',String(lyricOffset)); } catch { /* Opcional. */ }
  updateLyrics(true);
}

function setLyricsFollowing(enabled) {
  followingLyrics = enabled;
  lyricsFollow.setAttribute('aria-pressed',String(enabled));
  lyricsFollow.textContent = enabled ? 'Seguir la letra: sí' : 'Retomar seguimiento';
  if (enabled) centerLyric(activeLyric);
}

lyricsFollow.addEventListener('click', () => setLyricsFollowing(!followingLyrics));
lyricsScroll.addEventListener('wheel', () => setLyricsFollowing(false), {passive:true});
lyricsScroll.addEventListener('touchmove', () => setLyricsFollowing(false), {passive:true});
lyricsScroll.addEventListener('keydown', event => {
  if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(event.key)) setLyricsFollowing(false);
});
document.querySelector('#lyricsEarlier').addEventListener('click', () => setLyricOffset(lyricOffset + .5));
document.querySelector('#lyricsLater').addEventListener('click', () => setLyricOffset(lyricOffset - .5));
document.querySelector('#lyricsReset').addEventListener('click', () => setLyricOffset(0));
lyricLines.forEach((line,index) => {
  line.addEventListener('click', () => {
    if (!Number.isFinite(song.duration) || song.readyState === 0) return;
    song.currentTime = Math.max(0,Math.min(song.duration,lyricCues[index].start - lyricOffset));
    updateLyrics(true);
  });
});
function enableLyricSeeking() {
  lyricLines.forEach(line => { line.disabled = !Number.isFinite(song.duration) || song.readyState === 0 || Boolean(song.error); });
}
song.addEventListener('loadedmetadata', enableLyricSeeking);
song.addEventListener('error', enableLyricSeeking);
['timeupdate','seeked','play','pause','ended','error'].forEach(event => song.addEventListener(event, () => updateLyrics()));
resetButton.addEventListener('click', () => {
  updateLyrics(true);
  lyricsScroll.scrollTo({top:0,behavior:'instant'});
});
enableLyricSeeking();
setLyricOffset(lyricOffset);
setLyricsFollowing(true);
