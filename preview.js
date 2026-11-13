const navigation = document.querySelector('#navigation');
const menu = document.querySelector('.nav-toggle');

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
}

menu.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') === 'false'));
});
for (const link of navigation.querySelectorAll('a')) {
  link.addEventListener('click', closeMenu);
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

for (const controls of document.querySelectorAll('[data-controls]')) {
  const rail = document.getElementById(controls.dataset.controls);
  const [previous, next] = controls.querySelectorAll('button');
  const updateControls = () => {
    const remaining = rail.scrollWidth - rail.clientWidth;
    controls.hidden = rail.classList.contains('rail--grid') || remaining <= 2;
    previous.disabled = rail.scrollLeft <= 2;
    next.disabled = remaining - rail.scrollLeft <= 2;
  };
  for (const button of [previous, next]) {
    button.addEventListener('click', () => {
      const card = rail.querySelector('.card:not([hidden])');
      if (!card) return;
      const gap = parseFloat(getComputedStyle(rail).columnGap);
      rail.scrollBy({
        left: Number(button.dataset.step) * (card.offsetWidth + gap),
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    });
  }
  rail.addEventListener('scroll', updateControls, { passive: true });
  new ResizeObserver(updateControls).observe(rail);
  new MutationObserver(updateControls).observe(rail, {
    childList: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'class'],
  });
}

const articleRail = document.querySelector('#article-rail');
const articleCards = [...articleRail.querySelectorAll('.article')];
const articleViewToggle = document.querySelector('#toggle-article-view');
const railLimit = 10;
const olderArticles = articleCards.slice(railLimit);
let savedArticleScroll = 0;

for (const card of olderArticles) card.hidden = true;
articleViewToggle.hidden = articleCards.length === 0;
articleViewToggle.addEventListener('click', () => {
  const showAll = !articleRail.classList.contains('rail--grid');
  if (showAll) savedArticleScroll = articleRail.scrollLeft;
  articleRail.classList.toggle('rail--grid', showAll);
  for (const card of olderArticles) card.hidden = !showAll;
  articleViewToggle.textContent = showAll ? 'Свернуть' : 'Показать все';
  articleViewToggle.setAttribute('aria-expanded', String(showAll));
  if (!showAll) {
    articleRail.scrollLeft = savedArticleScroll;
    articleViewToggle.scrollIntoView({ block: 'nearest' });
  }
});

const talksSection = document.querySelector('#talks');
const typeButtons = talksSection.querySelectorAll('button[data-type]');
const yearFilters = talksSection.querySelector('.year-types');
const talkRail = talksSection.querySelector('#talk-rail');
const talkTemplate = talksSection.querySelector('#talk-card');
const talkViewToggle = talksSection.querySelector('#toggle-talk-view');
const empty = talksSection.querySelector('.empty');
const talks = [...talkEntries].sort((first, second) => second.year - first.year);
let selectedYear = '';
let selectedType = 'conference';
let matchingTalks = [];
let showAllTalks = false;
let savedTalkScroll = 0;

for (const year of new Set(talks.map(talk => talk.year))) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.filterYear = year;
  button.textContent = year;
  button.setAttribute('aria-pressed', 'false');
  yearFilters.append(button);
}

function createTalkCard(talk) {
  const card = talkTemplate.content.firstElementChild.cloneNode(true);
  card.querySelector('.event').textContent = talk.event;
  card.querySelector('h3').textContent = talk.title;
  card.querySelector('.event-meta').textContent = `${talk.place} · ${talk.year}`;

  const actions = card.querySelector('.talk-actions');
  for (const link of actions.querySelectorAll('a')) {
    const url = talk[link.dataset.link];
    if (url) {
      link.href = url;
    } else {
      link.remove();
    }
  }
  if (!actions.childElementCount) actions.remove();
  return card;
}

function renderTalks() {
  const visibleTalks = showAllTalks ? matchingTalks : matchingTalks.slice(0, railLimit);
  talkRail.classList.toggle('rail--grid', showAllTalks);
  talkRail.replaceChildren(...visibleTalks.map(createTalkCard));
  talkRail.hidden = visibleTalks.length === 0;
  empty.hidden = visibleTalks.length > 0;
  talkViewToggle.hidden = visibleTalks.length === 0;
  talkViewToggle.textContent = showAllTalks ? 'Свернуть' : 'Показать все';
  talkViewToggle.setAttribute('aria-expanded', String(showAllTalks));
}

function filterTalks() {
  matchingTalks = talks.filter(talk =>
    talk.type === selectedType && (selectedYear === '' || talk.year === Number(selectedYear)),
  );
  savedTalkScroll = 0;
  renderTalks();
  talkRail.scrollLeft = 0;
}

talkViewToggle.addEventListener('click', () => {
  if (!showAllTalks) savedTalkScroll = talkRail.scrollLeft;
  showAllTalks = !showAllTalks;
  renderTalks();
  if (!showAllTalks) {
    talkRail.scrollLeft = savedTalkScroll;
    talkViewToggle.scrollIntoView({ block: 'nearest' });
  }
});

for (const button of typeButtons) {
  button.addEventListener('click', () => {
    if (selectedType === button.dataset.type) return;
    selectedType = button.dataset.type;
    for (const option of typeButtons) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    filterTalks();
  });
}
const yearButtons = yearFilters.querySelectorAll('[data-filter-year]');
for (const button of yearButtons) {
  button.addEventListener('click', () => {
    if (selectedYear === button.dataset.filterYear) return;
    selectedYear = button.dataset.filterYear;
    for (const option of yearButtons) {
      option.setAttribute('aria-pressed', String(option === button));
    }
    filterTalks();
  });
}
filterTalks();

const gallery = document.querySelector('#event-gallery');
const morePhotos = document.querySelector('#more-photos');
const lightbox = document.querySelector('.lightbox');
const lightboxPhoto = lightbox.querySelector('img');
const galleryPageSize = 12;

function createGalleryPhoto([name, width, height, previewWidth, description, format = 'webp']) {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', 'Увеличить фото. ' + description);
  const photo = document.createElement('img');
  const path = 'assets/' + name;
  photo.src = path + '-preview.webp';
  photo.srcset = path + '-small.webp 360w, ' + path + '-preview.webp ' + previewWidth + 'w';
  photo.sizes = '(max-width: 760px) 45vw, 22vw';
  photo.width = width;
  photo.height = height;
  photo.alt = '';
  photo.loading = 'lazy';
  button.append(photo);
  button.addEventListener('click', () => {
    lightboxPhoto.src = path + '.' + format;
    lightboxPhoto.alt = description;
    lightbox.showModal();
  });
  return button;
}

function appendGalleryPhotos() {
  const start = gallery.childElementCount;
  const photos = eventPhotos.slice(start, start + galleryPageSize).map(createGalleryPhoto);
  gallery.append(...photos);
  morePhotos.hidden = gallery.childElementCount >= eventPhotos.length;
  return photos[0];
}

morePhotos.addEventListener('click', () => appendGalleryPhotos()?.focus());
appendGalleryPhotos();

lightbox.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

const contactStatus = document.querySelector('.contact-status');

for (const button of document.querySelectorAll('[data-copy-contact]')) {
  button.addEventListener('click', async () => {
    const value = button.querySelector('span');
    const label = button.dataset.copyContact;
    contactStatus.textContent = '';
    try {
      await navigator.clipboard.writeText(value.textContent);
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(value);
      selection.removeAllRanges();
      selection.addRange(range);
      if (!document.execCommand('copy')) {
        contactStatus.textContent = 'Скопируйте выделенный текст вручную';
        return;
      }
      selection.removeAllRanges();
    }
    contactStatus.textContent = label === 'Почта' ? 'Почта скопирована' : 'Телефон скопирован';
  });
}

// Browser security rules restrict module imports when a static preview is opened from disk.
if (location.protocol === 'http:' || location.protocol === 'https:') {
  import('./assets/motion/motion.js');
  import('./assets/moments/moments.js');
}
