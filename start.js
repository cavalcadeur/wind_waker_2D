"use strict";

// Le fichier start s'occupe d'initialiser le jeu et rien d'autre
// Il contient donc toutes les déclarations de variables ainsi que la fonction start(), resize(), rnd(), animation(), precharge() et charge()

let W,H;
let ctx,canvas;
let X = 0;
let Y = 0;
let keys = {};
let heros = [{"x":0,"y":8,z:0,g:0,r:0,s:1,"vx":0,"vy":0,"sens":2,"delay":0,taille:2,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3,"stun":0,"mortal":0,"grap":0,"grapD":-1,"prim":"pencil","imgUp":0,"imgN":0,"plane":0,"timerF":0,"etat":0,"caseSpe":0,"seedCount":10,"touche":["ArrowUp","ArrowRight","ArrowDown","ArrowLeft","Shift","Control"," ","a","i"],"scrollSpeed":1,anim:nonifiant,nAnim:0,datAnim:0,img:0,carry:[0,0],wear:0,toGo:[]},{"x":2,"y":9,z:0,g:0,r:0,s:1,"vx":0,"vy":0,"sens":2,"delay":0,taille:3,"rubis":0,"objet":0,"invent":["blank"],"aura":"","tAura":0,"vAura":1,"cles":0,"d":1,"vie":3,"vieTotale":3,"stun":0,"mortal":0,"grap":0,"grapD":-1,"imgUp":0,"imgN":0,"plane":0,"timerF":0,"etat":0,"caseSpe":0,"seedCount":0,"touche":["5","3","2","1","Enter","0"],anim:nonifiant,nAnim:0,datAnim:0,img:0,carry:[0,0],wear:0,toGo:[]}];
let questObj = {"carteMaritime":0,"boussole":0,wear:0};
let parameters = {mouseScrollPencil:false};
let objInvent = [];
let seaLimit = [1200,900];
let ennemis = [];
let boomerang = [];
let editPlate = 0;
let pressurePlate = [];
let useless = ["blank",""];
let pots = [];
let out = 4;
let colorSet;
let niveau = [];
let quests;
let alerting = 0;
let objNiveau = [[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]]];
let textured;
let imgHeros;
let imgDebris = {};
let imgElement = {};
let imgMenu = {};
let imgArme = {};
let imgMonstre = {};
let imgPersoN = {};
let particles = [];
let imgBoat = new Image();
imgBoat.src = "images/heros/boat.png";
let figer = 0;
let edition = 0;
let scrollX = 0;
let scrollY = 0;
let teleport = [0,0];
let vecteurs = [[-1,0],[0,1],[1,0],[0,-1]];
let imgArbre;
let nDalle = 0;
let nSpeImg = 10;
let imgEnnemi = [];
let mouse = [0,0];
let editObject;
let editHand = [];
let editnumber = 1;
let editArray;
let onSea = 0;
let waves = [];
let goto = "";
let boatPosition = [200,100];
let onSeaIsland = [];
let casePencil = [0,0];
let editM = 0;
let hookShots = [];
let objetMort = 0;
let savedMap,savedHouseMap;
let respawnPoint = [0,8];
let markedLevels = [["betaJump",1]];
let islandData = {};
let fondfond = new Image();
let fondInvent = new Image();
fondInvent.src = "images/menu4.png";
let imgCinema = [new Image,new Image,[]];
let cinematicos = 0;
let sideEdit = ["monsters","spe","sky","fireTemple","inDoor","herbe0","outDoor","special","gear","loot"];
let sideSelect = -1;
let workFloor;
let backg;
let backDraw,frontDraw;
let nPas = 0;
let rigolote = [-1,-1];
let gamePads;
let gameKey = [];
let sensDuBateau = 1;
let colors = [];
let touchCount = 0;
let editNs = [0,3,0,0];
let imgPat;
let chargImage = {};
let canvImg = [];
let nCasesX = 0;
let nCasesY = 0;
let scrollCaseX = 0;
let scrollCaseY = 0;
let scrollEditSpeed = [0,0,1,20]; // [vitesseX,vitesseY,acceleration,max]
let ennemyRefresh = 0;
let ennemyRefreshLim = 60;

// programme

function rnd(max){
    // Sert à retourner un nombre aléatoire entre 0 et la max
    return Math.floor(Math.floor(Math.random()*max));
}

function resize(){
    // Adapte la taille du canvas à l'écran quand elle est appellée
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.setAttribute("width",W);
    canvas.setAttribute("height",H);
    let listeBidon = Painter.getnCases(W,H);
    nCasesX = listeBidon[0];
    nCasesY = listeBidon[1];
}

function precharge(){
    // Affiche l'écran de chargement du début du jeu et lance la fonction de chargement des images de bases
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    fondfond.src = "images/Title.png";
    fondfond.onload = function(){
        ctx.drawImage(fondfond,W/2-187,H/2-131);
        alert("Silence dans la salle ! Le jeu charge.");

        Map.load(iles,interieurs);

        cinematicos = 8;
        charge();
    };
}

function charge(){
    // S'occupe de charger les images qui seront en cache en permanence quand cette fonction à finit, elle appelle animation() En général on appelle cette fonction qu'au tout début du jeu parce que toutes les images que l'on charge vont servir durant toute la durée d'une session de jeu. Le chargement des images spécifiques est fait ailleurs.
    let coeur = chargImage.coeur;
    let debris = chargImage.debris;
    let imgInterface = chargImage.interface;
    let imgRubis = chargImage.rubis;
    let imgPNJ = chargImage.PNJ;
    let armes = chargImage.truc;
    let chargement = imgRubis.length + imgHeros.length + imgArbre.length + imgInterface.length + armes.length + imgInterface.length + debris.length + coeur.length + imgPNJ.length + nDalle + nSpeImg;
    //imgPat = new Image();
    //imgPat.src = "images/pattern/falaise.png";
    //imgPat = ctx.createPattern(imgPat,"repeat");
    
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
    for(let i = 0;i<nDalle;i++){
        imgElement["dalle"+i] = new Image();
        imgElement["dalle"+i].src = "images/elements/dalles/dalle" + i + ".png";
        imgElement["dalle"+i].onload = function(){
            chargement -= 1;
            if (chargement == 0) animation();
        };

    }

    for(let i = 0;i<nSpeImg;i++){
        imgElement["spe"+i] = new Image();
        imgElement["spe"+i].src = "images/elements/spe/1/spe" + i + ".png";
        imgElement["spe"+i].onload = function(){
            chargement -= 1;
            if (chargement == 0) animation();
        };

    }

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
                //ctx.drawImage(imgElement[e],rnd(W),rnd(H));
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
                //ctx.drawImage(imgArme[e],rnd(W),rnd(H));
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
    for (let i = 0;i<70;i++){
        imgMonstre[i] = new Image();
    }
    imgPNJ.forEach(
        function(e,i){
            imgPersoN[e] = new Image();
            imgPersoN[e].src = "images/PNJ/"+e+".png";
            imgPersoN[e].onload = function(){
                chargement -= 1;
                if (chargement == 0) animation();
            };
        }
    );
    // On setup aussi les touches utiles pour une raison quelquoncque. (Ca s'écrit bien comme ça quelquoncque ?)
    let bje = [38,39,40,37,101,99,98,97];
    bje.forEach(
        function(e){
            keys[e] = 0;
        }
    );
}

function start(){
    // Toute première fonction à être appellée, elle s'occupe d'initialiser le jeu puis lance la fonction precharge()
    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");
    backg = new background(ctx);
    backDraw = backg.fa;
    W = canvas.width;
    H = canvas.height;
    actx.play();
    actx.loop = true;
    ctx.imageSmoothingEnabled = true;
    Map.goOut(1);
    mapState = Map.goto("ocean",mapState);
    goto = "ocean";
    out = 1;
    
    init();
    setColors(out,5);
    Painter.niveau( Map , iles["depart"].textures);
    resize();
    //    canvas.addEventListener("click",function(evt) {
    //                           evt.stopPropagation();
    //                        evt.preventDefault();
    //                          //evt = evt.changedTouches[0];
    //                        let rect = canvas.getBoundingClientRect();
    //                       let x = evt.pageX - rect.left;
    //                       let y = evt.pageY - rect.top;
    //                       click(x, y);
    //                  });
    document.addEventListener(
        "mouseup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX;
            let y = event.clientY;
            Map.updateGroundTotal();
            if (onSea == 6){
                clickHelp();
            }
            if (cinematicos == 8){
                cClickTitle();
                return;
            }
            else if (cinematicos == 9){
                cClickMerchant();
                return;
            }
            if (onSea == 4) inventclick(x,y);
            else if (onSea == 5) TPclick(x,y);
            else if (edition == 0) {
                clicPlayerTwo(x,y,heros);
                return;
            }
            if (onSea == 0){
                clickEdit(x,y,event.button);
            }
        }
    );
    document.addEventListener(
        "wheel",
        function(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            if (edition == 0) return;
            if (evt.deltaY > 0 && editnumber > 0) editnumber = (editnumber - 1) % editHand.length;
            else if (evt.deltaY > 0 && editnumber == 0) editnumber = editHand.length - 1;
            else editnumber = (editnumber + 1) % editHand.length;
        });
    document.addEventListener(
        "mousemove",
        function (event){
            mouse[1] = event.clientX;
            mouse[0] = event.clientY;
            if (cinematicos == 6) {
                imgCinema[0][imgCinema[5]] = [mouse[1],mouse[0],1];
                imgCinema[5] = (imgCinema[5] + 1)%imgCinema[0].length;
            }
            else if (edition == 1) casePencil = Painter.case(Map,mouse[1],mouse[0]);
        }
    );
    document.addEventListener(
        "keydown",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            keyDown(event.key);
            //if (cinematicos != 0) return;

        }
    );
    document.addEventListener(
        "keyup",
        function (event){
            event.preventDefault();
            event.stopPropagation();
            resize();
            keyUp(event.key);
        }
    );
    window.addEventListener("gamepadconnected", function(e) {
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                    e.gamepad.index, e.gamepad.id,
                    e.gamepad.buttons.length, e.gamepad.axes.length);
        gamePadF = usualGamePad;
        gamePads = e.gamepad;
        console.log(gamePads);
        alert("Vous avez connecté une manette de jeu à votre ordinateur. Vous pouvez bien sûr utiliser cette manette pour jouer. En fait non parce que j'ai la flemme de finir l'écriture de cette fonction gamepad.");
    });
    window.addEventListener("gamepaddisconnected", function(e) {
        console.log("Gamepad disconnected from index %d: %s",
                    e.gamepad.index, e.gamepad.id);
        gamePadF = videAsFuck;
    });
    backg.wavesPlenish();
    precharge();
}

function gamePadF(){
    // Ceci est une fonction vide servant de fonction factice
}

function animation(){
    // C'est la boucle principale du jeu. Elle sert à redistribuer les rôles entre toutes les fonctions d'affichage
    if (cinematicos == 1) cIntro();
    else if (cinematicos == 2) cReveil();
    else if (cinematicos == 11) cAutoCine();
    else if (cinematicos == 3) cShootOut();
    else if (cinematicos == 4) cMask();
    else if (cinematicos == 5) cEnlevement();
    else if (cinematicos == 6) cPencil();
    else if (cinematicos == 7) cWaterRaise();
    else if (cinematicos == 8) cTitre();
    else if (cinematicos == 9) cMerchant();
    else if (cinematicos == 10) cDeath();
    else {
        fondfond.src = "images/menu5.png";
        fondfond.onload = function(){};
        if (out == 4) alert("Utilisez les flèches pour vous déplacer et la barre espace pour interagir avec la case en face de vous ou faire disparaître ce message. Allez parler au visage du developpeur pour plus d'infos.");
        ctx.globalAlpha = 1;
        /*
        let FPS = {
            lastTime: 0,
            nbFrames: 0,
            fps: document.getElementById('FPS')
        };
        */
        let f = function(t) {
            // Calcul des FPS.
            /*
            if( FPS.lastTime === 0 ) {
                FPS.lastTime = t;
                FPS.nbFrames = 0;
            } else {
                FPS.nbFrames++;
                if( FPS.nbFrames == 16 ) {
                    FPS.fps.textContent = Math.floor(.5 + 16000 / (t - FPS.lastTime));
                    FPS.lastTime = t;
                    FPS.nbFrames = 0;
                }
            }
            */
            
            try {
                //let loops = 1;
                //while( loops --> 0 ) {
                if (onSea == 0) {action(t); draw();gamePadF();}
                else if (onSea == 1){sail(t);gamePadF();}
                else if (onSea == 2) {drawSea();gamePadF();}
                else if (onSea == 4) {drawInvent();gamePadF();}
                else if (onSea == 5) {TPisland();gamePadF();}
                else if (onSea == 6) {Help();gamePadF();}
            } catch(e){console.error(e);}
            if (cinematicos == 0) window.requestAnimationFrame(f);
            else {
                animation();
            }
        };
        window.requestAnimationFrame(f);
    }
}

function hitEnnemis(n,degat,sens){

}

