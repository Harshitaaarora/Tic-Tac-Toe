let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true //means first turnn of player O and not of X

const winning_patterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];


const disableBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
};

const showWinner = (winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes(); //to disable all boxes once a winner is declared
};


const checkWinner = () => {
    for (let pattern of winning_patterns){
        // console.log(pattern);
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO){  //player O
            box.innerText = "O";
            box.classList.add("classO"); //to add specific color for O
            box.classList.remove("classX");
            turnO=false;
        }
        else {  //player X
            box.innerText = "X";
            box.classList.add("classX"); //to add specific color for X
            box.classList.remove("classO");
            turnO=true;
        }
        box.disabled = true; //to avoid changing of value in box on clicking again

        checkWinner();
    })
});

const resetGame = ()=> {
    enableBoxes();
    turnO=true;
    msgContainer.classList.add("hide"); //to hide the msg once the game is reset

};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);