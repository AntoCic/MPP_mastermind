const header_score = document.getElementById("header_score");
const generate = document.getElementById("generate");

const bt_1 = document.getElementById("bt_1");
const input_1 = document.getElementById("input_1");
const option_1 = document.querySelectorAll("#select_1 li");
const bt_2 = document.getElementById("bt_2");
const input_2 = document.getElementById("input_2");
const option_2 = document.querySelectorAll("#select_2 li");
const bt_3 = document.getElementById("bt_3");
const input_3 = document.getElementById("input_3");
const option_3 = document.querySelectorAll("#select_3 li");
const bt_4 = document.getElementById("bt_4");
const input_4 = document.getElementById("input_4");
const option_4 = document.querySelectorAll("#select_4 li");
const bt_5 = document.getElementById("bt_5");
const input_5 = document.getElementById("input_5");
const option_5 = document.querySelectorAll("#select_5 li");

const tryE = document.getElementById("try");
const info_select = document.getElementById("info_select");

const game = document.getElementById("game");
const modal_container = document.getElementById("modal_container");

const combinationLength = 5;
const quantityColor = 9;
const maxRounds = 20;
let combination = getStringCombination(combinationLength, quantityColor);

let idCounter = 1;

header_score.textContent = maxRounds;

function getStringCombination(quantity, maxVal) {
  let c = [];
  for (let index = 0; index < quantity; index++) {
    c.push(String(getRandomNum(maxVal)));
  }
  return c;
}
function getRandomNum(maxVal) {
  const n = Math.round(Math.random() * (maxVal - 1)) + 1;
  return n;
}

function closeAllSelect() {
  input_1.checked = false;
  input_2.checked = false;
  input_3.checked = false;
  input_4.checked = false;
  input_5.checked = false;
}

for (let index = 0; index < quantityColor; index++) {
  const n = String(index + 1);

  option_1[index].addEventListener("click", () => {
    bt_1.dataset.value = n;
    closeAllSelect();
  });
  option_2[index].addEventListener("click", () => {
    bt_2.dataset.value = n;
    closeAllSelect();
  });
  option_3[index].addEventListener("click", () => {
    bt_3.dataset.value = n;
    closeAllSelect();
  });
  option_4[index].addEventListener("click", () => {
    bt_4.dataset.value = n;
    closeAllSelect();
  });
  option_5[index].addEventListener("click", () => {
    bt_5.dataset.value = n;
    closeAllSelect();
  });
}

generate.addEventListener("click", () => {
  while (modal_container.firstChild) modal_container.firstChild.remove();

  combination = getStringCombination(combinationLength, quantityColor);
  idCounter = 1;
  header_score.textContent = maxRounds;
  info_select.textContent = "";

  closeAllSelect();
  bt_1.dataset.value = "0";
  bt_2.dataset.value = "0";
  bt_3.dataset.value = "0";
  bt_4.dataset.value = "0";
  bt_5.dataset.value = "0";
  while (game.firstChild) game.firstChild.remove();
});

tryE.addEventListener("click", () => {
  info_select.textContent = "";
  closeAllSelect();
  if (
    bt_1.dataset.value !== "0" &&
    bt_2.dataset.value !== "0" &&
    bt_3.dataset.value !== "0" &&
    bt_4.dataset.value !== "0" &&
    bt_5.dataset.value !== "0"
  ) {
    const userCombination = getUserCombination();
    const matching = checkMatching(combination, userCombination);
    showResult(matching, userCombination);

    if (matching[1] === combinationLength) {
      const modal = document.createElement("div");
      modal.classList.add("ms_modal");
      modal.innerHTML = `
          <div class="ms_modal-box ms_win p-1 p-md-3">
            <h1>YOU WIN</h1>
            <p class="h3">score: ${String(maxRounds + 1 - idCounter).padStart(
              2,
              "0"
            )}</p>
          </div>
      `;
      modal_container.appendChild(modal);
    } else if (maxRounds - idCounter === 0) {
      header_score.textContent = String(maxRounds - idCounter).padStart(2, "0");

      const modal = document.createElement("div");
      modal.classList.add("ms_modal");
      modal.innerHTML = `
      <div class="ms_modal-box p-1 p-md-3">
        <h1 class="mb-0">GAME OVER</h1>
      </div>
  `;
      modal_container.appendChild(modal);
    } else {
      header_score.textContent = String(maxRounds - idCounter).padStart(2, "0");
      idCounter++;
    }
  } else {
    info_select.textContent = "Scegli tutti i colori";
  }
});

function getUserCombination() {
  let uc = [
    bt_1.dataset.value,
    bt_2.dataset.value,
    bt_3.dataset.value,
    bt_4.dataset.value,
    bt_5.dataset.value,
  ];
  return uc;
}

function checkMatching(comb, userComb) {
  let combCopy = [...comb];
  let userCombCopy = [...userComb];
  const length = comb.length;
  let correctNumber = 0;
  let correctPosition = 0;
  for (let i = 0; i < length; i++) {
    for (let ii = 0; ii < length; ii++) {
      if (userCombCopy[i] === combCopy[ii] && userCombCopy[i] != "0") {
        correctNumber++;
        if (userCombCopy[i] === combCopy[i]) {
          correctPosition++;
        }
        userCombCopy[i] = 0;
        combCopy[ii] = 0;
      }
    }
  }
  return [correctNumber, correctPosition];
}

function showResult(matching, userCombination) {
  const col_8 = document.createElement("div");
  col_8.classList.add("col-8");

  const spanId = document.createElement("span");
  spanId.classList.add("color-box", "id", "me-2");
  const spanN = document.createElement("span");
  spanN.textContent = String(idCounter);
  spanId.appendChild(spanN);
  col_8.appendChild(spanId);

  userCombination.forEach((e) => {
    const span = document.createElement("span");
    span.classList.add("color-box", "mx-1");
    span.setAttribute("value", e);
    col_8.appendChild(span);
  });

  game.appendChild(col_8);

  const col_4 = document.createElement("div");
  col_4.classList.add("col-4");

  const brain_box = document.createElement("div");
  brain_box.classList.add("brain-box");
  for (let index = 1; index <= matching[0]; index++) {
    const img = document.createElement("img");
    // span.classList.add("color-box");
    img.setAttribute("src", "./img/points/" + String(index) + ".svg");
    if (index <= matching[1]) {
      img.classList.add("positio-correct");
    }
    brain_box.appendChild(img);
  }

  col_4.appendChild(brain_box);
  game.appendChild(col_4);

  const hr = document.createElement("hr");
  hr.classList.add("border", "border-1", "my-1");
  game.appendChild(hr);
}
