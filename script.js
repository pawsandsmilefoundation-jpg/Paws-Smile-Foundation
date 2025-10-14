  // Build verify URL (adjust to your repo)
  const base = window.location.origin + window.location.pathname.replace('certificate.html','verify.html');
  const verifyUrl = base + '?id=' + encodeURIComponent(member.id);

  // Generate QR using qrcodejs inside the #qr container
  const qrDiv = document.getElementById("qr");
  qrDiv.innerHTML = ""; // clear any existing
  // Make QR size same as CSS (110x110)
  new QRCode(qrDiv, {
    text: verifyUrl,
    width: 110,
    height: 110,
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

    const { jsPDF } = window.jspdf;
    const pxToMm = px => px * 25.4 / 96; // px -> mm (96 DPI)
    const pdfWidthMm = pxToMm(canvas.width);
    const pdfHeightMm = pxToMm(canvas.height);

    const pdf = new jsPDF({
      orientation: pdfWidthMm > pdfHeightMm ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pdfWidthMm, pdfHeightMm]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm);
    const safeName = (member.name || "certificate").replace(/[^a-z0-9\-_\s\.]/gi,'').trim();
    pdf.save(`Certificate - ${safeName}.pdf`);

    downloadBtn.disabled = false;
    downloadBtn.textContent = "Download PDF";
  });
