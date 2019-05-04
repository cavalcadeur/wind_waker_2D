function videAsFuck(){
    //console.log("Vide");
}

function usualGamePad(){
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(mouse[1]-2,mouse[0]-2,5,5);
    if (gamePads.buttons[0].pressed == true){
        keyDown(heros[0].touche[4]);
    }
    else if (keys[heros[0].touche[4]] == 1) keyUp(heros[0].touche[4]);
    if (gamePads.buttons[1].pressed == true){
        keyDown(heros[0].touche[5]);
    }
    else if (keys[heros[0].touche[5]] == 1) keyUp(heros[0].touche[5]);

    if (gamePads.axes[0] > 0.5) move(1,0,0);
    else if (gamePads.axes[0] < -0.5) move(3,0,0);
    else if (gamePads.axes[1] > 0.5) move(2,0,0);
    else if (gamePads.axes[1] < -0.5) move(0,0,0);

    if (gamePads.axes[4] > 0) mouse[0] += gamePads.axes[4]*15;
    else if (gamePads.axes[4] < 0) mouse[0] += gamePads.axes[4]*15;
    if (gamePads.axes[3] > 0) mouse[1] += gamePads.axes[3]*15;
    else if (gamePads.axes[3] < 0) mouse[1] += gamePads.axes[3]*15;
}
