
// Le fichier save sert à enregistrer la partie et aussi à la charger.
// Il contient les fonctions save() et unSave()


function save(){
    figer = 1;
    alert("Sauvegarde en cours, cela peut prendre du temps mais pas toujours. Tout dépends du ressenti que vous en avez et de la réelle longueur du chargement. Parce que mine de rien, il y en a des choses à sauvegarder dans ce jeu. Surtout si vous avez eu l'aimable sauvagerie de couper toutes les herbes ou de défigurer mes jolies petites îles avec le pinceau.");
    var ilesDif = [];
    var i = 0;
    for(var key in iles){

        ilesDif[i] = [key,[],[]];
        savedMap[key].obj.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f.length != iles[key].obj[y][x].length) {ilesDif[i][1].push([y,x,iles[key].obj[y][x]]);}
                        else {
                            for (var j = 0;j<f.length;j++){
                                if (f[j] != iles[key].obj[y][x].length) {ilesDif[i][1].push([y,x,iles[key].obj[y][x]]); j = 6660000;}
                            }
                        }
                    }
                );
            }
        );
        savedMap[key].alti.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != iles[key].alti[y][x]) ilesDif[i][2].push([y,x,iles[key].alti[y][x]]);
                    }
                );
            }
        );
        i ++;
    }
    var ilesDifHouse = [];
    var i = 0;
    for(var key in interieurs){
        ilesDifHouse[i] = [key,[],[]];
        savedHouseMap[key].obj.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != interieurs[key].obj[y][x]) ilesDifHouse[i][1].push([y,x,interieurs[key].obj[y][x]]);
                    }
                );
            }
        );
        savedHouseMap[key].alti.forEach(
            function(e,y){
                e.forEach(
                    function(f,x){
                        if (f != interieurs[key].alti[y][x]) ilesDifHouse[i][2].push([y,x,interieurs[key].alti[y][x]]);
                    }
                );
            }
        );
        i ++;
    }
    var whereAmI = [out,goto];
    window.localStorage.setItem("whereAmI",JSON.stringify(whereAmI));
    window.localStorage.setItem("ilesDif",JSON.stringify(ilesDif));
    window.localStorage.setItem("ilesDifHouse",JSON.stringify(ilesDifHouse));
    window.localStorage.setItem("heros",JSON.stringify(heros));
    window.localStorage.setItem("quests",JSON.stringify(quests));
    window.localStorage.setItem("questObj",JSON.stringify(questObj));
    window.localStorage.setItem("objInvent",JSON.stringify(objInvent));
    window.localStorage.setItem("boatPosition",JSON.stringify(boatPosition));
    window.localStorage.setItem("nPas",JSON.stringify(nPas));
    alert("Sauvegarde terminée. J'espère que ce n'était pas trop long.");
    figer = 1;
}

function unSave(){
    window.localStorage.setItem("ilesDif",JSON.stringify(-1));
    window.location.reload();
}
