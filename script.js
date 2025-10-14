// script.js
(async function() {
  // Helper: get id param
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:150px'>Missing id parameter in URL</h2>";
    return;
  }

  // Load members.json
  let members;
  try {
    const r = await fetch("./members.json");
    members = await r.json();
  } catch (err) {
    console.error("Could not load members.json", err);
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:150px'>Error loading members data</h2>";
    return;
  }

  // Find member
  const member = members.find(m => String(m.id) === String(id));
  if (!member) {
    document.body.innerHTML = "<h2 style='text-align:center;margin-top:150px'>No record found for this ID</h2>";
    return;
  }

  // Fill fields
  document.getElementById("name").textContent = member.name;
  document.getElementById("workshop").textContent = member.workshop;
  document.getElementById("date").textContent = member.date;

  // Build verify URL (adjust to your repo)
  const base = window.location.origin + window.location.pathname.replace('certificate.html','verify.html');
  const verifyUrl = base + '?id=' + encodeURIComponent(member.id);

  // Generate QR using qrcodejs inside the #qr container
  const qrDiv = document.getElementById("qr");
  qrDiv.innerHTML = ""; // clear
  new QRCode(qrDiv, {
    text: verifyUrl,
    width: 150,
    height: 150,
    correctLevel: QRCode.CorrectLevel.H
  });

  // DOWNLOAD PDF (high quality)
  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.addEventListener("click", async () => {
    downloadBtn.disabled = true;
    downloadBtn.textContent = "Preparing PDF...";

    // Element to capture
    const el = document.getElementById("certificate");
    // Use a high scale for higher DPI
    const scale = 3; // 2-4 are good; 3 gives high resolution
    const canvas = await html2canvas(el, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      logging: false
    });

    const imgData = canvas.toDataURL("image/png");

    // Use jsPDF to create landscape PDF with exact pixel dimensions
    const { jsPDF } = window.jspdf;
    // Convert canvas size px to mm for PDF page
    const pxToMm = px => px * 25.4 / (96 * 1); // 96 DPI assumed browser default
    const pdfWidthMm = pxToMm(canvas.width);
    const pdfHeightMm = pxToMm(canvas.height);

    const pdf = new jsPDF({
      orientation: pdfWidthMm > pdfHeightMm ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pdfWidthMm, pdfHeightMm]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm);
    // Save with member name (sanitise filename)
    const safeName = (member.name || "certificate").replace(/[^a-z0-9\-_\s\.]/gi,'').trim();
    pdf.save(`Certificate - ${safeName}.pdf`);
    
     // Generate QR
  const qrCode = new QRCode(document.getElementById("qr"), {
    text: member.certificate_url,
    width: 120,
    height: 120,
  });

    downloadBtn.disabled = false;
    downloadBtn.textContent = "Download PDF";
  });
})();
