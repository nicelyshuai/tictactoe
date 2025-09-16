const getready = document.querySelector('.ready');
const getyesbtn = document.getElementById('yes-btn');

const getgameboard = document.querySelector('.gameboard');
const gettablecells = document.querySelector('.table-cells');

const gettds = document.querySelectorAll('.tds');
const getresult = document.getElementById('result');
const getrestartbtn = document.getElementById('restart');

const getcongrats = document.getElementById('congrats');
// console.log(getready);
// console.log(getyesbtn);


//Text UI
getyesbtn.addEventListener('click',function(){
// console.log('hey');

    getready.innerHTML = `<div class="chooseplayer">
      <h2>Choose your player</h2>
      <button id="x-btn">X</button>
      <button id="o-btn">O</button>
    </div>`

    const getxbtn = document.getElementById('x-btn');
    const getobtn = document.getElementById('o-btn');


  getxbtn.addEventListener('click', function() {
    // console.log("You chose X");

    const getchooseplayer = document.querySelector('.chooseplayer');

  if(getxbtn){
    getchooseplayer.innerHTML = `<h2>You Chose X</h2>`;
     playerMove = "X";
    startgame();
  }
    getgameboard.style.display = 'inline';
    
  });

  getobtn.addEventListener('click', function() {
    // console.log("You chose O");

     const getchooseplayer = document.querySelector('.chooseplayer');
  if(getobtn){
        getchooseplayer.innerHTML = `<h2>You Chose O</h2>`;
         playerMove ="O";
        
  }

    getgameboard.style.display = 'inline';
    startgame();
  });

});

//Table
// console.log(gettds);
let play = true;


let winnings = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let board = ["","","","","","","","",""];
// console.log(board);

function startgame(){
    gettds.forEach((gettd,idx)=>{
    // console.log(gettd);
    gettd.addEventListener('click',function(){
        if(!play) return;
        if(board[idx]!="") return;

        let playerturn =(playerMove == 'X')?"X":"O";

        board[idx] = playerturn;
        gettd.textContent = playerturn;
        gettd.style.color = 'white';
        gettd.classList.add('ptaken');
        


    if (winnerChek()) {
      getresult.textContent = `Status: You win!`;
      getcongrats.classList.add('con');
      gettablecells.style.opacity = '0.5';
      gettablecells.style.cursor = 'not-allowed';
      play = false;
      return;
    }else if (!board.includes("")) {
      getresult.textContent = "Status: It's a draw!";
      getcongrats.classList.add('draw');
      gettablecells.style.opacity = '0.5';
      gettablecells.style.cursor = 'not-allowed';
      getcongrats.textContent = "It's a Draw!";
      play = false;
      return;
    }

    // computer's move
    computerMove();

    });
});

function computerMove(){
    let emptytds = [];

    board.forEach((emptytd,index)=>{
        if(emptytd===""){
            emptytds.push(index);
        };
    });

    let randomIdx = emptytds[Math.floor(Math.random()*emptytds.length)];
    let computerturn = (playerMove === 'X')?"O":"X";
  board[randomIdx] = computerturn;
  gettds[randomIdx].textContent = computerturn;
  gettds[randomIdx].style.color = 'white';
  gettds[randomIdx].classList.add('ctaken');

  if(winnerChek()){
    getresult.textContent = `Status: Computer wins!`;
    getcongrats.classList.add('con');
    gettablecells.style.opacity = '0.5';
    gettablecells.style.cursor = 'not-allowed';
    getcongrats.textContent = "Try Next Match"
    play = false;
    return;

  }else if(!board.includes("")) {
      getresult.textContent = "Status: It's a draw!";
      getcongrats.classList.add('draw');
      gettablecells.style.cursor = 'not-allowed';
      getcongrats.textContent = "It's a Draw!";
        play = false;
      return;
    }

}

function winnerChek(){
    for(let i=0; i < winnings.length; i++){
        const [a,b,c] = winnings[i];

        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            winnings[i].forEach(winning=>gettds[winning].classList.add('win'));

            return true;
        };
    }

     return false;
}

getrestartbtn.addEventListener('click',function(){
    location.reload();
});

}

const getform = document.querySelector('.form-group');

getform.addEventListener('submit',function(e){
  e.preventDefault();
});

const autoyear = document.getElementById('autoyear');
autoyear.textContent = new Date().getFullYear();





