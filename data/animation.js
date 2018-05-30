function nonifiant(){

}

function walkAnim(i){
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
        heros[i].g = -0.45;
        heros[i].img = 4;
        heros[i].nAnim = -1;
        heros[i].anim = flyAnim;
        heros[i].x +=  vecteurs[heros[i].datAnim][1];
        heros[i].y +=  vecteurs[heros[i].datAnim][0];
        heros[i].vx = -50 * vecteurs[heros[i].datAnim][1];
        heros[i].vy = -50 * vecteurs[heros[i].datAnim][0];
    }
    heros[i].nAnim += 1;
}

function flyAnim(i){
    if (heros[i].vx > 0) {heros[i].vx -= 4; }
    else if (heros[i].vy > 0) {heros[i].vy -= 4; }
    else if (heros[i].vx < 0) {heros[i].vx += 4; }
    else if (heros[i].vy < 0) {heros[i].vy += 4; }
    if (Math.abs(heros[i].vx) < 8 && heros[i].vx != 0) {
        if (heros[i].z == Map.getFloor(heros[i].x,heros[i].y,heros[i].z) || heros[i].datAnim == -1){
            heros[i].anim = nonifiant;
            heros[i].vx = 0;
            heros[i].vy = 0;
            heros[i].nAnim = 0;
            heros[i].img = 0;
            followPath(i);
            if (heros[i].carry[0] == 1) heros[i].img = 12;
        }
        else {
            heros[i].datAnim = -1;
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
    }
    if (Math.abs(heros[i].vy) < 8 && heros[i].vy != 0){
        if (heros[i].z == Map.getFloor(heros[i].x,heros[i].y,heros[i].z) || heros[i].datAnim == -1){
            heros[i].anim = nonifiant;
            heros[i].vx = 0;
            heros[i].vy = 0;
            heros[i].nAnim = 0;
            heros[i].img = 0;
            followPath(i);
            if (heros[i].carry[0] == 1) heros[i].img = 12;
        }
        else {
            heros[i].datAnim = -1;
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
