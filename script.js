async function loadCertificate() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.body.innerHTML = "<h2>Missing ID parameter in URL</h2>";
    return;
  }

  const response = await fetch("members.json");
  const members = await response.json();
  const member = members.find(m => m.id === id);

  if (!member) {
    document.body.innerHTML = "<h2>Member not found</h2>";
    return;
  }

  document.getElementById("name").textContent = member.name;
  document.getElementById("role").textContent = member.role;

  // Generate QR
  const qrCode = new QRCode(document.getElementById("qr"), {
    text: member.certificate_url,
    width: 120,
    height: 120,
  });
}

window.onload = loadCertificate;
