function findPath(x,y,z,xx,yy,h){
    var distLimit = 30;
    var listeA = [[x,y,z,0,0]];
    var listeB = [];
    var vecteurs = [[-1,0],[0,1],[1,0],[0,-1]];
    var ii = 0;
    while (listeA.length > 0){
        var actu = listeA.shift();
        if (actu[0] == xx && actu[1] == yy){
            //fin ! le chemin a été trouvé
            listeB.push(actu);
            //alert("phase finale du processus !");
            return findFinal(listeB);
        }
        //addParticles("flower",actu[0],actu[1],actu[2],0,0,40);
        for(var i = 0;i<4;i++){
            var nx = actu[0] + vecteurs[i][1];
            var ny = actu[1] + vecteurs[i][0];
            var nz = Map.getFloor(nx,ny,actu[2]);
            if (h >= Math.abs(Map.getFloor(actu[0],actu[1],actu[2]) - nz) && nz > -1){
                var elment = [nx,ny,nz,actu[3] + 1];
                if (findIdentique(elment,listeA) == false && findIdentique(elment,listeB) == false){
                    elment[4] = elment[3] + findDistance(nx,ny,xx,yy);
                    elment[5] = ii;
                    if (elment[4] < distLimit){
                        listeA = findAddElem(listeA,elment);
                    }
                }
            }
        }
        listeB.push(actu);
        ii += 1;
    }
    return [];
}

// actu : [x , y , z , n d'etape , cout total , index etrange]

function findAddElem(liste,e){
    // On effectue une dichotomie pour placer correctement l'element e dans la liste
    if (liste.length == 0) {
        liste.push(e);
        return liste;
    }
    var a = 0;
    var b = liste.length-1;
    var c;
    while (b-a > 1){
        c = Math.floor((a+b)/2);
        if (liste[c][4] > e[4]) b = c;
        else if (liste[c][4] < e[4]) a = c;
        else {
            a = c;
            b = c;
        }
    }
    if (e[4] < liste[a][4]) liste.splice(a,0,e);
    else liste.splice(a + 1,0,e);
    return liste;
}


function findBestEle(liste){
    var r = 0;
    var record = liste[0][4];
    liste.forEach(
        function(e,i){
            if (e[4] >= record){
                r = i;
                record = e[4];
            }
        }
    );
    return r;
}

function findIdentique(elem,liste){
    var hey = 0;
    liste.forEach(
        function (e){
            if (e[0] == elem[0] && e[1] == elem[1]){
                if (e[3] < elem[3]) {
                    hey = 1;
                    return true;
                }
            }
        }
    );
    if (hey == 0) return false;
    else return true;
}

function findDistance(x,y,xx,yy){
    return Math.abs(yy-y) + Math.abs(xx-x);
}

function findFinal(liste){
    var result = [];
    var p = liste.length - 1;
    while (p > 0){
        result.push(liste[p]);
        p = liste[p][5];
    }
    return result;
}
