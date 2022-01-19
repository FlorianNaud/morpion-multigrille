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
let globalBoard = document.querySelector('#global');

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
    activeBoard.classList.remove('active');
    mainTableau(squareId,player);
    let newActiveElement = document.getElementById(squareId);
    newActiveElement.classList.add('active');
    activeBoard=document.querySelector('.active');
    if(activePlayer==Player1) {
        activePlayer=Player2
    }
    else{
        activePlayer=Player1
    };
    
}

function mainTableau(squareId, player){
    console.log("square " + squareId)
    console.log("activeBoard " + activeBoard.id)
    if(activeBoard.id==0){
        if(squareId==0 || squareId==1 || squareId==2){
        globalBoard.getElementsByTagName('tr')[0].getElementsByTagName('td')[squareId].innerText = player;
        }
        if(squareId==3 || squareId==4 || squareId==5){
            globalBoard.getElementsByTagName('tr')[1].getElementsByTagName('td')[squareId-3].innerText = player;
        }
        if(squareId==6 || squareId==7 || squareId==8){
            globalBoard.getElementsByTagName('tr')[2].getElementsByTagName('td')[squareId-6].innerText = player;
        }  
    }
    if(activeBoard.id==1){
        if(squareId==0 || squareId==1 || squareId==2){
        globalBoard.getElementsByTagName('tr')[0].getElementsByTagName('td')[squareId+3].innerText = player;
        }
        if(squareId==3 || squareId==4 || squareId==5){
            globalBoard.getElementsByTagName('tr')[1].getElementsByTagName('td')[squareId].innerText = player;
        }
        if(squareId==6 || squareId==7 || squareId==8){
            globalBoard.getElementsByTagName('tr')[2].getElementsByTagName('td')[squareId-3].innerText = player;
        }
    }
    if(activeBoard.id==2){
        if(squareId==0 || squareId==1 || squareId==2){
            globalBoard.getElementsByTagName('tr')[0].getElementsByTagName('td')[squareId+6].innerText = player;
        }
        if(squareId==3 || squareId==4 || squareId==5){
            globalBoard.getElementsByTagName('tr')[1].getElementsByTagName('td')[squareId+3].innerText = player;
        }
        if(squareId==6 || squareId==7 || squareId==8){
            globalBoard.getElementsByTagName('tr')[2].getElementsByTagName('td')[squareId].innerText = player;
        }
    }
    if(activeBoard.id==3){
        if(squareId==0 || squareId==1 || squareId==2){
            globalBoard.getElementsByTagName('tr')[3].getElementsByTagName('td')[squareId].innerText = player;
        }
        if(squareId==3 || squareId==4 || squareId==5){
            globalBoard.getElementsByTagName('tr')[4].getElementsByTagName('td')[squareId-3].innerText = player;
        }
        if(squareId==6 || squareId==7 || squareId==8){
            globalBoard.getElementsByTagName('tr')[5].getElementsByTagName('td')[squareId-6].innerText = player;
        }
    }
    if(activeBoard.id==4){
        if(squareId==0 || squareId==1 || squareId==2){
            globalBoard.getElementsByTagName('tr')[3].getElementsByTagName('td')[squareId+3].innerText = player;
        }
        if(squareId==3 || squareId==4 || squareId==5){
            globalBoard.getElementsByTagName('tr')[4].getElementsByTagName('td')[squareId].innerText = player;
        }
        if(squareId==6 || squareId==7 || squareId==8){
            globalBoard.getElementsByTagName('tr')[5].getElementsByTagName('td')[squareId-3].innerText = player;
        }
    }
    if(activeBoard.id==5){
        if(squareId==0 || squareId==1 || squareId==2){
            globalBoard.getElementsByTagName('tr')[3].getElementsByTagName('td')[squareId+6].innerText = player;
        }
        if(squareId==3 || squareId==4 || squareId==5){
            globalBoard.getElementsByTagName('tr')[4].getElementsByTagName('td')[squareId+3].innerText = player;
        }
        if(squareId==6 || squareId==7 || squareId==8){
            globalBoard.getElementsByTagName('tr')[5].getElementsByTagName('td')[squareId].innerText = player;
        }
    }
    if(activeBoard.id==6){
        if(squareId==0 || squareId==1 || squareId==2){
        globalBoard.getElementsByTagName('tr')[6].getElementsByTagName('td')[squareId].innerText = player;
        }
        if(squareId==3 || squareId==4 || squareId==5){
            globalBoard.getElementsByTagName('tr')[7].getElementsByTagName('td')[squareId-3].innerText = player;
        }
        if(squareId==6 || squareId==7 || squareId==8){
            globalBoard.getElementsByTagName('tr')[8].getElementsByTagName('td')[squareId-6].innerText = player;
        }
    }
    if(activeBoard.id==7){
        if(squareId==0 || squareId==1 || squareId==2){
        globalBoard.getElementsByTagName('tr')[6].getElementsByTagName('td')[squareId+3].innerText = player;
        }
        if(squareId==3 || squareId==4 || squareId==5){
            globalBoard.getElementsByTagName('tr')[7].getElementsByTagName('td')[squareId].innerText = player;
        }
        if(squareId==6 || squareId==7 || squareId==8){
            globalBoard.getElementsByTagName('tr')[8].getElementsByTagName('td')[squareId-3].innerText = player;
        }
    }
    if(activeBoard.id==8){
        if(squareId==0 || squareId==1 || squareId==2){
        globalBoard.getElementsByTagName('tr')[6].getElementsByTagName('td')[squareId+6].innerText = player;
        }
        if(squareId==3 || squareId==4 || squareId==5){
            globalBoard.getElementsByTagName('tr')[7].getElementsByTagName('td')[squareId+3].innerText = player;
        }
        if(squareId==6 || squareId==7 || squareId==8){
            globalBoard.getElementsByTagName('tr')[8].getElementsByTagName('td')[squareId].innerText = player;
        }
    }
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