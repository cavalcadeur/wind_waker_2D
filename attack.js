// Une particle d'attaque a plusieurs caractéristiques.
// Team : 0,1 ou 2   0 signifie que l'attaque est dans le camp des héros et ne blessera que leurs ennemis. 1 que l'attaque est ennemie uniquement et 2 qu'elle touchera tout le monde
// Shape : une string qui spécifie la forme de l'attaque. Un coup d'épée agit différement d'une explosion par exemple.
// On gère le passif agressif des ennemis directement dans leur fonction interne. Pour spécifier à quelle frame ils font quel dégat.

let attDrawFuncs = {
    sword: function(kgb,ctxa){
        if (kgb.n == 0) return;
        if (kgb.n >= kgb.lim/2) ctxa.globalAlpha = 0.5;
        Painter.imgEnnemy(ctxa,kgb.x+0.5,kgb.y+0.5,kgb.alti-0.8,1,0,imgDebris["sword" + kgb.sens]);
        ctxa.globalAlpha = 1;
    }
};

let attActFuncs = { 
    sword: function(kgb,i){
        // Partie interaction avec le décor qui a lieu uniquement lors de la première frame.
        if (kgb.n == 0){
            let altti = Map.getFloor(Math.round(kgb.x),Math.round(kgb.y));
            let touche = Map.getObject(Math.round(kgb.x),Math.round(kgb.y),0);
            
            if ((touche == "spe0" || touche == "spe1") && out == 2){
                if (touche == "spe1") Map.replaceObject(Math.round(kgb.x),Math.round(kgb.y),"spe0",0);
                else Map.replaceObject(Math.round(kgb.x),Math.round(kgb.y),"spe1",0);
            }
            //if (kgb.alti >= altti - 0.2 && kgb.alti <= Map.superGetFloor(kgb.x,kgb.y,kgb.alti) + 0.2){
            if (kgb.alti >= altti){
                if (touche == "herbe0" || touche == "herbe1") {
                    Map.suppressObject(Math.round(kgb.x),Math.round(kgb.y),0);
                    addParticles("cutGrass",Math.round(kgb.x),Math.round(kgb.y),altti,3,0,60,"herbe");
                }
            }
            else{
                addParticles("quake",Math.round(kgb.x),Math.round(kgb.y),altti,0,0,10,3);
                addParticles("swordWall",kgb.x,kgb.y,kgb.alti,9,0,12);
                kgb.n = kgb.lim;
                suppParticles(i);
                return;
            }
        }

        // Partie interraction avec les vivants.
        damageSpot(kgb.x,kgb.y,kgb.alti,0.5,kgb.damage,kgb.team,kgb.sens);
        
        // Partie mouvement et longévité de la particule.
        if (kgb.n >= 0){
            kgb.n += 1;
            if (kgb.n >= kgb.lim) suppParticles(i);
        }
    }
};

function damageSpot(x,y,z,radius,damage,team,sens){
    if (team == 1 || team == 2){ // L'attaque est susceptible de toucher les héros.
        for (var i = 0; i < heros.length; i ++){
            if (Math.abs(heros[i].x + heros[i].vx/50 - x) <= radius && Math.abs(heros[i].y + heros[i].vy/50 - y) <= radius && heros[i].z  <= radius + z && heros[i].z + heros[i].taille*heros[i].s >= z - radius){
                console.log("HEY !");
                if (sens == undefined){
                    let curSens = 0;
                    if (x < heros[i].x + heros[i].vx/50) curSens = 1;
                    else if (y < heros[i].y + heros[i].vy/50) curSens = 2;
                    else if (x > heros[i].x + heros[i].vx/50) curSens = 3;
                    hitHeros(i,damage,curSens);
                }
                else hitHeros(i,damage,sens);
            }
        }
    }
    if (team == 0 || team == 2){
        ennemis.forEach(
            function(a,m){
                a.hit(x+0.5,y+0.5,z,radius,damage,sens);
            }
        );
    }
}



function hitHeros(n,degat,sens){
    if (heros[n].mortal > 0) return;
    if (degat == -1) return;
    heros[n].vie -= degat;
    heros[n].sens = (sens + 2)%4;
    heros[n].nAnim = 50;
    heros[n].anim = damageAnim;
    
    //heros[n].stun = 20;
    //heros[n].mortal = 60;
}
