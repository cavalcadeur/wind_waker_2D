// Fichier de gestion du déplacement entre les différents lieux.
// Ce fichier contient drawSea() drawIsland() goToLevel() defineTele() chooseBack()

function drawSea(){
    var seaScroll = [boatPosition[1]*3 - 10-W/2,boatPosition[0]*3-30-H/2];
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,0,W,H);
    backg.backGroundMap();
    if (questObj["carteMaritime"] == 1){
        sea.forEach(
            function(e){
                drawIsland(e[0],e[1]*3-seaScroll[1],e[2]*3-seaScroll[0]);
            }
        );
        ctx.drawImage(imgBoat,boatPosition[1]*3 - 10 - seaScroll[0],boatPosition[0]*3 - 30 - seaScroll[1],30,30);
    }
    else {
        alert("Vous ne possédez pas encore de carte maritime !");
        onSea = 1;
    }
}

function drawIsland(ile,Y,X){
    // Cette fonction ne marche pas quoi qu'on en dise
    var truc = iles[ile].alti;
    truc.forEach(
        function(f,y){
            f.forEach(
                function(g,x){
                    if (g <= -1) return;
                    ctx.fillStyle = "rgb("+(20+g*5)+","+(80+g*20)+","+(10+g*2)+")";
                    ctx.fillRect(x*3 + X,y*3 + Y,4,4);
                }
            );
        }
    );

}

function goToLevel(oo,go,x,y,x2,y2,scrollStore,d,n){
    chooseMusic(go);
    ennemis.forEach(
        function (e,i){
            ennemis[i] = e.takeBack();
        }
    );
    particles.forEach(
        function(e,i){
            particles[i] = deComposeParticle(e);
        }
    );
    boomerang.forEach(
        function(e,n){
            if (e.endu > 5) {
                var X = e.x - vecteurs[e.sens][1]*(10-e.endu);
                var Y = e.y - vecteurs[e.sens][0]*(10-e.endu);
            }
            else{
                var X = e.x + vecteurs[e.sens][1]*(e.endu);
                var Y = e.y + vecteurs[e.sens][0]*(e.endu);
            }
            if (objNiveau[Y][X][0] == "main1") objNiveau[Y][X][0] = "main0";
            else objNiveau[Y][X].splice(0,0,"boomerang");
        }
    );
    boomerang = [];
    if (oo == -1 || go == "void"){
        onSea = 5;
        islandData = {out:1,ileSet:0,x:0,y:0,select:0};
        return;
    }
    heros[0].x = x;
    heros[0].y = y;
    heros[1].x = x2;
    heros[1].y = y2;
    heros[0].grap = 0;
    heros[0].grapD = -1;
    heros[1].grap = 0;
    heros[1].grapD = -1;
    hookShots = [];
    Map.goOut(oo);
    out = oo;
    chooseBack(oo);
    for(var i = 0;i<nSpeImg;i++){
        imgElement["spe"+i].src = "images/elements/spe/"+ out +"/spe" + i + ".png";
    }

    for (var i = 0;i<70;i++){
        imgMonstre[i].src = "images/ennemis/" + out + "/e" + i + ".png";
    }
    goto = go;
    mapState = Map.goto(go,mapState);
    if (d != undefined){
        heros[n].anim = walkAnim;
            
            //heros[n].x +=  vecteurs[d][1];
            //heros[n].y +=  vecteurs[d][0];
        heros[n].vx += -50 * vecteurs[d][1];
        heros[n].vy += -50 * vecteurs[d][0];
    }
    else {
        heros[0].z = Map.getAlti(heros[0].x,heros[0].y);
        heros[1].z = Map.getAlti(heros[1].x,heros[1].y);
    }
    ennemis.forEach(
        function (e,i){
            findEnnemy(e[2],i,e[0],e[1],e[3]);
            //ennemis[i] = findEnnemy(e[2]);
        }
    );
    particles.forEach(
        function(e,i){
            particles[i] = composeParticle(e);
        }
    );
    onSea = 0;
    respawnPoint = [heros[0].x,heros[0].y];
    //console.log(respawnPoint);
    
    Painter.niveau(Map , textured);
    if (scrollStore == undefined){
        Painter.scroll(0,0);
        Painter.centerScroll(x,y,0,W,H);
    }
    else{
        Painter.adjustScroll(scrollStore,heros[0].x - vecteurs[d][1],heros[0].y - vecteurs[d][0],heros[0].z);
    }
    setColors(out,5);
    //console.log(respawnPoint);
}

function defineTele(gg,outa){
    if (objNiveau[teleport[0]][teleport[1]][0] == "teleport"){
        objNiveau[teleport[0]][teleport[1]][1] = outa;
        objNiveau[teleport[0]][teleport[1]][2] = gg;
    }
    else {
        objNiveau[teleport[0]][teleport[1]][1] = gg;
    }

}

function chooseBack(oo){
    if (oo == 1){
        backDraw = backg.fa;
    }
    else if (oo == 2){
        backDraw = backg.fb;
    }
    else if (oo == 3){
        backDraw = backg.fc;
    }
    else if (oo == 5){
        backDraw = backg.fe;
    }
    else if (oo == 6 || oo == 7){
        backDraw = backg.ff;
    }
    else if (oo == 4){
        backDraw = backg.fd;
    }
    else if (oo == 8){
        backDraw = backg.fg;
    }
    else {
        backDraw = backg.nothing;
    }
    console.log(backDraw);
}
