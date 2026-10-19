const GROUPS = {
  'group-header': ['hideVoiceSearch', 'hideHeaderCreate', 'hideHeaderNotifications'],
  'group-actions': ['hideBtnLike', 'hideBtnThanks', 'hideBtnShare', 'hideBtnAsk', 'hideBtnSave', 'hideBtnMore'],
  'group-content': ['hideTitle', 'hideComments', 'hideRelated', 'hideRelatedPlaylists']
};

const INDIVIDUAL_KEYS = [
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

let userCustomPresets = {};

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(null, (data) => {
    const settings = data || {};

    // 1. Đồng bộ các công tắc bật/tắt
    INDIVIDUAL_KEYS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.checked = Boolean(settings[id]);
    });

    Object.keys(GROUPS).forEach(checkGroupState);

    // 2. Chế độ Audio Mode
    const audioSelect = document.getElementById('audioModeLevel');
    if (audioSelect) {
      audioSelect.value = settings.audioModeLevel || 'off';
      audioSelect.addEventListener('change', (e) => {
        chrome.storage.sync.set({ audioModeLevel: e.target.value });
      });
    }

    // 3. Volume Master
    const volSlider = document.getElementById('volumeBoostSlider');
    const volDisplay = document.getElementById('volumeDisplay');
    const savedVol = settings.volumeBoostLevel || 100;
    if (volSlider && volDisplay) {
      volSlider.value = savedVol;
      volDisplay.textContent = `${savedVol}%`;
    }

    // 4. Equalizer Presets
    userCustomPresets = settings.userCustomPresets || {};
    renderCustomPresetOptions();

    const eqSelect = document.getElementById('eqPresetSelect');
    const savedPreset = settings.eqPreset || 'flat';
    if (eqSelect) eqSelect.value = savedPreset;

    const currentGains = settings.eqGains || getGainsByPreset(savedPreset);
    updateEQSlidersUI(currentGains);

    // 5. Thanh tua video (Progress Bar)
    const progressMode = settings.progressBarMode || 'default';
    const customColor = settings.progressBarColor || '#D7C08E';
    updateProgressBarTabs(progressMode);

    const colorPicker = document.getElementById('progressBarColorPicker');
    const colorText = document.getElementById('progressBarColorText');
    if (colorPicker && colorText) {
      colorPicker.value = customColor;
      colorText.value = customColor.toUpperCase();

      colorPicker.addEventListener('input', (e) => {
        const val = e.target.value.toUpperCase();
        colorText.value = val;
        chrome.storage.sync.set({ progressBarColor: val, progressBarMode: 'custom' });
        updateProgressBarTabs('custom');
      });

      colorText.addEventListener('input', (e) => {
        let val = e.target.value.trim().toUpperCase();
        if (!val.startsWith('#')) val = '#' + val;
        if (/^#[0-9A-F]{6}$/i.test(val)) {
          colorPicker.value = val;
          chrome.storage.sync.set({ progressBarColor: val, progressBarMode: 'custom' });
          updateProgressBarTabs('custom');
        }
      });
    }

    // 6. Logo & Region
    const logoType = settings.logoType || 'default';
    updateLogoTabs(logoType);

    const regSelect = document.getElementById('regionSelect');
    if (regSelect) regSelect.value = settings.regionMode || 'auto';
    toggleCustomRegionBox((settings.regionMode || 'auto') === 'custom');

    const regInput = document.getElementById('regionTextInput');
    if (regInput) regInput.value = settings.customRegionText || '';
  });

  // Sự kiện chuyển Tab
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab-page').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      const page = document.getElementById(btn.dataset.tab);
      if (page) page.classList.add('active');
    });
  });

  // Slider Volume
  const volSlider = document.getElementById('volumeBoostSlider');
  const volDisplay = document.getElementById('volumeDisplay');
  if (volSlider && volDisplay) {
    volSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      volDisplay.textContent = `${val}%`;
      chrome.storage.sync.set({ volumeBoostLevel: val });
    });
  }

  // Chọn Profile EQ
  const eqSelect = document.getElementById('eqPresetSelect');
  if (eqSelect) {
    eqSelect.addEventListener('change', (e) => {
      const preset = e.target.value;
      const gains = getGainsByPreset(preset);
      updateEQSlidersUI(gains);
      chrome.storage.sync.set({ eqPreset: preset, eqGains: gains });
    });
  }

  // Cần gạt 10 dải tần EQ
  document.querySelectorAll('.eq-slider').forEach((slider) => {
    slider.addEventListener('input', () => {
      const currentGains = [];
      document.querySelectorAll('.eq-slider').forEach((s) => {
        currentGains.push(parseInt(s.value, 10));
      });
      chrome.storage.sync.set({ eqPreset: 'custom', eqGains: currentGains });
    });
  });

  // Nút Lưu Profile EQ
  const btnSave = document.getElementById('btnSavePreset');
  const inputName = document.getElementById('newPresetName');
  if (btnSave && inputName) {
    btnSave.addEventListener('click', () => {
      const name = inputName.value.trim();
      if (!name) return;

      const currentGains = [];
      document.querySelectorAll('.eq-slider').forEach((s) => {
        currentGains.push(parseInt(s.value, 10));
      });

      userCustomPresets[name] = currentGains;
      chrome.storage.sync.set({
        userCustomPresets,
        eqPreset: name,
        eqGains: currentGains
      }, () => {
        renderCustomPresetOptions();
        if (eqSelect) eqSelect.value = name;
        inputName.value = '';
      });
    });
  }

  // Nút Xóa Profile EQ
  const btnDel = document.getElementById('btnDeletePreset');
  if (btnDel && eqSelect) {
    btnDel.addEventListener('click', () => {
      const selected = eqSelect.value;
      if (userCustomPresets[selected]) {
        delete userCustomPresets[selected];
        chrome.storage.sync.set({
          userCustomPresets,
          eqPreset: 'flat',
          eqGains: DEFAULT_PRESETS.flat
        }, () => {
          renderCustomPresetOptions();
          eqSelect.value = 'flat';
          updateEQSlidersUI(DEFAULT_PRESETS.flat);
        });
      }
    });
  }

  // Nút chuyển chế độ thanh tua (Default / Gold / Custom)
  ['default', 'gold', 'custom'].forEach((mode) => {
    const btnId = `barMode${mode.charAt(0).toUpperCase() + mode.slice(1)}`;
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        updateProgressBarTabs(mode);
        chrome.storage.sync.set({ progressBarMode: mode });
      });
    }
  });

  // Master switches
  Object.keys(GROUPS).forEach((groupId) => {
    const masterEl = document.getElementById(groupId);
    if (!masterEl) return;
    masterEl.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      const updates = {};
      GROUPS[groupId].forEach((childId) => {
        const childEl = document.getElementById(childId);
        if (childEl) childEl.checked = isChecked;
        updates[childId] = isChecked;
      });
      chrome.storage.sync.set(updates);
    });
  });

  // Switch con
  INDIVIDUAL_KEYS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', (e) => {
      chrome.storage.sync.set({ [id]: e.target.checked });
      Object.keys(GROUPS).forEach((groupId) => {
        if (GROUPS[groupId].includes(id)) checkGroupState(groupId);
      });
    });
  });

  // Tabs Logo
  document.querySelectorAll('.seg-btn[data-val]').forEach((btn) => {
    if (btn.id.startsWith('barMode')) return; // Bỏ qua các nút của progress bar
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;
      updateLogoTabs(val);
      chrome.storage.sync.set({ logoType: val });
    });
  });

  const uploadInput = document.getElementById('logoUploadInput');
  if (uploadInput) {
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        chrome.storage.local.set({ customLogoUrl: evt.target.result });
        chrome.storage.sync.set({ logoType: 'custom' });
      };
      reader.readAsDataURL(file);
    });
  }

  // Mã vùng
  const regSelect = document.getElementById('regionSelect');
  if (regSelect) {
    regSelect.addEventListener('change', (e) => {
      toggleCustomRegionBox(e.target.value === 'custom');
      chrome.storage.sync.set({ regionMode: e.target.value });
    });
  }

  const regInput = document.getElementById('regionTextInput');
  if (regInput) {
    regInput.addEventListener('input', (e) => {
      chrome.storage.sync.set({ customRegionText: e.target.value.trim() });
    });
  }
});

function getGainsByPreset(preset) {
  if (DEFAULT_PRESETS[preset]) return DEFAULT_PRESETS[preset];
  if (userCustomPresets[preset]) return userCustomPresets[preset];
  return DEFAULT_PRESETS.flat;
}

function renderCustomPresetOptions() {
  const optGroup = document.getElementById('customPresetOptGroup');
  if (!optGroup) return;
  optGroup.innerHTML = '';
  Object.keys(userCustomPresets).forEach((name) => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = `★ ${name}`;
    optGroup.appendChild(opt);
  });
}

function checkGroupState(groupId) {
  const masterEl = document.getElementById(groupId);
  if (!masterEl) return;
  masterEl.checked = GROUPS[groupId].every((k) => {
    const el = document.getElementById(k);
    return el && el.checked;
  });
}

function updateEQSlidersUI(gains) {
  document.querySelectorAll('.eq-slider').forEach((slider, idx) => {
    if (gains[idx] !== undefined) slider.value = gains[idx];
  });
}

function updateLogoTabs(val) {
  document.querySelectorAll('.seg-btn[data-val]').forEach((b) => {
    if (b.id.startsWith('barMode')) return;
    b.classList.toggle('active', b.dataset.val === val);
  });
  const box = document.getElementById('logoUploadBox');
  if (box) box.style.display = (val === 'custom') ? 'block' : 'none';
}

function updateProgressBarTabs(mode) {
  ['Default', 'Gold', 'Custom'].forEach((m) => {
    const b = document.getElementById(`barMode${m}`);
    if (b) b.classList.toggle('active', m.toLowerCase() === mode);
  });
  const box = document.getElementById('customProgressBarColorBox');
  if (box) box.style.display = (mode === 'custom') ? 'block' : 'none';
}

function toggleCustomRegionBox(show) {
  const box = document.getElementById('regionCustomBox');
  if (box) box.style.display = show ? 'block' : 'none';
}