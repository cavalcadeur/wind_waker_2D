function nonifiant(){

}

function swordAttackAnim(i){
    heros[i].stun = heros[i].nAnim;
    if (heros[i].nAnim == 10){
        heros[i].img = 16;
        chooseAnimObject(i);
    }
    else if (heros[i].nAnim == 0){
        if (heros[i].vx == 0 && heros[i].vy == 0){
            heros[i].anim = nonifiant;
        }
        else{
            heros[i].wear = 0;
            heros[i].anim = walkAnim;
        }
        heros[i].nAnim = 1;
        heros[i].img = 0;
        chooseAnimObject(i);
    }

    heros[i].nAnim -= 1;    
}

function swordBoostAnim(i){
    // Le héros attaque en cours de déplacement. Il a donc un rush en avant puis une attaque.
    heros[i].img = 4;
    heros[i].nAnim = 55;
    heros[i].stun = heros[i].nAnim;
    if (heros[i].vx > 0) {heros[i].vx -= 6; }
    else if (heros[i].vy > 0) {heros[i].vy -= 6; }
    else if (heros[i].vx < 0) {heros[i].vx += 6; }
    else if (heros[i].vy < 0) {heros[i].vy += 6; }

    
    if (Math.abs(heros[i].vx) < 10) heros[i].vx = 0;
    if (Math.abs(heros[i].vy) < 10) heros[i].vy = 0;

    if (heros[i].vx == heros[i].vy && heros[i].vx == 0){
        heros[i].wear = 1;
        heros[i].nAnim = 10;
        heros[i].anim = swordAttackAnim;        
        addParticles("attack",heros[i].x + vecteurs[heros[i].sens][1],heros[i].y + heros[i].vy/50 + vecteurs[heros[i].sens][0],heros[i].z+0.8,1,0,5,"sword",0,heros[i].sens);
    }
}

function walkAnim(i){
    if (heros[i].nAnim%5 == 0){
        chooseAnimObject(i);
        if (heros[i].nAnim%10 == 0){
            if (heros[i].img == 4) heros[i].img = 8;
            else heros[i].img = 4;
        }
        //console.log(heros[i].vy);
        if (heros[i].vx > 0) {heros[i].vx -= 10; }
        else if (heros[i].vy > 0) {heros[i].vy -= 10; }
        else if (heros[i].vx < 0) {heros[i].vx += 10; }
        else if (heros[i].vy < 0) {heros[i].vy += 10; }

        //console.log(heros[i].vy);

        if (Math.abs(heros[i].vx) < 10) heros[i].vx = 0;
        if (Math.abs(heros[i].vy) < 10) heros[i].vy = 0;

        if (heros[i].vx == 0 && heros[i].vy == 0){
            heros[i].anim = nonifiant;
            heros[i].nAnim = -1;
            heros[i].img = 0;
            chooseAnimObject(i);
            // L'animation de déplacement est terminée. On effectue alors les mouvements scriptés grâce à followPath()
            followPath(i);
            if (heros[i].carry[0] == 1) heros[i].img = 12;
        }
    }
    heros[i].nAnim += 1;
}

function walkLedgeAnim(i){
    if (heros[i].nAnim <= 9){
        heros[i].z = heros[i].datAnim;
        if (heros[i].nAnim == 9) heros[i].g = 0;
    }
    if (heros[i].nAnim%5 == 0){
        if (heros[i].nAnim%10 == 0){
            if (heros[i].img == 4) heros[i].img = 8;
            else heros[i].img = 4;
        }
        //console.log(heros[i].vy);
        if (heros[i].vx > 0) {heros[i].vx -= 10; }
        else if (heros[i].vy > 0) {heros[i].vy -= 10; }
        else if (heros[i].vx < 0) {heros[i].vx += 10; }
        else if (heros[i].vy < 0) {heros[i].vy += 10; }

        //console.log(heros[i].vy);

        if (Math.abs(heros[i].vx) < 10) heros[i].vx = 0;
        if (Math.abs(heros[i].vy) < 10) heros[i].vy = 0;

        if (heros[i].vx == 0 && heros[i].vy == 0){
            heros[i].anim = nonifiant;
            heros[i].nAnim = -1;
            heros[i].img = 0;
            // L'animation de déplacement est terminée. On effectue alors les mouvements scriptés grâce à followPath()
            followPath(i);
            if (heros[i].carry[0] == 1) heros[i].img = 12;
        }
    }
    heros[i].nAnim += 1;
}

function jumpAnim(i){
    if (heros[i].nAnim == 3){
        heros[i].g = -0.2;
        heros[i].img = 4;
        heros[i].nAnim = -1;
        heros[i].anim = flyAnim;
        heros[i].x +=  vecteurs[heros[i].datAnim][1];
        heros[i].y +=  vecteurs[heros[i].datAnim][0];
        heros[i].vx = -50 * vecteurs[heros[i].datAnim][1];
        heros[i].vy = -50 * vecteurs[heros[i].datAnim][0];
        heros[i].z += 0.05;
    }
    heros[i].nAnim += 1;
}

function flyAnim(i){
    if (heros[i].vx > 0) {heros[i].vx -= 4; }
    else if (heros[i].vy > 0) {heros[i].vy -= 4; }
    else if (heros[i].vx < 0) {heros[i].vx += 4; }
    else if (heros[i].vy < 0) {heros[i].vy += 4; }
    if (heros[i].z <= Map.superGetFloor(heros[i].x + heros[i].vx/50,heros[i].y + heros[i].vy/50,heros[i].z)) {
        // Ok ! On a atteri quelque part ! Il s'agit de faire vite et de se mettre sur la case la plus proche.
        let newX = Math.round(heros[i].x + heros[i].vx/50);
        let newY = Math.round(heros[i].y + heros[i].vy/50);
        heros[i].vx += (heros[i].x - newX)*50;
        heros[i].vy += (heros[i].y - newY)*50;
        heros[i].x = newX;
        heros[i].y = newY;
        heros[i].anim = walkAnim;
    }
    else if (Math.abs(heros[i].vx) < 8 && heros[i].vx != 0) {
        if (heros[i].vx > 0){
            if (Map.superGetFloor(heros[i].x - 1 , heros[i].y , heros[i].z) <= heros[i].z){
                heros[i].x -= 1;
                heros[i].vx = 50;
            }
        }
        else {
            if (Map.superGetFloor(heros[i].x + 1 , heros[i].y , heros[i].z) <= heros[i].z){
                heros[i].x += 1;
                heros[i].vx = -50;
            }
        }
    }
    else if (Math.abs(heros[i].vy) < 8 && heros[i].vy != 0) {
        if (heros[i].vy > 0){
            if (Map.superGetFloor(heros[i].x , heros[i].y - 1 , heros[i].z) <= heros[i].z){
                heros[i].y -= 1;
                heros[i].vy = 50;
            }
        }
        else {
            if (Map.superGetFloor(heros[i].x , heros[i].y + 1 , heros[i].z) <= heros[i].z){
                heros[i].y += 1;
                heros[i].vy = -50;
            }
        }
    }
}

function damageAnim(i){
    if (heros[i].nAnim == 50){ // Ok on est au point de départ de l'animation !
        heros[i].g = -0.6;
        heros[i].img = 12;
        heros[i].nAnim = -1;
        heros[i].anim = flyAnim;
        heros[i].z += 0.01;
        heros[i].x +=  vecteurs[(heros[i].sens + 2)%4][1];
        heros[i].y +=  vecteurs[(heros[i].sens + 2)%4][0];
        heros[i].vx = -50 * vecteurs[(heros[i].sens + 2)%4][1];
        heros[i].vy = -50 * vecteurs[(heros[i].sens + 2)%4][0];
        
        heros[i].stun = 20;
        heros[i].mortal = 60;
    }
}

function bubbleAnim(i){
    if (heros[i].nAnim == -1){
        heros[i].nAnim = [heros[i].vx,heros[i].vy,100];
        heros[i].s = 0.6;
    }
    heros[i].vy = heros[i].nAnim[1] *  heros[i].nAnim[2] / 100;
    heros[i].vx = heros[i].nAnim[0] *  heros[i].nAnim[2] / 100;
    
    heros[i].nAnim[2] -= 1;
    heros[i].r += 0.2;

    
    if (heros[i].nAnim[2] <= 0){
        heros[i].r = 0;
        heros[i].anim = nonifiant;
        heros[i].nAnim = -1;
        heros[i].s = 1;
        heros[i].img = 0;
        heros[i].vx = 0;
        heros[i].vy = 0;
        if (heros[i].carry[0] == 1) heros[i].img = 12;
    } 
}
