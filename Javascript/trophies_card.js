const trophiesContainer = document.getElementById("trophies-container");
const tooltip = document.getElementById("tooltip");

// On imagine une liste de données pour tes trophées
const trophiesData = {
  1: {
    name: "Apprenti",
    desc: "Cuisiner votre premier plat.",
    img: "🖱️",
    requirement: () => totalClicks >= 1,
  },
  2: {
    name: "Chef Robot",
    desc: "Vous avez acheté 5 robots.",
    img: "🤖",
    requirement: () => buyitems.robots.count >= 5,
  },
  3: {
    name: "Gourmet",
    desc: "Cuisiner 100 plats.",
    img: "🍕",
    requirement: () => totalClicks >= 100,
  },
  4: {
    name: "Cuisinier du dimanche",
    desc: "Cuisiner 10 plats.",
    img: "🍳",
    requirement: () => totalClicks >= 10,
  },
  5: {
    name: "Chef en herbe",
    desc: "Cuisiner 50 plats.",
    img: "👨‍🍳",
    requirement: () => totalClicks >= 50,
  },
  6: {
    name: "Cuisine en folie",
    desc: "Cuisiner 500 plats.",
    img: "🔥",
    requirement: () => totalClicks >= 500,
  },
  7: {
    name: "Maître des fourneaux",
    desc: "Cuisiner 1000 plats.",
    img: "炉",
    requirement: () => totalClicks >= 1000,
  },
  8: {
    name: "Usine à nourriture",
    desc: "Cuisiner 5000 plats.",
    img: "🏭",
    requirement: () => totalClicks >= 5000,
  },
  9: {
    name: "Empire culinaire",
    desc: "Cuisiner 10000 plats.",
    img: "🌍",
    requirement: () => totalClicks >= 10000,
  },
  10: {
    name: "Robot apprenti",
    desc: "Acheter des ingrédients.",
    img: "🥦",
    requirement: () => buyitems.ingredients.count >= 1,
  },
  11: {
    name: "Robot cuisinier",
    desc: "Acheter 10 robots.",
    img: "🤖",
    requirement: () => buyitems.robots.count >= 10,
  },
  12: {
    name: "Armée mécanique",
    desc: "Acheter 20 robots.",
    img: "💎",
    requirement: () => buyitems.robots.count >= 20,
  },
  13: {
    name: "Cuisine automatisée",
    desc: "Acheter 50 robots.",
    img: "🤖",
    requirement: () => buyitems.robots.count >= 50,
  },
  14: {
    name: "Chef du futur",
    desc: "Acheter 100 robots.",
    img: "👑",
    requirement: () => buyitems.robots.count >= 100,
  },
  15: { name: "Premier service", desc: "Servir 50 plats.", img: "🍽️" },
  16: { name: "Service rapide", desc: "Servir 200 plats.", img: "⚡" },
  17: {
    name: "Restaurant populaire",
    desc: "Servir 1000 plats.",
    img: "🔥",
    requirement: () => totalServed >= 1000,
  },
  18: { name: "Cuisine légendaire", desc: "Servir 5000 plats.", img: "🌟" },
  19: {
    name: "Premier clic",
    desc: "Cliquer pour cuisiner 1 fois.",
    img: "👆",
  },
  20: { name: "Doigt rapide", desc: "Cliquer 50 fois.", img: "💪" },
  21: { name: "Machine à clics", desc: "Cliquer 200 fois.", img: "⚙️" },
  22: { name: "Cliqueur professionnel", desc: "Cliquer 1000 fois.", img: "🎯" },
  23: { name: "Petit restaurant", desc: "Accumuler 100 pièces.", img: "🏠" },
  24: {
    name: "Restaurant rentable",
    desc: "Accumuler 1000 pièces.",
    img: "💰",
  },
  25: {
    name: "Magnat de la cuisine",
    desc: "Accumuler 10000 pièces.",
    img: "💎",
  },
  26: {
    name: "Roi de la gastronomie",
    desc: "Accumuler 100000 pièces.",
    img: "👑",
  },
  27: {
    name: "Cuisine nocturne",
    desc: "Jouer pendant 10 minutes.",
    img: "🌙",
  },
  28: {
    name: "Cuisine sans pause",
    desc: "Jouer pendant 30 minutes.",
    img: "⏰",
  },
  29: { name: "Chef infatigable", desc: "Jouer pendant 1 heure.", img: "🦸" },
  30: {
    name: "Cuisine éternelle",
    desc: "Produire 1 plat par seconde.",
    img: "⏱️",
  },
  31: {
    name: "Étoile de Rue",
    desc: "Gagner vos 500 premiers points.",
    img: "⭐",
  },
  32: {
    name: "Chef de quartier",
    desc: "Gagner vos 2000 premiers points.",
    img: "🏘️",
  },
  33: { name: "Maître de la ville", desc: "Gagner vos 10000 premiers points." },
  34: { name: "Légende culinaire", desc: "Gagner vos 50000 premiers points." },
  35: { name: "Légende culinaire", desc: "Gagner vos 50000 premiers points." },
};
// ================= INIT =================
function initTrophies() {
  Object.keys(trophiesData).forEach((id) => {
    const card = document.createElement("div");
    card.classList.add("trophy-card");
    card.setAttribute("data-id", id);

    // tooltip
    card.addEventListener("mouseenter", () => {
      const data = trophiesData[id];

      if (card.classList.contains("unlocked")) {
        tooltip.innerHTML = `<strong>${data.name}</strong><br>${data.desc}`;
      } else {
        tooltip.innerHTML = `<strong>???</strong>`;
      }

      tooltip.classList.remove("hidden");
    });

    card.addEventListener("mousemove", (e) => {
      tooltip.style.left = e.clientX + 15 + "px";
      tooltip.style.top = e.clientY + 15 + "px";
    });

    card.addEventListener("mouseleave", () => {
      tooltip.classList.add("hidden");
    });

    trophiesContainer.appendChild(card);
  });
}

initTrophies();

// ================= CHECK =================
function checkTrophies() {
  let unlockedCount = 0;

  Object.keys(trophiesData).forEach((id) => {
    const trophy = trophiesData[id];
    const card = document.querySelector(`.trophy-card[data-id="${id}"]`);

    if (card && !card.classList.contains("unlocked") && trophy.requirement()) {
      card.classList.add("unlocked");
      card.innerHTML = `<span>${trophy.img}</span>`;
    }

    if (card.classList.contains("unlocked")) {
      unlockedCount++;
    }
  });

  updateTrophyCount(unlockedCount);
  updateCountryBadges(unlockedCount);
}

// ================= COUNT =================
function updateTrophyCount(count) {
  document.getElementById("trophies-count").innerText = count;
}

// ================= BADGES =================
function updateCountryBadges(unlockedCount) {
  const totalTrophies = Object.keys(trophiesData).length;

  const ratio = unlockedCount / totalTrophies;

  let badges = 0;

  if (ratio >= 0.25) badges = 1;
  if (ratio >= 0.5) badges = 2;
  if (ratio >= 0.75) badges = 3;
  if (ratio >= 1) badges = 4;

  // Sync avec script.js
  if (badges !== unlockedGrades) {
    unlockedGrades = badges;
    updateCountryProgress();
  }
}
