// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// If no ID
if (!id) {
  document.body.innerHTML = "<h2 style='text-align:center;margin-top:200px;'>Missing id parameter in URL</h2>";
  throw new Error("Missing id");
}

// Load data from JSON
fetch("members.json")
  .then(res => res.json())
  .then(data => {
    const member = data.find(m => m.id === id);
    if (!member) {
      document.body.innerHTML = "<h2 style='text-align:center;margin-top:200px;'>No record found for this ID</h2>";
      return;
    }

    document.getElementById("name").innerText = member.name;
    document.getElementById("workshop").innerText = member.workshop;
    document.getElementById("date").innerText = "Date: " + member.date;

    const verifyLink = `https://pawsandsmilefoundation-jpg.github.io/Paws-Smile-Foundation/verify.html?id=${member.id}`;
    document.getElementById("verifyLink").href = verifyLink;

    // Generate QR
    const qr = new QRious({
      element: document.getElementById("qrcode"),
      value: verifyLink,
      size: 120
    });
  });
