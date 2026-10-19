/**
 * CusYOU - content.js
 */

if (window !== window.top) {
  throw new Error('[CusYOU] Skipping sub-frame.');
}

function isExtensionValid() {
  return typeof chrome !== 'undefined' && chrome.runtime && !!chrome.runtime.id;
}

const CUSYOU_LOGO_SVG = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" class="cusyou-keep" style="pointer-events:none;width: auto;height: auto;">
  <circle cx="24" cy="24" r="21" stroke="#D7C08E" stroke-width="3" fill="#141416"/>
  <circle cx="24" cy="24" r="10" fill="#D7C08E"/>
  <path d="M24 6V14M24 34V42M6 24H14M34 24H42" stroke="#D7C08E" stroke-width="3" stroke-linecap="round"/>
</svg>`;

// 1. Logo Premium Vàng cát (#D7C08E)
const PREMIUM_GOLD_SVG = `<div style="width: 100%; height: 100%; display: block; fill: currentcolor;"><svg xmlns="http://www.w3.org/2000/svg" width="101" height="20" viewBox="0 0 101 20" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
  <g>
    <path d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z" fill="#D7C08E"></path>
    <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="#141416"></path>
  </g>
  <g fill="#D7C08E">
    <path d="M32.1819 2.10016V18.9002H34.7619V12.9102H35.4519C38.8019 12.9102 40.5619 11.1102 40.5619 7.57016V6.88016C40.5619 3.31016 39.0019 2.10016 35.7219 2.10016H32.1819ZM37.8619 7.63016C37.8619 10.0002 37.1419 11.0802 35.4019 11.0802H34.7619V3.95016H35.4519C37.4219 3.95016 37.8619 4.76016 37.8619 7.13016V7.63016Z"></path>
    <path d="M41.982 18.9002H44.532V10.0902C44.952 9.37016 45.992 9.05016 47.302 9.32016L47.462 6.33016C47.292 6.31016 47.142 6.29016 47.002 6.29016C45.802 6.29016 44.832 7.20016 44.342 8.86016H44.162L43.952 6.54016H41.982V18.9002Z"></path>
    <path d="M55.7461 11.5002C55.7461 8.52016 55.4461 6.31016 52.0161 6.31016C48.7861 6.31016 48.0661 8.46016 48.0661 11.6202V13.7902C48.0661 16.8702 48.7261 19.1102 51.9361 19.1102C54.4761 19.1102 55.7861 17.8402 55.6361 15.3802L53.3861 15.2602C53.3561 16.7802 53.0061 17.4002 51.9961 17.4002C50.7261 17.4002 50.6661 16.1902 50.6661 14.3902V13.5502H55.7461V11.5002ZM51.9561 7.97016C53.1761 7.97016 53.2661 9.12016 53.2661 11.0702V12.0802H50.6661V11.0702C50.6661 9.14016 50.7461 7.97016 51.9561 7.97016Z"></path>
    <path d="M60.1945 18.9002V8.92016C60.5745 8.39016 61.1945 8.07016 61.7945 8.07016C62.5645 8.07016 62.8445 8.61016 62.8445 9.69016V18.9002H65.5045L65.4845 8.93016C65.8545 8.37016 66.4845 8.04016 67.1045 8.04016C67.7745 8.04016 68.1445 8.61016 68.1445 9.69016V18.9002H70.8045V9.49016C70.8045 7.28016 70.0145 6.27016 68.3445 6.27016C67.1845 6.27016 66.1945 6.69016 65.2845 7.67016C64.9045 6.76016 64.1545 6.27016 63.0845 6.27016C61.8745 6.27016 60.7345 6.79016 59.9345 7.76016H59.7845L59.5945 6.54016H57.5445V18.9002H60.1945Z"></path>
    <path d="M74.0858 4.97016C74.9858 4.97016 75.4058 4.67016 75.4058 3.43016C75.4058 2.27016 74.9558 1.91016 74.0858 1.91016C73.2058 1.91016 72.7758 2.23016 72.7758 3.43016C72.7758 4.67016 73.1858 4.97016 74.0858 4.97016ZM72.8658 18.9002H75.3958V6.54016H72.8658V18.9002Z"></path>
    <path d="M79.9516 19.0902C81.4116 19.0902 82.3216 18.4802 83.0716 17.3802H83.1816L83.2916 18.9002H85.2816V6.54016H82.6416V16.4702C82.3616 16.9602 81.7116 17.3202 81.1016 17.3202C80.3316 17.3202 80.0916 16.7102 80.0916 15.6902V6.54016H77.4616V15.8102C77.4616 17.8202 78.0416 19.0902 79.9516 19.0902Z"></path>
    <path d="M90.0031 18.9002V8.92016C90.3831 8.39016 91.0031 8.07016 91.6031 8.07016C92.3731 8.07016 92.6531 8.61016 92.6531 9.69016V18.9002H95.3131L95.2931 8.93016C95.6631 8.37016 96.2931 8.04016 96.9131 8.04016C97.5831 8.04016 97.9531 8.61016 97.9531 9.69016V18.9002H100.613V9.49016C100.613 7.28016 99.8231 6.27016 98.1531 6.27016C96.9931 6.27016 96.0031 6.69016 95.0931 7.67016C94.7131 6.76016 93.9631 6.27016 92.8931 6.27016C91.6831 6.27016 90.5431 6.79016 89.7431 7.76016H89.5931L89.4031 6.54016H87.3531V18.9002H90.0031Z"></path>
  </g>
</svg></div>`;

// 2. Logo Premium Đỏ / Trắng gốc của YouTube
const PREMIUM_RED_SVG = `<div style="width: 100%; height: 100%; display: block; fill: currentcolor;"><svg xmlns="http://www.w3.org/2000/svg" width="101" height="20" viewBox="0 0 101 20" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
  <g>
    <path d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z" fill="#FF0033"></path>
    <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="#FFFFFF"></path>
  </g>
  <g fill="#FFFFFF">
    <path d="M32.1819 2.10016V18.9002H34.7619V12.9102H35.4519C38.8019 12.9102 40.5619 11.1102 40.5619 7.57016V6.88016C40.5619 3.31016 39.0019 2.10016 35.7219 2.10016H32.1819ZM37.8619 7.63016C37.8619 10.0002 37.1419 11.0802 35.4019 11.0802H34.7619V3.95016H35.4519C37.4219 3.95016 37.8619 4.76016 37.8619 7.13016V7.63016Z"></path>
    <path d="M41.982 18.9002H44.532V10.0902C44.952 9.37016 45.992 9.05016 47.302 9.32016L47.462 6.33016C47.292 6.31016 47.142 6.29016 47.002 6.29016C45.802 6.29016 44.832 7.20016 44.342 8.86016H44.162L43.952 6.54016H41.982V18.9002Z"></path>
    <path d="M55.7461 11.5002C55.7461 8.52016 55.4461 6.31016 52.0161 6.31016C48.7861 6.31016 48.0661 8.46016 48.0661 11.6202V13.7902C48.0661 16.8702 48.7261 19.1102 51.9361 19.1102C54.4761 19.1102 55.7861 17.8402 55.6361 15.3802L53.3861 15.2602C53.3561 16.7802 53.0061 17.4002 51.9961 17.4002C50.7261 17.4002 50.6661 16.1902 50.6661 14.3902V13.5502H55.7461V11.5002ZM51.9561 7.97016C53.1761 7.97016 53.2661 9.12016 53.2661 11.0702V12.0802H50.6661V11.0702C50.6661 9.14016 50.7461 7.97016 51.9561 7.97016Z"></path>
    <path d="M60.1945 18.9002V8.92016C60.5745 8.39016 61.1945 8.07016 61.7945 8.07016C62.5645 8.07016 62.8445 8.61016 62.8445 9.69016V18.9002H65.5045L65.4845 8.93016C65.8545 8.37016 66.4845 8.04016 67.1045 8.04016C67.7745 8.04016 68.1445 8.61016 68.1445 9.69016V18.9002H70.8045V9.49016C70.8045 7.28016 70.0145 6.27016 68.3445 6.27016C67.1845 6.27016 66.1945 6.69016 65.2845 7.67016C64.9045 6.76016 64.1545 6.27016 63.0845 6.27016C61.8745 6.27016 60.7345 6.79016 59.9345 7.76016H59.7845L59.5945 6.54016H57.5445V18.9002H60.1945Z"></path>
    <path d="M74.0858 4.97016C74.9858 4.97016 75.4058 4.67016 75.4058 3.43016C75.4058 2.27016 74.9558 1.91016 74.0858 1.91016C73.2058 1.91016 72.7758 2.23016 72.7758 3.43016C72.7758 4.67016 73.1858 4.97016 74.0858 4.97016ZM72.8658 18.9002H75.3958V6.54016H72.8658V18.9002Z"></path>
    <path d="M79.9516 19.0902C81.4116 19.0902 82.3216 18.4802 83.0716 17.3802H83.1816L83.2916 18.9002H85.2816V6.54016H82.6416V16.4702C82.3616 16.9602 81.7116 17.3202 81.1016 17.3202C80.3316 17.3202 80.0916 16.7102 80.0916 15.6902V6.54016H77.4616V15.8102C77.4616 17.8202 78.0416 19.0902 79.9516 19.0902Z"></path>
    <path d="M90.0031 18.9002V8.92016C90.3831 8.39016 91.0031 8.07016 91.6031 8.07016C92.3731 8.07016 92.6531 8.61016 92.6531 9.69016V18.9002H95.3131L95.2931 8.93016C95.6631 8.37016 96.2931 8.04016 96.9131 8.04016C97.5831 8.04016 97.9531 8.61016 97.9531 9.69016V18.9002H100.613V9.49016C100.613 7.28016 99.8231 6.27016 98.1531 6.27016C96.9931 6.27016 96.0031 6.69016 95.0931 7.67016C94.7131 6.76016 93.9631 6.27016 92.8931 6.27016C91.6831 6.27016 90.5431 6.79016 89.7431 7.76016H89.5931L89.4031 6.54016H87.3531V18.9002H90.0031Z"></path>
  </g>
</svg></div>`;


const CSS_FLAGS = [
  'hideVoiceSearch', 'hideHeaderCreate', 'hideHeaderNotifications', 'hideHeaderAvatar',
  'hideChannelAvatar', 'hideChannelName', 'hideChannelSubCount', 'hideBtnJoin',
  'hideBtnSubscribe', 'hideBtnLike', 'hideBtnThanks', 'hideBtnShare', 'hideBtnAsk', 'hideBtnSave',
  'hideBtnMore', 'hideTitle', 'hideDescription', 'hideComments', 'hideRelated', 'hideRelatedPlaylists',
  'hideEndscreen', 'enableBottomSearch', 'hideHeader'
];

const DEFAULT_PRESETS = {
  flat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  vinahouse: [10, 8, 6, 2, 0, 1, 3, 6, 8, 10],
  edm: [8, 7, 5, 1, 0, 1, 3, 5, 7, 8],
  dj: [7, 6, 5, 2, 1, 1, 2, 4, 6, 7],
  pop: [-1, 0, 2, 3, 4, 4, 3, 2, 0, -1],
  lofi: [5, 4, 2, 0, -1, -2, -3, -5, -7, -9],
  rock: [6, 4, 2, -1, -2, 1, 3, 5, 7, 8]
};

let cachedSettings = {};
let cachedCustomLogoUrl = null;
let defaultLogoHTML = null;

// ==========================================
// 1. VOLUME MASTER & 10-BAND EQ
// ==========================================
let audioCtx = null;
let gainNode = null;
let currentSource = null;
let eqFilters = [];
let hasUserGesture = false;
const EQ_10_FREQS = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];

function handleUserGesture() {
  hasUserGesture = true;
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => { });
  } else if (!audioCtx) {
    initAudioEngine();
  }
  ['click', 'keydown', 'pointerdown', 'touchstart'].forEach(e => document.removeEventListener(e, handleUserGesture, { capture: true }));
}
['click', 'keydown', 'pointerdown', 'touchstart'].forEach(e => document.addEventListener(e, handleUserGesture, { capture: true, passive: true }));

function initAudioEngine() {
  if (!hasUserGesture) return false;
  const video = document.querySelector('video.html5-main-video') || document.querySelector('video');
  if (!video) return false;

  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtxClass();
      video.addEventListener('play', () => {
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume().catch(() => { });
      }, { passive: true });
    }
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => { });

    if (!gainNode) gainNode = audioCtx.createGain();

    if (eqFilters.length === 0) {
      eqFilters = EQ_10_FREQS.map((freq, i) => {
        const filter = audioCtx.createBiquadFilter();
        if (i === 0) filter.type = 'lowshelf';
        else if (i === EQ_10_FREQS.length - 1) filter.type = 'highshelf';
        else {
          filter.type = 'peaking';
          filter.Q.value = 1.4;
        }
        filter.frequency.value = freq;
        filter.gain.value = 0;
        return filter;
      });
    }

    if (!currentSource) {
      currentSource = audioCtx.createMediaElementSource(video);
      let last = currentSource;
      eqFilters.forEach(f => { last.connect(f); last = f; });
      last.connect(gainNode);
      gainNode.connect(audioCtx.destination);
    }

    if (cachedSettings.volumeBoostLevel && cachedSettings.volumeBoostLevel > 100) {
      gainNode.gain.setValueAtTime(cachedSettings.volumeBoostLevel / 100, audioCtx.currentTime);
    }
    if (cachedSettings.eqGains) {
      cachedSettings.eqGains.forEach((g, idx) => {
        if (eqFilters[idx]) eqFilters[idx].gain.setValueAtTime(g, audioCtx.currentTime);
      });
    }
    return true;
  } catch (e) {
    return false;
  }
}

function applyVolume(percent) {
  const target = (percent || 100) / 100;
  if (initAudioEngine() && gainNode && audioCtx) {
    gainNode.gain.setValueAtTime(target, audioCtx.currentTime);
  }
}

function applyEQ(gains) {
  if (!gains || !Array.isArray(gains)) return;
  if (initAudioEngine() && eqFilters.length === gains.length && audioCtx) {
    gains.forEach((val, idx) => eqFilters[idx].gain.setValueAtTime(val, audioCtx.currentTime));
  }
}

// ==========================================
// 2. ÉP CHẤT LƯỢNG 144P THỰC TẾ
// ==========================================
function enforce144p() {
  const player = document.querySelector('#movie_player');
  if (!player) return;

  try {
    // Ép API player
    if (typeof player.setPlaybackQualityRange === 'function') {
      player.setPlaybackQualityRange('tiny', 'tiny');
    }
    if (typeof player.setPlaybackQuality === 'function') {
      player.setPlaybackQuality('tiny');
    }

    // Kiểm tra chất lượng hiện tại, nếu chưa về tiny thì ép qua menu cài đặt
    const curQ = typeof player.getPlaybackQuality === 'function' ? player.getPlaybackQuality() : '';
    if (curQ && curQ !== 'tiny') {
      // Ghi nhớ thiết lập 144p vào localStorage của YouTube
      try {
        localStorage.setItem('yt-player-quality', JSON.stringify({
          data: 'tiny',
          expiration: Date.now() + 86400000,
          creation: Date.now()
        }));
      } catch (err) { }

      // Tự động chọn 144p từ bánh răng cài đặt nếu API bị bỏ qua
      const settingsBtn = document.querySelector('.ytp-settings-button');
      if (settingsBtn) {
        settingsBtn.click();
        setTimeout(() => {
          const menuItems = Array.from(document.querySelectorAll('.ytp-menuitem'));
          const qualityItem = menuItems.find(el => el.textContent.includes('Chất lượng') || el.textContent.includes('Quality'));
          if (qualityItem) {
            qualityItem.click();
            setTimeout(() => {
              const qualityOptions = Array.from(document.querySelectorAll('.ytp-quality-menu .ytp-menuitem'));
              const p144 = qualityOptions.find(el => el.textContent.includes('144p'));
              if (p144) {
                p144.click();
              } else {
                settingsBtn.click(); // đóng lại menu
              }
            }, 50);
          } else {
            settingsBtn.click(); // đóng lại menu
          }
        }, 50);
      }
    }
  } catch (e) { }
}

window.addEventListener('yt-navigate-finish', () => {
  applyLogo();
  applyProgressBarSettings();
  if (cachedSettings.audioModeLevel === 'saver') {
    setTimeout(enforce144p, 300);
    setTimeout(enforce144p, 1200);
  }
});

// ==========================================
// 3. THAY THẾ TOÀN BỘ THUMBNAIL THÀNH LOGO
// ==========================================
function applyThumbnailReplacements() {
  const level = cachedSettings.audioModeLevel || 'off';

  if (level === 'advanced') {
    const targets = document.querySelectorAll(`
      #secondary ytd-thumbnail:not(.cusyou-processed),
      ytd-compact-video-renderer ytd-thumbnail:not(.cusyou-processed),
      ytd-thumbnail:not(.cusyou-processed),
      ytd-playlist-thumbnail:not(.cusyou-processed)
    `);

    targets.forEach((thumb) => {
      thumb.classList.add('cusyou-processed');
      if (!thumb.querySelector('.cusyou-thumb-replacement')) {
        const overlay = document.createElement('div');
        overlay.className = 'cusyou-thumb-replacement';
        overlay.innerHTML = CUSYOU_LOGO_SVG;
        thumb.appendChild(overlay);
      }
    });
  } else {
    document.querySelectorAll('.cusyou-thumb-replacement').forEach(el => el.remove());
    document.querySelectorAll('.cusyou-processed').forEach(t => t.classList.remove('cusyou-processed'));
  }
}

// ==========================================
// 4. ĐỒNG BỘ AUDIO MODE
// ==========================================
function updateAudioModeUI() {
  const level = cachedSettings.audioModeLevel || 'off';
  const player = document.querySelector('#movie_player');
  let backdrop = document.getElementById('cusyou-audio-backdrop');

  document.documentElement.classList.toggle('cusyou-audio-active', level !== 'off');
  document.documentElement.classList.toggle('cusyou-audio-advanced', level === 'advanced');
  document.documentElement.classList.toggle('cusyou-audio-saver', level === 'saver');

  if (level !== 'off') {
    if (level === 'saver') enforce144p();

    if (!backdrop && player) {
      backdrop = document.createElement('div');
      backdrop.id = 'cusyou-audio-backdrop';
      player.appendChild(backdrop);
    }

    if (backdrop) {
      if (level === 'basic') {
        backdrop.innerHTML = `
          <div style="font-size:12px; font-weight:600; color:#888890; letter-spacing:1px; text-transform:uppercase;">
            Audio Mode: <span style="color:#ffffff;">Cơ bản (Gốc)</span>
          </div>
        `;
      } else {
        const badgeText = level === 'saver' ? 'Tiết kiệm (Ép 144p & Chặn ảnh)' : 'Nâng cao (Logo CusYOU)';
        backdrop.innerHTML = `
          <div class="cusyou-brand-display">
            <div style="width: 48px; height: 48px;">${CUSYOU_LOGO_SVG}</div>
            <div class="cusyou-brand-name">Cus<b>YOU</b> Music</div>
            <div class="cusyou-mode-badge">${badgeText}</div>
          </div>
        `;
      }
    }
  } else {
    if (backdrop) backdrop.remove();
    if (player && typeof player.setPlaybackQualityRange === 'function') {
      try { player.setPlaybackQualityRange('default', 'highres'); } catch (e) { }
    }
  }

  applyThumbnailReplacements();
}

function applyClasses() {
  CSS_FLAGS.forEach((flag) => {
    const cls = `cusyou-${flag.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    if (cachedSettings && cachedSettings[flag]) {
      document.documentElement.classList.add(cls);
    } else {
      document.documentElement.classList.remove(cls);
    }
  });

  updateAudioModeUI();
  applyProgressBarSettings();

  if (hasUserGesture) {
    if (cachedSettings.volumeBoostLevel) applyVolume(cachedSettings.volumeBoostLevel);
    if (cachedSettings.eqGains) applyEQ(cachedSettings.eqGains);
  }
}

function applyLogo() {
  const logoRenderer = document.querySelector('ytd-topbar-logo-renderer#logo, a#logo');
  if (!logoRenderer) return;

  const logoIcon = logoRenderer.querySelector('yt-icon#logo-icon, yt-icon.ytd-topbar-logo-renderer');
  const countryCodeEl = logoRenderer.querySelector('#country-code');

  if (logoIcon && !defaultLogoHTML) defaultLogoHTML = logoIcon.innerHTML;

  const mode = cachedSettings.logoType || 'default';

  if (logoIcon) {
    if (mode === 'premium-gold' || mode === 'premium') {
      if (!logoIcon.querySelector('#cusyou-logo-gold')) {
        logoIcon.innerHTML = `<span id="cusyou-logo-gold" style="display:flex; align-items:center; width:100%; height:100%;">${PREMIUM_GOLD_SVG}</span>`;
      }
    } else if (mode === 'premium-red') {
      if (!logoIcon.querySelector('#cusyou-logo-red')) {
        logoIcon.innerHTML = `<span id="cusyou-logo-red" style="display:flex; align-items:center; width:100%; height:100%;">${PREMIUM_RED_SVG}</span>`;
      }
    } else if (mode === 'custom' && cachedCustomLogoUrl) {
      if (!logoIcon.querySelector('img.cusyou-custom-logo')) {
        logoIcon.innerHTML = `<img class="cusyou-custom-logo cusyou-keep" src="${cachedCustomLogoUrl}" style="height: 20px; width: auto; object-fit: contain; vertical-align: middle;">`;
      }
    } else if (mode === 'default' && defaultLogoHTML) {
      if (logoIcon.querySelector('#cusyou-logo-gold') || logoIcon.querySelector('#cusyou-logo-red') || logoIcon.querySelector('img.cusyou-custom-logo')) {
        logoIcon.innerHTML = defaultLogoHTML;
      }
    }
  }

  // Khôi phục và quản lý mã vùng (#country-code) chuẩn xác
  if (countryCodeEl) {
    const regMode = cachedSettings.regionMode || 'auto';
    if (regMode === 'hidden') {
      countryCodeEl.style.display = 'none';
    } else if (regMode === 'custom') {
      countryCodeEl.style.display = 'inline-block';
      countryCodeEl.textContent = (cachedSettings.customRegionText || '').toUpperCase();
    } else {
      // Chế độ 'auto': Giữ nguyên hiển thị mã vùng gốc của YouTube (VD: VN, JP, US)
      countryCodeEl.style.display = 'inline-block';
    }
  }
}

function injectPlayerControls() {
  const rightControls = document.querySelector('.ytp-right-controls');
  if (!rightControls || document.getElementById('cusyou-player-shortcut-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'cusyou-player-shortcut-btn';
  btn.className = 'ytp-button cusyou-player-btn';
  btn.title = 'CusYOU Settings';
  btn.setAttribute('aria-label', 'CusYOU Settings');

  btn.innerHTML = CUSYOU_LOGO_SVG;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    hasUserGesture = true;
    toggleQuickPanel();
  });

  rightControls.prepend(btn);
}

function toggleQuickPanel() {
  const existing = document.getElementById('cusyou-quick-panel');
  if (existing) {
    existing.remove();
    return;
  }

  const playerContainer = document.querySelector('#movie_player') || document.body;
  const panel = document.createElement('div');
  panel.id = 'cusyou-quick-panel';

  const currentVol = cachedSettings.volumeBoostLevel || 100;
  const currentMode = cachedSettings.audioModeLevel || 'off';
  const currentPreset = cachedSettings.eqPreset || 'flat';
  const customPresets = cachedSettings.userCustomPresets || {};

  let customOptionsHTML = '';
  Object.keys(customPresets).forEach((name) => {
    customOptionsHTML += `<option value="${name}" ${currentPreset === name ? 'selected' : ''}>★ ${name}</option>`;
  });

  panel.innerHTML = `
    <div class="cusyou-panel-top">
      <span class="cusyou-panel-title">Cus<b>YOU</b> Settings</span>
      <button class="cusyou-panel-close">&times;</button>
    </div>

    <div class="cusyou-tab-bar">
      <button class="cusyou-tab-btn active" data-tab="qtab-media">Audio & EQ</button>
      <button class="cusyou-tab-btn" data-tab="qtab-content">Content</button>
      <button class="cusyou-tab-btn" data-tab="qtab-header">Header</button>
      <button class="cusyou-tab-btn" data-tab="qtab-extra">Mở rộng</button>
    </div>

    <div class="cusyou-tab-pane active" id="qtab-media">
      <div class="cusyou-card-box">
        <div style="font-size:10.5px; color:#888890; font-weight:700; text-transform:uppercase;">Chế độ Audio Mode</div>
        <select id="qAudioSelect" style="width:100%; background:#18181c; color:#f0f0f0; border:1px solid #2e2e36; border-radius:6px; padding:4px; font-size:11px; outline:none; margin-top:2px;">
          <option value="off" ${currentMode === 'off' ? 'selected' : ''}>Tắt Audio Mode</option>
          <option value="basic" ${currentMode === 'basic' ? 'selected' : ''}>1. Cơ bản (Giữ video gốc)</option>
          <option value="advanced" ${currentMode === 'advanced' ? 'selected' : ''}>2. Nâng cao (Thay thumbnail bằng logo)</option>
          <option value="saver" ${currentMode === 'saver' ? 'selected' : ''}>3. Tiết kiệm (Chặn ảnh + Ép 144p)</option>
        </select>
      </div>

      <div class="cusyou-card-box">
        <div style="display:flex; justify-content:space-between; font-size:11px; color:#9999a0;">
          <span>Volume Master:</span>
          <b id="qVolDisplay" style="color:#D7C08E;">${currentVol}%</b>
        </div>
        <input type="range" id="qVolSlider" min="100" max="1000" step="5" value="${currentVol}" style="width:100%; accent-color:#D7C08E; cursor:pointer;">
      </div>

      <div class="cusyou-card-box">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:10.5px; color:#888890; font-weight:700; text-transform:uppercase;">EQ Profile:</span>
          <select id="qEqSelect" style="background:#18181c; color:#f0f0f0; border:1px solid #2e2e36; border-radius:4px; padding:2px 4px; font-size:10.5px;">
            <optgroup label="Sẵn có">
              <option value="flat" ${currentPreset === 'flat' ? 'selected' : ''}>Flat (Mặc định)</option>
              <option value="vinahouse" ${currentPreset === 'vinahouse' ? 'selected' : ''}>Vinahouse</option>
              <option value="edm" ${currentPreset === 'edm' ? 'selected' : ''}>EDM / Club</option>
              <option value="dj" ${currentPreset === 'dj' ? 'selected' : ''}>DJ Dance</option>
              <option value="pop" ${currentPreset === 'pop' ? 'selected' : ''}>POP</option>
              <option value="lofi" ${currentPreset === 'lofi' ? 'selected' : ''}>Lofi Chill</option>
              <option value="rock" ${currentPreset === 'rock' ? 'selected' : ''}>Rock</option>
            </optgroup>
            <optgroup label="Của bạn">
              ${customOptionsHTML}
            </optgroup>
          </select>
        </div>
      </div>
    </div>

    <div class="cusyou-tab-pane" id="qtab-content">
      <div class="cusyou-card-box">
        <label class="cusyou-switch-row"><span>Avatar kênh</span><input type="checkbox" data-key="hideChannelAvatar" ${cachedSettings.hideChannelAvatar ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Tên kênh</span><input type="checkbox" data-key="hideChannelName" ${cachedSettings.hideChannelName ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Số người đăng ký</span><input type="checkbox" data-key="hideChannelSubCount" ${cachedSettings.hideChannelSubCount ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Nút Tham gia (Join)</span><input type="checkbox" data-key="hideBtnJoin" ${cachedSettings.hideBtnJoin ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Nút Đăng ký (Subscribe)</span><input type="checkbox" data-key="hideBtnSubscribe" ${cachedSettings.hideBtnSubscribe ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Tiêu đề video</span><input type="checkbox" data-key="hideTitle" ${cachedSettings.hideTitle ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Nút Cảm ơn / Ủng hộ</span><input type="checkbox" data-key="hideBtnThanks" ${cachedSettings.hideBtnThanks ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span style="color:#D7C08E; font-weight:600;">Ẩn đề xuất trong video (Endscreen)</span><input type="checkbox" data-key="hideEndscreen" ${cachedSettings.hideEndscreen ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Nút Thích / Dislike</span><input type="checkbox" data-key="hideBtnLike" ${cachedSettings.hideBtnLike ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Nút Chia sẻ</span><input type="checkbox" data-key="hideBtnShare" ${cachedSettings.hideBtnShare ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Bình luận</span><input type="checkbox" data-key="hideComments" ${cachedSettings.hideComments ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Video đề xuất bên cạnh</span><input type="checkbox" data-key="hideRelated" ${cachedSettings.hideRelated ? 'checked' : ''}></label>
      </div>
    </div>

    <div class="cusyou-tab-pane" id="qtab-header">
      <div class="cusyou-card-box">
        <label class="cusyou-switch-row"><span>Nút tìm giọng nói</span><input type="checkbox" data-key="hideVoiceSearch" ${cachedSettings.hideVoiceSearch ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Nút tạo video (+)</span><input type="checkbox" data-key="hideHeaderCreate" ${cachedSettings.hideHeaderCreate ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Chuông thông báo</span><input type="checkbox" data-key="hideHeaderNotifications" ${cachedSettings.hideHeaderNotifications ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Avatar tài khoản</span><input type="checkbox" data-key="hideHeaderAvatar" ${cachedSettings.hideHeaderAvatar ? 'checked' : ''}></label>
      </div>
    </div>

    <div class="cusyou-tab-pane" id="qtab-extra">
      <div class="cusyou-card-box">
        <label class="cusyou-switch-row"><span>Thanh tìm kiếm đáy Capsule</span><input type="checkbox" data-key="enableBottomSearch" ${cachedSettings.enableBottomSearch ? 'checked' : ''}></label>
        <label class="cusyou-switch-row"><span>Ẩn toàn bộ thanh Header</span><input type="checkbox" data-key="hideHeader" ${cachedSettings.hideHeader ? 'checked' : ''}></label>
      </div>

      <!-- Tùy biến thanh tua video ngay trong Quick Setting -->
      <div class="cusyou-card-box">
        <div style="font-size:10.5px; color:#888890; font-weight:700; text-transform:uppercase;">Thanh tua video</div>
        <select id="qProgressBarSelect" style="width:100%; background:#18181c; color:#f0f0f0; border:1px solid #2e2e36; border-radius:6px; padding:4px; font-size:11px; outline:none; margin-top:2px;">
          <option value="default" ${(cachedSettings.progressBarMode || 'default') === 'default' ? 'selected' : ''}>Mặc định (Đỏ YouTube)</option>
          <option value="gold" ${cachedSettings.progressBarMode === 'gold' ? 'selected' : ''}>Màu Gold (#D7C08E)</option>
          <option value="custom" ${cachedSettings.progressBarMode === 'custom' ? 'selected' : ''}>Màu tự chọn (Bảng màu/HEX)</option>
        </select>
        
        <div id="qCustomColorRow" style="display: ${cachedSettings.progressBarMode === 'custom' ? 'flex' : 'none'}; justify-content:space-between; align-items:center; margin-top:6px; padding-top:4px; border-top:1px solid #222228;">
          <span style="font-size:11px; color:#888890;">Màu HEX:</span>
          <div style="display:flex; align-items:center; gap:6px;">
            <input type="color" id="qColorPicker" value="${cachedSettings.progressBarColor || '#D7C08E'}" style="width:24px; height:24px; border:none; background:transparent; cursor:pointer; padding:0;">
            <input type="text" id="qColorText" value="${(cachedSettings.progressBarColor || '#D7C08E').toUpperCase()}" maxlength="7" style="width:75px; background:#101013; border:1px solid #2e2e36; color:#f0f0f0; font-size:11px; font-weight:700; text-align:center; border-radius:4px; padding:2px;">
          </div>
        </div>
      </div>
    </div>
  `;

  playerContainer.appendChild(panel);
  panel.addEventListener('click', (e) => e.stopPropagation());
  panel.querySelector('.cusyou-panel-close').onclick = () => panel.remove();

  panel.querySelectorAll('.cusyou-tab-btn').forEach((btn) => {
    btn.onclick = () => {
      panel.querySelectorAll('.cusyou-tab-btn').forEach((b) => b.classList.remove('active'));
      panel.querySelectorAll('.cusyou-tab-pane').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const target = panel.querySelector(`#${btn.dataset.tab}`);
      if (target) target.classList.add('active');
    };
  });

const qBarSelect = panel.querySelector('#qProgressBarSelect');
  const qColorRow = panel.querySelector('#qCustomColorRow');
  const qPicker = panel.querySelector('#qColorPicker');
  const qText = panel.querySelector('#qColorText');

  if (qBarSelect) {
    qBarSelect.onchange = (e) => {
      hasUserGesture = true;
      const mode = e.target.value;
      if (qColorRow) qColorRow.style.display = (mode === 'custom') ? 'flex' : 'none';
      if (isExtensionValid()) chrome.storage.sync.set({ progressBarMode: mode });
    };
  }

  if (qPicker && qText) {
    qPicker.oninput = (e) => {
      hasUserGesture = true;
      const val = e.target.value.toUpperCase();
      qText.value = val;
      if (isExtensionValid()) {
        chrome.storage.sync.set({ progressBarColor: val, progressBarMode: 'custom' });
      }
    };

    qText.oninput = (e) => {
      hasUserGesture = true;
      let val = e.target.value.trim().toUpperCase();
      if (!val.startsWith('#')) val = '#' + val;
      if (/^#[0-9A-F]{6}$/i.test(val)) {
        qPicker.value = val;
        if (isExtensionValid()) {
          chrome.storage.sync.set({ progressBarColor: val, progressBarMode: 'custom' });
        }
      }
    };
  }

  const qSlider = panel.querySelector('#qVolSlider');
  const qDisplay = panel.querySelector('#qVolDisplay');
  if (qSlider) {
    qSlider.oninput = (e) => {
      hasUserGesture = true;
      const val = parseInt(e.target.value, 10);
      qDisplay.textContent = `${val}%`;
      if (isExtensionValid()) chrome.storage.sync.set({ volumeBoostLevel: val });
      applyVolume(val);
    };
  }

  const qAudioSelect = panel.querySelector('#qAudioSelect');
  if (qAudioSelect) {
    qAudioSelect.onchange = (e) => {
      hasUserGesture = true;
      if (isExtensionValid()) chrome.storage.sync.set({ audioModeLevel: e.target.value });
    };
  }

  const qEqSelect = panel.querySelector('#qEqSelect');
  if (qEqSelect) {
    qEqSelect.onchange = (e) => {
      hasUserGesture = true;
      const p = e.target.value;
      const gains = DEFAULT_PRESETS[p] || customPresets[p] || DEFAULT_PRESETS.flat;
      if (isExtensionValid()) chrome.storage.sync.set({ eqPreset: p, eqGains: gains });
      applyEQ(gains);
    };
  }

  panel.querySelectorAll('input[data-key]').forEach((input) => {
    input.addEventListener('change', (e) => {
      hasUserGesture = true;
      if (isExtensionValid()) chrome.storage.sync.set({ [e.target.dataset.key]: e.target.checked });
    });
  });

  const closeListener = (e) => {
    if (!panel.contains(e.target) && !e.target.closest('#cusyou-player-shortcut-btn')) {
      panel.remove();
      document.removeEventListener('click', closeListener);
    }
  };
  setTimeout(() => document.addEventListener('click', closeListener), 0);
}

// Khởi chạy an toàn
function loadSettings() {
  if (!isExtensionValid()) return;

  chrome.storage.sync.get(null, (syncData) => {
    cachedSettings = syncData || {};
    chrome.storage.local.get(['customLogoUrl'], (localData) => {
      cachedCustomLogoUrl = localData.customLogoUrl || null;
      applyClasses();
      applyLogo();
    });
  });
}

loadSettings();

if (isExtensionValid()) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (!isExtensionValid()) return;
    if (area === 'sync') {
      for (const [key, { newValue }] of Object.entries(changes)) cachedSettings[key] = newValue;
      applyClasses();
      applyLogo();
    } else if (area === 'local') {
      if (changes.customLogoUrl) cachedCustomLogoUrl = changes.customLogoUrl.newValue;
      applyClasses();
      applyLogo();
    }
  });
}

let updateTimer = null;
const observer = new MutationObserver(() => {
  if (updateTimer) return;
  updateTimer = setTimeout(() => {
    applyLogo();
    injectPlayerControls();
    if (cachedSettings.audioModeLevel === 'saver') enforce144p();
    if (cachedSettings.audioModeLevel === 'advanced') applyThumbnailReplacements();
    updateTimer = null;
  }, 250);
});

if (document.body) {
  observer.observe(document.body, { childList: true, subtree: true });
} else {
  document.addEventListener('DOMContentLoaded', () => {
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

// Ép vị trí khung gợi ý tìm kiếm luôn hất lên trên chính giữa Capsule
function forceSuggestionsOnTop() {
  if (!cachedSettings.enableBottomSearch) return;
  const suggestionBox = document.querySelector('.ytSearchboxComponentSuggestionsContainer, #i1[role="listbox"], .sbsb_a');
  if (suggestionBox) {
    suggestionBox.style.setProperty('top', 'auto', 'important');
    suggestionBox.style.setProperty('bottom', '58px', 'important');
    suggestionBox.style.setProperty('left', '50%', 'important');
    suggestionBox.style.setProperty('transform', 'translateX(-50%)', 'important');
    suggestionBox.style.setProperty('position', 'absolute', 'important');
  }
}

document.addEventListener('input', (e) => {
  if (e.target && (e.target.id === 'search' || e.target.classList.contains('ytSearchboxComponentInput'))) {
    requestAnimationFrame(forceSuggestionsOnTop);
  }
}, true);

document.addEventListener('focusin', (e) => {
  if (e.target && (e.target.id === 'search' || e.target.classList.contains('ytSearchboxComponentInput'))) {
    requestAnimationFrame(forceSuggestionsOnTop);
  }
}, true);

// Nhấn phím Escape để bỏ focus nhanh khỏi Capsule
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const searchInput = document.querySelector('input.ytSearchboxComponentInput, input#search');
    if (searchInput && document.activeElement === searchInput) {
      searchInput.blur();
    }
  }
});

setInterval(forceSuggestionsOnTop, 200);

function applyProgressBarSettings() {
  const mode = cachedSettings.progressBarMode || 'default';
  const customColor = cachedSettings.progressBarColor || '#D7C08E';

  document.documentElement.classList.remove('cusyou-progressbar-gold', 'cusyou-progressbar-custom');

  let targetColor = '';
  if (mode === 'gold') {
    document.documentElement.classList.add('cusyou-progressbar-gold');
    targetColor = '#D7C08E';
  } else if (mode === 'custom') {
    document.documentElement.classList.add('cusyou-progressbar-custom');
    document.documentElement.style.setProperty('--cusyou-progress-color', customColor);
    targetColor = customColor;
  } else {
    document.documentElement.style.removeProperty('--cusyou-progress-color');
  }

  // Can thiệp thẳng vào các phần tử của player nếu đã render
  const elements = document.querySelectorAll('#movie_player .ytp-play-progress, #movie_player .ytp-scrubber-button');
  elements.forEach((el) => {
    if (targetColor) {
      el.style.setProperty('background-color', targetColor, 'important');
      el.style.setProperty('background', targetColor, 'important');
    } else {
      el.style.removeProperty('background-color');
      el.style.removeProperty('background');
    }
  });
}