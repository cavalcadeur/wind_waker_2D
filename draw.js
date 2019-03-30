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
        //if (y == scrollCaseY + nCasesY - 1) ctx.globalAlpha = 0.5;
        for(var x = scrollCaseX; x < scrollCaseX + nCasesX ;x++){
            let cell = map.getCell(x,y); 
            let f = cell[1];
            let outline = cell[4];
            /*
            if (outline[2] == undefined){        // A n'activer qu'en cas de besoin
                map.updateOutlinesCase(x,y,0);  //  Cela sert à remettre d'aplomb des données qui seraient partielles
            }
             */
            Painter.cell( ctxa, x, y, f ,0 , outline);

            drawObj(x,y,f,map.getObject(x,y,true),ctxa);

            if (kk == 1){
                heros.forEach(
                    function(h,n){
                        if (y == Math.round(h.y + h.vy/50) && x == Math.ceil(h.x + h.vx/50)) drawHeros(n);
                        //if (h.vy > 0 && y == h.y + 1) drawHeros(n);
                    }
                );
                
                ennemis.forEach(
                    function(a,m){
                        if (a.giveY() == y && a.giveX() == x) drawEnnemi(m);
                    }
                );
                /*
                pots.forEach(
                    function(g,i){
                        if (y == Math.round(g.y + g.n*((g.oy - g.y)/32))) drawPot(g,i);
                    }
                );
                 */
                
            }
            
            if (ennemyRefresh <= 0){
                if (cell[2].length > 0){
                    cell[2].forEach(
                        function(e,i){
                            particles.push(composeParticle(e));
                        }
                    );
                    map.clearParticle(x,y);
                }
                
                if (cell[3].length > 0){
                    cell[3].forEach(
                        function (e,i){
                            findEnnemy(e[2],ennemis.length,e[0],e[1],e[3]);
                        }
                    );
                    //console.log(ennemis);
                    map.clearEnnemy(x,y);
                }

            }
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

    //ctx.globalAlpha = 1;
    
    if (ennemyRefresh <= 0){
        ennemyRefresh = ennemyRefreshLim;
    }
    else ennemyRefresh -= 1;
    takeBackEvent(map);
    
    //);
}

function takeBackEvent(map){
    // Fonction qui range les ennemis dans les cases hors de vue.
    // Cette fonction s'occupe aussi des particules.

    var listeSup = [];
    ennemis.forEach(
        function(a,m){
            var YY = a.giveY();
            var XX = a.giveX();
            if (YY >= scrollCaseY + nCasesY || XX >= scrollCaseX + nCasesX || XX < scrollCaseX || YY < scrollCaseY) {
                listeSup.splice(0,0,m);
            }
        }
    );

    for(var i = 0;i < listeSup.length;i++){
        var ranger = ennemis[listeSup[i]].takeBack();
        map.addEnnemy(ranger);
        ennemis.splice(listeSup[i],1);
    }

    var listeSup = [];
    particles.forEach(
        function(a,m){
            if (a.y >= scrollCaseY + nCasesY || a.x >= scrollCaseX + nCasesX || a.x < scrollCaseX || a.y < scrollCaseY) {
                listeSup.splice(0,0,m);
            }
        }
    );

    for(var i = 0;i < listeSup.length;i++){
        var ranger = deComposeParticle(particles[listeSup[i]]);
        map.addParticle(particles[listeSup[i]].x,particles[listeSup[i]].y,ranger);
        particles.splice(listeSup[i],1);
    }
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
            Painter.cell( ctx, casePencil[1], casePencil[0], ZZZ ,1 , []);  // Celui ci sert pour dessiner le curseur lors de l'edition
            ctx.globalAlpha = 1;
        }
        if ((mouse[0] < 25 && mouse[0] > 0 && parameters.mouseScrollPencil) || 1 == keys[heros[0].touche[0]]) {
            scrollEditSpeed[1] += scrollEditSpeed[2];
        }
        else if ((mouse[0] > H - 25 && parameters.mouseScrollPencil) || 1 == keys[heros[0].touche[2]]){
            scrollEditSpeed[1] -= scrollEditSpeed[2];
        }
        else if (scrollEditSpeed[1] != 0){
            if (scrollEditSpeed[1] > 0) scrollEditSpeed[1] -= scrollEditSpeed[2];
            if (scrollEditSpeed[1] < 0) scrollEditSpeed[1] += scrollEditSpeed[2];
            if (Math.abs(scrollEditSpeed[1]) < scrollEditSpeed[2]) scrollEditSpeed[1] = 0;
        }
        scrollEditSpeed[1] = Math.min(scrollEditSpeed[3],scrollEditSpeed[1]);
        scrollEditSpeed[1] = Math.max(-1 * scrollEditSpeed[3],scrollEditSpeed[1]);
        
        if ((mouse[1] < 25 && parameters.mouseScrollPencil) || 1 == keys[heros[0].touche[3]]) {
            scrollEditSpeed[0] += scrollEditSpeed[2];
        }
        else if ((mouse[1] > W - 25 && parameters.mouseScrollPencil) || 1 == keys[heros[0].touche[1]]){
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
