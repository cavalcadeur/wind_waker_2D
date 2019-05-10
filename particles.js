function addParticles(type,x,y,z,g,n,lim,name,carry,sens,objType){
    particles.push(defineParticles(type,x,y,z,g,n,lim,name,carry,sens,objType));
}

function composeParticle(e){
    if (e.length == 7){
        return defineParticles(e[0],e[1],e[2],e[3],e[4],e[5],e[6]);
    }
    else if (e.length == 8){
        return defineParticles(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7]);
    }
    else if (e.length == 9){
        return defineParticles(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8]);
    }
    else if (e.length == 10){
        return defineParticles(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9]);
    }
    else if (e.length == 11){
        return defineParticles(e[0],e[1],e[2],e[3],e[4],e[5],e[6],e[7],e[8],e[9],e[10]);
    }
}

function deComposeParticle(e){
    if (e.type == "titre"){
        return ["none",0,0,0,0,0,0];
    }
    result = [e.type,e.x,e.y,e.alti,e.g,e.n,e.lim];
    if (e.s != undefined || e.content != undefined){
        
        if (e.s != undefined) result[7] = e.s;
        else if (e.name != undefined) result[7] = e.name;
        
        if (e.carry != undefined){
            result[8] = e.carry;
            if (e.sens != undefined){
                result[9] = e.sens;
                if (e.objType != undefined){
                    result[10] = e.objType;
                }
            }
        }
    }
    return result;
}

function defineParticles(type,x,y,z,g,n,lim,name,carry,sens,objType){
    if (type == "attack"){
        return({type:"attack",x:x,y:y,alti:z,damage:g,n:n,lim:lim,shape:name,team:carry,sens:sens,draw:attDrawFuncs[name],act:attActFuncs[name]}); // Voir le fichier attack.js pour les détails.
    }
    else if (type == "sword"){
        return({type:"sword",x:x,y:y,alti:z,g:g,n:n,lim:lim,draw:drawSword,act:limAct,sens:sens});
        //particles[particles.length-1].draw = drawSword;
    }
    else if (type == "cutGrass"){
        return({n:n,type:"cutGrass",x:x,y:y,g:g,alti:z,lim:lim,name:name,draw:drawCutGrass,act:limActLeaf,liste:[[0,0],[0,0],[0,0],[0,0],[0,0]]});
    }
    /*
    else if (type == "fallingGrass"){
        return({n:n,type:"cutGrass",x:x,y:y,g:-0.2,alti:z,lim:lim,name:name,draw:drawCutGrass,act:limActLeaf,liste:[[-0.07,0],[-0.07,0],[-0.06,0],[0,0],[0.1,0]]});
    }
     */
    else if (type == "flower"){
        return({n:n,type:"flower",x:x,y:y,g:g,alti:z,lim:lim,draw:drawFlower,act:limAct});
        //particles[particles.length-1].draw = drawSword;
    }
    else if (type == "rond" || type == "rondB"){
        return({n:n,type:type,x:x,y:y,g:g,alti:z,lim:lim,draw:drawRond,act:limAct,s:name});
        //particles[particles.length-1].draw = drawSword;
    }
    else if (type == "eclabousse" || type == "eclabousseB"){
        return({n:n,type:type,x:x,y:y,g:g,alti:z,lim:lim,draw:drawEclabousse,act:limActG,s:name});
        //particles[particles.length-1].draw = drawSword;
    }
    else if (type == "bla"){
        return({n:n,type:"quake",x:x,y:y,alti:z,g:g,lim:lim,act:blact,draw:drawBla,viteModo:2,msgN:0,content:name,actu:"",xx:0,yy:0,x2:0,y2:0,touche:touchCount});
    }
    else if (type == "blinvisible"){
        return({n:n,type:"quake",x:x,y:y,alti:z,g:g,lim:lim,act:blact,draw:function(){},viteModo:2,msgN:0,content:name,actu:"",xx:0,yy:0,x2:0,y2:0,touche:touchCount});
    }
    else if (type == "debris"){
        return({n:n,name:name,type:"debris",x:x,y:y,alti:z,g:g,lim:lim,act:limActG,draw:drawDebris});
    }
    else if (type == "quake"){
        return({n:n,type:"quake",x:x,y:y,alti:z,g:g,lim:lim,act:limAct,draw:drawQuakePP,ampli:name});
    }
    else if (type == "fumeeM" || type == "fumeeF" || type == "fumeeP"){
        return({n:n,type:"fumee",x:x,y:y,alti:z,g:g,lim:lim,act:limAct,draw:drawFumee,name:type});
    }
    else if (type == "exploM"){
        return({n:n,type:"exploM",x:x,y:y,alti:z,g:g,lim:lim,act:limActExploM,draw:drawExploM});
    }
    else if (type == "pow"){
        return({n:n,type:"pow",x:x,y:y,alti:z,g:g,lim:lim,act:limAct,draw:drawPow});
    }
    else if (type == "swordWall"){
        return({n:n,type:"swordWall",x:x,y:y,alti:z,g:g,lim:lim,act:limActG,draw:drawSwordWall,
                elem:[rnd(314)/5,rnd(314)/5,rnd(314)/5,rnd(314)/5,rnd(314)/5,rnd(314)/5,rnd(314)/5]});
    }
    else if (type == "hitA"){
        return({n:n,type:"hitA",x:x,y:y,alti:z,g:g,lim:lim,act:limAct,draw:drawHit});
    }
    else if (type == "titre"){
        return({n:n,type:"titre",x:x,y:y,alti:z,g:g,lim:lim,act:limActTitre,draw:drawTitre,name:name});
    }
    else if (type == "none"){
        return({act:destroy,draw:null});
    }
    else if (type == "eole"){
        return({n:n,type:"eole",x:x,y:y,alti:z,g:g,lim:lim,act:limActEndless,draw:drawEole});
    }
    else if (type == "texte"){
        return({n:n,type:"texte",x:x,y:y,alti:z,g:g,lim:lim,act:limActEndless,draw:drawTexte,cont:name});
    }
    else if (type == "object"){
        return({type:"object",x:x,y:y,alti:z,g:g,act:actPhysic,draw:drawObjectFly,name:name,vx:n,vy:lim,onGround:0,ground:-2,spe:sens,carry:carry});
    }
}

function suppParticles(n){
    particles.splice(n,1);
}

function actPhysic(e,i){
    e.ground = Map.getFloor(Math.floor(e.x),Math.floor(e.y),e.alti);
    if (e.alti > e.ground) {e.onGround = 0; e.g -= 1; e.alti += e.g/50;}
    else {e.onGround = 1; e.g = 0; e.alti = e.ground;}
    var frottement = e.onGround/50;
    var altim = Map.getFloor(Math.floor(e.x + e.vx),Math.floor(e.y + e.vy),e.alti);
    if (altim > e.alti){
        e.vx = 0;
        e.vy = 0;
    }
    else {
        e.x += e.vx;
        e.y += e.vy;
        if (e.vx > frottement) e.vx -= frottement;
        else if (e.vx < -1*frottement) e.vx += frottement;
        else e.vx = 0;
        if (e.vy > frottement) e.vy -= frottement;
        else if (e.vy < -1*frottement) e.vy += frottement;
        else e.vy = 0;        
    }
    if (e.vx == 0 && e.vy == 0 && e.onGround == 1){
        if (e.spe == "normal"){
            Map.setObject(Math.floor(e.x),Math.floor(e.y),e.name,0);
            suppParticles(i);
        }
        else if (e.spe == "deliver"){
            addParticles("fumeeP",e.x-0.5,e.y-0.5,e.alti,0,0,40);
            e.carry.forEach(
                function (a,j){
                    Map.setObject(Math.floor(e.x),Math.floor(e.y),a,j);
                }
            );
            suppParticles(i);
        }
        else if (e.spe == "break"){
            if (e.name == "pot") addParticles("debris",e.x-0.5,e.y-0.5,e.alti,5,0,10,e.name);            
            Map.setObject(Math.floor(e.x),Math.floor(e.y),"rubisVert",0);
            suppParticles(i);
        }
    }
    //e.x += 
}


function blact(truc,i){
    if (truc.touche < touchCount){
        if (truc.actu.length >= truc.content[truc.msgN].length){
            if (truc.msgN == truc.content.length - 1) truc.lim = truc.n+1+15-truc.n%15;
            else {
                truc.msgN += 1;
                truc.n = 0;
                truc.actu = "";
            }
        }
        else {
            truc.actu = truc.content[truc.msgN];
        }
        truc.touche += 1;
    }
    if (truc.n%truc.viteModo == 0 && truc.actu.length < truc.content[truc.msgN].length){
        truc.actu += truc.content[truc.msgN].charAt(truc.n*3 / truc.viteModo);
        truc.actu += truc.content[truc.msgN].charAt((truc.n*3 / truc.viteModo) + 1);
        truc.actu += truc.content[truc.msgN].charAt((truc.n*3 / truc.viteModo) + 2);
        if (truc.n%(truc.viteModo*15) == 0){
            truc.x2 = truc.xx;
            truc.y2 = truc.yy;
            truc.xx = rnd(10)/10 - 0.5;
        }
    }

    alert(truc.actu);
    truc.n += 1;
    if (truc.n >= truc.lim && truc.lim >= 0) {disalert(); suppParticles(i);}
}

function limAct(e,i){
    e.n += 1;
    if (e.n >= e.lim) suppParticles(i);
}

function limActEndless(e,i){
    e.n += 1;
}

function limActG(e,i){
    e.alti += e.g/50;
    e.g -= 1;
    e.n += 1;
    if (e.n >= e.lim) suppParticles(i);
}

function limActLeaf(e,i){
    // Partie mouvement
    e.alti += e.g/10;
    e.g -= 0.5;
    if (e.g <= -0.2) {
        for (let j = 0;j < e.liste.length; j++){
            e.liste[j][0] += Math.sin(e.n/10 + j)/130;
            /*
            if (j < 3){
                e.liste[j][2] -= (3 - j)/8;
            }
            else {
                e.liste[j][2] += (j - 2.5)/8;
            }
             */
        }
        e.g = -0.2;
    }
    else{
        e.liste[0][0] -= 0.01; e.liste[1][0] -= 0.002; e.liste[2][0] -= 0.001; e.liste[4][0] += 0.01; 
    }
    
    // Partie longévité
    e.n += 1;
    if (e.n >= e.lim) suppParticles(i);
}

function limActExploM(e,i){
    e.n += 1;
    if (e.n >= e.lim){
        addParticles("pow",e.x,e.y,e.alti+1,0,0,8);
        //e.type = "pow";
        //e.n = 0;
        //e.lim = 8;
        //e.alti += 1;
        suppParticles(i);
    }

}

function limActTitre(kgb,i){
    if (kgb.alti == -5){
        kgb.imgN = new Image();
        kgb.imgN.src = "images/nomLieu/" + kgb.name + ".png";
        kgb.imgN.onload = function(){
            kgb.lim = 400;
            kgb.n = 0;
        };
        kgb.alti = 666;
    }
    if (kgb.n >= 0){
        kgb.n += 1;
        if (kgb.n >= kgb.lim) suppParticles(i);
    }
}


function destroy(e,i){
    suppParticles(i);
}
