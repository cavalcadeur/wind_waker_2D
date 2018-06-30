var animObject = [{x:0,y:0,z:0,f:function(){},bf:function(){}},{x:0,y:0,z:0,f:function(){},bf:function(){}}];

function chooseAnimObject(n){
    animObject[n].bf = nonifiant;
    animObject[n].f = nonifiant;
    if (heros[n].invent[heros[n].objet] == "sword"){
        if (heros[n].wear == 0){
            if (heros[n].sens == 2) animObject[n].bf = swordDispBack;
            else if (heros[n].sens == 0) animObject[n].f = swordDispBackF;
            else if (heros[n].sens == 1) animObject[n].bf = swordDispBackG;
            else if (heros[n].sens == 3) animObject[n].bf = swordDispBackD;
        }
        else if (heros[n].wear == 1){
            if (heros[n].sens == 2) animObject[n].f = swordDispOut;
            else if (heros[n].sens == 0) animObject[n].bf = swordDispOutF;
            else if (heros[n].sens == 1) animObject[n].bf = swordDispOutG;
            else if (heros[n].sens == 3) animObject[n].bf = swordDispOutD;
        }
    }
}



// L'épée est rangée dans le dos du personnage

function swordDispBack(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.6,heros[n].y + heros[n].vy/50 + 1,heros[n].z-1.15 + 0.6*n,1,0,imgElement["sword1"],-1);
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



// L'épée est tenue à la main

function swordDispOut(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.57,heros[n].y + heros[n].vy/50 + 1,heros[n].z+0.94,-1,0.2,imgElement["sword3"],-1);
}

function swordDispOutF(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.6,heros[n].y + heros[n].vy/50 + 1,heros[n].z-1.15 + 0.6*n,-1,0,imgElement["sword1"],-1);
}

function swordDispOutG(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50+0.45,heros[n].y + heros[n].vy/50 + 1,heros[n].z + 1.9,1,0,imgElement["sword2"],1);
}

function swordDispOutD(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.72,heros[n].y + heros[n].vy/50 + 1,heros[n].z + 1.9,1,0,imgElement["sword2"],1);
}
