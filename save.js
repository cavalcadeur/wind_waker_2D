// Le fichier save sert à enregistrer la partie et aussi à la charger.
// Il contient les fonctions save() unSave() et loadGame()

var mapState = {};

function save(){
    mapState = Map.stringToState(mapState);
    
    var result = {"heros":JSON.stringify(heros),"map":JSON.stringify(mapState),"where":Map.where(),"out":out};
    
    result = JSON.stringify(result);

    var nowadays = new Date(Date.now());
    nowadays = nowadays.getDate() + "-" +
        nowadays.getMonth() + "-" +
        nowadays.getFullYear() + "-" +
        nowadays.getHours() + "-" +
        nowadays.getMinutes();
     
    SaveAs(new Blob([result]),"Wind_Waker_2D_" + nowadays + ".txt");
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
