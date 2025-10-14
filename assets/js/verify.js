(async function () {
  const id = new URLSearchParams(window.location.search).get("id");
  const BASE_URL = "https://pawsandsmilefoundation-jpg.github.io/Paws-Smile-Foundation/";

  const res = await fetch(BASE_URL + "members.json");
  const data = await res.json();j

  const member = data.find((m) => m.id === id);
  const card = document.getElementById("infoCard");

  if (member) {
    document.getElementById("name").textContent = `Name: ${member.name}`;
    document.getElementById("position").textContent = `Position: ${member.position}`;
    document.getElementById("joined").textContent = `Joined: ${member.joined}`;
  } else {
    card.innerHTML = `<h2 style="color:red;">Member not found!</h2>`;
  }
})();
