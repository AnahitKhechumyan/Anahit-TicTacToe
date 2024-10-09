let $input = document.querySelector('#grid');
let $button = document.querySelector('.btn');
let $board = document.querySelector('.board');
let $boxes  = document.querySelectorAll('.box');
let $box = document.querySelector('.box');
let $restartButton = document.querySelector('#restart');
let playerDisplay = document.querySelector(".display-player");
let mySong = document.querySelector('#audio1');
 
function playSong(){ 
  mySong.play();
  if(gameOver){
    mySong.pause();
  }
}; 
function pauseSong(){
  mySong.pause();
}; 
 
let player = "X";
let gameBoardArray = [];
let gameOver = false;
  
let restartBoard = function(){
    $boxes = document.querySelectorAll('.box'); 
    $boxes.forEach(function($box){
        $box.innerHTML = "";
        });
        playerDisplay.innerText = ""; 
        gameBoardArray = createBoard();
        mySong.pause();
};

let checkWin = function(){
    let gridSize = $input.value;

    for(let row = 0; row < gridSize; row++){
        let win = true;
        for (let col = 0; col < gridSize; col++){
            if (gameBoardArray[row][col] !== player){
                win = false;
                break;
            } 
    };
        if(win) {
            playerDisplay.textContent = "Player " + player + " wins!";
            return true;
        }
    };
    for(let col = 0; col < gridSize; col++){
        let win = true;
        for (let row = 0; row < gridSize; row++){
            if (gameBoardArray[row][col] !== player){
                win = false;
                break;
            }
        };
        if(win){
            playerDisplay.textContent = "Player " + player + " wins!";
            return true;
        }
    };
    let win = true;
    for(let i = 0; i < gridSize; i++){
        if (gameBoardArray[i][i] !== player){
            win = false;
            break;
        }  
    };
        if(win){
            playerDisplay.textContent = "Player " + player + " wins!";
            return true;
        }
    win = true;
    for(let i = 0; i < gridSize; i++){
        if (gameBoardArray[i][gridSize - i - 1] !== player){
            win = false;
            break; 
        }
    };
        if(win){
            playerDisplay.textContent = "Player " + player + " wins!";
            return true;
        }
       return false;  
};




function startGame(event) {
    event.preventDefault();
    playSong();
    $box = event.target; 
    let row = $box.dataset.itemRow;
    let col = $box.dataset.itemCol; 

    if (gameOver) return; 

    if($box.innerText === ''){
        gameBoardArray[row][col] = player;
        $box.innerText = player;
        if(checkWin()){
            pauseSong();
            gameOver = true; 
            return; 
        }  
        player = (player === 'X') ? 'O' : 'X';
        playerDisplay.textContent = `Player ${player}'s turn`;
    }
}
 
function createBoard(){
    let gridSize = $input.value;
    $boxes.forEach(box => {
       box.remove();
   });
    let board = [];
   for (let i = 0; i < gridSize; i++) {
        board.push(Array(gridSize).fill("")); 
        let row = document.createElement('div');
        for (let j = 0; j < gridSize; j++) {
               $box = document.createElement('div');
               $box.dataset.itemRow = j;
               $box.dataset.itemCol = i;
               $box.textContent = "";
               $box.classList.add('box');
              let size = $board.style.width = $board.style.height = 580 + 'px';
              $board.style.display = 'flex';
               if(gridSize > 11){
                   size = 572 + 'px'
                }
                if(gridSize == 19){
                    size = 568 + 'px'
                }
               $box.style.width = $box.style.height = Math.ceil(parseInt(size)/+gridSize) + 'px';
               $box.style.display = 'flex';
               $box.style.backgroundColor = 'ligtheblue';
               $box.style.border = '2px solid white';
               $box.style.borderRadius ='12px';
               $box.style.justifyContent = 'center';
               $box.style.alignItems = 'center';
               if(gridSize > 6){
                $box.style.borderRadius = '10px';
                $box.style.fontSize = 70 + 'px';
               }
               if(gridSize > 9){
                $box.style.borderRadius = '6px';
                $box.style.fontSize = 50 + 'px';
               }
               if(gridSize > 13){
                $box.style.borderRadius = '3px';
                $box.style.fontSize = 30 + 'px';
               }
               row.append($box);
               $board.append(row);
               $box.addEventListener('click', startGame);
                      
        };      
   };
    return board;  
};
 
$button.addEventListener('click', function(){
    gameBoardArray = createBoard();
    restartBoard();
});
$restartButton.addEventListener('click',restartBoard); 
$boxes.forEach(box => box.removeEventListener('click', startGame)); 

 