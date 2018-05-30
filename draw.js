// Ce fichier contient toutes les fonctions de dessins. Ces fonctions servent à dessiner concretement le jeu durant les phases en vue de dessus qui sont quasiment les seules phases
// Il y a ici les fonctions drawRoom() draw() drawHeros() drawEnnemi() drawInterface()

function drawRoom(kk,ctxa,map){
    //nivniv.forEach(
    //function(e,y){
    for(var y = scrollCaseY;y < scrollCaseY + nCasesY;y++){
        //var e = nivniv[y];
        //Painter.line( ctx, y,0);
        //e.forEach(
        //function(f,x){
        for(var x = scrollCaseX; x < scrollCaseX + nCasesX ;x++){
            var cell = map.getCell(x,y);
            var f = cell[1];
            var outline = cell[4];
            Painter.cell( ctxa, x, y, f ,0 , outline);

            drawObj(x,y,f,map.getObject(x,y,true),ctxa);
        }
        
        if (kk == 1){
            heros.forEach(
                function(h,n){
                    if (y == h.y) drawHeros(n);
                    if (h.vy > 0 && y == h.y + 1) drawHeros(n);
                }
            );

            ennemis.forEach(
                function(a,m){
                    if (a.giveY() == y) drawEnnemi(m);
                }
            );
            pots.forEach(
                function(g,i){
                    if (y == Math.round(g.y + g.n*((g.oy - g.y)/32))) drawPot(g,i);
                }
            );
            
        }
        particles.forEach(
            function(kgb,iii){
                if (y == Math.ceil(kgb.y)){
                    kgb.draw(kgb,ctxa);
                    kgb.act(kgb,iii);
                }
            }
        );
    }
    //);
}

function draw() {
    // Cette fonction coordonne le dessin lors des phases de jeu sur le sol Elle appelle backDraw() pour le fond drawRoom() pour le niveau et drawInterface() pour l'interface
    ctx.fillStyle = colors[0];
    ctx.fillRect(0,0,W,H);
    backDraw();
    
    drawRoom(1,ctx,Map);

    if (edition == 1) {
        if (casePencil[1] != "ah"){
            ctx.globalAlpha = 0.2;
            var ZZZ = Map.getAlti(casePencil[1],casePencil[0]);
            Painter.cell( ctx, casePencil[1], casePencil[0], ZZZ ,1);  // Celui ci sert pour dessiner le curseur lors de l'edition
            ctx.globalAlpha = 1;
        }
        if (mouse[1] > 150 && mouse[1] < W - 150){
            if (mouse[0] < 25 && mouse[0] > 0) {
                scrollEditSpeed[1] += scrollEditSpeed[2];
            }
            else if (mouse[0] > H - 25){
                scrollEditSpeed[1] -= scrollEditSpeed[2];
            }
            else if (scrollEditSpeed[1] != 0){
                if (scrollEditSpeed[1] > 0) scrollEditSpeed[1] -= scrollEditSpeed[2];
                if (scrollEditSpeed[1] < 0) scrollEditSpeed[1] += scrollEditSpeed[2];
                if (Math.abs(scrollEditSpeed[1]) < scrollEditSpeed[2]) scrollEditSpeed[1] = 0;
            }
            scrollEditSpeed[1] = Math.min(scrollEditSpeed[3],scrollEditSpeed[1]);
            scrollEditSpeed[1] = Math.max(-1 * scrollEditSpeed[3],scrollEditSpeed[1]);

            if (mouse[1] < 175) {
                scrollEditSpeed[0] += scrollEditSpeed[2];
            }
            else if (mouse[1] > W - 175){
                scrollEditSpeed[0] -= scrollEditSpeed[2];
            }
            else if (scrollEditSpeed[0] != 0){
                if (scrollEditSpeed[0] > 0) scrollEditSpeed[0] -= scrollEditSpeed[2];
                if (scrollEditSpeed[0] < 0) scrollEditSpeed[0] += scrollEditSpeed[2];
                if (Math.abs(scrollEditSpeed[0]) < scrollEditSpeed[2]) scrollEditSpeed[0] = 0;
            }
            scrollEditSpeed[0] = Math.min(scrollEditSpeed[3],scrollEditSpeed[0]);
            scrollEditSpeed[0] = Math.max(-1 * scrollEditSpeed[3],scrollEditSpeed[0]);
            
            Painter.scrollPlus(scrollEditSpeed[0],scrollEditSpeed[1],W,H);
        }
    }
    else if (edition == 0) Painter.scrollCenter(heros[0].x,heros[0].y,heros[0].z,W,H);
    drawInterface();
}


function drawHeros(n){
    // Cette fonction dessine le heros n à l'écran
    if (edition == 1) return;
    if (heros[n].stun > 0) {
        heros[n].stun -= 1;
        if (heros[n].stun > 10000){
            return;
        }
        else if (heros[n].stun == 10000){
            heros[n].g = -1;
            heros[n].z += 0.2;
            heros[n].stun = 0;
        }
    }
    if (heros[n].mortal > 0){
        heros[n].mortal -= 1;
        if (heros[n].mortal % 4 < 2)return;
    }
    animObject[n].bf(n);
    var N = 0;
    if (Math.abs(heros[n].vx + heros[n].vy)%50 >= 25 && heros[n].g == 0) N = 24;
    //if (heros[n].plane == 1){
    //Painter.img(ctx,heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50,niveau[Math.round(heros[n].y + heros[n].vy/50)][Math.round(heros[n].x + heros[n].vx/50)],imgElement.marque);
    //}
    Painter.imgFullControl( ctx, heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50, heros[n].z, heros[n].s, heros[n].r, imgHeros[heros[n].img + heros[n].sens + n*32] , 1);
    animObject[n].f(n);
    //if (heros[n].invent[heros[n].objet] != "blank" && heros[n].imgUp == 0) {
    //Painter.img(ctx,heros[n].x + heros[n].vx/50,heros[n].y + heros[n].vy/50,heros[n].z,imgArme[heros[n].invent[heros[n].objet] + heros[n].sens]);
    //}
    if (heros[n].aura != ""){
        Painter.imgScale(ctx,heros[n].x + heros[n].vx/50,heros[n].y - 1 + heros[n].vy/50,heros[n].z,heros[n].tAura/40,imgElement[heros[n].aura]);
    }
}

function drawEnnemi(n){
    // affiche l'ennemi n à l'écran et le fais agir (Ce qui est une mauvaise chose !!!)
    ennemis[n].act();
    if (edition == 0)ennemis[n].doing();
    ennemis[n].display();
}

function drawInterface(){
    drawInterface = AInterface;
}
