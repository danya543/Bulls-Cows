const root = document.getElementById("root");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const mystery = [];
const inputNames = [
  "fisrt",
  "second",
  "third",
  "fourth",
  "fivth",
  "sixth",
  "seventh",
  "eightth",
  "nineth",
  "tenth",
];
const checkInputs = [];
createModalRestart();

const container = document.createElement("div");
container.classList.add("container");
const history = document.createElement("div");
history.classList.add("history");
const header = document.createElement("h1");
header.innerText = "Bulls&Cows";
const startBtn = document.createElement("button");
startBtn.innerText = "START";
startBtn.id = "start";
startBtn.addEventListener("click", start);
container.append(header, startBtn);
root.append(container, history);

function start() {
  document.querySelector("#start").remove();

  const size = document.createElement("input");
  size.type = "range";
  size.id = "size";
  size.min = 1;
  size.max = 10;
  size.addEventListener("change", () => {
    const value = document.getElementById("size").value;
    currentSize.innerText = value;
  });
  const currentSize = document.createElement("div");
  currentSize.innerText = size.value;
  currentSize.id = "currentSize";
  const acceptBtn = document.createElement("input");
  acceptBtn.type = "submit";
  acceptBtn.id = "accept";
  acceptBtn.value = "Accept";
  acceptBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const value = Number(document.getElementById("currentSize").innerText);
    initialGame(value);
    size.remove();
    currentSize.remove();
    acceptBtn.remove();
  });
  container.append(currentSize, size, acceptBtn);
}

function initialGame(size) {
  const source = numbers.slice();
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * source.length);
    mystery.push(source[randomIndex]);
    source.splice(randomIndex, 1);
  }

  createInputs(size);
}

function createModalRestart() {
  const modalRestart = document.createElement("div");
  modalRestart.id = "modal_restart";
  const container = document.createElement("div");
  const headingRestart = document.createElement("h2");
  headingRestart.innerText = "You win!";
  const restartBtn = document.createElement("button");
  restartBtn.innerText = "Restart";
  restartBtn.addEventListener("click", () => {
    location.reload();
  });
  container.append(headingRestart, restartBtn);
  modalRestart.append(container);
  root.append(modalRestart);
}

function restart() {
  document.getElementById("modal_restart").style.top = 0;
}
function createInputs(size) {
  let source = numbers.slice();
  const form = document.createElement("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkValues(size);
    source = numbers.slice();
    checkInputs.splice(0, size);
    document.querySelector("#submit").disabled = true;
  });
  form.addEventListener("change", (event) => {
    event.preventDefault();

    const value = +event.target.value;
    if (source.indexOf(value) >= 0) {
      source.includes(value) &&
        source.splice(source.indexOf(value), 1) &&
        checkInputs.push(event.target.name);
    }

    if (checkInputs.length === size) {
      document.querySelector("#submit").disabled = false;
    }
  });

  for (let i = 0; i < size; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.name = inputNames[i];
    form.append(input);
  }
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.id = "submit";
  submit.name = "check";
  submit.value = "Check";
  submit.disabled = true;
  form.append(submit);
  container.append(form);
}
function createHistory(prevNum, bulls, cows) {
  const row = document.createElement("div");
  row.classList.add("point");
  for (num of prevNum) {
    const number = document.createElement("p");
    number.innerText = num;
    row.append(number);
  }
  const results = document.createElement("div");
  results.classList.add("results");
  const bullsBlock = document.createElement("p");
  bullsBlock.innerHTML = `${bulls}✕<span>🐂</span>`;
  const cowsBlock = document.createElement("p");
  cowsBlock.innerHTML = `${cows}✕<span>🐄</span>`;
  results.append(bullsBlock, cowsBlock);
  row.append(results);
  history.prepend(row);
}

function checkValues(size) {
  const form = document.querySelector("form");
  const children = form.childNodes;
  let cows = 0;
  let bulls = 0;

  const inputs = {};
  for (let i = 0; i < size; i++) {
    inputs[i] = mystery.indexOf(Number(children[i].value));
  }

  for (const input in inputs) {
    if (inputs[input] >= 0) {
      cows++;
      if (+input === inputs[input]) {
        cows--;
        bulls++;
      }
    }
  }
  const prevNums = [];
  for (let i = 0; i < size; i++) {
    prevNums.push(Number(children[i].value));
    children[i].value = "";
  }
  createHistory(prevNums, bulls, cows);
  bulls === size && restart();
}
