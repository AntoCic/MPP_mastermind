// Inizializzo variabili del DOM
// header
const header_score = document.getElementById("header_score");
const generate = document.getElementById("generate");

// main
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

const game_container = document.getElementById("game_container");
const game = document.getElementById("game");
const modal_container = document.getElementById("modal_container");

// Inizializzo variabili utili
const combinationLength = 5;
const quantityColor = 9;
const maxRounds = 10;
let combination = getStringCombination(combinationLength, quantityColor);
let idCounter = 1;

// Azzero il punteggio nel DOM
header_score.textContent = maxRounds;

// Funzione che data una lunghezza e un valore massimo
// ritorna un Array di numeri interi casuali
function getStringCombination(quantity, maxVal) {
  let c = [];
  for (let index = 0; index < quantity; index++) {
    c.push(String(getRandomNum(maxVal)));
  }
  return c;
}
// Funzione che dato un valore massimo
// ritorna un numero intero casuale
function getRandomNum(maxVal) {
  const n = Math.round(Math.random() * (maxVal - 1)) + 1;
  return n;
}

// Funzione che legge la combinazione che ha inserito l'utente
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

// Funzione che chiude tutte le dropdown dei colori
function closeAllSelect() {
  input_1.checked = false;
  input_2.checked = false;
  input_3.checked = false;
  input_4.checked = false;
  input_5.checked = false;
}
// Funzione che resetta i colori
function resetAllSelect() {
  bt_1.dataset.value = "0";
  bt_2.dataset.value = "0";
  bt_3.dataset.value = "0";
  bt_4.dataset.value = "0";
  bt_5.dataset.value = "0";
}

// Funzione che restituisce il punteggio
function getScore(n=0) {
  return String(maxRounds + n - idCounter).padStart(2, "0");
}

// Gestione click sul btn di reset del gioco (nell'header)
generate.addEventListener("click", () => {
  while (modal_container.firstChild) modal_container.firstChild.remove();
  game_container.style.overflow="auto";
  combination = getStringCombination(combinationLength, quantityColor);
  idCounter = 1;
  header_score.textContent = maxRounds;
  info_select.textContent = "";

  closeAllSelect();
  resetAllSelect();

  while (game.firstChild) game.firstChild.remove();
});

// Gestione click sulle select dei colori
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

// Gestione click sul btn controllo combinazione
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
    
    if (maxRounds - idCounter === 0) {
      header_score.textContent = getScore();
      game_container.style.overflow="hidden";
      modal_container.appendChild(generateModalGameOver());

    } else if (matching[1] === combinationLength) {
      game_container.style.overflow="hidden";
      modal_container.appendChild(generateModalWin());

    } else {
      header_score.textContent = getScore();
      idCounter++;

    }
  } else {
    info_select.textContent = "Scegli tutti i colori";
  }
});

// Funzione che confronta le due combinazioni e
// ritorna un Array contenente
// la quantitá dei numeri uguali e
// la quantitá dei numeri uguali nella posizione corretta
function checkMatching(comb, userComb) {
  let combCopy = [...comb];
  let userCombCopy = [...userComb];
  const length = comb.length;
  let correctNumber = 0;
  let correctPosition = 0;
  for (let i = 0; i < length; i++) {
    for (let ii = 0; ii < length; ii++) {
      // confronto la mia combinazione con quella generata
      // -- se facessi il contrario ci serebbe un problema nel contare le correctPosition
      // -- perché azzerando userCombCopy e combCopy il contatore non si incrementerebbe correttamente
      if (userCombCopy[i] === combCopy[ii] && userCombCopy[i] != "0") {
        correctNumber++;
        if (userCombCopy[i] === combCopy[i]) {
          correctPosition++;
        }
        // li azzero per non far ricontare i numeri uguali giá contati
        userCombCopy[i] = 0;
        combCopy[ii] = 0;
      }
    }
  }
  return [correctNumber, correctPosition];
}

// Funzione che crea un elemento nel DOM che mostra il risultato
// della combinazione inserita
function showResult(matching, userCombination) {
  const hr = document.createElement("hr");
  hr.classList.add("border", "border-1", "my-1");
  game.prepend(hr);

  const col_4 = document.createElement("div");
  col_4.classList.add("col-4");
  const brain_box = document.createElement("div");
  brain_box.classList.add("brain-box");
  for (let index = 1; index <= matching[0]; index++) {
    const img = document.createElement("img");
    img.setAttribute("src", "./img/points/" + String(index) + ".svg");
    if (index <= matching[1]) {
      img.classList.add("positio-correct");
    }
    brain_box.appendChild(img);
  }
  col_4.appendChild(brain_box);
  game.prepend(col_4);

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

  game.prepend(col_8);
}

// genera la modale you win
function generateModalWin() {
  const modal = document.createElement("div");
  modal.classList.add("ms_modal");
  modal.innerHTML = `
          <div class="ms_modal-box ms_win p-1 p-md-3">
            <h1>YOU WIN</h1>
            <p class="h3">score: ${getScore(1)}</p>
          </div>
      `;
  return modal;
}

// genera la modale game over
function generateModalGameOver() {
  const modal = document.createElement("div");
  modal.classList.add("ms_modal");

  const modal_box = document.createElement("div");
  modal_box.classList.add("ms_modal-box", "p-1", "p-md-3");
  modal.appendChild(modal_box);

  const h1 = document.createElement("h1");
  h1.classList.add("mb-0");
  h1.textContent = "GAME OVER";
  modal_box.appendChild(h1);
  combination.forEach((e) => {
    const span = document.createElement("span");
    span.classList.add("color-box", "mx-1");
    span.setAttribute("value", e);
    modal_box.appendChild(span);
  });
  return modal;
}
