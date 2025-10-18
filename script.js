async function loadCertificate() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const memberName = document.getElementById("memberName");
  const memberRole = document.getElementById("memberRole");
  const memberDate = document.getElementById("memberDate");
  const qrCanvas = document.getElementById("qrCode");

  if (!id) {
    memberName.textContent = "Missing ID";
    return;
  }

  const response = await fetch("members.json");
  const members = await response.json();
  const member = members.find(m => m.id === id);

  if (!member) {
    memberName.textContent = "No record found for this ID";
    return;
  }

  memberName.textContent = member.name;
  memberRole.textContent = `Role: ${member.role}`;
  memberDate.textContent = `Joined: ${member.joined}`;

  // Generate QR code for verification
  new QRious({
    element: qrCanvas,
    value: member.certificate_url,
    size: 120,
  });
}

// 🧾 Download certificate as PDF (professional)
async function downloadCertificate() {
  const certificate = document.getElementById("certificate");
  const canvas = await html2canvas(certificate, {
    scale: 2,
    useCORS: true
  });

  const imgData = canvas.toDataURL("image/png");
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);
  pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save("certificate.pdf");
}

window.onload = loadCertificate;
