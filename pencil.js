// Ce fichier contient les fonctions utiles au pinceau
// Il y a ici pencil() et expandIsland()

function pencil(x,y,action){
    if (action == "sky") action = 1;
    else if (action == "sky1") action = -1;
    else if (action == "sky2") action = 0.2;
    else if (action == "sky3") action = -0.2;
    //x = Math.floor(x-scrollX);
    //y = Math.floor(y-scrollY);
    //    if (x < 0 | y < 0 | x > (niveau[0].length)*50 | y > (niveau.length)*50) return;
    let coor = Painter.case(Map,x,y);
    if (coor[0] == "ah") return;
    if (editPlate == 2){
        if (Math.abs(coor[0]-pressurePlate[3]) > Math.abs(coor[1] - pressurePlate[4])){
            if (coor[0] > pressurePlate[0]){
                var ss = 2;
            }
            else var ss = 0;
        }
        else{
            if (coor[1] > pressurePlate[1]){
                var ss = 1;
            }
            else var ss = 3;
        }
        Map.setObject(pressurePlate[1],pressurePlate[0],ss,pressurePlate[2]);
        editPlate = 0;
    }
    else if (editPlate == 1 && action != "return"){
        editPlate = 0;
        if (action == 1 || action == -1 || action == 0.2 || action == -0.2){
            Map.setObject(pressurePlate[1],pressurePlate[0],coor[1],pressurePlate[2]+1);
            Map.setObject(pressurePlate[1],pressurePlate[0],coor[0],pressurePlate[2]+2);
            Map.setObject(pressurePlate[1],pressurePlate[0],action,pressurePlate[2]+3);
        }
        else if (action == "delete"){
            Map.setObject(pressurePlate[1],pressurePlate[0],coor[1],pressurePlate[2]+1);
            Map.setObject(pressurePlate[1],pressurePlate[0],coor[0],pressurePlate[2]+2);
            Map.setObject(pressurePlate[1],pressurePlate[0],"",pressurePlate[2]+3);
        }
        else if (editM == 1){
            Map.setObject(pressurePlate[1],pressurePlate[0],coor[1],pressurePlate[2]+1);
            Map.setObject(pressurePlate[1],pressurePlate[0],coor[0],pressurePlate[2]+2);
            Map.setObject(pressurePlate[1],pressurePlate[0],"monstre",pressurePlate[2]+3);
            Map.setObject(pressurePlate[1],pressurePlate[0],action,pressurePlate[2]+4);
        }
        else{
            Map.setObject(pressurePlate[1],pressurePlate[0],coor[1],pressurePlate[2]+1);
            Map.setObject(pressurePlate[1],pressurePlate[0],coor[0],pressurePlate[2]+2);
            Map.setObject(pressurePlate[1],pressurePlate[0],action,pressurePlate[2]+3);
            if (action == "plate" || action == "switch2"){
                editPlate = 1;
                pressurePlate[2] += 3;
            }
            else if (action == "main0" || action == "main1"){
                Map.setObject(pressurePlate[1],pressurePlate[0],50,pressurePlate[2]+4);
                editPlate = 2;
                pressurePlate[2] += 5;
                pressurePlate[3] = coor[0];
                pressurePlate[4] = coor[1];
                return;
            }
        }
    }
    else {
        if (action == 1 || action == -1 || action == 0.2 || action == -0.2){
            var altiZ = Map.getAlti(coor[1],coor[0]);
            if (altiZ + action > -2) Map.setAlti(coor[1],coor[0],Math.round((altiZ + action)*10)/10,undefined,true);
        }
        else if (action == "expand" || action == "deExpand"){
            // Dans ce cas là on veut faire monter 5 cases d'un coup. Pour des raisons de maniabilité, on ne fait monter les cases adjacentes que si elles sont plus basses que celles du centre.
            let upping = 1;
            if (action == "deExpand") upping = -1;
            let altiZ = Map.getAlti(coor[1],coor[0]);
            if (altiZ + upping > -2){
                Map.setAlti(coor[1],coor[0],Math.round((altiZ + upping)*10)/10,undefined,true);
                for (let i = 0; i < vecteurs.length; i ++){
                    if (Map.getAlti(coor[1] + vecteurs[i][1],coor[0] + vecteurs[i][0]) * upping <= altiZ * upping){
                        Map.setAlti(coor[1] + vecteurs[i][1],coor[0] + vecteurs[i][0],Math.round((altiZ + upping)*10)/10,undefined,true);
                    }
                }
            }
        }
        else if (action == "eraseAll"){
            Map.eraseAll();
            console.log("------------------------------------------------------------------------------------------------");
        }
        else if (action == "fill" || action == "deFill"){
            let alti = Map.getAlti(coor[1],coor[0]);
            let upping = 1;
            if (action == "deFill") upping = -1;
            fillEdit(coor[1],coor[0],alti,upping,30,coor[1],coor[0]);
        }
        else if (action == "delete"){
            if (editNs[1] == 0){
                ennemis.forEach(
                    function(e,i){
                        if (Math.round(e.x) == coor[1] && Math.round(e.y) == coor[0]){
                            ennemis.splice(i,1);
                        }
                    }
                );
            }
            else {
                var cObj = Map.getObject(coor[1],coor[0]);
                if ((editArray[sideEdit[editNs[1]]][editNs[3]] == "passerelle0" || editArray[sideEdit[editNs[1]]][editNs[3]] == "passerelle1" || editArray[sideEdit[editNs[1]]][editNs[3]] == "passerelle2" || editArray[sideEdit[editNs[1]]][editNs[3]] == "passerelle3") && (cObj[0] == "passerelle0" || cObj[0] == "passerelle1" || cObj[0] == "passerelle2" || cObj[0] == "passerelle3")){
                    Map.replaceObject(coor[1],coor[0],cObj[1]-1,1);
                }
                else {
                    if (cObj[0] == "pont" || cObj[0] == "plate" || cObj[0] == "switch2") Map.replaceObject(coor[1],coor[0],[""],true);
                    else Map.suppressObject(coor[1],coor[0],0);
                }
            }
        }
        else if (editNs[1] == 0){
            //ennemis.push([coor[1] + 0.5,coor[0] + 0.5,editObject[out][i + editNs[2]*10][1],2]);
            findEnnemy(editObject[out][editNs[3]][0],ennemis.length,coor[1] + 0.5,coor[0] + 0.5,2);
        }
        else if (action == "mark"){
            // Le marquage est à reréflechir
            /*
            console.log(goto);
            var lol = markedLevels.find(
                function(elem){
                    return elem[0] == goto;
                }
            );
            if (lol == undefined) markedLevels.push([goto,out]);
             */
        }
        else if (action == "fastTravel"){
            /*
            teleport = [-1,-1];
            onSea = 5;
            islandData = {out:1,ileSet:0,x:0,y:0,select:0};
             */
        }
        else if (action == "GPS"){
            alert("Position en x : " + coor[1] + " Position en y : " + coor[0]);
        }
        else if (action == "tele"){
            let cObj = Map.getObject(coor[1],coor[0]);
            let truck = cObj[0];
            let outYY = parseInt(prompt("Id de l'environnement (entre 0 et 9)   (Attention : si vous n'êtes pas le devellopeur de ce jeu, mettez simplement 1 puis ocean puis 15 puis 15)"));
            let gotoYY = prompt("Nom de la map.");
            let xYY = parseInt(prompt("Position en x"));
            let yYY = parseInt(prompt("Position en y"));
            if (truck == "house0" || truck == "house1" || (truck == "spe4" && out == 1) || truck == "tele"){
                Map.replaceObject(coor[1],coor[0],[truck,outYY,gotoYY,xYY,yYY],true);
            }
            else Map.replaceObject(coor[1],coor[0],["teleport",outYY,gotoYY,xYY,yYY],true);
        }
        else if (action == "passerelle0" || action == "passerelle1" || action == "passerelle2" || action == "passerelle3"){
            var cObj = Map.getObject(coor[1],coor[0]);
            if (cObj[0] == "passerelle0" || cObj[0] == "passerelle1" || cObj[0] == "passerelle2" || cObj[0] == "passerelle3"){
                Map.replaceObject(coor[1],coor[0],cObj[1] + 1,1);
            }
            else Map.replaceObject(coor[1],coor[0],[action,2],true);
        }
        else{
            Map.setObject(coor[1],coor[0],action,0);
            if (action == "lambda0"){
                var dia = prompt("Que doit dire ce PNJ ?");
                if (dia == undefined) dia = "";
                Map.replaceObject(coor[1],coor[0],["PNJ","pancarte",[[dia],[dia]]],true);
            }
            else if (action == "house0"){
                Map.replaceObject(coor[1],coor[0],["house0"],true);
                /*
                teleport = [coor[0],coor[1]];
                onSea = 5;
                islandData = {out:1,ileSet:0,x:0,y:0,select:0};
                 */
            }
            else if (action == "main0"){
                Map.replaceObject(coor[1],coor[0],["main0",50],true);
                editPlate = 2;
                pressurePlate = [coor[0],coor[1],2,coor[0],coor[1]];
            }
            else if (action == "main1"){
                Map.replaceObject(coor[1],coor[0],["main1",50],true);
                editPlate = 2;
                pressurePlate = [coor[0],coor[1],2,coor[0],coor[1]];
            }
            if (action == "plate" || action == "switch2"){
                editPlate = 1;
                pressurePlate = [coor[0],coor[1],0];
            }
        }
    }
}

function fillEdit(x,y,alti,upping,lim,oriX,oriY){
    if (Map.getAlti(x,y) == alti && (Math.abs(oriX - x) + Math.abs(oriY - y)) < lim){
        Map.setAlti(x,y,Math.round((alti + upping)*10)/10,undefined,true);
        for (let i = 0; i < vecteurs.length; i ++){
            fillEdit(x + vecteurs[i][1],y + vecteurs[i][0],alti,upping,lim,oriX,oriY);
        }
    }
}

function expandIsland(){
    // Cette fonction n'a strictement aucun interêt
}

