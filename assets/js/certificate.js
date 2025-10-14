// 🔹 Fetch member data and generate certificate automatically
(async function () {
  // Helper: Get query value from URL
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  const memberId = getParam("id");
  const BASE_URL = "https://pawsandsmilefoundation-jpg.github.io/Paws-Smile-Foundation/";

  let memberData = null;

  // Fetch member details from members.json
  try {
    const res = await fetch(BASE_URL + "members.json");
    const members = await res.json();
    memberData = members.find((m) => m.id === memberId);
  } catch (err) {
    console.error("Error loading member data", err);
  }

  // If no data found
  if (!memberData) {
    document.body.innerHTML = `<h2 style="color:red;">Member not found!</h2>`;
    return;
  }

  // Set name on certificate
  document.getElementById("memberName").textContent = memberData.name;

  // Generate member QR code
  const qr = new QRious({
    value:
      BASE_URL +
      "verify.html?id=" +
      encodeURIComponent(memberData.id),
    size: 80,
    level: "H",
  });

  document.getElementById("memberQr").appendChild(qr.canvas);

  // Download buttons
  const cert = document.getElementById("certificate");

  document.getElementById("downloadPng").addEventListener("click", async () => {
    const cnv = await html2canvas(cert, { scale: 2 });
    const link = document.createElement("a");
    link.download = `${memberData.name.replace(/\s+/g, "_")}_Certificate.png`;
    link.href = cnv.toDataURL("image/png");
    link.click();
  });

  document.getElementById("downloadPdf").addEventListener("click", async () => {
    const cnv = await html2canvas(cert, { scale: 2 });
    const imgData = cnv.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "px", format: [cnv.width, cnv.height] });
    pdf.addImage(imgData, "PNG", 0, 0, cnv.width, cnv.height);
    pdf.save(`${memberData.name.replace(/\s+/g, "_")}_Certificate.pdf`);
  });
})();
