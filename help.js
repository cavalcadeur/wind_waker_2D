// Fichier qui gère le menu d'aide et de reparamétrage des touches.

function helpPencil(name){
    let listeHP = {"gear":"Le sous-menu engrenage contient des objets comme les interrupteurs.","loot":"Le sous-menu loot contient les rubis, trésors et objets.","outDoor":"Le sous-menu exterieur contient les arbres et les maisons ainsi que les herbes.","inDoor":"Le sous-menu d'interieur contient les décorations pour l'interieurs des maisons.","monsters":"Le sous-menu monstres contient les monstres. Wow mind blow !!!","sky":"Le sous-menu sky contient les objets qui sont dans le ciel ! Les éoliennes tout ça ...","fireTemple":"Le sous-menu temple du feu contient les objets qui décorent le temple du feu.","special":"Le sous-menu special contient les objets spécifiques à la teleportation. Le teleporteur, le fast travel, le marquage...","lambda0":"Cette outil permet de placer un PNJ sur la carte.","tele":"C'est un teleporteur invisible. Quand un personnage monte dessus, il est teleporté à l'endroit choisi. Cliquer sur une case teleporteur ou maison avec cet outil permet de changer sa destination.","coffre2":"Le coffre invisible cache les objets en dessous. Il est supprimé quand tous les monstres de la pièce sont morts, dévoilant ce qui se cache en dessous.","fastTravel":"L'outil fusée ou fastTravel permet d'aller vers n'importe qu'elle endroit préalablement marqué. Pointer vers une île nouvelle revient à annuler le fastTravel.","plate":"Un interrupteur. Après avoir placé l'interrupteur, un rond noir apparaît. Il faut alors placer un autre objet qui apparaîtra quand l'interrupteur sera activé."};
    if (listeHP[name] != undefined)alert(listeHP[name]);
    else{
        alert("Il n'y a pas d'aide pour cette objet.");
    }
}

let helpKeyPos;

function Help(){
    
    helpKeyPos = [[200,320],[300,420],[200,520],[100,420],[295,210],[295,250],[80,210],[W-200,320],[W-100,420],[W-200,520],[W-300,420],[W-90,210],[W-90,250]];

    ctx.fillStyle = colors[0];
    ctx.fillRect(0,0,W,H);
    backDraw();
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "30px purisa";
    ctx.textAlign = "left";
    ctx.fillText("Joueur 1",20,50);
    ctx.textAlign = "right";
    ctx.fillText("Joueur 2",W-20,50);
    ctx.drawImage(imgMenu[heros[0].invent[heros[0].objet]],270,120);
    ctx.drawImage(imgMenu[heros[0].prim],60,120);
    ctx.drawImage(imgMenu[heros[1].invent[heros[1].objet]],W-110,120);
    ctx.font = "20px purisa";
    ctx.textAlign = "center";
    for (let j = 0; j < 2; j ++){
        for (let i = 0; i < 7-j;i ++){
            writeKey(heros[j].touche[i],helpKeyPos[i + j*7][0],helpKeyPos[i + j*7][1]);
        }
    }
    ctx.font = "25px purisa";
    ctx.fillText("i : inventaire",W/2,200);
    ctx.fillText("a : ouvrir/fermer l'aide",W/2,300);
}

function clickHelp(){
    console.log(rigolote);
    if (rigolote[0] != -1) return;
    for (let j = 0; j < 2; j ++){
        for (let i = 0; i < 7-j;i ++){
            if (Math.abs(mouse[1] - helpKeyPos[i + j*7][0]) <= 40 && Math.abs(mouse[0] - helpKeyPos[i + j*7][1]) <= 20){
                rigolote = [j,i];
            }
        }
    }
    if (rigolote[0] != -1) alert("Veuillez appuyer sur la touche que vous voulez assigner à cette action.");
}

function toucheHelp(key){
    if (rigolote[0] == -1){
        if (key == "a") onSea =  0;
        return;
    }
    else if (key == "a" || key == "i"){
        alert("Cette touche est l'une des trois touches maudites qui ne doivent pas être modifiées par le joueur sous peine de voir la terre disparaître.");
    }
    else{
        heros[rigolote[0]].touche[rigolote[1]] = key;
        rigolote = [-1,-1];
        disalert();
    }
}

function writeKey(key,x,y){
    if (key == " ") key = "SpaceBar";
    if (Math.abs(mouse[1] - x) <= 40 && Math.abs(mouse[0] - y) <= 20){
        ctx.fillStyle = "rgb(0,0,0)";
    }
    ctx.fillText(key,x,y);
    ctx.fillStyle = "rgb(255,255,255)";
}
