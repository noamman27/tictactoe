let x_turn = true;
let gameOver = true;
let X_player = [];
let O_player = [];
let turn = document.getElementById("turn");
let  p = document.getElementById("winner");
function xo(elem, id){
    if(elem.textContent != "" || gameOver){
        return;
    }
    if(x_turn){
        drawAndCheck(X_player,"X",id,elem);
        turn.innerHTML = "O's turn";
    }
    else{
        drawAndCheck(O_player,"O",id,elem);
        turn.innerHTML = "X's turn";
    }
    if(!gameOver && X_player.length + O_player.length == 9){
        gameOver = true;
        p.innerHTML = "tie!!!";
    }
    x_turn = !x_turn;
}
function drawAndCheck(playerArr, sign, id, elem){
    elem.textContent= sign;
    playerArr.push(id);
    if(checkIfWins(playerArr))
    {
        notifyWinner(sign);
    }
}
function notifyWinner(sign){
    p.innerHTML = sign +" wins!!!";
}
function checkRow(playerArr, a, b, c){
    let completed = playerArr.includes(a)&&playerArr.includes(b)&&playerArr.includes(c);
    if (completed){
        document.getElementById(a).classList.add("winner");
        document.getElementById(b).classList.add("winner");
        document.getElementById(c).classList.add("winner");
    }
    return completed;
}
function checkIfWins(playerArr){
    gameOver = (checkRow(playerArr, 1, 7, 4)
        || checkRow(playerArr, 1, 2, 3)
        || checkRow(playerArr, 5, 9, 1)
        || checkRow(playerArr, 4, 5, 6)
        || checkRow(playerArr, 7, 8, 9)
        || checkRow(playerArr, 3, 5, 7)
        || checkRow(playerArr, 2, 5, 8)
        || checkRow(playerArr, 3, 6, 9)
    );
    return gameOver;
}
function newGame(){
    if ( X_player.length + O_player.length == 0 || 
            gameOver || 
            confirm("Are you sure you want to restart?") == true){
        gameOver = false;
        x_turn = true;
        X_player = [];
        O_player = [];
        let ids = 1;
        let html ="";
        p.innerHTML = ""
        turn.innerHTML = "X's turn"
        for( let i=0;i<3;i++){
            html +=`<tr>`
            for(let i=0;i<3;i++){
                html+=`<td id = "${ids}" onclick="xo(this,${ids})"></td>`;
                ids++;
            }
        html +=`</tr>`;
        document.getElementById("table").innerHTML=html;
        }
    }
}
newGame();