function clicSword(x,y){
    var distM = Math.abs(x-heros[1].x) + Math.abs(y-heros[1].y);
    if (distM == 1){
        if (x > heros[1].x) heros[1].sens = 1;
        else if (x < heros[1].x) heros[1].sens = 3;
        else{
            if (y > heros[1].y) heros[1].sens = 2;
            else if (y < heros[1].y) heros[1].sens = 0;
        }
        chooseAnimObject(1);
        attack(1);
    }
    return distM;
}


function GPS(x,y){
    // Sert à afficher avec précision les coordonnées d'une case en cliquant dessus
    
    if (y == "ah") return;
    alert(x + " ; " + y);
    let a = -1;
    return a;
}

function clicPlayerTwo(x,y,heros){
    x = Math.floor(x-scrollX);
    y = Math.floor(y-scrollY);
    var coor = Painter.case(Map,x,y);
    x = coor[1];
    y = coor[0];
    var z = Map.getFloor(x,y,heros[1].z);
    if (y == "ah") return;
    var dist = 0;
    if (heros[1].invent[heros[1].objet] == "sword") dist = clicSword(x,y);
    if (heros[1].invent[heros[1].objet] == "GPS") dist = GPS(x,y);
    else dist = Math.abs(x-heros[1].x) + Math.abs(y-heros[1].y);
    if (dist > 1 && z > -1){
        var path = findPath(heros[1].x,heros[1].y,heros[1].z,x,y,1);
        // Path n'est malheureusement qu'une liste de coordonnées ma foi fort sympathique mais il nous faut la changer en liste de direction
        path = path.reverse();
        path = pathToDirection(heros[1].x,heros[1].y,path);
        heros[1].toGo = path;
        followPath(1);
    }
}

function pathToDirection(x,y,path){
    // Cette fonction change une liste de coordonnées d'un chemin en une suite de direction à prendre en partant de x,y pour suivre le chemin.
    var result = [];
    path.forEach(
        function(e){
            var cursorX = e[0];
            while (cursorX - x != 0){  // Cette manoeuvre tordue à base de while sert à déterminer combien de fois il faut avancer pour atteindre la case voulue.
                if (cursorX > x){      // On répète l'opération ensuite avec les coordonnées en y.
                    cursorX -= 1;
                    result.push(1);
                }
                else {
                    cursorX += 1;
                    result.push(3);
                }
            }
            
            var cursorY = e[1];
            while (cursorY - y != 0){  
                if (cursorY > y){      
                    cursorY -= 1;
                    result.push(2);
                }
                else {
                    cursorY += 1;
                    result.push(0);
                }
            }

            x = e[0];  // Maintenant que l'on a réussi à avancer à la case suivante, on n'oublie pas de réinitialiser les x et y pour calculer les directions à partir de la case nouvellement atteinte.
            y = e[1];  
        }
    );
    return result;
}
