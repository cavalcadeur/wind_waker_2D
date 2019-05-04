// Ce fichier permet de déterminer les couleurs d'affichage en fonction de l'heure et de l'endroit.

function setColors(oo,hour){
    let rMod = 1; let gMod = 1; let bMod = 1;
    if (hour == "nuit"){
        rMod = 0.55; gMod = 0.55; bMod = 0.55;
    }
    else if (hour == "crepuscule"){
        rMod = 1.4; gMod = 0.65; bMod = 0.55;
    }
    else if (hour == "noir"){
        rMod = 0.05; gMod = 0.05; bMod = 0.05;
    }
    colors[0] = "rgb(" + Math.round(colorSet[oo][3][0]*rMod) + "," + Math.round(colorSet[oo][3][1]*gMod) + "," + Math.round(colorSet[oo][3][2]*bMod) + ")";
    colors[1] = "rgb(" + Math.round(colorSet[oo][0][0]*rMod) + "," + Math.round(colorSet[oo][0][1]*gMod) + "," + Math.round(colorSet[oo][0][2]*bMod) + ")";
    colors[2] = "rgb(" + Math.round(colorSet[oo][1][0]*rMod) + "," + Math.round(colorSet[oo][1][1]*gMod) + "," + Math.round(colorSet[oo][1][2]*bMod) + ")";
    //colors[3] = colorSet[oo][2];
    colors[3] = [Math.round(colorSet[oo][2][0]*rMod),Math.round(colorSet[oo][2][1]*gMod),Math.round(colorSet[oo][2][2]*bMod),colorSet[oo][2][3],colorSet[oo][2][4],colorSet[oo][2][5]];
    //Map.updateGroundTotal();
}
