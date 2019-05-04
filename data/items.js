// Ce fichier contient les fonctions relatives à l'utilisation d'items par les héros
// Il y a ici les fonctions attack() GPS() changeColor() addObj() donnerHeros()

function attack(n,x){
    // Sert quand le joueur appuie sur sa touche d'action 
    if (edition == 1){
        if (editPlate == 0){
            edition = 0;
            drawInterface = AInterface;
            casePencil = ["ah","ah"];
            Map.purifie();
            //console.log(Map.getString());
        }
        return;
    }
    if (heros[n].imgUp != 0){
        if (heros[n].plane == 1) {
            heros[n].plane = 0;
            heros[n].imgUp = 0;
            heros[n].imgN = 0;
        }
        return;
    }
    /*
    if (heros[n].carry[0] != 0){
        heros[n].carry[0] = 0;
        ennemis[heros[n].carry[1]].throw(heros[n].sens);  // Ce morceau sert pour jetter des objets. La fonction saisi et lancée d'objet est absente de Cavalcade.
        heros[n].img = 0;
        return;
    }
     */
    if (x == 1) {
        var use = heros[0].prim;
    }
    else var use = heros[n].invent[heros[n].objet];
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    var grassContent = ["","","","rubisVert","rubisVert","rubisBleu"];
    var truc = Map.getObject(heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0],0);
    var continu = true;
    /*
    ennemis.forEach(
        function (e,ii){
            if (e.isThere(heros[n].x + vecteurs[heros[n].sens][1]*0.5,heros[n].y + vecteurs[heros[n].sens][0]*0.5,heros[n].z) && continu){
                heros[n].carry[0] = 1;
                heros[n].carry[1] = ii;
                e.carried(n);
                heros[n].img = 12;
                continu = false;             // Partie pour saisir des objets. Cette fonctionnalité n'a rien à faire dans Cavalcade.
            }
        }
    );
    if (heros[n].carry[0] != 0) return;
     */
    var XX = heros[n].x + vecteurs[heros[n].sens][1];
    var YY = heros[n].y + vecteurs[heros[n].sens][0];
    if ((truc == "coffre0" || truc == "porte0" || truc == "pot" || truc == "PNJ" || truc == "checkPoint") &&
        Math.abs(Map.getAlti(XX,YY) - Map.getAlti(heros[n].x,heros[n].y)) < 1){
        
        if (truc == "coffre0"){
            Map.replaceObject(XX,YY,"coffre1",0);
            var contenu = Map.getObject(XX,YY);
            if (contenu.length > 1)donnerHeros(contenu[1],n);
            else donnerHeros("",n);
        }
        else if (truc == "porte0"){
            if (heros[n].cles > 0) {
                Map.replaceObject(XX,YY,"",0);
                heros[n].cles -= 1;
            }
            else{ alert("Cette porte est verouillée."); figer = 1;}
        }
        else if (truc == "PNJ"){
            if (alerting == 0){
                questPNJ(XX,YY,n);
                say(Map.getObject(XX,YY)[2],XX,YY,n);
            }
            else unsay();
        }
        else if (truc == "pot"){
            if (heros[n].etat != 0) return;
            if (x == 1){
                if (heros[0].prim == "blank"){
                    heros[0].prim = "pot";
                }
                else{
                    return;
                }
            }
            else {
                heros[n].invent.push("pot");
                heros[n].objet = heros[n].invent.length - 1;
            }
            Map.suppressObject(XX,YY,1);
        }
        else if (truc == "checkPoint"){
            save();
        }
    }
    else if (Map.getObject(XX,YY,1) == "PNJ"){
        var powerRanger = Map.getObj(XX,YY);
        powerRanger.splice(0,1);
        addParticles("object",XX + 0.5,YY + 0.5,heros[n].z+0.1,12,0,0,truc,powerRanger,"deliver");
        Map.setObject(XX,YY,[""],true);
    }
    else if (heros[n].etat == 0){
        if (use == "sword"){
            if (heros[n].nAnim == 0){
                heros[n].wear = 1;
                heros[n].nAnim = 10;
                heros[n].anim = swordAttackAnim;
                addParticles("attack",heros[n].x + heros[n].vx/50 + vecteurs[heros[n].sens][1],heros[n].y + heros[n].vy/50 + vecteurs[heros[n].sens][0],heros[n].z+0.8,1,0,5,"sword",0,heros[n].sens);
            }
            else if (heros[n].vx != 0 || heros[n].vy != 0){
                heros[n].anim = swordBoostAnim;
            }
        }
        else if (use == "flowerRod"){
            if (Map.getFloor(heros[n].x,heros[n].y,heros[n].z) != Map.getAlti(XX,YY)) return;
            var machin = Map.getObject(XX,YY);
            if (machin[0] == ""){
                machin[0] = "herbe0";
            }
            else if (machin[0] == "herbe0") machin[0] = "herbe1";
            else if (machin[0] == "palmier") machin[0] = "palmier1";
            else if (machin[0] == "palmier1") machin[0] = "palmier";
            else if (machin[0] == "arbre0") machin[0] = "arbre1";
            else if (machin[0] == "arbre1") machin[0] = "arbre0";
            Map.setObject(XX,YY,machin,true);
            addParticles("flower",heros[n].x + vecteurs[heros[n].sens][1],heros[n].y + vecteurs[heros[n].sens][0],niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]],0,0,40);
        }
        else if (use == "pencil"){
            editHand = editObject[out];
            drawInterface = AEditInterface;
            editnumber = 1;
            editM = 0;
            if (edition == 0)edition = 1;
        }
    }
}


function donnerHeros(obj,n){
    // Donne l'objet obj au héros n
    heros[n].sens = 2;
    heros[n].wear = 0;
    heros[n].aura = obj;
    alert(descriptionObj[obj]);
    figer = 1;
    if (obj == "rubisVert") heros[n].rubis += 1;
    else if (obj == "rubisBleu") heros[n].rubis += 5;
    else if (obj == "rubisRouge") heros[n].rubis += 20;
    else if (obj == "sword" || obj == "pencil"  || obj == "flowerRod"){
        quests.armes[obj] = 1;
        addObj(obj,n);
    }
    else if (obj == "cle0") {heros[n].cles += 1;}
    else if (obj == "cle1") {heros[n].cles += 5;}
    else if (obj == "fragment") {if (heros[n].vieTotale<20){heros[n].vieTotale += 1;}heros[n].vie = heros[n].vieTotale;}
}

function addObj(type,n){
    // Rajoute l'objet type dans l'inventaire de n
    if (heros[n].invent.length < 5){
        heros[n].invent.push(type);
        heros[n].objet = heros[n].invent.length - 1;
    }
    else if (n == 0 && heros[0].prim == "blank"){
        if (heros[0].prim == "blank") heros[0].prim = type;
    }
    else{
        objInvent.push(type);
    }
    chooseAnimObject(n);
}

function changeColor(){
    // Switch l'état des interrupteurs rouges et bleus
    // LOL bon bah à revoir absolument

}

function waterLevel(n){
    // Change la hauteur d'eau d'un facteur de n et déclenche la cinématique associée
    cinematicos = 7;
    imgCinema[0] = n;
}
