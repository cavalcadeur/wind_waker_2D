function action(t){
    // Fonction appellée à chaque image pour calculer les actions des héros
    if (edition == 1) return;
    //Painter.scrollCenter(heros[0].x,heros[0].y,heros[0].scrollSpeed);
    //var controlKeys = [[38,39,40,37],[101,99,98,97]];
    heros.forEach(
        function(h,n){
            if (h.imgN > 0){
                h.imgN -= 1;
                if (h.imgN == 0) h.imgUp = 0;
            }

            if (h.vx == 0 && h.vy == 0 && figer == 0){
                var supress = 1;
                if (Map.getObject(h.x,h.y,0) != ""){
                    var truc = Map.getObject(h.x,h.y,true);
                    if (truc[0] == "rubisVert"){
                        h.rubis += 1;
                        supress = 0;
                    }
                    else if (truc[0] == "rubisBleu"){
                        h.rubis += 5;
                        supress = 0;
                    }
                    else if (truc[0] == "rubisRouge"){
                        h.rubis += 20;
                        supress = 0;
                    }
                    else if (truc[0] == "plate"){
                        if (truc[3] == "") Map.setObject(truc[1],truc[2],[""],true);
                        else if (truc[3] == 1 || truc[3] == -1 || truc[3] == 0.2 || truc[3] == -0.2){
                            Map.setAlti(truc[1],truc[2],truc[3],Painter);
                        }
                        else if (truc[3] == "monstre"){
                            ennemis.push(monstreType(truc[4],truc[1],truc[2]));
                        }
                        else {
                            for (var i = truc.length-1;i>2;i--){
                                Map.setObject(truc[1],truc[2],truc[i],0);
                            }
                        }
                        truc[0] = "plate1";
                    }
                    else if (truc[0] == "coeur"){
                        if (h.vie + 1 <= h.vieTotale){
                            h.vie += 1;
                        }
                        else  h.vie  = h.vieTotale;
                        supress = 0;
                    }
                    else if (truc[0] == "cle0"){
                        h.cles += 1;
                        supress = 0;
                    }
                    else if (truc[0] == "bourgeon"){
                        heros[0].seedCount += 3;
                        supress = 0;
                    }
                    else if (truc[0] == "teleport"){
                        teleport = [h.y,h.x];
                        goToLevel(truc[1],truc[2],truc[3],truc[4],truc[5],truc[6]);
                    }
                    else if (truc[0] == "boomerang" || truc[0] == "sword" || truc[0] == "pencil" || truc[0] == "boat" || truc[0] == "hookShot" || truc[0] == "parachale" || truc[0] == "baton" || truc[0] == "seeds" || truc[0] == "flowerRod" || truc[0] == "maskWind"){                        
                        if (quests.armes[truc[0]] == 1) {addObj(truc[0],n);}
                        else donnerHeros(truc[0],n);
                        supress = 0;
                    }
                    else if (truc[0] == "avaleur1"){
                        if (h.z == niveau[h.y][h.x]){
                            h.stun = 10020;
                            Map.replaceObject(h.x,h.y,0,"avaleur2");
                        }
                    }
                    else if (truc[0] == "textBox"){
                        if (h.z == niveau[h.y][h.x]){
                            addParticles("bla",0,0,60000,0,0,-1,truc[1]);
                            //particles.push({n:0,type:"bla",x:0,y:0,g:0,alti:60000,lim:-1,content:truc[1],actu:"",xx:0,yy:0,y2:0,x2:0});
                            Map.setObject(h.x,h.y,[""],true);
                        }
                    }
                    if (supress == 0){
                        Map.suppressObject(h.x,h.y,0);
                    }
                }

                if (h.invent[h.objet] == "baton"){
                    if (Map.getObject(h.x + vecteurs[(h.sens+1)%4][1],h.y + vecteurs[(h.sens+1)%4][0],0) == "torche"){
                        h.invent[h.objet] = "batonF";
                        h.timerF = 200;
                    }
                }
                if (h.imgUp != 1){
                    if (1 == keys[heros[n].touche[1]]) {if (0 == keys[heros[n].touche[3]]) move(1,n,0);}
                    else if (1 == keys[heros[n].touche[3]]) move(3,n,0);
                    else if (1 == keys[heros[n].touche[0]]){if (0 == keys[heros[n].touche[2]]) move(0,n,0);}
                    else if (1 == keys[heros[n].touche[2]]) move(2,n,0);
                }
            }
            if (h.plane == 1){
                if (h.z > Map.getFloor(h.x,h.y,h.z)) h.g = 0.01;
                else {
                    h.g = 0;
                    h.z = Map.getFloor(h.x,h.y,h.z);
                    h.plane = 0;
                    h.vx = 0;
                    h.vy = 0;
                    h.imgUp = 0;
                    h.imgN = 0;
                    if (h.z <= -1){
                        fall(h,n);
                    }
                }
                h.z -= h.g;
                if (figer == 1) {}

            }
            else if (h.grap == 0){
                if ((h.z > Map.superGetFloor(h.x + h.vx/50,h.y + h.vy/50,h.z) )) h.g += 0.05;
                else {
                    h.g = 0;
                    h.z = Map.superGetFloor(h.x + h.vx/50,h.y + h.vy/50,h.z);
                    if (h.z <= -1){
                        fall(h,n);
                    }
                }
                h.z -= h.g;
            }
            if (figer == 1) {h.tAura += h.vAura; if (h.tAura == 40 | h.tAura == -40) h.vAura = h.vAura * -1;}
            else {
                h.anim(n);
                
                ennemis.forEach(
                    function(e){
                        if (e.pv == 0) return;
                        e.touchDamage(h.x + h.vx/50,h.y + h.vy/50,h.z,n);
                    }
                );
            }
        });
    //if (heros[0].vx != 0 || heros[0].vy != 0 || heros[0].g != 0 || edition == 1)Painter.scrolling();
}

function fall(h,n){
    var truc = Map.getObject(h.x,h.y,true);
    if (truc != "avaleur1" && truc != "avaleur2"){
        if (out == 1 || out == 3){
            addParticles("rond",h.x,h.y,-1,0,0,30,0.3);
            //particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rond",lim:30,alti:-1,g:0});
            addParticles("eclabousse",h.x,h.y,-1,15,0,30,0);
            //particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousse",lim:30,alti:-1,g:15});
        }
        else if (out == 2){
            addParticles("rondB",h.x,h.y,-1,0,0,30,0.3);
            //particles.push({n:0,x:h.x,y:h.y,s:0.3,type:"rondB",lim:30,alti:-1,g:0});
            addParticles("eclabousseB",h.x,h.y,-1,15,0,30,0);
            //particles.push({n:0,x:h.x,y:h.y,s:0,type:"eclabousseB",lim:30,alti:-1,g:15});
        }
        if (Map.getFloor(respawnPoint[0],respawnPoint[1],10) <= -1){
            var xxx = 0;
            
            // Bon la case de respawn n'est pas suffisament haute, on va donc la remonter pour que les personnages puissent y atterir correctement.
            Map.setAlti(respawnPoint[0],respawnPoint[1],0,Painter,true);            
             
        }
        heros[n].x = respawnPoint[0];
        heros[n].y = respawnPoint[1];
        heros[n].stun = 20;
        heros[n].mortal = 60;
    }
}

function move(d,n,gg){
    if (heros[n].stun > 0) return;
    if (heros[n].sens != d){
        heros[n].sens = d;
        heros[n].img = 0;
        chooseAnimObject(n);
        heros[n].delay = 6;
        if (n == 0){
            if (heros[0].prim == "mastersword" && keys[32] == 1){
                attack(0,1);
            }
        }
        if (heros[n].invent[heros[n].objet] == "mastersword"){
            if ((n == 0 && keys[16] == 1) || (n == 1 && keys[13] == 1))
                attack(n);
        }
        return;
    }
    if (heros[n].delay != 0){
        heros[n].delay -= 1;
        return;
    }
    heros[n].wear = 0;
    chooseAnimObject(n);
    // if (gg == 0 && heros[n].plane == 0 && heros[n].g == 0){

    let truc = Map.getObject(heros[n].x + vecteurs[d][1],heros[n].y + vecteurs[d][0],true);
    if (heros[n].sens == 0){
        if (truc[0] == "house0" || truc[0] == "house1" || truc[0] == "house3" || truc[0] == "houseHelp" || truc[0] == "templeFeu1" || truc[0] == "templeEau1" || truc[0] == "miniTempleEau" || truc[0] == "canon1" || truc[0] == "sanctuaire" || truc[0] == "foret1" || truc[0] == "serre1"){
            teleport = [heros[n].y+vecteurs[d][0],heros[n].x+vecteurs[d][1]];
            if (truc[1] == "void"){
                goToLevel(out,"void",0,0,0,0);
            }
            else {
                goto = truc[1];
                if (truc[2] == 666){
                    out = 1;
                    cinematicos = 2;
                    goToLevel(out,goto,iles[goto].heros[0][1],iles[goto].heros[0][0],iles[goto].heros[1][1],iles[goto].heros[1][0]);
                }
                else if (interieurs[goto] == undefined){
                    out = 1;
                    goToLevel(out,goto,iles[goto].heros[0][1],iles[goto].heros[0][0],iles[goto].heros[1][1],iles[goto].heros[1][0]);
                }
                else {
                    out = interieurs[goto].out;
                    goToLevel(out,goto,interieurs[goto].heros[0][1],interieurs[goto].heros[0][0],interieurs[goto].heros[1][1],interieurs[goto].heros[1][0]);
                }
                if (goto == "help1") alert("Place toi face à un personnage et appuie sur la touche maj pour lui parler.");
            }
            if (truc[0] == "canon1"){
                cinematicos = 3;
            }
        }
    }
    if (heros[n].z + 1 < Map.getFloor(heros[n].x+vecteurs[d][1],heros[n].y+vecteurs[d][0],heros[n].z)){
        /*
        if (truc[0] == "rocher"){
            var YY = heros[n].y+vecteurs[d][0];
            var XX = heros[n].x+vecteurs[d][1];
            if (XX + vecteurs[d][1] == -1 || YY + vecteurs[d][0] == -1 || XX + vecteurs[d][1] == niveau[YY].length || YY + vecteurs[d][0] == niveau.length) return;
            if (objNiveau[YY][XX].length == 1 ) objNiveau[YY][XX][0] = "";
            else objNiveau[YY][XX].splice(0,1);
            addParticles("object",XX+0.5,YY+0.5,niveau[YY][XX],0,vecteurs[heros[n].sens][1]*0.19,vecteurs[heros[n].sens][0]*0.19,"rocher",0,"normal");
            //particles.push({n:0,type:"rocher",x:XX,y:YY,g:0,alti:niveau[YY][XX],lim:-5,sens:heros[n].sens,endu:1});
            heros[n].stun = 10;
        }
         */
        return;
    }
    //}

    if (heros[n].g == 0){
        var floor = Map.getFloor(heros[n].x+vecteurs[d][1],heros[n].y+vecteurs[d][0],heros[n].z);
        if (heros[n].z - floor > 1 || floor <= -1){
            heros[n].anim = jumpAnim;
            heros[n].datAnim = d;
            //console.log("JUMP !!!");
        }
        else if (heros[n].z != floor){
            heros[n].anim = walkLedgeAnim;

            heros[n].datAnim = heros[n].z;
            heros[n].x +=  vecteurs[d][1];
            heros[n].y +=  vecteurs[d][0];
            heros[n].vx += -50 * vecteurs[d][1];
            heros[n].vy += -50 * vecteurs[d][0];
        }
        else{
            heros[n].anim = walkAnim;
            
            heros[n].x +=  vecteurs[d][1];
            heros[n].y +=  vecteurs[d][0];
            heros[n].vx += -50 * vecteurs[d][1];
            heros[n].vy += -50 * vecteurs[d][0];
        }
    }
    else {
        heros[n].anim = walkAnim;
        
        heros[n].x +=  vecteurs[d][1];
        heros[n].y +=  vecteurs[d][0];
        heros[n].vx += -50 * vecteurs[d][1];
        heros[n].vy += -50 * vecteurs[d][0];
    }
    // On avance d'un pas. Si il s'agit du joueur 1 qui avance, tous les pas, on place un nouveau spawnPoint sous ses pieds.
    if (n == 0) {
        nPas += 1;
        if (Map.getAlti(heros[0].x,heros[0].y) > -1){
            respawnPoint[0] = heros[0].x;
            respawnPoint[1] = heros[0].y;
        }
    }
    if (heros[n].etat == 1 && heros[n].g == 0) {heros[n].g = -0.20; heros[n].z += 0.01;}
}

function changeArme(n){
    
    if (heros[n].etat != 0){
        cinematicos = 4;
        heros[n].etat = 0;
        imgCinema[0] = n;
        imgCinema[1] = "coffre3";
        imgCinema[2] = "heros";
    }
    else{
        if (heros[n].timerF > 0) heros[n].timerF = 0;
        if (heros[n].invent[heros[n].objet] == "batonF") heros[n].invent[heros[n].objet] = "baton";
        heros[n].objet = (heros[n].objet+1)%heros[n].invent.length;
    }
    chooseAnimObject(n);
}

function findVoisin(n){
    var result = "void";
    if (out == 1){
        iles[goto].voisins.forEach(
            function(e){
                if (e[1] == n){
                    result = e[0];
                }
            }
        );
    }
    else{
        interieurs[goto].voisins.forEach(
            function(e){
                if (e[1] == n){
                    result = e[0];
                }
            }
        );
    }
    return result;
}
