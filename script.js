let mode = document.querySelector('#mode');
let body = document.querySelector('body');
mode.addEventListener("change", (e)=>{
    if(mode.checked){
        body.classList.add("black");
        body.classList.remove('white');
        console.log('black');
    }
    if(!(mode.checked)){
        body.classList.add("white");
        body.classList.remove('black');
        console.log('white');
    }
})




let gameSeq = [];
let userSeq= [];

let highscore = 0;

let btns = ["yellow" , "red" , "purple" , "green"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');
let p = document.querySelector('p');
document.addEventListener('keypress', function() {
    if(!started){
        started = true;
        h3.innerText = "";
        levelUp();
    }
})
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level : ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}
function checkAns(idx){
    //let idx = level - 1;
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }

    }
    else{
        h2.innerText = `Game Over! Your Score is ${Math.max(0,level-1)}`;
        highscore = Math.max(highscore,level-1); 
        h3.innerText = `Press Any Key To Restart`;
        reset();
    }
}
function btnPress(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id"); 
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    p.innerText = `HighScore : ${Math.max(0,highscore)}`; 
}
