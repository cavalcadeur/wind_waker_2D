// Ce fichier contient toutes les fonctions qui forcent les personnages joueurs à agir
// Il y a ici followPath()

function followPath(n){
    // followPath() permet de faire bouger le joueur n. Chaque joueur est équipé en interne d'une liste de direction. followPath() prend la première et fais marcher le joueur dans cette direction. A la fin de l'animation de déplacement, cette fonction peut être rappellée pour continuer le mouvement
    if (heros[n].toGo.length > 0){
        var direction = heros[n].toGo.shift();
        heros[n].delay = 0; // On enleve le delai de changement de direction au cas où le joueur combine clavier et souris
        heros[n].sens = direction;  // On met le heros dans le bon sens.
        move(direction,n);  // On lance le deplacement.
    }
}
