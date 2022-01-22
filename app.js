window.addEventListener("load", function(){
    var origBoard = []
    for(i=0; i<9;i++) {
        origBoard[i] = Array(9)
    }
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
    printActiveTable();
    printGlobal();
    const allTableauCellElement = document.querySelectorAll(".cell");

    const replayElement=  document.querySelector("#replay");
    replayElement.addEventListener('click', handleStartGame);
    handleStartGame();

    function handleStartGame(){
        document.querySelector(".endgame").style.display ="none" ;
        for(let i=0; i< allTableauCellElement.length; i++){
            allTableauCellElement[i].innerText ='';
            allTableauCellElement[i].style.removeProperty('background-color');
            allTableauCellElement[i].addEventListener('click', handleTurnClick, false)
        }   
     }

    let activeBoard = document.querySelector ('.active');
    let globalBoard = document.querySelector('#global');

    let activePlayer = Player1

    function handleTurnClick(square){
        let numeroDeCase = parseInt(square.target.classList);
        if((activeBoard.getElementsByTagName('td')[numeroDeCase].innerHTML) != 'O' && activeBoard.getElementsByTagName('td')[numeroDeCase].innerHTML != 'X'){
            if(!checkTie()){
                turn(numeroDeCase, activePlayer);
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


        printActiveTable(squareId);
        activeBoard = document.querySelector('.active');
        
        let globalTdElement = globalBoard.querySelectorAll('td');
        for(i=0; i<globalTdElement.length;i++){
            globalTdElement[i].style.backgroundColor='white'
        }

        colorTableau()
    
        if(activePlayer===Player1) {
            activePlayer=Player2
        } else {
            activePlayer=Player1
        }; 
    }
    function colorTableau() {
        let startIdx = 0;
        if(["3", "4", "5"].includes(activeBoard.id)) { // Si activeBoard.id = 3 OU 4 OU 5 ;)
            startIdx = 3;
        } else if(["6", "7", "8"].includes(activeBoard.id)){
            startIdx = 6;
        }

        globalBoard.getElementsByTagName('tr')[startIdx].getElementsByTagName('td')[(activeBoard.id % 3) * 3].style.backgroundColor = 'blue'; // Ici on doit faire avec un MODULO (%3), c'est le reste de la division ;)
        globalBoard.getElementsByTagName('tr')[startIdx].getElementsByTagName('td')[(activeBoard.id % 3) * 3 + 1].style.backgroundColor = 'blue';
        globalBoard.getElementsByTagName('tr')[startIdx].getElementsByTagName('td')[(activeBoard.id % 3) * 3 + 2].style.backgroundColor = 'blue';
        globalBoard.getElementsByTagName('tr')[startIdx + 1].getElementsByTagName('td')[(activeBoard.id % 3) * 3].style.backgroundColor = 'blue';
        globalBoard.getElementsByTagName('tr')[startIdx + 1].getElementsByTagName('td')[(activeBoard.id % 3) * 3 + 1].style.backgroundColor = 'blue';
        globalBoard.getElementsByTagName('tr')[startIdx + 1].getElementsByTagName('td')[(activeBoard.id % 3) * 3 + 2].style.backgroundColor = 'blue';
        globalBoard.getElementsByTagName('tr')[startIdx + 2].getElementsByTagName('td')[(activeBoard.id % 3) * 3].style.backgroundColor = 'blue';
        globalBoard.getElementsByTagName('tr')[startIdx + 2].getElementsByTagName('td')[(activeBoard.id % 3) * 3 + 1].style.backgroundColor = 'blue';
        globalBoard.getElementsByTagName('tr')[startIdx + 2].getElementsByTagName('td')[(activeBoard.id % 3) * 3 + 2].style.backgroundColor = 'blue';
    }
    function mainTableau(squareId, player){
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
            let winSquare = document.getElementById(index);
            if(winSquare) winSquare.style.backgroundColor = gameWon.player == Player1 ? "blue" : "red"
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
    function printActiveTable(activeTableIdx = 0) {
        let oldTable = document.getElementById("print-active-table").firstChild;
        let elTable = document.createElement('table');
        elTable.className = "tableau active";
        elTable.id = activeTableIdx; // TODO Choisir l'id actif
        let idx = 0; // TODO Y'a mieux à faire (row * col) ou un truc comme ça
        for(let row=0; row<3; row++) {
            let elTr = document.createElement('tr');
            for(let col=0; col<3; col++) {
                let elTd = document.createElement('td');
                elTd.className = idx + " cell";
                elTd.addEventListener('click', handleTurnClick, false);
                if(origBoard[activeTableIdx][idx]) elTd.innerText = origBoard[activeTableIdx][idx];
                elTr.append(elTd);

                idx++;
            }
            elTable.append(elTr);
        }

        document.getElementById("print-active-table").replaceChild(elTable, oldTable);
    }
    function printGlobal() {
        let globalTable = document.getElementById("global");

        for(let row=0; row<9; row++) {
            let elTr = document.createElement('tr');
            for(let col=0; col<9; col++) {
                let elTd = document.createElement('td');
                elTd.className = col;
                elTr.append(elTd);
            }
            globalTable.append(elTr);
        }
    }
});