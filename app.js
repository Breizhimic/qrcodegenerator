/* ============================================================
   QRFORGE — Application Logic
   ============================================================ */

'use strict';

// ── State ──────────────────────────────────────────────────
const state = {
  qrInstance: null,
  logoDataURL: null,
  logoSize: 25,
  currentPNG: null,
  currentSVG: null,
  batchItems: [],
};

// ── DOM refs ────────────────────────────────────────────────
const $  = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

// ── Theme ────────────────────────────────────────────────────
const themeToggle = $('themeToggle');
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('qrforge-theme', theme);
}

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

// Restore saved theme
const savedTheme = localStorage.getItem('qrforge-theme') || 'dark';
setTheme(savedTheme);

// ── Tab Navigation ──────────────────────────────────────────
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

// ── Toast ───────────────────────────────────────────────────
let toastTimer;
function showToast(msg, duration = 2500) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}

// ── Color pickers ────────────────────────────────────────────
$('fgColor').addEventListener('input', e => {
  $('fgColorVal').textContent = e.target.value;
  scheduleQR();
});
$('bgColor').addEventListener('input', e => {
  $('bgColorVal').textContent = e.target.value;
  scheduleQR();
});

// ── Presets ──────────────────────────────────────────────────
$$('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = $('qrInput');
    if (btn.dataset.presetType === 'email') {
      input.value = '';
      input.placeholder = 'contact@exemple.com';
      input.focus();
      // Show inline prompt
      showToast('Entrez une adresse email');
      return;
    }
    input.value = btn.dataset.preset;
    input.focus();
    scheduleQR();
  });
});

// ── Logo Upload ──────────────────────────────────────────────
const logoDropZone = $('logoDropZone');
const logoFile = $('logoFile');

$('logoPickBtn').addEventListener('click', e => {
  e.stopPropagation();
  logoFile.click();
});

logoDropZone.addEventListener('click', () => {
  if (!state.logoDataURL) logoFile.click();
});

logoDropZone.addEventListener('dragover', e => {
  e.preventDefault();
  logoDropZone.classList.add('drag-over');
});

logoDropZone.addEventListener('dragleave', () => {
  logoDropZone.classList.remove('drag-over');
});

logoDropZone.addEventListener('drop', e => {
  e.preventDefault();
  logoDropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadLogo(file);
});

logoFile.addEventListener('change', e => {
  if (e.target.files[0]) loadLogo(e.target.files[0]);
});

function loadLogo(file) {
  const reader = new FileReader();
  reader.onload = evt => {
    state.logoDataURL = evt.target.result;
    $('logoPreviewImg').src = state.logoDataURL;
    $('dropContent').style.display = 'none';
    $('logoPreviewWrap').style.display = 'flex';
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
  scheduleQR();
});

$('logoSize').addEventListener('input', e => {
  state.logoSize = parseInt(e.target.value);
  $('logoSizeVal').textContent = state.logoSize;
  scheduleQR();
});

// ── QR Generation (live) ─────────────────────────────────────
let qrTimer;

function scheduleQR() {
  clearTimeout(qrTimer);
  qrTimer = setTimeout(generateQR, 120);
}

// Input listeners
['qrInput', 'qrSize', 'ecLevel'].forEach(id => {
  const el = $(id);
  el.addEventListener('input', scheduleQR);
  el.addEventListener('change', scheduleQR);
});

async function generateQR() {
  let text = $('qrInput').value.trim();
  // Auto-prefix mailto: for bare email addresses
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    text = 'mailto:' + text;
  }
  const size = parseInt($('qrSize').value) || 300;
  const ec   = $('ecLevel').value;
  const fg   = $('fgColor').value;
  const bg   = $('bgColor').value;

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
    // Generate via QRCode.js into a hidden offscreen div
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;pointer-events:none;';
    document.body.appendChild(tempDiv);

    await new Promise((resolve) => {
      new QRCode(tempDiv, {
        text,
        width: size,
        height: size,
        colorDark: fg,
        colorLight: bg,
        correctLevel: QRCode.CorrectLevel[ec],
      });
      // QRCode.js generates synchronously but needs one tick
      setTimeout(resolve, 50);
    });

    // Get the canvas from temp
    const srcCanvas = tempDiv.querySelector('canvas');
    if (!srcCanvas) { document.body.removeChild(tempDiv); throw new Error('No canvas'); }

    // Clone canvas data before removing tempDiv
    const cloned = document.createElement('canvas');
    cloned.width  = srcCanvas.width;
    cloned.height = srcCanvas.height;
    cloned.getContext('2d').drawImage(srcCanvas, 0, 0);
    document.body.removeChild(tempDiv);

    // If logo, composite onto a new canvas
    let finalCanvas;
    if (state.logoDataURL) {
      finalCanvas = await compositeWithLogo(cloned, state.logoDataURL, state.logoSize);
    } else {
      finalCanvas = cloned;
    }

    // Clone canvas to output
    const displayCanvas = document.createElement('canvas');
    displayCanvas.width  = finalCanvas.width;
    displayCanvas.height = finalCanvas.height;
    displayCanvas.getContext('2d').drawImage(finalCanvas, 0, 0);
    output.appendChild(displayCanvas);

    // Cache for downloads
    state.currentPNG    = finalCanvas.toDataURL('image/png');
    state.currentSVGRaw = buildSVGFromCanvas(finalCanvas, fg, bg, text, size);
    state.lastText = text;
    state.lastSize = size;
    state.lastFg   = fg;
    state.lastBg   = bg;
    state.lastEc   = ec;

    // Meta
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

function compositeWithLogo(srcCanvas, logoURL, logoPercent) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = srcCanvas.width;
      canvas.height = srcCanvas.height;
      const ctx = canvas.getContext('2d');

      // Draw QR
      ctx.drawImage(srcCanvas, 0, 0);

      // Logo dimensions
      const logoW = Math.round(srcCanvas.width * logoPercent / 100);
      const logoH = Math.round(logoW * img.naturalHeight / img.naturalWidth);
      const x = (canvas.width  - logoW) / 2;
      const y = (canvas.height - logoH) / 2;

      // White padding behind logo
      const pad = 6;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(x - pad, y - pad, logoW + pad*2, logoH + pad*2, 4);
      ctx.fill();

      // Draw logo
      ctx.drawImage(img, x, y, logoW, logoH);
      resolve(canvas);
    };
    img.onerror = reject;
    img.src = logoURL;
  });
}

// Build a simple SVG (raster-embed approach for accuracy)
function buildSVGFromCanvas(canvas, fg, bg, text, size) {
  const dataURL = canvas.toDataURL('image/png');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <title>QR Code — ${text.substring(0, 60)}</title>
  <rect width="${size}" height="${size}" fill="${bg}"/>
  <image href="${dataURL}" width="${size}" height="${size}"/>
</svg>`;
}

function setExportEnabled(enabled) {
  ['dlPNG','dlSVG','dlPDF','saveHistory'].forEach(id => {
    $(id).disabled = !enabled;
  });
}

// ── Downloads ────────────────────────────────────────────────
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
    const size = state.lastSize || 300;
    const mmSize = Math.min(size / 3.7795, 180); // px to mm, max 180mm
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const x = (pageW - mmSize) / 2;
    const y = (pageH - mmSize) / 2 - 15;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('QRFORGE', pageW / 2, 20, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120);
    const label = $('qrLabel').value || state.lastText;
    doc.text(label.substring(0, 80), pageW / 2, 27, { align: 'center' });

    // QR
    doc.addImage(state.currentPNG, 'PNG', x, y, mmSize, mmSize);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(160);
    doc.text('Généré par QRFORGE — qrforge.app', pageW / 2, pageH - 12, { align: 'center' });

    doc.save(`qrforge-${slugify(state.lastText)}.pdf`);
    showToast('✓ PDF téléchargé');
  } catch(e) {
    showToast('⚠ Erreur PDF : ' + e.message);
  }
});

// ── History ──────────────────────────────────────────────────
const HISTORY_KEY = 'qrforge-history';

function getHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; }
  catch { return []; }
}

function saveToHistory(entry) {
  const hist = getHistory();
  hist.unshift(entry);
  if (hist.length > 50) hist.length = 50;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(hist));
}

$('saveHistory').addEventListener('click', () => {
  if (!state.currentPNG) return;
  const label = $('qrLabel').value || state.lastText;
  saveToHistory({
    id: Date.now(),
    label,
    content: state.lastText,
    png: state.currentPNG,
    date: new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }),
    fg: state.lastFg,
    bg: state.lastBg,
  });
  showToast('✓ Sauvegardé dans l\'historique');
  renderHistory();
});

function renderHistory() {
  const hist = getHistory();
  const grid = $('historyGrid');
  const empty = $('historyEmpty');
  $('historyCount').textContent = `${hist.length} entrée${hist.length !== 1 ? 's' : ''}`;

  if (!hist.length) {
    grid.innerHTML = '';
    grid.appendChild(empty);
    return;
  }

  grid.innerHTML = '';
  hist.forEach((entry, idx) => {
    const card = document.createElement('div');
    card.className = 'history-card';
    card.style.animationDelay = `${idx * 30}ms`;
    card.innerHTML = `
      <div class="history-card-img">
        <img src="${entry.png}" alt="${entry.label}" style="max-width:160px;max-height:160px;" />
      </div>
      <div class="history-card-body">
        <div class="history-card-label">${entry.label}</div>
        <div class="history-card-content">${entry.content}</div>
        <div class="history-card-date">${entry.date}</div>
        <div class="history-card-actions">
          <button class="hist-action-btn" data-action="download" data-id="${entry.id}">↓ PNG</button>
          <button class="hist-action-btn" data-action="load" data-id="${entry.id}">↗ Charger</button>
          <button class="hist-action-btn" data-action="pdf" data-id="${entry.id}">↓ PDF</button>
          <button class="hist-action-btn delete" data-action="delete" data-id="${entry.id}">✕ Sup.</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // History actions delegation
  grid.addEventListener('click', async e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const hist = getHistory();
    const entry = hist.find(h => h.id === id);
    if (!entry) return;

    if (btn.dataset.action === 'download') {
      downloadURL(entry.png, `qrforge-${slugify(entry.content)}.png`);
      showToast('✓ PNG téléchargé');
    } else if (btn.dataset.action === 'load') {
      // Switch to generator tab and load this entry
      $$('.nav-tab')[0].click();
      $('qrInput').value = entry.content;
      $('qrLabel').value = entry.label;
      $('fgColor').value = entry.fg || '#000000';
      $('bgColor').value = entry.bg || '#ffffff';
      $('fgColorVal').textContent = entry.fg || '#000000';
      $('bgColorVal').textContent = entry.bg || '#ffffff';
      scheduleQR();
      showToast('↗ QR code chargé');
    } else if (btn.dataset.action === 'pdf') {
      exportHistoryPDF(entry);
    } else if (btn.dataset.action === 'delete') {
      const newHist = hist.filter(h => h.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHist));
      renderHistory();
      showToast('✓ Supprimé');
    }
  }, { once: false });
}

async function exportHistoryPDF(entry) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('QRFORGE', pageW / 2, 20, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(entry.label.substring(0, 80), pageW / 2, 27, { align: 'center' });
    doc.addImage(entry.png, 'PNG', (pageW - 100) / 2, 40, 100, 100);
    doc.setFontSize(8);
    doc.setTextColor(160);
    doc.text('Généré par QRFORGE', pageW / 2, pageH - 12, { align: 'center' });
    doc.save(`qrforge-${slugify(entry.content)}.pdf`);
    showToast('✓ PDF téléchargé');
  } catch(e) {
    showToast('⚠ Erreur PDF');
  }
}

$('clearHistory').addEventListener('click', () => {
  if (!confirm('Effacer tout l\'historique ?')) return;
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
  showToast('✓ Historique effacé');
});

// ── BATCH ────────────────────────────────────────────────────
$('generateBatch').addEventListener('click', generateBatch);

async function generateBatch() {
  const raw = $('batchInput').value.trim();
  if (!raw) { showToast('⚠ Entrez au moins une URL'); return; }

  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean).slice(0, 10);
  const fg    = $('batchFg').value;
  const bg    = $('batchBg').value;
  const size  = parseInt($('batchSize').value) || 200;

  const grid = $('batchGrid');
  grid.innerHTML = '';
  state.batchItems = [];

  $('batchCountNum').textContent = lines.length;

  for (let i = 0; i < lines.length; i++) {
    const text = lines[i];
    const item = document.createElement('div');
    item.className = 'batch-item';
    item.style.animationDelay = `${i * 60}ms`;

    const canvas = await generateBatchQR(text, size, fg, bg);
    const png    = canvas.toDataURL('image/png');
    state.batchItems.push({ text, png, canvas });

    // Build item using DOM methods to avoid innerHTML overwriting the canvas
    const label = document.createElement('div');
    label.className = 'batch-item-label';
    label.textContent = text;

    const dlBtn = document.createElement('button');
    dlBtn.className = 'batch-dl-btn';
    dlBtn.dataset.idx = i;
    dlBtn.textContent = '↓ PNG';

    item.appendChild(canvas);
    item.appendChild(label);
    item.appendChild(dlBtn);
    grid.appendChild(item);
  }

  // Batch individual download
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.batch-dl-btn');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx);
    const item = state.batchItems[idx];
    if (item) {
      downloadURL(item.png, `qrforge-batch-${idx+1}-${slugify(item.text)}.png`);
      showToast(`✓ QR #${idx+1} téléchargé`);
    }
  });

  showToast(`✓ ${lines.length} QR codes générés`);
}

function generateBatchQR(text, size, fg, bg) {
  return new Promise((resolve, reject) => {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;pointer-events:none;';
    document.body.appendChild(div);
    try {
      new QRCode(div, {
        text, width: size, height: size,
        colorDark: fg, colorLight: bg,
        correctLevel: QRCode.CorrectLevel.M,
      });
      setTimeout(() => {
        const canvas = div.querySelector('canvas');
        if (!canvas) { document.body.removeChild(div); reject(new Error('No canvas')); return; }
        const out = document.createElement('canvas');
        out.width = canvas.width;
        out.height = canvas.height;
        out.getContext('2d').drawImage(canvas, 0, 0);
        document.body.removeChild(div);
        resolve(out);
      }, 60);
    } catch(e) {
      document.body.removeChild(div);
      reject(e);
    }
  });
}

$('downloadAllPNG').addEventListener('click', async () => {
  if (!state.batchItems.length) { showToast('⚠ Générez d\'abord les QR codes'); return; }
  for (let i = 0; i < state.batchItems.length; i++) {
    const item = state.batchItems[i];
    await sleep(100);
    downloadURL(item.png, `qrforge-batch-${i+1}.png`);
  }
  showToast(`✓ ${state.batchItems.length} PNG téléchargés`);
});

$('downloadBatchPDF').addEventListener('click', async () => {
  if (!state.batchItems.length) { showToast('⚠ Générez d\'abord les QR codes'); return; }
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();

    const cols = 2, rows = 3;
    const perPage = cols * rows;
    const margin = 15;
    const cellW = (pageW - margin * 2) / cols;
    const cellH = (pageH - margin * 2 - 20) / rows;
    const qrW = Math.min(cellW - 10, cellH - 14);

    state.batchItems.forEach((item, i) => {
      if (i > 0 && i % perPage === 0) {
        doc.addPage();
      }
      const col = i % cols;
      const row = Math.floor((i % perPage) / cols);
      const x = margin + col * cellW + (cellW - qrW) / 2;
      const y = margin + 10 + row * cellH + 5;

      if (i % perPage === 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(30);
        doc.text('QRFORGE — Batch Export', pageW / 2, 10, { align: 'center' });
      }

      doc.addImage(item.png, 'PNG', x, y, qrW, qrW);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(100);
      doc.text(item.text.substring(0, 40), x + qrW / 2, y + qrW + 4, { align: 'center' });
    });

    doc.save('qrforge-batch.pdf');
    showToast('✓ PDF batch téléchargé');
  } catch(e) {
    showToast('⚠ Erreur PDF');
  }
});

// ── Utilities ────────────────────────────────────────────────
function downloadURL(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}

function slugify(str) {
  return (str || 'qrcode')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 40) || 'qrcode';
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ── File → QR ─────────────────────────────────────────────────
const fileQrDrop    = $('fileQrDrop');
const fileQrInput   = $('fileQrInput');
const fileQrIdle    = $('fileQrIdle');
const fileQrLoaded  = $('fileQrLoaded');

$('fileQrPickBtn').addEventListener('click', e => { e.stopPropagation(); fileQrInput.click(); });
fileQrDrop.addEventListener('click', () => { if (!fileQrLoaded.style.display || fileQrLoaded.style.display === 'none') fileQrInput.click(); });

fileQrDrop.addEventListener('dragover', e => { e.preventDefault(); fileQrDrop.classList.add('drag-over'); });
fileQrDrop.addEventListener('dragleave', () => fileQrDrop.classList.remove('drag-over'));
fileQrDrop.addEventListener('drop', e => {
  e.preventDefault();
  fileQrDrop.classList.remove('drag-over');
  const f = e.dataTransfer.files[0];
  if (f) handleFileQr(f);
});

fileQrInput.addEventListener('change', e => { if (e.target.files[0]) handleFileQr(e.target.files[0]); });

function handleFileQr(file) {
  const isPDF  = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');
  if (!isPDF && !isImage) { showToast('⚠ Format non supporté (PDF ou image uniquement)'); return; }

  $('fileQrName').textContent = file.name.length > 36 ? file.name.substring(0, 33) + '…' : file.name;
  $('fileQrSize').textContent = formatBytes(file.size);
  $('fileQrIcon').textContent = isPDF ? '📄' : '🖼️';
  $('fileQrWarning').style.display = 'none';

  fileQrIdle.style.display   = 'none';
  fileQrLoaded.style.display = 'flex';

  // Store file for encoding
  state.pendingFile = file;
  state.pendingFileName = file.name;
}

$('fileQrEncode').addEventListener('click', () => {
  const file = state.pendingFile;
  if (!file) return;

  const reader = new FileReader();
  reader.onload = evt => {
    const dataURL = evt.target.result;
    // Warn if too large for QR
    const b64Len = dataURL.length;
    if (b64Len > 2953) { // QR code max ~2953 bytes for binary
      $('fileQrWarning').style.display = 'flex';
    }
    $('qrInput').value = dataURL;
    $('qrLabel').value = $('qrLabel').value || state.pendingFileName;
    $('qrInput').placeholder = 'Data URL du fichier encodé…';
    // Switch error correction to H for robustness
    $('ecLevel').value = 'H';
    scheduleQR();
    showToast('✓ Fichier encodé — aperçu généré');
  };
  reader.readAsDataURL(file);
});

$('fileQrRemove').addEventListener('click', e => {
  e.stopPropagation();
  state.pendingFile = null;
  fileQrInput.value = '';
  fileQrIdle.style.display   = 'flex';
  fileQrLoaded.style.display = 'none';
  $('fileQrWarning').style.display = 'none';
  $('qrInput').value = '';
  $('qrInput').placeholder = 'https://exemple.com\nou texte libre, email, téléphone...';
  scheduleQR();
});

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' o';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
}

// ── Init ─────────────────────────────────────────────────────
renderHistory();
