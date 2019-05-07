// Le fichier save sert à enregistrer la partie et aussi à la charger.
// Il contient les fonctions save() unSave() et loadGame()
// Il contient les fonctions auxiliaires rangeEnnemies() et remetsEnnemies()

var mapState = {};

function save(){
    
    rangeEnnemies();
    
    mapState = Map.stringToState(mapState);

    remetsEnnemies();
    
    let result = {"heros":JSON.stringify(heros),"map":JSON.stringify(mapState),"where":Map.where(),"out":out};
    
    result = JSON.stringify(result);

    let nowadays = new Date(Date.now());
    nowadays =
        nowadays.getFullYear() + "-" +
        nowadays.getMonth() + "-" +
        nowadays.getDate() + "-" +
        nowadays.getHours() + "-" +
        nowadays.getMinutes();
     
    SaveAs(new Blob([result]),"Cavalcade_" + nowadays + ".txt");
}

function saveCurrentMap(){
    
    rangeEnnemies();
    
    mapState = Map.stringToState(mapState);

    remetsEnnemies();
    
    let result = mapState[Map.where()];

    let nowadays = new Date(Date.now());
    nowadays =
        nowadays.getFullYear() + "-" +
        nowadays.getMonth() + "-" +
        nowadays.getDate() + "-" +
        nowadays.getHours() + "-" +
        nowadays.getMinutes();
     
    SaveAs(new Blob([result]),"Cavalcade_Map_"+ Map.where() + "_" + nowadays + ".txt");
}

function unSave(){
    window.localStorage.setItem("ilesDif",JSON.stringify(-1));
    window.location.reload();
}

function loadGame(){
    // Fonction qui crée le bouton utile pour charger une partie.
    
    var input = document.getElementById("input");
    input.className = 'show';

    
    input.addEventListener('change', function(evt) {
        console.log(evt);
        canvas.style.display = "block";
        //workCa.style.display = "block";
        var files = evt.target.files;
        var file = files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        
        reader.onload = function() {
            input.className = ' ';
            var res = JSON.parse(reader.result);
            heros = JSON.parse(res.heros);
            mapState = JSON.parse(res.map);
            heros[0].anim = nonifiant;
            heros[1].anim = nonifiant;
            goToLevel(res.out,res.where,heros[0].x,heros[0].y,heros[1].x,heros[1].y);
            imgCinema[1] = "go";
        };
    });
}

function rangeEnnemies(){
    for(var i = ennemis.length-1;i >= 0;i-=1){
        var ranger = ennemis[i].takeBack();
        Map.addEnnemy(ranger);
        ennemis.splice(i,1);
    }
}

function remetsEnnemies(){
    for(var y = scrollCaseY;y < scrollCaseY + nCasesY;y++){
        for(var x = scrollCaseX; x < scrollCaseX + nCasesX ;x++){
            let cell = Map.getCell(x,y);
            if (cell[3].length > 0){
                cell[3].forEach(
                    function (e,i){
                        findEnnemy(e[2],ennemis.length,e[0],e[1],e[3]);
                    }
                );
                Map.clearEnnemy(x,y);
            }
        }
    }
}
