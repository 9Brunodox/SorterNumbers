const form = document.querySelector("form");
const formHeader = document.querySelector(".form-header");

let resultNumber = 0;

form.onsubmit = (e) => {
  e.preventDefault();
  resultNumber++;
  updateFormHeader();
};

function updateFormHeader() {
  const title = formHeader.querySelector("h3");
  title.textContent = "Resultado do Sorteio";

  const results = formHeader.querySelector("p");
  results.textContent = resultNumber + "º Resultado";
  results.style.textAlign = "center";
}
