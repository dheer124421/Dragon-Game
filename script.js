score = 0
cross = true

audio = new Audio('music.mp3');
audioDn = new Audio('gameover.mp3');
setTimeout( ()=>{
    audio.play();
}, 10);
document.onkeydown = function (e) {
    console.log("key entered : ", e.keyCode);

    if (e.keyCode == 38) {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700);
    }

    else if(e.keyCode == 39) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = dinoX + 100 + "px";
    }

    else if(e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dino.style.left = (dinoX - 100) + "px";
    }
}

setInterval(() => {
        dino = document.querySelector('.dino');
        obstracle = document.querySelector('.obstracle');
        gameOver = document.querySelector('.gameOver');

        dx = parseInt(window.getComputedStyle(dino,null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino,null).getPropertyValue('top'));

        ox = parseInt(window.getComputedStyle(obstracle,null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstracle,null).getPropertyValue('top'));

        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);

        // console.log(offsetX, offsetY)
        if (offsetX < 72 && offsetY < 52){
            gameOver.innerHTML = "Game Over - Reload to start again" 
            obstracle.classList.remove('obstracleAni');  
            audioDn.play();
            setTimeout(()=>{
                audioDn.pause();
                audio.pause(); 
            },800);
        }

        else if(cross && offsetX<145){
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true
            },1000);

            setTimeout(()=>{
                aniDur = parseFloat(window.getComputedStyle(obstracle,null).getPropertyValue('animation-duration'));
                newDur = aniDur - 0.1;
                obstracle.style.animationDuration = newDur + 's';
                console.log(newDur);
            },500);
        }
}, 10);

function updateScore (score){
    scoreCout.innerHTML = "Yous Score: " + score
}