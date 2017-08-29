var animObject = [{x:0,y:0,z:0,f:function(){},bf:function(){}},{x:0,y:0,z:0,f:function(){},bf:function(){}}];

function chooseAnimObject(n){
    animObject[n].bf = nonifiant;
    animObject[n].f = nonifiant;
    if (heros[n].invent[heros[n].objet] == "sword"){
        if (heros[n].wear == 0){
            if (heros[n].sens == 2) animObject[n].bf = swordDispBack;
            else if (heros[n].sens == 0) animObject[n].f = swordDispBackF;
        }
    }
}

function swordDispBack(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.6,heros[n].y + heros[n].vy/50 + 1,heros[n].z-1.15 + 0.6*n,1,0,imgElement["sword1"],-1);
}

function swordDispBackF(n){
    Painter.imgEnnemy(ctx,heros[n].x + heros[n].vx/50 + 0.5,heros[n].y + heros[n].vy/50 + 1,heros[n].z-1.15 + 0.6*n,-1,0,imgElement["sword1"],-1);
}
