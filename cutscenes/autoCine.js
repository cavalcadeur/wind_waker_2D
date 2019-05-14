// Fichier destiné aux cinématiques faites in game par le moteur de jeu à partir de listes d'instructions.
// Le tout pour permettre la création d'un éditeur de cinématique plus tard.

let cTime = 0;
let cGlobalCine = [];

/* Forme générale des cinematiques en format liste.

1er terme :
 Le setup contient tout ce qu'il faut pour le goto. Donc : [out,name,x1,y1,x2,y2,timeOfDay] 

 Une action se découpe comme suit : [tempsAttente,typeAction, autres paramètres... ]


*/

function cAutoCine(){
    // la variable cGlobalcinema est une liste. Le premier élément est le setup. Il permet de déterminer où se passera l'action. Les autres éléments sont les évenements de la cinematique.

    cTime = 0;

    // Initialisation de la cinematique

    goToLevel(cGlobalCine[0][0],cGlobalCine[0][1],cGlobalCine[0][2],cGlobalCine[0][3],cGlobalCine[0][4],cGlobalCine[0][5]);
    
    setColors(cGlobalCine[0][0],cGlobalCine[0][6]);
    Map.updateGroundTotal();

    let iAction = 1;
    let playing = true;
    let focus = false;
    
    let ff = function(t){
        cTitreFond(); // Dessine l'île tout ce qu'il y a de plus normal
        if (playing) action(t);
        if (focus != false) {
            Painter.scrollCenter(focus[0],focus[1],focus[2],W,H);
        }
        
        
        if (alerting == 0) cTime += 1;
        if (cTime >= cGlobalCine[iAction][0]){
            cTime = 0;
            
            if (cGlobalCine[iAction][1] == "freeze") playing = false;
            else if (cGlobalCine[iAction][1] == "unFreeze") playing = true;
            else if (cGlobalCine[iAction][1] == "focusCamera"){
                focus = [cGlobalCine[iAction][2],cGlobalCine[iAction][3],cGlobalCine[iAction][4]];
            }
            else if (cGlobalCine[iAction][1] == "unFocusCamera"){
                focus = false;
            }
            else cDoAutoAct(cGlobalCine[iAction]);
            
            iAction += 1;
        }
        if (iAction < cGlobalCine.length) window.requestAnimationFrame(ff);
        else {
            // Pour le moment on ne mets pas de précisions sur la fin de la cinématique. Ce sera fait plus tard.
            cinematicos = 0;
            animation();
        }
    };
    window.requestAnimationFrame(ff);
}

function cDoAutoAct(act){
    if (act[1] == "findPath"){
        
        // findPath est de la forme : [t,type, heros, x, y]

        let i = act[2];
        let path = findPath(heros[i].x,heros[i].y,heros[1].z,act[3],act[4],1);
        path = path.reverse();
        path = pathToDirection(heros[i].x,heros[i].y,path);
        heros[i].toGo = path;
        followPath(i);
    }
    else if (act[1] == "followPath"){
        heros[act[2]].toGo = act[3];
        followPath(act[2]);
    }
    else if (act[1] == "particle"){

        // particle est de la forme : [t,type, type,x,y,z,g,n,lim,name,carry,sens,objType]
        
        addParticles(act[2],act[3],act[4],act[5],act[6],act[7],act[8],act[9],act[10],act[11],act[12]);
    }
    else if (act[1] == "goto"){
        goToLevel(act[2],act[3],act[4],act[5],act[6],act[7]);
    }
}
