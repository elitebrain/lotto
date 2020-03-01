let lottoTable = document.querySelector(".lotto_table"),
  rndBtn = document.querySelector(".lotto_table > .aside > .rnd_btn"),
  resultRow = document.querySelector(".result > .row:first-child");
let activeList = [];
const setResult = value => {
  let idx = -1;
  for (let i = 0; i < resultRow.childElementCount; i++) {
    if (resultRow.children[i].innerText === value) {
      idx = i;
    }
  }
  if (idx !== -1) {
    resultRow.removeChild(
      document.querySelector(`.result > .row > .col:nth-child(${idx + 1})`)
    );
  } else {
    const col = document.createElement("div");
    col.classList.add("col");
    col.classList.add("active");
    col.innerText = value;
    resultRow.appendChild(col);
    if (resultRow.childElementCount === 6) {
      // const saveBtn = document.createElement("button");
      // saveBtn.classList.add("save_btn");
      // saveBtn.innerText = "Save";
      // saveBtn.addEventListener("click", saveResult);
      // resultRow.appendChild(saveBtn);
      const removeBtn = document.createElement("button");
      removeBtn.classList.add("remove_btn");
      removeBtn.innerText = "Remove";
      removeBtn.addEventListener("click", removeResult);
      resultRow.appendChild(removeBtn);
    }
  }
};

const getRandomNum = () => {
  const newRow = document.createElement("div");
  newRow.classList.add("row");
  const resultEl = document.querySelector(".result");
  resultEl.prepend(newRow);
  resultRow = document.querySelector(".result > .row:first-child");
  const spinFrame = document.querySelector(".aside > .spin_frame");
  spinFrame.style.display = "block";
  setTimeout(() => (spinFrame.style.display = "none"), 4800);
  let cols = document.querySelectorAll(".table .col");
  const rndList = [];
  for (let i = 0; i < 6; i++) {
    const num = parseInt(Math.random() * 45, 10);
    if (rndList.indexOf(num + 1) === -1) {
      rndList.push(num + 1);
    } else {
      i--;
    }
  }
  console.log("rndList", rndList);
  if (resultRow.childElementCount > 0) {
  }
  for (let i = 0; i < cols.length; i++) {
    setTimeout(() => cols[i].classList.add("active"), i * 100);
    if (rndList.indexOf(i + 1) === -1) {
      setTimeout(() => cols[i].classList.remove("active"), i * 100 + 300);
    } else {
      setTimeout(() => setResult(cols[i].innerText), 4800);
    }
  }
};

const removeResult = e => {
  let el = e.target.parentElement;
  // if (el.previousElementSibling) {
  el.parentElement.removeChild(el);
  // } else {
  //   const len = el.childElementCount;
  //   for (let i = 0; i < len; i++) {
  //     if (el.firstChild) {
  //       el.removeChild(el.firstChild);
  //     }
  //   }
  //   resetNumber();
  // }
};

const saveResult = e => {
  let el = e.target;
  for (let i = 0; i < 6; i++) {
    if (el.previousSibling) {
      el.previousSibling.classList.add("active");
      el = el.previousSibling;
    }
  }
  e.target.parentElement.removeChild(e.target);
  resetNumber("save");
  //   const selectCols = document.querySelectorAll(".table > .row > .col");
  //   for (let i = 0; i < selectCols.length; i++) {
  //     if (selectCols[i].classList.value.indexOf("active") !== -1) {
  //       selectCols[i].classList.remove("active");
  //     }
  //   }
  const newRow = document.createElement("div");
  newRow.classList.add("row");
  const resultEl = document.querySelector(".result");
  resultEl.prepend(newRow);
  resultRow = document.querySelector(".result > .row:first-child");
};

const resetNumber = gubun => {
  const selectCols = document.querySelectorAll(".table > .row > .col");
  for (let i = 0; i < selectCols.length; i++) {
    if (selectCols[i].classList.value.indexOf("active") !== -1) {
      selectCols[i].classList.remove("active");
    }
  }
  if (gubun === "reset") {
    for (let j = 0; j < 8; j++) {
      if (resultRow.firstChild) {
        resultRow.removeChild(resultRow.firstChild);
      }
    }
  }
  activeList = [];
  const resetBtn = document.querySelector(".reset_btn");
  resetBtn.classList.remove("active");
};

const setGrid = () => {
  const body = document.createElement("div");
  body.classList.add("table");
  for (let i = 0; i < 7; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 7; j++) {
      if (i * 7 + (j + 1) < 46) {
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerText = `${setDigitNumber(i * 7 + (j + 1))}`;
        // col.addEventListener("click", toggleNumber);
        row.appendChild(col);
      } else if (i * 7 + (j + 1) === 46) {
        const button = document.createElement("button");
        button.classList.add("reset_btn");
        button.innerText = "Reset";
        button.addEventListener("click", () => resetNumber("reset"));
        row.appendChild(button);
      }
    }
    body.appendChild(row);
  }
  lottoTable.prepend(body);
};

const toggleNumber = e => {
  const idx = e.target.classList.value.indexOf("active");
  if (idx === -1) {
    if (resultRow.childElementCount < 6) {
      e.target.classList.add("active");
      setResult(e.target.innerText);
    }
  } else {
    e.target.classList.remove("active");
    setResult(e.target.innerText);
  }
  const cols = document.querySelectorAll(".col");
  for (let i = 0; i < cols.length; i++) {
    if (cols[i].classList.value.indexOf("active") !== -1) {
      activeList.push(cols[i].innerText);
    }
  }
  console.log("activeList", activeList);
  const resetBtn = document.querySelector(".reset_btn");
  if (activeList.length > 0) {
    resetBtn.classList.add("active");
  } else {
    resetBtn.classList.remove("active");
  }
};

const setDigitNumber = number => {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};

const init = () => {
  setGrid();
  rndBtn.innerText = `Get\nRandom\nNumber`;
  rndBtn.addEventListener("click", getRandomNum);
};
init();
