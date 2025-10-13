
// Smooth scroll for same-page anchor links
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(a){
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
      history.pushState(null, '', '#'+id);
    }
  }
});

// Simple contact form handler (mailto fallback)
const form = document.querySelector('form[data-form="contact"]');
if(form){
  form.addEventListener('submit', (e)=>{
    // If a data-endpoint is present, let the browser submit normally (to Formspree/EmailJS).
    const endpoint = form.getAttribute('action');
    if(endpoint && !endpoint.startsWith('mailto:')) return;
    e.preventDefault();
    const fd = new FormData(form);
    const body = [...fd.entries()].map(([k,v])=> `${k}: ${v}`).join('\n');
    window.location.href = `mailto:${form.dataset.email}?subject=New message from website&body=${encodeURIComponent(body)}`;
  });
}
const qrContainer = document.getElementById('qrContainer');
// Generate second (member) QR code — small QR near name
const memberQrContainer = document.getElementById('memberQr');
memberQrContainer.innerHTML = '';
const smallCanvas = document.createElement('canvas');
smallCanvas.width = 60;
smallCanvas.height = 60;
new QRious({
  element: smallCanvas,
  value: 'Member: ' + memberName + ' | Verified Link: ' + (id ? (BASE_CERT_URL + '?id=' + id) : BASE_CERT_URL),
  size: 60,
  level: 'H'
});
memberQrContainer.appendChild(smallCanvas);
