const root = document.getElementById("root");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const mystery = [];
const inputNames = ["fisrt", "second", "third", "fourth"];
const checkInputs = [];

const container = document.createElement("div");
container.classList.add("container");
const history = document.createElement("div");
history.classList.add("history");
const header = document.createElement("h1");
header.innerText = "Bulls and cows";
const startBtn = document.createElement("button");
startBtn.innerText = "START";
startBtn.id = "start";
startBtn.addEventListener("click", start);
container.append(header, startBtn);
root.append(container, history);

function start() {
  document.querySelector("#start").remove();

  const source = numbers.slice();
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * source.length);
    mystery.push(source[randomIndex]);
    source.splice(randomIndex, 1);
  }
  console.log(mystery);
  createInputs();
}

function restart() {
  confirm("You win!\nWant to restart the game?") ? location.reload() : 1;
}
function createInputs() {
  let source = numbers.slice();
  const form = document.createElement("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkValues();
    source = numbers.slice();
    checkInputs.splice(0, 4);
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

    if (checkInputs.length === 4) document.querySelector("#submit").disabled = false;
  });

  for (let i = 0; i < 4; i++) {
    const input = document.createElement("input");
    input.type = "text";
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

function checkValues() {
  const form = document.querySelector("form");
  const children = form.childNodes;
  let cows = 0;
  let bulls = 0;

  const inputs = {
    0: mystery.indexOf(Number(children[0].value)),
    1: mystery.indexOf(Number(children[1].value)),
    2: mystery.indexOf(Number(children[2].value)),
    3: mystery.indexOf(Number(children[3].value)),
  };

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
  for (let i = 0; i < 4; i++) {
    prevNums.push(Number(children[i].value));
    children[i].value = "";
  }
  createHistory(prevNums, bulls, cows);
  bulls === 4 && restart();
}
