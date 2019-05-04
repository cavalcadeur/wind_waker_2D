// Fichier destiné aux cinématiques faites in game par le moteur de jeu à partir de listes d'instructions.
// Le tout pour permettre la création d'un éditeur de cinématique plus tard.

let cTime = 0;

function cAutoCine(cinema){
    // la variable cinema est une liste. Le premier élément est le setup. Il permet de déterminer où se passera l'action. Les autres éléments sont les évenements de la cinematique.

    cTime = 0;


    let ff = function(t){
        cTitreFond(); // Dessine l'île tout ce qu'il y a de plus normal
        window.requestAnimationFrame(ff);

    };
    window.requestAnimationFrame(ff);
}
