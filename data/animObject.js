var animObject = [{x:0,y:0,z:0,f:function(){},bf:function(){}},{x:0,y:0,z:0,f:function(){},bf:function(){}}];

function chooseAnimObject(n){
    //console.log(heros);
    animObject[n].bf = nonifiant;
    animObject[n].f = nonifiant;
    if (heros[n].invent[heros[n].objet] == "sword"){
        if (heros[n].img == 16){
            if (heros[n].sens == 2) animObject[n].f = swordDispAtt1;
            else if (heros[n].sens == 0) animObject[n].bf = swordDispAtt1F;
            else if (heros[n].sens == 1) animObject[n].bf = swordDispAtt1D;
            else if (heros[n].sens == 3) animObject[n].f = swordDispAtt1G;
        }
        else if (heros[n].wear == 0){
            if (heros[n].sens == 2) animObject[n].bf = swordDispBack;
            else if (heros[n].sens == 0) animObject[n].f = swordDispBackF;
            else if (heros[n].sens == 1) animObject[n].bf = swordDispBackG;
            else if (heros[n].sens == 3) animObject[n].bf = swordDispBackD;
        }
        else if (heros[n].wear == 1){
            if (heros[n].sens == 2) {
                if (n == 0) animObject[n].bf = swordDispOutAryll;
                else animObject[n].f = swordDispOut;
            }
            else if (heros[n].sens == 0)  {
                if (n == 0) animObject[n].f = swordDispOutFAryll;
                else animObject[n].bf = swordDispOutF;
            }
            else if (heros[n].sens == 1) animObject[n].bf = swordDispOutG;
            else if (heros[n].sens == 3) animObject[n].bf = swordDispOutD;
        }
    }
}



// L'épée est rangée dans le dos du personnage

function swordDispBack(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.6 - 0.15*n,heros[n].y + heros[n].vy/50 + 1,heros[n].z-1.15 + 0.6*n,1,0,imgElement["sword1"],-1);
}

function swordDispBackF(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.6,heros[n].y + heros[n].vy/50 + 1,heros[n].z-1.15 + 0.6*n,-1,0,imgElement["sword1"],-1);
}

function swordDispBackG(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50+0.45,heros[n].y + heros[n].vy/50 + 1,heros[n].z + 1.9,1,0,imgElement["sword2"],1);
}

function swordDispBackD(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.72,heros[n].y + heros[n].vy/50 + 1,heros[n].z + 1.9,1,0,imgElement["sword2"],1);
}



// L'épée est tenue à la main mais pas en cours d'attaque

function swordDispOut(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.70,heros[n].y + heros[n].vy/50 + 1,heros[n].z - 1.75,1,-0.2,imgElement["sword"],-1);
}

function swordDispOutAryll(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 - 0.1,heros[n].y + heros[n].vy/50,heros[n].z - 0.5,-1,2.2,imgElement["sword"],-1);
}

function swordDispOutF(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.77,heros[n].y + heros[n].vy/50 + 1,heros[n].z-2.15 + 0.6*n,1,-0.3,imgElement["sword"],-1);
}

function swordDispOutFAryll(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.45,heros[n].y + heros[n].vy/50,heros[n].z - 0.02,-1,2.2,imgElement["sword3"],-1);
}

function swordDispOutG(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50+0.45,heros[n].y + heros[n].vy/50 + 1,heros[n].z + 1.9,1,0,imgElement["sword2"],1);
}

function swordDispOutD(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.72,heros[n].y + heros[n].vy/50 + 1,heros[n].z + 1.9,1,0,imgElement["sword2"],1);
}

// L'épée est utilisée dans le cadre de l'attaque 1

function swordDispAtt1(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.18,heros[n].y + heros[n].vy/50 + 1,heros[n].z+2.49,-1,1.8,imgElement["sword3"],-1);
}

function swordDispAtt1F(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 1.27,heros[n].y + heros[n].vy/50,heros[n].z - 0.1,1,-2,imgElement["sword"],-1);
}

function swordDispAtt1G(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50+0.4,heros[n].y + heros[n].vy/50 + 1,heros[n].z + 2.9,1,-0.6,imgElement["sword3"],1);
}

function swordDispAtt1D(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.79,heros[n].y + heros[n].vy/50 + 1,heros[n].z + 2.93,1,-1.3,imgElement["sword3"],1);
}
