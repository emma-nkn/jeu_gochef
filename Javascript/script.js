// ===================== STATE =====================
let score = 0;
let totalClicks = 0;

let isGameStarted = false;
let gameInterval = null;

let baseAutoSpeed = 2;
let autoProductionFromItems = 0;
let clickValue = 3;

let purchaseMultiplier = 1;
let unlockedGrades = 0;

// ===================== DOM =====================
const scoreDisplay = document.getElementById("cookscore");
const mainBtn = document.getElementById("main-dish-btn");
const multiplierBtns = document.querySelectorAll(".btn-multiple_achat");

// ===================== SHOP DATA =====================
const buyitems = {
  ingredients: {
    count: 0,
    price: 10,
    power: 1,
    type: "auto",
    label: "cost-ingredients",
    counterLabel: "count-ingredients",
  },
  ustensiles: {
    count: 0,
    price: 40,
    power: 2,
    type: "click",
    label: "cost-ustensiles",
    counterLabel: "count-ustensiles",
  },
  equipe: {
    count: 0,
    price: 100,
    power: 10,
    type: "auto",
    label: "cost-equipe",
    counterLabel: "count-equipe",
  },
  robots: {
    count: 0,
    price: 1000,
    power: 50,
    type: "auto",
    label: "cost-robots",
    counterLabel: "count-robots",
  },
};

// ===================== CLICK =====================
mainBtn?.addEventListener("click", () => {
  if (!isGameStarted) startKitchenEngine();

  score += clickValue;
  totalClicks++;

  updateUI();
});

// ===================== GAME LOOP =====================
function startKitchenEngine() {
  if (!gameInterval) {
    isGameStarted = true;

    gameInterval = setInterval(() => {
      score += (baseAutoSpeed + autoProductionFromItems) / 10;
      updateUI();
    }, 100);
  }
}

// ===================== MULTIPLIER =====================
multiplierBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    purchaseMultiplier = parseInt(btn.innerText);

    multiplierBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    updateUI(); // refresh prix affiché
  });
});

// ===================== COST CALC =====================
function getTotalCost(item, quantity) {
  let total = 0;
  let tempPrice = item.price;

  for (let i = 0; i < quantity; i++) {
    total += tempPrice;
    tempPrice = Math.ceil(tempPrice * 1.15);
  }

  return total;
}

// ===================== SHOP =====================
function buyItem(itemKey) {
  const item = buyitems[itemKey];
  if (!item) return;

  const totalCost = getTotalCost(item, purchaseMultiplier);

  if (score >= totalCost) {
    score -= totalCost;

    for (let i = 0; i < purchaseMultiplier; i++) {
      item.count++;

      if (item.type === "auto") {
        autoProductionFromItems += item.power;
      } else {
        clickValue += item.power;
      }

      item.price = Math.ceil(item.price * 1.15);
    }

    updateUI();
  }
}

// ===================== GRADES =====================
function updateGrades() {
  let newGrades = unlockedGrades;

  const ing = buyitems.ingredients.count;
  const ust = buyitems.ustensiles.count;
  const eq = buyitems.equipe.count;
  const rob = buyitems.robots.count;

  // 🥉
  if (unlockedGrades < 1 && ing >= 5) {
    newGrades = 1;
  }

  // 🥈
  if (unlockedGrades < 2 && ust >= 20 && rob >= 2) {
    newGrades = 2;
  }

  // 🥇
  if (unlockedGrades < 3 && ust >= 15 && eq >= 15 && rob >= 5) {
    newGrades = 3;
  }

  // 👑
  if (unlockedGrades < 4 && ing >= 60 && ust >= 50 && eq >= 10 && rob >= 10) {
    newGrades = 4;
  }

  if (newGrades !== unlockedGrades) {
    unlockedGrades = newGrades;
    renderGrades();
    updateCountryProgress();
  }
}

function renderGrades() {
  const grades = document.querySelectorAll(".gamer_grade span");

  grades.forEach((g, i) => {
    if (i < unlockedGrades) {
      g.classList.add("unlocked");
    }
  });
}

// ===================== COUNTRY =====================
function updateCountryProgress() {
  const percent = (unlockedGrades / 4) * 100;

  const percentEl = document.getElementById("percent-france");
  const bar = document.getElementById("prog-bar-france");

  if (percentEl) percentEl.innerText = percent + "%";
  if (bar) bar.style.width = percent + "%";

  const badges = document.querySelectorAll("#badges-france .badge-slot");

  badges.forEach((b, i) => {
    if (i < unlockedGrades) {
      b.classList.add("unlocked");
    } else {
      b.classList.remove("unlocked");
    }
  });
}

// ===================== UI =====================
function updateUI() {
  if (scoreDisplay) scoreDisplay.innerText = Math.floor(score);

  const clicksEl = document.getElementById("stat-clicks");
  if (clicksEl) clicksEl.innerText = totalClicks;

  // Update shop UI
  for (let key in buyitems) {
    const item = buyitems[key];

    const priceEl = document.getElementById(item.label);
    const countEl = document.getElementById(item.counterLabel);

    if (!priceEl || !countEl) continue;

    const totalCost = getTotalCost(item, purchaseMultiplier);

    priceEl.innerText = totalCost;
    countEl.innerText = item.count;

    const btn = priceEl.closest(".tab-btn");

    if (btn) {
      if (score < totalCost) {
        btn.classList.add("disabled");
      } else {
        btn.classList.remove("disabled");
      }
    }
  }

  updateGrades();

  // sécurité si l'autre fichier n'est pas chargé
  if (typeof checkTrophies === "function") {
    checkTrophies();
  }
}
