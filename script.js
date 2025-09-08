const flyout = document.getElementById('flyout');
const toggleBtn = document.getElementById('flyoutToggle');
const closeBtn = document.getElementById('flyoutClose');

const STORAGE_KEY = 'flyout:isCollapsed_v3_fix';

function setCollapsed(collapsed) {
  if (collapsed) {
    flyout.classList.add('is-hidden');
    toggleBtn.classList.remove('is-hidden');
    toggleBtn.setAttribute('aria-expanded', 'false');
  } else {
    flyout.classList.remove('is-hidden');
    toggleBtn.classList.add('is-hidden');
    toggleBtn.setAttribute('aria-expanded', 'true');
  }
  try { localStorage.setItem(STORAGE_KEY, String(collapsed)); } catch(e){}
}

// Safety: falls Button aus irgendeinem Grund verdeckt, auch Header-Klick zulassen (optional)
closeBtn.addEventListener('click', (e) => { e.stopPropagation(); setCollapsed(true); });
toggleBtn.addEventListener('click', (e) => { e.stopPropagation(); setCollapsed(false); });

// Fallback: Escape-Taste klappt zu
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setCollapsed(true);
});

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  setCollapsed(saved === 'true');
} catch(e) {
  setCollapsed(false);
}

/* Inhalte dynamisch setzen */
function setFlyoutContent({ title, text }){
  if (title) document.getElementById('flyoutTitle').textContent = title;
  if (text)  document.getElementById('flyoutText').innerHTML = text.replace(/\n/g, '<br>');
}
setFlyoutContent({
  title: 'Videotipp!',
  text: 'So finden Sie immer die\nrichtigen Webinar-Termine'
});