function drawInvent(){
    ctx.fillStyle = colors[0];
    ctx.fillRect(0,0,W,H);
    backDraw();

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0,0,W,H);
    
    var marginX = (W - 1300)/2;
    var marginY = (H - 656)/2;
    ctx.drawImage(fondInvent,marginX,marginY);

    // inventaire defilable

    for (var i = 0; i < 5; i++){
        if (i < heros[0].invent.length) ctx.drawImage(imgMenu[heros[0].invent[i]],W/2 - (i+2)*100,marginY + 40);
        else ctx.drawImage(imgMenu["blank"],W/2 - i*100,marginY + 40);
    }
    for (var i = 0; i < 5; i++){
        if (i < heros[1].invent.length) ctx.drawImage(imgMenu[heros[1].invent[i]],W/2 + (i+1)*100 + 50,marginY + 40);
        else ctx.drawImage(imgMenu["blank"],W/2 + i*100 + 50,marginY + 40);
    }

    // inventaire prioritaire

    ctx.drawImage(imgMenu[heros[0].prim],W/2 - 25,marginY + 40);

    // inventaire interne

    for (var i = 0; i < 5; i++){
        for (var j = 0; j < 9; j++){
            if (i*9 + j < objInvent.length) ctx.drawImage(imgMenu[objInvent[j + 9*i]],W/2 + (j-4)*70 - 25,marginY + 240 + i*75);
            else ctx.drawImage(imgMenu["blank"],W/2 + (j-4)*70 - 25,marginY + 240 + i*75);
        }
    }

    // Affichage du bouton de sauvegarde

    if (mouse[1] < 150 && mouse[0] > H-85 && mouse[0] < H - 15){
        ctx.fillStyle = "rgb(39,26,0)";
        ctx.fillRect(0,H-85,180,70);
        ctx.drawImage(imgElement["save"],30,H-85);
    }
    else {
        ctx.fillStyle = "rgb(39,26,0)";
        ctx.fillRect(0,H-85,150,70);
        ctx.drawImage(imgElement["save"],0,H-85);
    }
    
    /*
    //rubis du joueur 1
    
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,W/10+10,200,50);
    ctx.drawImage(imgElement.rubisVert,150,W/10-15);
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "30px purisa";
    ctx.textAlign = "right";
    ctx.fillText(heros[0].rubis + "",140,W/10 + 45);

    //rubis du joueur 2
    
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(W-200,W/10+10,200,50);
    ctx.drawImage(imgElement.rubisVert,W-50,W/10-15);
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "30px purisa";
    ctx.textAlign = "right";
    ctx.fillText(heros[0].rubis + "",W-60,W/10 + 45);
     */

    // Îcone à côté du curseur de la souris.
    
    ctx.drawImage(imgElement[useless[0]],mouse[1],mouse[0]);
}

function inventclick(x,y){
    x -= (W - 1300)/2;
    y -= (H - 656)/2;

    // On vérifie d'abord que le curseur est à peu près dans les limites de l'inventaire
    if (y > 0 && x > 0 && y < 656 && x < 1300){
        
        if (y < 170){ // On est sur la partie haute de l'écran. Donc dans l'inventaire courant.
            if (x < 540){ // On est dans l'inventaire interne de notre ami le premier joueur.
                var casa = 4 - (x-x%(100))/(100);
                if (useless[0] == "blank") {
                    useless[0] = heros[0].invent[casa] + "";
                    heros[0].invent[casa] = "blank";
                }
                else {
                    if (heros[0].invent[casa] != "blank") objInvent.push(heros[0].invent[casa]);
                    heros[0].invent[casa] = useless[0] + "";
                    useless[0] = "blank";
                }
            }
            else if (x > 760){
                var casa = (((x-760)-(x-760)%100)/100);
                if (useless[0] == "blank") {
                    useless[0] = heros[1].invent[casa] + "";
                    heros[1].invent[casa] = "blank";
                }
                else {
                    if (heros[1].invent[casa] != "blank") objInvent.push(heros[1].invent[casa]);
                    heros[1].invent[casa] = useless[0] + "";
                    useless[0] = "blank";
                }
            }
            else {
                if (useless[0] == "blank") {
                    useless[0] = heros[0].prim + "";
                    heros[0].prim = "blank";
                }
                else {
                    if (heros[0].prim != "blank") objInvent.push(heros[0].prim);
                    heros[0].prim = useless[0] + "";
                    useless[0] = "blank";
                }
            }
        }
        else{
            if (x > 300 && x < 1000){ // On est à peu près dans le grand espace de l'inventaire interne.
                x -= 370;
                y -= 240;
                var J = Math.round(x/70);
                var I = Math.round(y/75);
                var casa = J + 9*I;
                if (useless[0] == "blank") {
                    if (objInvent[casa] != undefined && objInvent[casa] != "blank"){
                        useless[0] = objInvent[casa] + "";
                        objInvent.splice(casa,1);
                    }
                }
                else {
                    if (casa >= objInvent.length){
                        objInvent.push(useless[0]);
                        useless[0] = "blank";
                    }
                    else {
                        objInvent.splice(casa,0,useless[0]);
                        useless[0] = "blank";
                    }
                }
            }
        }
    }

    if (mouse[1] < 150 && mouse[0] > H-85 && mouse[0] < H - 15) save();
}

function endInvent(){
    var suppr = [];
    var suppr2 = [];
    for (var i = 4;i>=0;i--){
        if (heros[0].invent[i] == "blank") suppr.push(i);
        if (heros[1].invent[i] == "blank") suppr2.push(i);
    }
    suppr.forEach(
        function (e){
            heros[0].invent.splice(e,1);
        }
    );
    suppr2.forEach(
        function (e){
            heros[1].invent.splice(e,1);
        }
    );
    if (heros[0].invent.length == 0) heros[0].invent[0] = "blank";
    if (heros[1].invent.length == 0) heros[1].invent[0] = "blank";
    if (useless[0] != "blank") {
        objInvent.push(useless[0]);
        useless[0] = "blank";
    }
    heros[0].objet = 0;
    heros[1].objet = 0;
    onSea = 0;
}

function goInvent(){
    onSea = 4;
    heros[0].invent.forEach(
        function(e,i){
            if (e == "batonF") heros[0].invent[i] = "baton";
        }
    );
    heros[1].invent.forEach(
        function(e,i){
            if (e == "batonF") heros[1].invent[i] = "baton";
        }
    );
    for (var i = heros[0].invent.length;i<5;i++){
        heros[0].invent.push("blank");
    }
    for (i = heros[1].invent.length;i<5;i++){
        heros[1].invent.push("blank");
    }
    heros[0].timerF = 0;
    heros[1].timerF = 0;
}
