let lottoTable = document.querySelector(".lotto_table");

let isCasting = false;
let isSaved = false;

const getRandomNum = () => {
  const activeList = document.querySelectorAll(
    ".lotto_table .table .col.active"
  );
  if (activeList.length > 0) return;
  isCasting = true;
  isSaved = false;
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
  for (let i = 0; i < cols.length; i++) {
    setTimeout(() => {
      cols[i].classList.add("active");
      const beadDiv = document.createElement("div");
      beadDiv.classList.add("bead");
      cols[i].appendChild(beadDiv);
      if (parseInt(cols[i].innerText, 10) < 11) {
        cols[i].classList.add("range_1");
      } else if (parseInt(cols[i].innerText, 10) < 21) {
        cols[i].classList.add("range_2");
      } else if (parseInt(cols[i].innerText, 10) < 31) {
        cols[i].classList.add("range_3");
      } else if (parseInt(cols[i].innerText, 10) < 41) {
        cols[i].classList.add("range_4");
      } else {
        cols[i].classList.add("range_5");
      }
    }, i * 100);
    if (rndList.indexOf(i + 1) === -1) {
      setTimeout(() => {
        cols[i].classList.remove("active");
        cols[i].classList.remove("range_1");
        cols[i].classList.remove("range_2");
        cols[i].classList.remove("range_3");
        cols[i].classList.remove("range_4");
        cols[i].classList.remove("range_5");
        cols[i].removeChild(cols[i].firstElementChild);
      }, i * 100 + 300);
    }
  }
  setInterval(() => (isCasting = false), 4800);
};

const getLocalStorageData = () => {
  const localStorageData = localStorage.getItem("lotto");
  if (localStorageData) {
    return JSON.parse(localStorageData);
  } else {
    return [];
  }
};

const saveResultLocalStorage = (saveData) => {
  localStorage.setItem(
    "lotto",
    JSON.stringify([...getLocalStorageData(), saveData])
  );
};

const saveResult = () => {
  const saveData = [];
  const activeList = document.querySelectorAll(
    ".lotto_table .table .col.active"
  );
  if (isCasting || activeList.length !== 6 || isSaved) return;
  const newRow = document.createElement("div");
  newRow.classList.add("row");

  for (let i = 0; i < activeList.length; i++) {
    const col = document.createElement("div");
    col.classList.add("col");
    col.classList.add("active");
    const value = activeList[i].innerText;
    saveData.push(value);
    if (parseInt(value, 10) < 11) {
      col.classList.add("range_1");
    } else if (parseInt(value, 10) < 21) {
      col.classList.add("range_2");
    } else if (parseInt(value, 10) < 31) {
      col.classList.add("range_3");
    } else if (parseInt(value, 10) < 41) {
      col.classList.add("range_4");
    } else {
      col.classList.add("range_5");
    }
    col.innerText = value;
    const beadDiv = document.createElement("div");
    beadDiv.classList.add("bead");
    col.appendChild(beadDiv);
    newRow.appendChild(col);
    activeList[i].classList.value = "col";
    activeList[i].removeChild(activeList[i].firstElementChild);
  }
  const deleteCol = document.createElement("button");
  deleteCol.classList.add("delete_btn");
  deleteCol.innerText = "삭제";
  deleteCol.addEventListener("click", removeResult);

  newRow.appendChild(deleteCol);
  const resultEl = document.querySelector(".result");
  resultEl.prepend(newRow);
  saveResultLocalStorage(saveData);
  isSaved = true;
};

const cancelResult = () => {
  const activeList = document.querySelectorAll(
    ".lotto_table .table .col.active"
  );
  if (isCasting || activeList.length !== 6) return;
  for (let i = 0; i < activeList.length; i++) {
    activeList[i].classList.value = "col";
    activeList[i].removeChild(activeList[i].firstElementChild);
  }
};

const removeResult = (e) => {
  let el = e.target.parentElement;
  el.parentElement.removeChild(el);
  const removeData = [];
  const removeItemList = el.children;
  for (let i = 0; i < removeItemList.length; i++) {
    if (/^[0-9]/g.test(removeItemList[i].innerText)) {
      removeData.push(removeItemList[i].innerText);
    }
  }
  localStorage.setItem(
    "lotto",
    JSON.stringify(
      getLocalStorageData().filter(
        (v) => v.toString() !== removeData.toString()
      )
    )
  );
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
        row.appendChild(col);
      } else if (i * 7 + (j + 1) === 46) {
        const button = document.createElement("button");
        button.classList.add("action_btn");
        button.classList.add("cancel_btn");
        button.innerText = "취소";
        button.addEventListener("click", cancelResult);
        row.appendChild(button);
      } else if (i * 7 + (j + 1) === 47) {
        const button = document.createElement("button");
        button.classList.add("action_btn");
        button.classList.add("save_btn");
        button.innerText = "저장";
        button.addEventListener("click", saveResult);
        row.appendChild(button);
      } else if (i * 7 + (j + 1) === 48) {
        const button = document.createElement("button");
        button.classList.add("action_btn");
        button.innerText = "뽑기";
        button.addEventListener("click", getRandomNum);
        row.appendChild(button);
      }
    }
    body.appendChild(row);
  }
  lottoTable.prepend(body);
};

const setDigitNumber = (number) => {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};

const setLocalStorageData = () => {
  const localStorageData = JSON.parse(localStorage.getItem("lotto"));
  for (let i = 0; i < localStorageData.length; i++) {
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    for (let j = 0; j < localStorageData[i].length; j++) {
      const col = document.createElement("div");
      col.classList.add("col");
      col.classList.add("active");
      const value = localStorageData[i][j];
      if (parseInt(value, 10) < 11) {
        col.classList.add("range_1");
      } else if (parseInt(value, 10) < 21) {
        col.classList.add("range_2");
      } else if (parseInt(value, 10) < 31) {
        col.classList.add("range_3");
      } else if (parseInt(value, 10) < 41) {
        col.classList.add("range_4");
      } else {
        col.classList.add("range_5");
      }
      col.innerText = value;
      const beadDiv = document.createElement("div");
      beadDiv.classList.add("bead");
      col.appendChild(beadDiv);
      newRow.appendChild(col);
    }
    const deleteCol = document.createElement("button");
    deleteCol.classList.add("delete_btn");
    deleteCol.innerText = "삭제";
    deleteCol.addEventListener("click", removeResult);

    newRow.appendChild(deleteCol);
    const resultEl = document.querySelector(".result");
    resultEl.prepend(newRow);
  }
};

const init = () => {
  setGrid();
  setLocalStorageData();
};
init();
