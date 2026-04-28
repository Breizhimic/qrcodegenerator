'use strict';

// ── State ──────────────────────────────────────────────────────
const state = {
  currentType: 'url',
  logoDataURL: null,
  logoSize: 20,
  savedEcLevel: null,
  currentPNG: null,
  currentSVGRaw: null,
  lastText: '',
  lastSize: 300,
  lastFg: '#000000',
  lastBg: '#ffffff',
  lastEc: 'M',
  cornerStyle: 'square',    // square | rounded | extra-rounded | heart
  stickerStyle: 'none',
  batchItems: [],
  pendingFile: null,
  pendingFileName: '',
  _fileContent: '',
  fileMode: 'embed',        // embed | upload
};

// ── DOM helpers ────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

// ── Theme ──────────────────────────────────────────────────────
const html = document.documentElement;
$('themeToggle').addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('qrforge-theme', next);
});
html.setAttribute('data-theme', localStorage.getItem('qrforge-theme') || 'light');

// ── Tab Navigation ─────────────────────────────────────────────
$$('.nav-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    $$('.nav-tab').forEach(b => b.classList.remove('active'));
    $$('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    $(`tab-${tab}`).classList.add('active');
    if (tab === 'history') renderHistory();
  });
});

// ── Toast ──────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, duration = 2800) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}

// ── Type selector ──────────────────────────────────────────────
const TYPE_LABELS = {
  url: 'URL', text: 'TEXTE LIBRE', email: 'EMAIL',
  phone: 'TÉLÉPHONE', wifi: 'WIFI', sms: 'SMS',
  vcard: 'CONTACT / vCARD', file: 'FICHIER',
};

$$('.type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.type;
    $$('.type-btn').forEach(b => b.classList.remove('active'));
    $$('.content-form').forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    $(`form-${type}`).classList.add('active');
    $('contentLabel').textContent = TYPE_LABELS[type] || 'CONTENU';
    state.currentType = type;
    scheduleQR();
  });
});

// ── Content builders ───────────────────────────────────────────
function buildQRContent() {
  switch (state.currentType) {
    case 'url': return $('urlInput').value.trim();
    case 'text': return $('textInput').value.trim();
    case 'email': {
      const addr = $('emailAddress').value.trim();
      if (!addr) return '';
      const subj = $('emailSubject').value.trim();
      const body = $('emailBody').value.trim();
      let s = `mailto:${addr}`;
      const p = [];
      if (subj) p.push(`subject=${encodeURIComponent(subj)}`);
      if (body) p.push(`body=${encodeURIComponent(body)}`);
      if (p.length) s += '?' + p.join('&');
      return s;
    }
    case 'phone': {
      const cc = $('phoneCountry').value;
      const num = $('phoneNumber').value.trim().replace(/\s/g, '');
      if (!num) return '';
      const clean = num.startsWith('0') ? num.slice(1) : num;
      return `tel:${cc}${clean}`;
    }
    case 'wifi': {
      const ssid = $('wifiSSID').value.trim();
      if (!ssid) return '';
      const pw     = $('wifiPassword').value;
      const enc    = document.querySelector('input[name="wifiEnc"]:checked')?.value || 'WPA';
      const hidden = $('wifiHidden').checked ? 'true' : 'false';
      if (enc === 'nopass') return `WIFI:T:nopass;S:${ssid};;H:${hidden};`;
      return `WIFI:T:${enc};S:${ssid};P:${pw};;H:${hidden};`;
    }
    case 'sms': {
      const cc  = $('smsCountry').value;
      const num = $('smsNumber').value.trim().replace(/\s/g, '');
      if (!num) return '';
      const clean = num.startsWith('0') ? num.slice(1) : num;
      const msg = $('smsMessage').value.trim();
      return msg ? `sms:${cc}${clean}?body=${encodeURIComponent(msg)}` : `sms:${cc}${clean}`;
    }
    case 'vcard': {
      const first = $('vcardFirst').value.trim();
      const last  = $('vcardLast').value.trim();
      if (!first && !last) return '';
      let v = `BEGIN:VCARD\r\nVERSION:3.0\r\n`;
      v += `N:${last};${first};;;\r\n`;
      v += `FN:${first} ${last}\r\n`;
      const org   = $('vcardOrg').value.trim();   if (org)   v += `ORG:${org}\r\n`;
      const title = $('vcardTitle').value.trim();  if (title) v += `TITLE:${title}\r\n`;
      const phone = $('vcardPhone').value.trim();  if (phone) v += `TEL:${phone}\r\n`;
      const email = $('vcardEmail').value.trim();  if (email) v += `EMAIL:${email}\r\n`;
      const url   = $('vcardUrl').value.trim();    if (url)   v += `URL:${url}\r\n`;
      const addr  = $('vcardAddress').value.trim();if (addr)  v += `ADR:;;${addr};;;;\r\n`;
      v += `END:VCARD`;
      return v;
    }
    case 'file': return state._fileContent || '';
    default: return '';
  }
}

// ── Input listeners ────────────────────────────────────────────
const ALL_INPUTS = [
  'urlInput','textInput','emailAddress','emailSubject','emailBody',
  'phoneCountry','phoneNumber','wifiSSID','wifiPassword','wifiHidden',
  'smsCountry','smsNumber','smsMessage',
  'vcardFirst','vcardLast','vcardOrg','vcardTitle','vcardPhone','vcardEmail','vcardUrl','vcardAddress',
  'qrSize','ecLevel','fgColor','bgColor',
];
ALL_INPUTS.forEach(id => {
  const el = $(id);
  if (el) { el.addEventListener('input', scheduleQR); el.addEventListener('change', scheduleQR); }
});
$$('input[name="wifiEnc"]').forEach(r => r.addEventListener('change', scheduleQR));

$('fgColor').addEventListener('input', e => { $('fgColorVal').textContent = e.target.value; });
$('bgColor').addEventListener('input', e => { $('bgColorVal').textContent = e.target.value; });

$('toggleWifiPw').addEventListener('click', () => {
  const pw = $('wifiPassword');
  pw.type = pw.type === 'password' ? 'text' : 'password';
});

// ── Corner style picker ────────────────────────────────────────
$$('.corner-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.corner-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.cornerStyle = btn.dataset.corner;
    scheduleQR();
  });
});

// ── Sticker effect picker ──────────────────────────────────────
$$('.sticker-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.sticker-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.stickerStyle = btn.dataset.sticker;
    applyStickerEffect();
  });
});

function applyStickerEffect() {
  const stage = $('qrStage');
  stage.className = 'qr-stage';
  if (state.stickerStyle !== 'none') {
    stage.classList.add(`sticker-${state.stickerStyle}`);
  }
}

// ── Preset logo SVGs ────────────────────────────────────────────
const PRESET_LOGO_SVG = {
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><radialGradient id="ig" cx="30%" cy="107%" r="150%"><stop offset="0%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
  whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>`,
  tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  'scan-me': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><rect width="60" height="60" rx="10" fill="#111"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial,sans-serif" font-size="10" font-weight="bold">SCAN ME</text></svg>`,
  camera: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.5"><path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"/></svg>`,
};

// Convert SVG string to Data URL
function svgToDataURL(svgStr) {
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
}

// ── Preset logo picker ─────────────────────────────────────────
$$('.preset-logo-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.logo;
    if (key === 'custom') {
      $('logoFile').click();
      return;
    }
    $$('.preset-logo-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const svg = PRESET_LOGO_SVG[key];
    if (!svg) return;
    state.logoDataURL = svgToDataURL(svg);
    $('logoPreviewImg').src = state.logoDataURL;
    $('dropContent').style.display = 'none';
    $('logoPreviewWrap').style.display = 'flex';
    state.savedEcLevel = $('ecLevel').value;
    $('ecLevel').value = 'H';
    scheduleQR();
  });
});

// ── Custom logo upload ─────────────────────────────────────────
const logoDropZone = $('logoDropZone');
const logoFile     = $('logoFile');

$('logoPickBtn').addEventListener('click', e => { e.stopPropagation(); logoFile.click(); });
logoDropZone.addEventListener('click', () => { if (!state.logoDataURL) logoFile.click(); });
logoDropZone.addEventListener('dragover', e => { e.preventDefault(); logoDropZone.classList.add('drag-over'); });
logoDropZone.addEventListener('dragleave', () => logoDropZone.classList.remove('drag-over'));
logoDropZone.addEventListener('drop', e => {
  e.preventDefault(); logoDropZone.classList.remove('drag-over');
  const f = e.dataTransfer.files[0];
  if (f && f.type.startsWith('image/')) loadLogo(f);
});
logoFile.addEventListener('change', e => { if (e.target.files[0]) loadLogo(e.target.files[0]); });

function loadLogo(file) {
  const reader = new FileReader();
  reader.onload = evt => {
    state.logoDataURL = evt.target.result;
    $('logoPreviewImg').src = state.logoDataURL;
    $('dropContent').style.display = 'none';
    $('logoPreviewWrap').style.display = 'flex';
    $$('.preset-logo-btn').forEach(b => b.classList.remove('active'));
    state.savedEcLevel = $('ecLevel').value;
    $('ecLevel').value = 'H';
    showToast('✓ Logo ajouté — correction H activée');
    scheduleQR();
  };
  reader.readAsDataURL(file);
}

$('removeLogo').addEventListener('click', e => {
  e.stopPropagation();
  state.logoDataURL = null;
  logoFile.value = '';
  $('dropContent').style.display = 'flex';
  $('logoPreviewWrap').style.display = 'none';
  $$('.preset-logo-btn').forEach(b => b.classList.remove('active'));
  if (state.savedEcLevel) { $('ecLevel').value = state.savedEcLevel; state.savedEcLevel = null; }
  scheduleQR();
});

$('logoSize').addEventListener('input', e => {
  state.logoSize = parseInt(e.target.value);
  $('logoSizeVal').textContent = state.logoSize;
  scheduleQR();
});

// ── File mode tabs ─────────────────────────────────────────────
$$('.file-mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.file-mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.fileMode = btn.dataset.mode;
    $('filemode-embed').style.display  = state.fileMode === 'embed'  ? 'block' : 'none';
    $('filemode-upload').style.display = state.fileMode === 'upload' ? 'block' : 'none';
  });
});

// ── File embed ─────────────────────────────────────────────────
const fileQrDrop   = $('fileQrDrop');
const fileQrInput  = $('fileQrInput');
const fileQrIdle   = $('fileQrIdle');
const fileQrLoaded = $('fileQrLoaded');

$('fileQrPickBtn').addEventListener('click', e => { e.stopPropagation(); fileQrInput.click(); });
fileQrDrop.addEventListener('click', () => { if (fileQrLoaded.style.display === 'none') fileQrInput.click(); });
fileQrDrop.addEventListener('dragover', e => { e.preventDefault(); fileQrDrop.classList.add('drag-over'); });
fileQrDrop.addEventListener('dragleave', () => fileQrDrop.classList.remove('drag-over'));
fileQrDrop.addEventListener('drop', e => {
  e.preventDefault(); fileQrDrop.classList.remove('drag-over');
  const f = e.dataTransfer.files[0]; if (f) handleFileQr(f);
});
fileQrInput.addEventListener('change', e => { if (e.target.files[0]) handleFileQr(e.target.files[0]); });

function handleFileQr(file) {
  const isPDF = file.type === 'application/pdf';
  const isImg = file.type.startsWith('image/');
  if (!isPDF && !isImg) { showToast('⚠ Format non supporté'); return; }
  $('fileQrName').textContent = file.name.length > 36 ? file.name.slice(0, 33) + '…' : file.name;
  $('fileQrSize').textContent = formatBytes(file.size);
  $('fileQrIcon').textContent = isPDF ? '📄' : '🖼️';
  const tooBig = file.size > 2195;
  $('fileQrWarning').style.display = tooBig ? 'flex' : 'none';
  $('fileQrEncode').disabled = tooBig;
  state.pendingFile = file;
  state.pendingFileName = file.name;
  fileQrIdle.style.display = 'none';
  fileQrLoaded.style.display = 'flex';
}

$('fileQrEncode').addEventListener('click', () => {
  const file = state.pendingFile;
  if (!file || file.size > 2195) return;
  const reader = new FileReader();
  reader.onload = evt => {
    state._fileContent = evt.target.result;
    $('ecLevel').value = 'L';
    scheduleQR();
    showToast('✓ Fichier encodé');
  };
  reader.readAsDataURL(file);
});

$('fileQrRemove').addEventListener('click', e => {
  e.stopPropagation();
  state.pendingFile = null; state._fileContent = '';
  fileQrInput.value = '';
  fileQrIdle.style.display = 'flex';
  fileQrLoaded.style.display = 'none';
  scheduleQR();
});

// ── File.io upload ─────────────────────────────────────────────
const fileIoDrop   = $('fileIoDrop');
const fileIoInput  = $('fileIoInput');
const fileIoIdle   = $('fileIoIdle');
const fileIoLoaded = $('fileIoLoaded');

$('fileIoPickBtn').addEventListener('click', e => { e.stopPropagation(); fileIoInput.click(); });
fileIoDrop.addEventListener('click', e => { 
  if (!e.target.closest('#fileIoLoaded')) fileIoInput.click(); 
});
fileIoDrop.addEventListener('dragover', e => { e.preventDefault(); fileIoDrop.classList.add('drag-over'); });
fileIoDrop.addEventListener('dragleave', () => fileIoDrop.classList.remove('drag-over'));
fileIoDrop.addEventListener('drop', e => {
  e.preventDefault(); fileIoDrop.classList.remove('drag-over');
  const f = e.dataTransfer.files[0]; if (f) handleFileIo(f);
});
fileIoInput.addEventListener('change', e => { if (e.target.files[0]) handleFileIo(e.target.files[0]); });

function handleFileIo(file) {
  $('fileIoName').textContent = file.name.length > 36 ? file.name.slice(0, 33) + '…' : file.name;
  $('fileIoSize').textContent = formatBytes(file.size);
  $('fileIoIcon').textContent = file.type === 'application/pdf' ? '📄' : file.type.startsWith('image/') ? '🖼️' : '📁';
  state.pendingFileIo = file;
  fileIoIdle.style.display = 'none';
  fileIoLoaded.style.display = 'flex';
  $('fileIoProgress').style.display = 'none';
  $('fileIoResult').style.display = 'none';
}

$('fileIoUpload').addEventListener('click', async () => {
  const file = state.pendingFileIo;
  if (!file) return;

  $('fileIoUpload').disabled = true;
  $('fileIoProgress').style.display = 'flex';
  $('fileIoResult').style.display = 'none';
  $('progressFill').style.width = '10%';
  $('progressLabel').textContent = 'Envoi vers file.io…';

  try {
    const formData = new FormData();
    formData.append('file', file);

    // file.io supports CORS natively — use fetch for cleaner handling
    const response = await fetch('https://file.io/?expires=14d', {
      method: 'POST',
      body: formData,
    });

    $('progressFill').style.width = '90%';

    if (!response.ok) {
      throw new Error(`Erreur serveur : ${response.status}`);
    }

    const data = await response.json();
    $('progressFill').style.width = '100%';

    if (!data.success || !data.link) {
      throw new Error(data.message || 'file.io n\'a pas retourné de lien');
    }

    $('progressLabel').textContent = '✓ Upload terminé !';
    $('fileIoLink').href = data.link;
    $('fileIoLink').textContent = data.link;
    $('fileIoResult').style.display = 'flex';

    // Switch to URL type with the generated link
    $$('.type-btn')[0].click();
    $('urlInput').value = data.link;
    scheduleQR();
    showToast('✓ Fichier hébergé — QR code généré !');

  } catch(err) {
    // Distinguish CORS / network errors from API errors
    const isCors = err instanceof TypeError && err.message.includes('fetch');
    $('progressFill').style.width = '0%';
    if (isCors) {
      $('progressLabel').textContent = '⚠ Bloqué par le navigateur (CORS) — voir ci-dessous';
      // Show manual fallback
      $('fileIoResult').style.display = 'flex';
      $('fileIoLink').href = 'https://file.io';
      $('fileIoLink').textContent = 'Uploadez manuellement sur file.io →';
      $('fileIoResult').querySelector('.result-ok').textContent =
        '⚠ Votre navigateur bloque l\'upload direct. Uploadez le fichier sur file.io ou Google Drive, puis collez le lien dans le champ URL.';
    } else {
      $('progressLabel').textContent = '⚠ ' + err.message;
    }
    showToast('⚠ ' + err.message, 4000);
  } finally {
    $('fileIoUpload').disabled = false;
  }
});

// ── QR Generation ──────────────────────────────────────────────
let qrTimer;
function scheduleQR() {
  clearTimeout(qrTimer);
  qrTimer = setTimeout(generateQR, 120);
}

async function generateQR() {
  const text = state.currentType === 'file' ? (state._fileContent || '') : buildQRContent();
  const size  = parseInt($('qrSize').value) || 300;
  const ec    = $('ecLevel').value;
  const fg    = $('fgColor').value;
  const bg    = $('bgColor').value;

  const output      = $('qrOutput');
  const placeholder = $('qrPlaceholder');
  const meta        = $('qrMeta');

  if (!text) {
    output.innerHTML = '';
    placeholder.style.display = 'flex';
    meta.style.display = 'none';
    setExportEnabled(false);
    return;
  }

  placeholder.style.display = 'none';
  output.innerHTML = '';

  try {
    // Generate base QR via library (hidden)
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;pointer-events:none;';
    document.body.appendChild(tempDiv);

    await new Promise(resolve => {
      new QRCode(tempDiv, {
        text, width: size, height: size,
        colorDark: fg, colorLight: bg,
        correctLevel: QRCode.CorrectLevel[ec],
      });
      setTimeout(resolve, 50);
    });

    const srcCanvas = tempDiv.querySelector('canvas');
    if (!srcCanvas) { document.body.removeChild(tempDiv); throw new Error('No canvas'); }

    // Redraw with corner styles
    const styledCanvas = applyCornerStyle(srcCanvas, fg, bg, state.cornerStyle);
    document.body.removeChild(tempDiv);

    // Composite logo
    let finalCanvas = state.logoDataURL
      ? await compositeWithLogo(styledCanvas, state.logoDataURL, state.logoSize)
      : styledCanvas;

    // Display
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width  = finalCanvas.width;
    displayCanvas.height = finalCanvas.height;
    displayCanvas.getContext('2d').drawImage(finalCanvas, 0, 0);
    output.appendChild(displayCanvas);

    // Cache
    state.currentPNG    = finalCanvas.toDataURL('image/png');
    state.currentSVGRaw = buildSVG(finalCanvas, fg, bg, text, size);
    state.lastText = text; state.lastSize = size;
    state.lastFg = fg; state.lastBg = bg; state.lastEc = ec;

    $('metaChars').textContent = `${text.length} car.`;
    $('metaSize').textContent  = `${size}×${size}px`;
    $('metaLevel').textContent = `EC: ${ec}`;
    meta.style.display = 'flex';
    setExportEnabled(true);

  } catch(err) {
    output.innerHTML = `<div style="color:var(--danger);font-family:var(--font-mono);font-size:12px;padding:20px;text-align:center;">Erreur : ${err.message}</div>`;
    setExportEnabled(false);
  }
}

// ── Corner style renderer ──────────────────────────────────────
function applyCornerStyle(srcCanvas, fg, bg, style) {
  if (style === 'square') return srcCanvas;

  const w = srcCanvas.width;
  const h = srcCanvas.height;
  const ctx0 = srcCanvas.getContext('2d');
  const img  = ctx0.getImageData(0, 0, w, h);

  const out = document.createElement('canvas');
  out.width = w; out.height = h;
  const ctx = out.getContext('2d');

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = fg;

  // ── Robust module size detection ──────────────────────────────
  // Strategy: scan multiple rows near top (finder pattern area).
  // The top-left finder pattern always starts at quiet-zone offset.
  // Quiet zone = 4 modules. First finder bar = 7 modules wide, all dark.
  // So: scan top 15% rows, find the longest uninterrupted dark run = 7 modules.
  // Divide by 7 = module size.
  const moduleSize = detectModuleSizeRobust(img, w, h);
  if (!moduleSize || moduleSize < 1) { ctx.drawImage(srcCanvas, 0, 0); return out; }

  const cols = Math.round(w / moduleSize);
  const rows = Math.round(h / moduleSize);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Sample center pixel of module
      const px = Math.min(Math.round(col * moduleSize + moduleSize / 2), w - 1);
      const py = Math.min(Math.round(row * moduleSize + moduleSize / 2), h - 1);
      const isDark = img.data[(py * w + px) * 4] < 128;
      if (!isDark) continue;
      drawModule(ctx, col * moduleSize, row * moduleSize, moduleSize, style);
    }
  }
  return out;
}

function detectModuleSizeRobust(img, w, h) {
  const data = img.data;

  // Scan rows in the top 20% to find finder pattern dark bar
  // The finder pattern top row is: 7 consecutive dark modules
  // We look for the longest consecutive dark run and divide by 7
  const scanRows = Math.floor(h * 0.20);
  let bestRun = 0;

  for (let y = 0; y < scanRows; y++) {
    let run = 0, maxRun = 0;
    for (let x = 0; x < w; x++) {
      const dark = data[(y * w + x) * 4] < 128;
      if (dark) { run++; maxRun = Math.max(maxRun, run); }
      else run = 0;
    }
    if (maxRun > bestRun) bestRun = maxRun;
  }

  if (bestRun >= 7) return Math.round(bestRun / 7);

  // Fallback: scan left column for first dark run (quiet zone skip)
  const midY = Math.floor(h * 0.1);
  let firstDark = -1, firstLight = -1;
  for (let x = 0; x < w; x++) {
    const dark = data[(midY * w + x) * 4] < 128;
    if (dark && firstDark < 0) firstDark = x;
    else if (!dark && firstDark >= 0) { firstLight = x; break; }
  }
  if (firstDark >= 0 && firstLight > firstDark) return firstLight - firstDark;

  return Math.round(w / 33); // last resort
}

function drawModule(ctx, x, y, s, style) {
  if (style === 'heart') {
    drawHeart(ctx, x, y, s, s);
    ctx.fill();
    return;
  }
  // For rounded styles: no padding so modules fill their cell fully except for corners
  if (style === 'rounded') {
    const r = s * 0.22;
    roundRect(ctx, x, y, s, s, r);
    ctx.fill();
  } else if (style === 'extra-rounded') {
    const r = s * 0.38;
    roundRect(ctx, x, y, s, s, r);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, s, s);
  }
}

function drawHeart(ctx, x, y, w, h) {
  // Clean mathematical heart using cubic bezier — properly centered
  const cx = x + w / 2;
  const top = y + h * 0.27;
  const bot = y + h * 0.95;
  const lx  = x + w * 0.05;
  const rx  = x + w * 0.95;
  const lcp = x + w * 0.08; // left control inner
  const rcp = x + w * 0.92; // right control inner

  ctx.beginPath();
  // Start at bottom tip
  ctx.moveTo(cx, bot);
  // Left side: bottom tip → left bump
  ctx.bezierCurveTo(lx + w * 0.05, y + h * 0.75, lx, y + h * 0.5, lx, top + h * 0.03);
  // Left top arc
  ctx.bezierCurveTo(lx, y + h * 0.05, lcp + w * 0.1, y, cx - w * 0.02, top);
  // Right top arc (mirror)
  ctx.bezierCurveTo(cx + w * 0.02, y, rcp - w * 0.1, y + h * 0.05, rx, top + h * 0.03);
  // Right side: right bump → bottom tip
  ctx.bezierCurveTo(rx, y + h * 0.5, rx - w * 0.05, y + h * 0.75, cx, bot);
  ctx.closePath();
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function compositeWithLogo(srcCanvas, logoURL, logoPercent) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = srcCanvas.width; canvas.height = srcCanvas.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(srcCanvas, 0, 0);
      const logoW = Math.round(srcCanvas.width * logoPercent / 100);
      const logoH = Math.round(logoW * img.naturalHeight / img.naturalWidth);
      const x = (canvas.width  - logoW) / 2;
      const y = (canvas.height - logoH) / 2;
      const pad = 6;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(x - pad, y - pad, logoW + pad * 2, logoH + pad * 2, 4);
      ctx.fill();
      ctx.drawImage(img, x, y, logoW, logoH);
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = logoURL;
  });
}

function buildSVG(canvas, fg, bg, text, size) {
  const dataURL = canvas.toDataURL('image/png');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${bg}"/><image href="${dataURL}" width="${size}" height="${size}"/></svg>`;
}

function setExportEnabled(enabled) {
  ['dlPNG','dlSVG','dlPDF','saveHistory'].forEach(id => { $(id).disabled = !enabled; });
}

// ── Downloads ──────────────────────────────────────────────────
$('dlPNG').addEventListener('click', () => {
  if (!state.currentPNG) return;
  downloadURL(state.currentPNG, `qrforge-${slugify(state.lastText)}.png`);
  showToast('✓ PNG téléchargé');
});

$('dlSVG').addEventListener('click', () => {
  if (!state.currentSVGRaw) return;
  const blob = new Blob([state.currentSVGRaw], { type: 'image/svg+xml' });
  downloadURL(URL.createObjectURL(blob), `qrforge-${slugify(state.lastText)}.svg`);
  showToast('✓ SVG téléchargé');
});

$('dlPDF').addEventListener('click', async () => {
  if (!state.currentPNG) return;
  try {
    const { jsPDF } = window.jspdf;
    const mmSize = Math.min(state.lastSize / 3.7795, 180);
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const x = (pageW - mmSize) / 2;
    const y = (pageH - mmSize) / 2 - 15;
    doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
    doc.text('QRFORGE', pageW / 2, 20, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(120);
    doc.text(($('qrLabel').value || state.lastText).substring(0, 80), pageW / 2, 27, { align: 'center' });
    doc.addImage(state.currentPNG, 'PNG', x, y, mmSize, mmSize);
    doc.setFontSize(8); doc.setTextColor(160);
    doc.text('Généré par QRFORGE', pageW / 2, pageH - 12, { align: 'center' });
    doc.save(`qrforge-${slugify(state.lastText)}.pdf`);
    showToast('✓ PDF téléchargé');
  } catch(e) { showToast('⚠ Erreur PDF'); }
});

// ── History ────────────────────────────────────────────────────
const HISTORY_KEY = 'qrforge-history';
function getHistory() { try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch { return []; } }

$('saveHistory').addEventListener('click', () => {
  if (!state.currentPNG) return;
  const label = $('qrLabel').value || state.lastText;
  const hist  = getHistory();
  hist.unshift({ id: Date.now(), label, content: state.lastText, png: state.currentPNG,
    date: new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }),
    fg: state.lastFg, bg: state.lastBg });
  if (hist.length > 50) hist.length = 50;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(hist));
  showToast('✓ Sauvegardé dans l\'historique');
});

function renderHistory() {
  const hist  = getHistory();
  const grid  = $('historyGrid');
  const empty = $('historyEmpty');
  $('historyCount').textContent = `${hist.length} entrée${hist.length !== 1 ? 's' : ''}`;
  if (!hist.length) { grid.innerHTML = ''; grid.appendChild(empty); return; }
  grid.innerHTML = '';
  hist.forEach((entry, idx) => {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.style.animationDelay = `${idx * 30}ms`;
    card.innerHTML = `
      <div class="history-card-img"><img src="${entry.png}" alt="${entry.label}" style="max-width:160px;max-height:160px;" /></div>
      <div class="history-card-body">
        <div class="history-card-label">${entry.label}</div>
        <div class="history-card-content">${entry.content.substring(0, 60)}</div>
        <div class="history-card-date">${entry.date}</div>
        <div class="history-card-actions">
          <button class="hist-action-btn" data-action="download" data-id="${entry.id}">↓ PNG</button>
          <button class="hist-action-btn" data-action="load" data-id="${entry.id}">↗ Charger</button>
          <button class="hist-action-btn" data-action="pdf" data-id="${entry.id}">↓ PDF</button>
          <button class="hist-action-btn delete" data-action="delete" data-id="${entry.id}">✕ Sup.</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  grid.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const entry = getHistory().find(h => h.id === id);
    if (!entry) return;
    if (btn.dataset.action === 'download') { downloadURL(entry.png, `qrforge-${slugify(entry.content)}.png`); showToast('✓ PNG téléchargé'); }
    else if (btn.dataset.action === 'load') {
      $$('.nav-tab')[0].click(); $$('.type-btn')[0].click();
      $('urlInput').value = entry.content; $('qrLabel').value = entry.label;
      $('fgColor').value = entry.fg || '#000000'; $('bgColor').value = entry.bg || '#ffffff';
      $('fgColorVal').textContent = entry.fg || '#000000'; $('bgColorVal').textContent = entry.bg || '#ffffff';
      scheduleQR(); showToast('↗ QR code chargé');
    }
    else if (btn.dataset.action === 'pdf') { exportHistoryPDF(entry); }
    else if (btn.dataset.action === 'delete') {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(getHistory().filter(h => h.id !== id)));
      renderHistory(); showToast('✓ Supprimé');
    }
  });
}

async function exportHistoryPDF(entry) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
    doc.text('QRFORGE', pageW / 2, 20, { align: 'center' });
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(120);
    doc.text(entry.label.substring(0, 80), pageW / 2, 27, { align: 'center' });
    doc.addImage(entry.png, 'PNG', (pageW - 100) / 2, 40, 100, 100);
    doc.setFontSize(8); doc.setTextColor(160);
    doc.text('Généré par QRFORGE', pageW / 2, pageH - 12, { align: 'center' });
    doc.save(`qrforge-${slugify(entry.content)}.pdf`);
    showToast('✓ PDF téléchargé');
  } catch(e) { showToast('⚠ Erreur PDF'); }
}

$('clearHistory').addEventListener('click', () => {
  if (!confirm('Effacer tout l\'historique ?')) return;
  localStorage.removeItem(HISTORY_KEY); renderHistory(); showToast('✓ Historique effacé');
});

// ── Batch ──────────────────────────────────────────────────────
$('generateBatch').addEventListener('click', generateBatch);

async function generateBatch() {
  const raw = $('batchInput').value.trim();
  if (!raw) { showToast('⚠ Entrez au moins une ligne'); return; }
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 10);
  const fg = $('batchFg').value, bg = $('batchBg').value;
  const size = parseInt($('batchSize').value) || 200;
  const grid = $('batchGrid');
  grid.innerHTML = ''; state.batchItems = [];
  $('batchCountNum').textContent = lines.length;

  for (let i = 0; i < lines.length; i++) {
    const text = lines[i];
    const item = document.createElement('div');
    item.className = 'batch-item'; item.style.animationDelay = `${i * 60}ms`;
    const canvas = await generateBatchQR(text, size, fg, bg);
    const png = canvas.toDataURL('image/png');
    state.batchItems.push({ text, png, canvas });
    const label = document.createElement('div'); label.className = 'batch-item-label'; label.textContent = text;
    const dlBtn = document.createElement('button'); dlBtn.className = 'batch-dl-btn'; dlBtn.dataset.idx = i; dlBtn.textContent = '↓ PNG';
    item.appendChild(canvas); item.appendChild(label); item.appendChild(dlBtn); grid.appendChild(item);
  }

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.batch-dl-btn');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx);
    const item = state.batchItems[idx];
    if (item) { downloadURL(item.png, `qrforge-batch-${idx+1}.png`); showToast(`✓ QR #${idx+1} téléchargé`); }
  });
  showToast(`✓ ${lines.length} QR codes générés`);
}

function generateBatchQR(text, size, fg, bg) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;pointer-events:none;';
    document.body.appendChild(div);
    try {
      new QRCode(div, { text, width: size, height: size, colorDark: fg, colorLight: bg, correctLevel: QRCode.CorrectLevel.M });
      setTimeout(() => {
        const canvas = div.querySelector('canvas');
        if (!canvas) { document.body.removeChild(div); reject(new Error('No canvas')); return; }
        const out = document.createElement('canvas');
        out.width = canvas.width; out.height = canvas.height;
        out.getContext('2d').drawImage(canvas, 0, 0);
        document.body.removeChild(div); resolve(out);
      }, 60);
    } catch(e) { document.body.removeChild(div); reject(e); }
  });
}

$('downloadAllPNG').addEventListener('click', async () => {
  if (!state.batchItems.length) { showToast('⚠ Générez d\'abord'); return; }
  for (let i = 0; i < state.batchItems.length; i++) { await sleep(100); downloadURL(state.batchItems[i].png, `qrforge-batch-${i+1}.png`); }
  showToast(`✓ ${state.batchItems.length} PNG téléchargés`);
});

$('downloadBatchPDF').addEventListener('click', async () => {
  if (!state.batchItems.length) { showToast('⚠ Générez d\'abord'); return; }
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth(), pageH = doc.internal.pageSize.getHeight();
    const cols = 2, rows = 3, perPage = cols * rows, margin = 15;
    const cellW = (pageW - margin * 2) / cols, cellH = (pageH - margin * 2 - 20) / rows;
    const qrW = Math.min(cellW - 10, cellH - 14);
    state.batchItems.forEach((item, i) => {
      if (i > 0 && i % perPage === 0) doc.addPage();
      const col = i % cols, row = Math.floor((i % perPage) / cols);
      const x = margin + col * cellW + (cellW - qrW) / 2, y = margin + 10 + row * cellH + 5;
      if (i % perPage === 0) { doc.setFont('helvetica','bold'); doc.setFontSize(12); doc.setTextColor(30); doc.text('QRFORGE — Batch', pageW/2, 10, {align:'center'}); }
      doc.addImage(item.png, 'PNG', x, y, qrW, qrW);
      doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(100);
      doc.text(item.text.substring(0, 40), x + qrW/2, y + qrW + 4, {align:'center'});
    });
    doc.save('qrforge-batch.pdf'); showToast('✓ PDF batch téléchargé');
  } catch(e) { showToast('⚠ Erreur PDF'); }
});

// ── Utils ──────────────────────────────────────────────────────
function downloadURL(url, filename) { const a = document.createElement('a'); a.href = url; a.download = filename; a.click(); }
function slugify(str) { return (str||'qrcode').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').substring(0,40)||'qrcode'; }
function formatBytes(b) { if (b < 1024) return b+' o'; if (b < 1048576) return (b/1024).toFixed(1)+' Ko'; return (b/1048576).toFixed(1)+' Mo'; }
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── Init ───────────────────────────────────────────────────────
renderHistory();
