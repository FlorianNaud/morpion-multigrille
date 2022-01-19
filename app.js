var origBoard = []
for(i=0; i<9;i++)(
    origBoard[i] = Array.from(Array(9).keys())
)
const Player1 = 'O';
const Player2 ='X';
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]
const allTableauElement = document.querySelectorAll(".tableau");
const allTableauCellElement = document.querySelectorAll(".cell");

const replayElement=  document.querySelector("#replay");
replayElement.addEventListener('click', handleStartGame);
handleStartGame();

function handleStartGame(){
    document.querySelector(".endgame").style.display ="none" ;
    for(let i=0; i<allTableauCellElement.length;i++){
        allTableauCellElement[i].innerText ='';
        allTableauCellElement[i].style.removeProperty('background-color');
        allTableauCellElement[i].addEventListener('click', handleTurnClick,false)
    }
}

let activeBoard = document.querySelector ('.active');
let activePlayer = Player1

function handleTurnClick(square){
    let numeroDeCase = parseInt(square.target.classList);
    if((activeBoard.getElementsByTagName('td')[numeroDeCase].innerHTML) != 'O' && activeBoard.getElementsByTagName('td')[numeroDeCase].innerHTML != 'X'){
        if(!checkTie()){
        turn(parseInt(square.target.classList), activePlayer);
    }
    }
}

function turn(squareId, player){
    origBoard[activeBoard.id][squareId] = player ;
    activeBoard.getElementsByTagName('td')[squareId].innerText = player;
    let gameWon = checkWin(origBoard[activeBoard.id], player);
    if(gameWon) gameOver(gameWon)
    // TODO : changer le board

    

    if(activePlayer==Player1) {
        activePlayer=Player2
    }
    else{
        activePlayer=Player1
    };
    
}

function checkWin(board, player){
    let plays = board.reduce((a,e,i) =>
    (e===player) ? a.concat(i) : a,[]) ;
    let gameWon = null ;
    for(let [index, win] of winCombos.entries()){
        if(win.every(elem => plays.indexOf(elem)> -1)){
            gameWon ={index: index, player : player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon){
    for (let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor=
            gameWon.player == Player1 ? "blue" : "red"
    }
    for (var i=0; i<allTableauCellElement.length;i++){
        allTableauCellElement[i].removeEventListener('click', handleTurnClick, false)
    }
    declareWinner(gameWon.player == Player1 ? "Le joueur 1 gagne !" : "Le joueur 2 gagne !")
}

function declareWinner (who){
    document.querySelector(".endgame").style.display ="block";
    document.querySelector(".endgame .text").innerText =who;
}

function emptySquares() {
    let tableauVide = [] ;
    for (i=0; i<origBoard[activeBoard.id].length;i++){
        
        console.log (tableauVide);
        if(activeBoard.getElementsByTagName('td')[i].innerHTML == ''){
            tableauVide.push(i);
        }
    }
    return tableauVide
}
function checkTie(){
    if(emptySquares().length == 1) {
        for (var i = 0 ; i< allTableauCellElement.length; i++){
            allTableauCellElement[i].style.backgroundColor="green";
            allTableauCellElement[i].removeEventListener('click', handleTurnClick, false);
        }
        declareWinner("Tie Game !")
        return true;
    }
    return false;
}