/* -------------------------------
   Paws & Smile Foundation - Script
   ------------------------------- */

// 🌿 Smooth scroll for same-page anchor links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (a) {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', '#' + id);
    }
  }
});

// ✉️ Simple contact form handler (mailto fallback)
const form = document.querySelector('form[data-form="contact"]');
if (form) {
  form.addEventListener('submit', (e) => {
    const endpoint = form.getAttribute('action');
    if (endpoint && !endpoint.startsWith('mailto:')) return; // formspree/emailjs
    e.preventDefault();
    const fd = new FormData(form);
    const body = [...fd.entries()]
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    window.location.href = `mailto:${form.dataset.email}?subject=New message from website&body=${encodeURIComponent(
      body
    )}`;
  });
}

/* ----------------------------------------------------
   🪪 Certificate QR Generator (Two-QR System)
   ---------------------------------------------------- */

(async function () {
  // Configurations
  const QR_PIXEL_SIZE = 110; // main QR size
  const BASE_CERT_URL =
    location.origin + location.pathname.replace(/[^\/]*$/, '') + 'certificate.html';

  // Helper for URL parameters
  function qParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  const id = qParam('id');
  const nameFromUrl = qParam('name');
  let memberName = nameFromUrl || 'Volunteer Name';

  // Optional: fetch members.json if you use IDs
  if (id && !nameFromUrl) {
    try {
      const res = await fetch('members.json', { cache: 'no-store' });
      if (res.ok) {
        const arr = await res.json();
        const found = arr.find((x) => x.id === id || x.name === id);
        if (found && found.name) memberName = found.name;
      }
    } catch (e) {
      memberName = id || memberName;
    }
  }

  // Update Name text
  const nameText = document.getElementById('nameText');
  if (nameText) nameText.textContent = memberName;

  // === 1️⃣ Main QR (already part of design) ===
  // This QR overlays main background QR area (optional if background already has one)
  const qrContainer = document.getElementById('qrContainer');
  if (qrContainer) {
    qrContainer.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.width = QR_PIXEL_SIZE;
    canvas.height = QR_PIXEL_SIZE;
    new QRious({
      element: canvas,
      value: id
        ? BASE_CERT_URL + '?id=' + encodeURIComponent(id)
        : 'Certificate of ' + memberName,
      size: QR_PIXEL_SIZE,
      level: 'H',
    });
    qrContainer.appendChild(canvas);
  }

  // === 2️⃣ Member-Specific Small QR (next to name) ===
  const memberQrContainer = document.getElementById('memberQr');
  if (memberQrContainer) {
    memberQrContainer.innerHTML = '';
    const smallCanvas = document.createElement('canvas');
    smallCanvas.width = 60;
    smallCanvas.height = 60;
    new QRious({
      element: smallCanvas,
      value:
        'Member: ' +
        memberName +
        ' | Verified Link: ' +
        (id ? BASE_CERT_URL + '?id=' + id : BASE_CERT_URL),
      size: 60,
      level: 'H',
    });
    memberQrContainer.appendChild(smallCanvas);
  }

  // === 3️⃣ Download Buttons ===
  const btnPng = document.getElementById('downloadPng');
  const btnPdf = document.getElementById('downloadPdf');
  const certElem = document.getElementById('certificate');

  if (btnPng && certElem) {
    btnPng.addEventListener('click', async () => {
      const cnv = await html2canvas(certElem, { scale: 2, useCORS: true });
      const link = document.createElement('a');
      link.download = (id || memberName).replace(/\s+/g, '_') + '-certificate.png';
      link.href = cnv.toDataURL('image/png');
      link.click();
    });
  }

  if (btnPdf && certElem) {
    btnPdf.addEventListener('click', async () => {
      const cnv = await html2canvas(certElem, { scale: 2, useCORS: true });
      const imgData = cnv.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: 'px', format: [cnv.width, cnv.height] });
      pdf.addImage(imgData, 'PNG', 0, 0, cnv.width, cnv.height);
      pdf.save((id || memberName).replace(/\s+/g, '_') + '-certificate.pdf');
    });
  }
})();
