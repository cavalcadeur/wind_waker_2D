var W,H;
var ctx,canvas;
var X = 0;
var Y = 0;
var keys = [];
var heros = [{"x":8,"y":13,z:0,g:0,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3},{"x":9,"y":13,z:0,g:0,"vx":0,"vy":0,"sens":2,"delay":0,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3}];
var ennemis = [];
var boomerang = [];
var pots = [];
// Il faut bien noter que les altitudes négatives sont interdites au dela de -1 pour cause de bugs graphiques
var niveau = [];
var objNiveau = [[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]]];
var imgHeros = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
var imgDebris = {};
var imgElement = {};
var imgMenu = {};
var imgArme = {};
var imgMonstre = {};
var imgBoat = new Image();
imgBoat.src = "images/heros/boat.png";
var figer = 0;
var edition = 0;
var scrollX = 0;
var scrollY = 0;
var vecteurs = [[-1,0],[0,1],[1,0],[0,-1]];
var imgArbre = ["arbre0","herbe0","herbe1","coffre0","coffre1","porte0","cle0","cle1","bleu0","bleu1","rouge0","rouge1","switch0","switch1","house0","house1","house2","house3","house4"];
var imgEnnemi = ["dark","bokoblin"];
var mouse = [0,0];
var editObject = ["rien","rubisVert","rubisBleu","rubisRouge","coeur","arbre0","herbe0","herbe1","pot","coffre0","coffre1","porte0","cle0","cle1","bleu0","rouge0","switch0","mastersword","boomerang","house0","house1","house3"];
var editnumber = 1;
var onSea = 0;
var waves = [];
var goto = "";
var boatPosition = [220,220];

// programme

function rnd(max){
    return Math.floor(Math.floor(Math.random()*max));
}

function resize(){
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
}

function charge(){
    var coeur = ["coeurVide","coeur1","coeur05"];
    var debris = ["pot0","pot1","pot2","pot3","pot4"];
    var imgInterface = ["blank","mastersword","boomerang","pencil","boat","pot"];
    var imgRubis = ["rubisVert","rubisBleu","rubisRouge","fragment","coeur"];
    var armes = ["mastersword0","mastersword1","mastersword2","mastersword3","boomerang0","boomerang1","boomerang2","boomerang3","pencil0","pencil1","pencil2","pencil3","boat0","boat1","boat2","boat3","pot0","pot1","pot2","pot3"];
    var chargement = imgRubis.length + imgHeros.length + imgArbre.length + imgInterface.length + armes.length + imgInterface.length + debris.length + coeur.length + (imgEnnemi.length*4);
    imgRubis.forEach(
        function(e,i){
            imgElement[e] = new Image();
            imgElement[e].src = "images/elements/rubis/" + e + ".png";
            imgElement[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    coeur.forEach(
        function(e,i){
            imgMenu[e] = new Image();
            imgMenu[e].src = "images/interface/" + e + ".png";
            imgMenu[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        });
    debris.forEach(
        function(e,i){
            imgDebris[e] = new Image();
            imgDebris[e].src = "images/elements/debris/" + e + ".png";
            imgDebris[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgArbre.forEach(
        function(e,i){
            imgElement[e] = new Image();
            imgElement[e].src = "images/elements/" + e + ".png";
            imgElement[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgInterface.forEach(
        function(e,i){
            imgMenu[e] = new Image();
            imgMenu[e].src = "images/interface/" + e + ".png";
            imgMenu[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgInterface.forEach(
        function(e,i){
            imgElement[e] = new Image();
            imgElement[e].src = "images/elements/armes/" + e + ".png";
            imgElement[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    armes.forEach(
        function(e,i){
            imgArme[e] = new Image();
            imgArme[e].src = "images/heros/" + e + ".png";
            imgArme[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgHeros.forEach(
        function(e,i){
            e.src = "images/heros/heros"+i+".png";
            e.onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    imgEnnemi.forEach(
        function(e,i){
            for (var j = 0;j < 4;j ++){
                var name = e+j;
                imgMonstre[name] = new Image();
                imgMonstre[name].src = "images/ennemis/"+name+".png";
                imgMonstre[name].onload = function(){
                    chargement -= 1;
                    if (chargement == 0) animation();
                };
            }
        }
    );
    var bje = [38,39,40,37,101,99,98,97];
    bje.forEach(
        function(e){
            keys[e] = 0;
        }
    );
}


function start(){
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    niveau = iles["depart"].alti;
    objNiveau = iles["depart"].obj;
    Painter.niveau( niveau );
    resize();
    Crossed.init(W,H);
    //    canvas.addEventListener("click",function(evt) {
    //                           evt.stopPropagation();
    //                        evt.preventDefault();
    //                          //evt = evt.changedTouches[0];
    //                        var rect = canvas.getBoundingClientRect();
    //                       var x = evt.pageX - rect.left;
    //                       var y = evt.pageY - rect.top;
    //                       click(x, y);
    //                  });
    document.addEventListener(
        "mouseup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            if (edition == 0) return;
            var rect = canvas.getBoundingClientRect();
            var x = event.clientX;
            var y = event.clientY;
            if (editnumber == 0){
                if (event.button == 0) pencil(x,y,1);
                else pencil(x,y,-1);
            }
            else{
                if (event.button == 0) pencil(x,y,editObject[editnumber]);
                else pencil(x,y,"delete");
            }
        }
    );
    document.addEventListener(
        "wheel",
        function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            if (edition == 0) return;
            if (evt.deltaY > 0 && editnumber > 0) editnumber = (editnumber - 1) % editObject.length;
            else if (evt.deltaY > 0 && editnumber == 0) editnumber = editObject.length - 1;
            else editnumber = (editnumber + 1) % editObject.length;
        });
    document.addEventListener(
        "mousemove",
        function (event){
            mouse[1] = event.clientX;
            mouse[0] = event.clientY;
        }
    );
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 1;
            Crossed.keysPress(event.keyCode);
            if (event.keyCode == 16) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = ""; heros[2].aura = "";} else{attack(0);}}
            else if (event.keyCode == 13) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = ""; heros[2].aura = "";} else{attack(1);}}
        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keys[event.keyCode] = 0;
            if (event.keyCode == 17) changeArme(0);
            else if (event.keyCode == 96) changeArme(1);
        }
    );
    for(var i = 0;i < 17;i ++){
        waves.push([rnd(W),rnd(H),-rnd(200) + 100]);
    }
    charge();
}

function animation(){
    var f = function(t) {
        if (Crossed.testCrossed() == 1){
            if (onSea == 0) draw(t);
            else drawSea(t);
            Crossed.drawMenu(ctx,W,H);
        }
        else{
            if (onSea == 0) action(t);
            else seaAction(t);
            window.requestAnimationFrame(f);
        }
    };
    window.requestAnimationFrame(f);
}

function action(t){
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    heros.forEach(
        function(h,n){
            if (h.vx == 0 && h.vy == 0 && figer == 0){
                if (objNiveau[h.y][h.x][0] != "" && objNiveau[h.y][h.x][0] != "herbe0" && objNiveau[h.y][h.x][0] != "herbe1" && objNiveau[h.y][h.x][0] != "bleu1" && objNiveau[h.y][h.x][0] != "rouge0" && objNiveau[h.y][h.x][0] != "bleu0" && objNiveau[h.y][h.x][0] != "rouge1" && objNiveau[h.y][h.x][0] != "house0"){
                    if (objNiveau[h.y][h.x][0] == "rubisVert"){
                        h.rubis += 1;
                    }
                    else if (objNiveau[h.y][h.x][0] == "rubisBleu"){
                        h.rubis += 5;
                    }
                    else if (objNiveau[h.y][h.x][0] == "rubisRouge"){
                        h.rubis += 20;
                    }
                    else if (objNiveau[h.y][h.x][0] == "coeur"){
                        if (h.vie + 1 <= h.vieTotale){
                            h.vie += 1;
                        }
                        else if (h.vie + 0.5 <= h.vieTotale) h.vie += 0.5;
                    }
                    else if (objNiveau[h.y][h.x][0] == "cle0"){
                        h.cles += 1;
                    }
                    else if (objNiveau[h.y][h.x][0] == "boomerang" || objNiveau[h.y][h.x][0] == "mastersword" || objNiveau[h.y][h.x][0] == "pencil"){
                        h.invent.push(objNiveau[h.y][h.x][0]);
                        h.objet = h.invent.length - 1;
                    }
                    if (objNiveau[h.y][h.x].length > 1) objNiveau[h.y][h.x].splice(0,1);
                    else objNiveau[h.y][h.x][0] = "";

                }
                if (1 == keys[controlKeys[n][1]]) move(1,n);
                else if (1 == keys[controlKeys[n][3]]) move(3,n);
                else if (1 == keys[controlKeys[n][0]]) move(0,n);
                else if (1 == keys[controlKeys[n][2]]) move(2,n);
            }
            if ((h.vx != 0 && h.vy != 0) || (h.z > niveau[h.y][h.x] && h.g < 5)) h.g += 0.05;
            else {h.g = 0; h.z = niveau[h.y][h.x];}
            h.z -= h.g;
            if (figer == 1) {h.tAura += h.vAura; if (h.tAura == 40 | h.tAura == -40) h.vAura = h.vAura * -1;}
            else if (h.vx > 0) {h.vx -= 5; if(h.x*50 + scrollX < 0) scrollX += 5;}
            else if (h.vy > 0) {h.vy -= 5; if(h.y*50 + scrollX < 0) scrollY += 5;}
            else if (h.vx < 0) {h.vx += 5; if(h.x*50 + scrollX + 50 > W) scrollX -= 5;}
            else if (h.vy < 0) {h.vy += 5; if(h.y*50 + scrollY + 50 > H) scrollY -= 5;}
        });
    draw();
}

function move(d,n){
    if (heros[n].sens != d){
        heros[n].sens = d;
        heros[n].delay = 2;
        return;
    }
    if (heros[n].delay != 0){
        heros[n].delay -= 1;
        return;
    }
    if (heros[n].x + vecteurs[d][1] == niveau[heros[n].y].length | heros[n].x + vecteurs[d][1] == -1 | heros[n].y + vecteurs[d][0] == niveau.length | heros[n].y + vecteurs[d][0] == -1) return;
    if (niveau[heros[n].y][heros[n].x] + 1 < niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]]) return;
    var truc = objNiveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]][0];
    if (niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]] == -1 | truc == "arbre0" | truc == "coffre0" | truc == "coffre1" | truc == "porte0" | truc == "bleu0" | truc == "rouge1" | truc == "switch0" | truc == "switch1" | truc == "house0" | truc == "house1" | truc == "house2" | truc == "house3" | truc == "house4" | truc == "pot") return;
    if (niveau[heros[n].y][heros[n].x] < niveau[heros[n].y+vecteurs[d][0]][heros[n].x+vecteurs[d][1]]) heros[n].g = -0.2;
    heros[n].x +=  vecteurs[d][1];
    heros[n].y +=  vecteurs[d][0];
    heros[n].vx += -50 * vecteurs[d][1];
    heros[n].vy += -50 * vecteurs[d][0];
}

function changeArme(n){
    heros[n].objet = (heros[n].objet+1)%heros[n].invent.length;
}

function draw() {
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,0,W,H);
    waves.forEach(
        function(e){
            waveNiveau(e);
        }
    );
    niveau.forEach(
        function(e,y){
            e.forEach(
                function(f,x){
                    Painter.cell( ctx, x, y, f );
                    if (objNiveau[y][x][0] == "bleu0" || objNiveau[y][x][0] == "bleu1" || objNiveau[y][x][0] == "rouge0" || objNiveau[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNiveau[y][x][0]] );
                    else if (objNiveau[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNiveau[y][x][0]] );
                    else Painter.img( ctx, x, y, f, imgElement[objNiveau[y][x][0]] );
                    //testTerrain(x,y,f);
                    //if (objNiveau[y][x][0] != "") ctx.drawImage(imgElement[objNiveau[y][x][0]],x*50 - (tElement[objNiveau[y][x][0]][0] - 50)/2 + scrollX,y*50 - 20*niveau[y][x] - (tElement[objNiveau[y][x][0]][1]-40) + scrollY);
                    heros.forEach(
                        function(h,n){
                            if (y == h.y && x == e.length - 1) drawHeros(n);
                            if (h.vy > 0 && y == h.y + 1 && x == e.length - 1) drawHeros(n);
                        }
                    );
                    ennemis.forEach(
                        function(a,m){
                            if (y-Math.round(a.y) == 0 && x == e.length - 1) drawEnnemi(m);
                        }
                    );
                    pots.forEach(
                        function(g,i){
                            if (y == Math.round(g.y + g.n*((g.oy - g.y)/32)) && x == e.length - 1) drawPot(g,i);
                        }
                    );
                    boomerang.forEach(
                        function(f,i){
                            if ((y == f.y && x == e.length - 1) | (f.vy > 0 && y == f.y + 1 && x == e.length - 1)){
                                Painter.imgBoomerang( ctx, f.x + f.vx/50, f.y + f.vy/50, f.alti, f.r, imgElement["boomerang"] );
                                f.r += 0.5;
                                if (f.vx == 0 && f.vy == 0){
                                    if (f.endu == 0){
                                        objNiveau[f.y][f.x].splice(0,0,"boomerang");
                                        f.content.forEach(function(g){objNiveau[f.y][f.x].splice(1,0,g);});
                                        boomerang.splice(i,1);return;
                                    }
                                    else if (f.endu == 5) f.sens = (f.sens+2)%4;
                                    if ((f.y + vecteurs[f.sens][0]) <= -1 | (f.x + vecteurs[f.sens][1]) <= -1 | (f.y + vecteurs[f.sens][0]) >= niveau.length | (f.x + vecteurs[f.sens][1]) >= niveau[f.y].length){
                                        if (f.endu <= 5) f.endu = 1;
                                        else {f.endu = 11 - f.endu; f.sens = (f.sens+2)%4;}
                                    }
                                    else {
                                        var truc = objNiveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]][0];
                                        if (niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] > f.alti | ((truc == "coffre0" | truc == "coffre1" | truc == "arbre0" | truc == "porte0" | truc == "bleu0" | truc == "rouge1" | truc == "switch0" | truc == "switch1") && niveau[f.y + vecteurs[f.sens][0]][f.x +  + vecteurs[f.sens][1]] == f.alti)){
                                            if (f.endu <= 5) f.endu = 1;
                                            else {f.endu = 11 - f.endu; f.sens = (f.sens+2)%4;}
                                            if (truc == "switch0" | truc == "switch1") changeColor();
                                        }
                                        else {
                                            f.y += vecteurs[f.sens][0];
                                            f.x += vecteurs[f.sens][1];
                                            f.vy += vecteurs[f.sens][0] * -50;
                                            f.vx += vecteurs[f.sens][1] * -50;
                                        }
                                    }
                                    if ((objNiveau[f.y][f.x][0] == "herbe0" | objNiveau[f.y][f.x][0] == "herbe1" | objNiveau[f.y][f.x][0] == "pot")&&f.alti == niveau[f.y][f.x]) {
                                        if (objNiveau[f.y][f.x].length == 1)objNiveau[f.y][f.x][0] = "";
                                        else objNiveau[f.y][f.x].splice(0,1);
                                    }
                                    else if ((objNiveau[f.y][f.x][0] == "rubisVert" | objNiveau[f.y][f.x][0] == "rubisBleu" | objNiveau[f.y][f.x][0] == "rubisRouge" | objNiveau[f.y][f.x][0] == "cle0" | objNiveau[f.y][f.x][0] == "coeur")&&f.alti == niveau[f.y][f.x]) {
                                        f.content.push(objNiveau[f.y][f.x][0]);
                                        if (objNiveau[f.y][f.x].length == 1)objNiveau[f.y][f.x][0] = "";
                                        else objNiveau[f.y][f.x].splice(0,1);
                                    }
                                    f.endu -= 1;
                                }
                                else if (f.vy > 0) f.vy -= 5;
                                else if (f.vy < 0) f.vy += 5;
                                else if (f.vx > 0) f.vx -= 5;
                                else if (f.vx < 0) f.vx += 5;
                            }
                        }
                    );
                }
            );
        }
    );
    drawInterface();
}

function drawHeros(n){
    if (edition == 1) return;
    Painter.img( ctx, heros[n].x + heros[n].vx/50, heros[n].y + heros[n].vy/50, heros[n].z, imgHeros[heros[n].sens + 4*n] );
    if (heros[n].invent[heros[n].objet] != "blank") {
        Painter.img(ctx,heros[n].x + heros[n].vx/50,heros[n].y + heros[n].vy/50,heros[n].z,imgArme[heros[n].invent[heros[n].objet] + heros[n].sens]);
    }
    if (heros[n].aura != ""){
        Painter.imgScale(ctx,heros[n].x + heros[n].vx/50,heros[n].y - 1 + heros[n].vy/50,heros[n].z,heros[n].tAura/40,imgElement[heros[n].aura]);
    }
}

function drawEnnemi(n){
    if (ennemis[n].pv == 0) return;
    Painter.img( ctx, ennemis[n].x, ennemis[n].y, ennemis[n].z, imgMonstre[String(ennemis[n].img + ennemis[n].sens)] );
    var altitude = niveau[Math.round(ennemis[n].y)][Math.round(ennemis[n].x)];
    if (ennemis[n].z > altitude) {
        ennemis[n].z -= ennemis[n].g;
        ennemis[n].g += 0.05;
    }
    else if (ennemis[n].z < altitude){
        ennemis[n].g = 0;
        ennemis[n].z = altitude;
    }
    if (ennemis[n].n == 1/ennemis[n].v){
        ennemis[n].stun = 0;
        ennemis[n].sens = choseDirection(n);
        ennemis[n].n = 0;
        if (ennemis[n].sens == 4){
            ennemis[n].sens = 2;
            ennemis[n].stop = 1;
        }
    }
    if (ennemis[n].stop == 0){
        ennemis[n].n += 1;
        if (ennemis[n].stun == 0){
            ennemis[n].x += vecteurs[ennemis[n].sens][1] * ennemis[n].v;
            ennemis[n].y += vecteurs[ennemis[n].sens][0] * ennemis[n].v;
        }
    }
}

function drawInterface(){
    ctx.drawImage(imgMenu[heros[0].invent[heros[0].objet]],W-50,0);
    ctx.drawImage(imgMenu[heros[1].invent[heros[1].objet]],W-50,55);
    if (edition == 1 && editObject[editnumber] != "rien"){
        ctx.drawImage(imgElement[editObject[editnumber]],mouse[1],mouse[0]- imgElement[editObject[editnumber]].height / 2);
    }
    heros.forEach(
        function(h,index){
            for (var i = 0;i < h.vieTotale;i++){
                if (i < 10) ctx.drawImage(imgMenu.coeurVide,5 + i*15,5 + index*35);
                else ctx.drawImage(imgMenu.coeurVide,5 + (i-14)*15,15 + index*35);
                if (h.vie > i){
                    if (h.vie - 0.5 > i){
                        if (i < 10) ctx.drawImage(imgMenu.coeur1,5 + i*15,5 + index*35);
                        else ctx.drawImage(imgMenu.coeur1,5 + (i-14)*15,15 + index*35);
                    }
                    else {
                        if (i < 10) ctx.drawImage(imgMenu.coeur05,5 + i*15,5 + index*35);
                        else ctx.drawImage(imgMenu.coeur05,5 + (i-14)*15,15 + index*35);
                    }
                }
            }
        }
    );
}

function attack(n){
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    var grassContent = ["","","","rubisVert","rubisVert","rubisBleu"];
    var truc = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0];
    if ((truc == "coffre0" || truc == "porte0" || truc == "pot") && niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] == niveau[heros[n].y][heros[n].x]){
        if (truc == "coffre0"){
            Crossed.improve();
            objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = "coffre1";
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1)donnerHeros(objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][1],n);
            else donnerHeros("",n);
        }
        else if (truc == "porte0"){
            if (heros[n].cles > 0) {objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = ""; heros[n].cles -= 1;}
            else alert("Cette porte est verouillée.");
        }
        else if (truc == "pot"){
            heros[n].invent.push("pot");
            heros[n].objet = heros[n].invent.length - 1;
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1) objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].splice(0,1);
            else objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = "";
        }
    }
    else if (heros[n].invent[heros[n].objet] == "mastersword"){
        var truc = objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0];
        if (niveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] != niveau[heros[n].y][heros[n].x]) return;
        if (truc == "herbe0" | truc == "herbe1" | truc == "pot"){
            if (objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].length > 1){
                objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]].splice(0,1);
            }
            else {
                objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]][0] = grassContent[rnd(grassContent.length - 1)];
            }
        }
        else if (truc == "switch0" || truc == "switch1") changeColor();
        ennemis.forEach(
            function(e,gg){
                if (Math.round(e.x) == heros[n].x + vecteurs[heros[n].sens][1] && Math.round(e.y) == heros[n].y + vecteurs[heros[n].sens][0]){
                    hitEnnemis(gg,1,heros[n].sens);
                }
            }
        );
    }
    else if (heros[n].invent[heros[n].objet] == "boomerang"){
        boomerang.push({"x":heros[n].x,"y":heros[n].y,"vx":0,"vy":0,"sx":heros[n].x,"sy":heros[n].y,"r":0,"alti":niveau[heros[n].y][heros[n].x],"sens":heros[n].sens,"endu":10,"content":[]});
        heros[n].invent.splice(heros[n].objet,1);
        if (heros[n].objet == heros[n].invent.length) heros[n].objet -= 1;
    }
    else if (heros[n].invent[heros[n].objet] == "pencil"){
        if (edition == 0)edition = 1;
        else {
            edition = 0;
            console.log(JSON.stringify(niveau));
            console.log(JSON.stringify(objNiveau));
        }
    }
    else if (heros[n].invent[heros[n].objet] == "boat"){
        heros[0].x = boatPosition[1];
        heros[0].y = boatPosition[0];
        goto = "";
        onSea = 1;
    }
    else if (heros[n].invent[heros[n].objet] == "pot"){
        pots.push({"alti":niveau[heros[n].y][heros[n].x] + 0.9,"g":15,"x":heros[n].x + heros[n].vx / 50,"y":heros[n].y + heros[n].vy / 50,"ox":heros[n].x + vecteurs[heros[n].sens][1] * 3,"oy":heros[n].y + vecteurs[heros[n].sens][0] * 3,"n":0});
        var nPot = pots.length - 1;

        while (pots[nPot].oy >= niveau.length){pots[nPot].oy -= 1;}
        while (pots[nPot].oy < 0){pots[nPot].oy += 1;}
        while (pots[nPot].ox >= niveau[0].length){pots[nPot].ox -= 1;}
        while (pots[nPot].ox < 0){pots[nPot].ox += 1;}
        while (niveau[pots[nPot].oy][pots[nPot].ox] > pots[nPot].alti) {pots[nPot].ox -= vecteurs[heros[n].sens][1];pots[nPot].oy -= vecteurs[heros[n].sens][0];}
        heros[n].invent.splice(heros[n].objet,1);
        if (heros[n].objet == heros[n].invent.length) heros[n].objet = 0;
    }
}

function donnerHeros(obj,n){
    heros[n].sens = 2;
    heros[n].aura = obj;
    var description = {"":"Vous n'obtenez rien. Tant pis !","arbre0":"Vous obtenez un arbre ! Qu'allez vous bien pouvoir en faire ?","rubisVert":"C'est un rubis vert ! Il vaut 1. C'est le début de la richesse.","rubisBleu":"C'est un rubis bleu ! Il vaut 5 rubis verts. Prenez-en soin.","rubisRouge":"C'est un rubis rouge ! Il vaut 20 rubis verts.Cherissez le de tout votre coeur.","coffre0":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","herbe0":"C'est de l'herbe. Vous trouverez mieux la prochaine fois ...","herbe1":"C'est de l'herbe. Dommage...","coffre1":"Vous obtenez un coffre. Ce n'est pas forcément très utile. Reposez le.","mastersword":"Wow, c'est une fausse mastersword ! La fameuse épée légendaire du héros du vent. Elle ressemble beaucoup à l'originale. Peut-être vous sera-t-elle utile.Assignez la avec ctrl et attaquez avec la touche maj.","boomerang":"Un boomerang ! Assignez le avec ctrl et utilisez le avec maj. Il va en ligne droite puis reviens sauf s'il touche un obstacle.","porte0":"Vous obtenez une porte verouillée! Ne la gardez pas ...","cle0":"Vous obtenez une clé ! Elle sert à ouvrir les portes mais elle ne sert qu'une seule fois. Utilisez la à bon escient !","cle1":"C'est un trousseau de clé. On trouve 5 clés dessus. Quel chance !","pencil":"Vous obtenez le pinceau du créateur. Il vous permet de modifier les alentours à volonté. Assignez le avec ctrl puis appuyez sur maj pour déchainer votre créativité.","boat":"Vous trouvez un bateau. Utilisez le pour naviquer vers de nouvelles aventures.","pot":"C'est un pot de fleur !!! Attention c'est fragile.","fragment":"Un receptacle de coeur ! Vous gagnez un coeur supplémentaire et tous vos coeurs sont regénérés.","coeur":"C'est un coeur ! Cela devrait vous permettre de vous soigner. Ne me demandez pas comment."};
    alert(description[obj]);
    figer = 1;
    if (obj == "rubisVert") heros[n].rubis += 1;
    else if (obj == "rubisBleu") heros[n].rubis += 5;
    else if (obj == "rubisRouge") heros[n].rubis += 20;
    else if (obj == "mastersword") {heros[n].invent.push("mastersword");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "boomerang") {heros[n].invent.push("boomerang");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "pencil") {heros[n].invent.push("pencil");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "boat") {heros[n].invent.push("boat");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "pot") {heros[n].invent.push("pot");heros[n].objet = heros[n].invent.length - 1;}
    else if (obj == "cle0") {heros[n].cles += 1;}
    else if (obj == "cle1") {heros[n].cles += 5;}
    else if (obj == "fragment") {if (heros[n].vieTotale<20){heros[n].vieTotale += 1;}heros[n].vie = heros[n].vieTotale;}
}

function changeColor(){
    objNiveau.forEach(
        function(e){
            e.forEach(
                function(f){
                    if (f[0] == "switch0") f[0] = "switch1";
                    else if (f[0] == "switch1") f[0] = "switch0";
                    else if (f[0] == "bleu1") f[0] = "bleu0";
                    else if (f[0] == "bleu0") f[0] = "bleu1";
                    else if (f[0] == "rouge1") f[0] = "rouge0";
                    else if (f[0] == "rouge0") f[0] = "rouge1";
                }
            );
        }
    );

}

function pencil(x,y,action){
    x = Math.floor(x-scrollX);
    y = Math.floor(y-scrollY);
    //    if (x < 0 | y < 0 | x > (niveau[0].length)*50 | y > (niveau.length)*50) return;
    var coor = Painter.case(niveau,x,y);
    if (coor[0] == "ah") return;
    if (action == 1 || action == -1){
        if (niveau[coor[0]][coor[1]] + action > -2)niveau[coor[0]][coor[1]] += action;
        Painter.niveau(niveau);
    }
    else if (action == "delete"){
        if (objNiveau[coor[0]][coor[1]].length > 1) objNiveau[coor[0]][coor[1]].splice(0,1);
        else objNiveau[coor[0]][coor[1]][0] = "";

    }
    else{
        if (objNiveau[coor[0]][coor[1]][0] != "") objNiveau[coor[0]][coor[1]].splice(0,0,action);
        else objNiveau[coor[0]][coor[1]][0] = action;
        if (action == "house3" && coor[1] + 1 != objNiveau[coor[0]].length){
            if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"house4");
            else objNiveau[coor[0]][coor[1]+1][0] = "house4";
        }
        if (action == "house1" && coor[1] + 1 != objNiveau[coor[0]].length){
            if (objNiveau[coor[0]][coor[1]+1][0] != "") objNiveau[coor[0]][coor[1]+1].splice(0,0,"house2");
            else objNiveau[coor[0]][coor[1]+1][0] = "house2";
        }
    }
}

function hitEnnemis(n,degat,sens){
    if (ennemis[n].stun == 1) {
        ennemis[n].stun = 0;
        return;
    }
    ennemis[n].pv -= 1;
    ennemis[n].sens = (sens + 2)%4;
    ennemis[n].stun = 1;
    ennemis[n].x = Math.round(vecteurs[sens][1] + ennemis[n].x);
    ennemis[n].y = Math.round(vecteurs[sens][0] + ennemis[n].y);
}
