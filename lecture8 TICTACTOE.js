let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let c = 0;
let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turn0 = true;
  c = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
}
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "X";
      box.style.color = "blue";
      turn0 = false;
    }
    else {
      box.innerText = "O";
      box.style.color = "red";
      turn0 = true;
    }
    box.disabled = true;
    c++;
    checkWinner();
  });
});

const disableBoxes = () => {
  for(let box of boxes){
    box.disabled=true;
  }
}

const enableBoxes = () => {
  for(let box of boxes){
    box.disabled=false;
    box.innerText="";
    box.classList.remove("o-color","x-color");
    box.style.backgroundColor="bisque";
  }
}

const showWinner = (winner, winningPattern) => {
  msg.innerText = `Congratulation, Player${winner} is the Winner!`;
  msgContainer.classList.remove("hide");

  winningPattern.forEach(idx => {
    boxes[idx].style.backgroundColor = "#90e490ff"; 
  });

  disableBoxes();
}

const showDraw = () => {
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const checkWinner = () => {
  for (pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    if(pos1val != "" && pos2val != "" && pos3val != "" ){
      if (pos1val === pos2val && pos2val === pos3val){
        showWinner(pos1val, pattern);
        return;
      }
    }
  }
  if (c === 9){
    showDraw();
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame)