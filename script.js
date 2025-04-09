const form = document.querySelector("form");
const formHeader = document.querySelector(".form-header");
const sorterButton = document.querySelector("button.sorter");
const noRepeatCheckbox = document.getElementById("switch-shadow");

let resultNumber = 0;
let alreadySubmitted = false;
let rangeStartValue, rangeEndValue, numberOfResultsValue, noRepeat;

form.onsubmit = (e) => {
  e.preventDefault();
  resultNumber++;
  updateFormHeader();

  if (!alreadySubmitted) {
    rangeStartValue = document.getElementById("rangeStart").value;
    rangeEndValue = document.getElementById("rangeEnd").value;
    numberOfResultsValue = document.getElementById("numberOfResults").value;
    noRepeat = noRepeatCheckbox.checked;

    alreadySubmitted = true;
    updateButtonToReroll();
  }

  const results = generateResults(
    numberOfResultsValue,
    rangeStartValue,
    rangeEndValue,
    noRepeat
  );
  renderSequentialAnimatedResults(results);
};

function updateFormHeader() {
  const title = formHeader.querySelector("h3");
  title.textContent = "Resultado do Sorteio:";

  const results = formHeader.querySelector("p");
  results.textContent = `${resultNumber}º Resultado`;
  results.style.textAlign = "center";
}

function updateButtonToReroll() {
  const buttonText = sorterButton.querySelector("span");
  const buttonIcon = sorterButton.querySelector("img");

  buttonText.textContent = "Sortear novamente";
  buttonIcon.src = "./assets/icons/Reroll.svg";
  buttonIcon.alt = "Ícone de nova tentativa";
}

function generateResults(quantity, start, end, preventRepeat = false) {
  const results = [];
  quantity = parseInt(quantity);
  start = parseInt(start);
  end = parseInt(end);

  const totalAvailable = end - start + 1;

  if (preventRepeat && quantity > totalAvailable) {
    alert(
      "Erro: o intervalo não contém números suficientes para sortear sem repetição."
    );
    return [];
  }

  while (results.length < quantity) {
    const rand = Math.floor(Math.random() * (end - start + 1)) + start;
    if (!preventRepeat || !results.includes(rand)) {
      results.push(rand);
    }
  }

  return results;
}

function renderSequentialAnimatedResults(results) {
  const inputArea = document.querySelector(".input-wrapper");
  inputArea.innerHTML = "";

  let index = 0;

  function animateNumber() {
    if (index >= results.length) return;

    const num = results[index];
    const wrapper = document.createElement("div");
    wrapper.classList.add("number-result-wrapper");

    const square = document.createElement("div");
    square.classList.add("animated-square");

    const number = document.createElement("span");
    number.classList.add("number-animated");
    number.textContent = num;

    square.appendChild(number);
    wrapper.appendChild(square);
    inputArea.appendChild(wrapper);

    // Entrada do número após 1.5 segundos
    setTimeout(() => {
      number.classList.add("visible");
    }, 750);

    // Finaliza a animação após 1.75 segundos
    setTimeout(() => {
      square.classList.add("reveal");
      index++;
      setTimeout(animateNumber, 250); // pequeno delay antes do próximo número
    }, 1750);
  }

  animateNumber();
}
