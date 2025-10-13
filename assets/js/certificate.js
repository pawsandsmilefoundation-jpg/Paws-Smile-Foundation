// ======== Auto Certificate Generator ========

// Helper: Read value from URL query (?name= & id=)
function getQueryParam(param) {
  return new URLSearchParams(window.location.search).get(param);
}

const memberName = getQueryParam("name") || "Volunteer Name";
const memberId = getQueryParam("id") || "PSF000";
const BASE_CERT_URL = window.location.origin + window.location.pathname;

// 1️⃣ Set Member Name
document.getElementById("memberName").textContent = memberName;

// 2️⃣ Generate Small QR (member-specific)
const memberQrContainer = document.getElementById("memberQr");
if (memberQrContainer) {
  const smallCanvas = document.createElement("canvas");
  new QRious({
    element: smallCanvas,
    value: `Paws & Smile Foundation | Member: ${memberName} | ID: ${memberId} | Verify: ${BASE_CERT_URL}?id=${memberId}`,
    size: 80,
    level: "H",
  });
  memberQrContainer.appendChild(smallCanvas);
}

// 3️⃣ Generate Big QR (optional if you already have printed one)
const qrContainer = document.getElementById("qrContainer");
if (qrContainer) {
  const mainCanvas = document.createElement("canvas");
  new QRious({
    element: mainCanvas,
    value: `${BASE_CERT_URL}?id=${memberId}&name=${encodeURIComponent(memberName)}`,
    size: 120,
    level: "H",
  });
  qrContainer.appendChild(mainCanvas);
}

// 4️⃣ Download Buttons
const certElem = document.getElementById("certificate");
const btnPng = document.getElementById("downloadPng");
const btnPdf = document.getElementById("downloadPdf");

if (btnPng) {
  btnPng.addEventListener("click", async () => {
    const canvas = await html2canvas(certElem, { scale: 2 });
    const link = document.createElement("a");
    link.download = `${memberName.replace(/\s+/g, "_")}_Certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

if (btnPdf) {
  btnPdf.addEventListener("click", async () => {
    const canvas = await html2canvas(certElem, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${memberName.replace(/\s+/g, "_")}_Certificate.pdf`);
  });
}
