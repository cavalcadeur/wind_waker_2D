// Dans ce fichier on va mettre la classe Map qui permet d'obtenir toutes les infos concernant ce qu'il y a sur chaque case. Bien pratique quoi !

var Map = function(){
    var savedMap, savedHouseMap;
    var internIles,internHouse;
    var internData;
    var whereAmI = "void";
    var currentData;
    var out;
    var arbre;

    // OUTDATED
    var niveau,objNiveau;

    function concatDico(A,B){
        // Fonction qui rassemble deux dictionnaires en écrasant les éléments en double par les éléments de B qui sont donc prioritaires
        // inutile en l'état

        var liste = Object.entries(B);
        liste.forEach(
            function(e){
                A[e[0]] = e[1];
            }
        );
        
        return A;

        
    }

    function fillTree(data){
        if (data[0] == 1){
            arbre = new mapNode();
            arbre.init(data[1]);
            arbre.fill(data[2],data[3]);
        }
        else if (data[0] == 0){
            arbre = new mapElem();
            arbre.init(data[1],data[2]);
        }
    }
    
    return {

        // Fonctions de setup internes.
        
        init: function(iles,house){
            // Une fonction pour préparer les données internes
            
        },

        goOut: function(n){
            out = n;
        },

        where: function(){
            return whereAmI;
        },

        updateOutlines: function(){

        },

        stringToState: function(mapS){
         
            this.purifie();
            mapS[whereAmI] = this.getString();

            return mapS;
        },
        
        updateOutlinesCase: function(x,y,r){
            // Fonction qui permet de mettre à jour les contours d'une case en particulier avec recursion ou non
            // Structure de donnée pour les outline : [murs horizontaux,verticaux]

            // Bon on va commencer par calculer le plateau horizontal (de 0 à 15)
            
            var v = 0;
            var z = arbre.getAll(x,y)[1];
            if( arbre.getAll(x,y-1)[1] < z ) {
                v += 1;
            }
            if( arbre.getAll(x+1,y)[1] < z ) {
                v += 2;
            }
            if( arbre.getAll(x,y+1)[1] < z ) {
                v += 4;
            }
            if( arbre.getAll(x-1,y)[1] < z ) {
                v += 8;
            }

            // Et maintenant les murs verticaux
            var lineA = 0;
            var lineB = 0;
            var lineC = 0;

            if( arbre.getAll(x-1,y)[1] < z ) {
                if (arbre.getAll(x-1,y)[1] < -1) lineA = Math.min(z + 1,z - arbre.getAll(x,y+1)[1]);
                else lineA = Math.min(z - arbre.getAll(x-1,y)[1],z - arbre.getAll(x,y+1)[1]);
            }
            lineC = 0;
            if( arbre.getAll(x,y-1)[1] < z ) {
                if (arbre.getAll(x,y-1)[1] < -1) lineC = z + 1;
                else lineC = z - arbre.getAll(x,y-1)[1];
            }
            lineC = Math.min( lineC, Math.max( 0, z - Map.getAlti(x+1,y) ) );
   
            lineB = z + 1;
            if( arbre.getAll(x+1,y)[1] <= z ) {
                if (arbre.getAll(x+1,y)[1] < -1) lineB = z + 1;
                else lineB = z - arbre.getAll(x+1,y)[1];
            }
            else if(arbre.getAll(x+1,y)[1] >= z) lineB = 0;
            lineB = Math.min( lineB, z - arbre.getAll(x,y+1)[1] );

            var groundColor = "rgb(0,0,0)";
            if (z < -0.4){
                groundColor = "rgb(180,180,98)";
            }
            else {
                groundColor = "rgb("+Math.round(colors[3][0]+z*colors[3][3])+","+Math.round(colors[3][1]+z*colors[3][4])+","+Math.round(colors[3][2]+z*colors[3][5])+")";
            }

            
            var result = [v,[lineA,lineB,lineC],groundColor];

            arbre.setOutlines(x,y,result);

            if (r > 0){
                // Ok on a affaire à un appel recursif aux 4 voisins de la case. C'est parti
                var vect = [[0,1],[0,-1],[-1,0],[1,0]];
                for (var i = 0;i < 4;i++){
                    this.updateOutlinesCase(x + vect[i][0],y + vect[i][1],r - 1);
                }
            }

        },

        goto: function(where,mapS){
            // Fonction qui setup la classe pour un lieu en particulier
            

            whereAmI = where;
            
            if (mapS[where] == undefined){
                // On va chercher le fichier json qui nous interesse
                var requestURL = "data/maps/" + out + "/" + where + ".json";
                var request = new XMLHttpRequest();
                request.open("GET",requestURL);
                request.responseType = 'json';
                request.send();
                var that = this;
                request.onload = function(){
                    currentData = request.response;
                    // les données sont arrivées, alors là ça va se compliquer.
                    // On va créer notre arborescence à partir de ça.
                    fillTree(currentData);
                };
            }
            else{
                // On remarque que les données sont déjà dans mapState donc on les récupère là.
                fillTree(JSON.parse(mapS[where]));
            }
            return mapS;
        },
        
        load: function(){
            // fonction qui permet de garder une trace de l'état de la map au lancement du jeu.
            // A revoir plus tard.
        },

        // Acceder aux données internes au tableau.

        taille: function(){},

        purifie: function(){
            // Fonction qui regarde en détail l'arbre actuel et le purifie pour en faciliter l'usage et le stockage à l'avenir. C'est une opération coûteuse mais fort utile. C'est le fameux dilemne du temps de précalcul.
            // On commence tout simplement par enlever toutes les cases vides et tous les noeuds inutiles.
            var type = arbre.getType();
            if (type == 1){
                // Si l'arbre contient plusieurs éléments, on peut l'épurer
                var newOne = arbre.epure();
                arbre = newOne;
            }
            // Bon on a réussi à se débarasser de tous les noeuds et éléments inutiles. Réduisant ainsi l'arbre et donc facilitant le stockage et augmentant la vitesse générale de calcul.
        },

        isSolid: function(){},

        getFloor: function(x,y,z){
            // Cette fonction trouve l'altitude du sol juste en dessous de z.
            var cell = this.getCell(x,y);
            var workFloor = cell[0][0];
            if (workFloor == "passerelle0" || workFloor == "passerelle1" || workFloor == "passerelle2"){
                if (z+0.3 >= cell[1] + cell[0][1]) return cell[1] + cell[0][1];
                else return cell[1];
            }
            else{
                
                return cell[1] + taille(workFloor);
            }
        },

        superGetFloor: function(x,y,z){
            // Cette fonction trouve l'altitude du sol juste en dessous de z. Elle fonctionne avec tout type de coordonnées x et y (float ou en dehors des limites)
            x = Math.round(x);
            y = Math.round(y);
            return this.getFloor(x,y,z);
        },

        getObject: function(x,y,n){
            // Cette fonction renvoie l'élément n de la case x,y cependant si n == true alors la fonction renvoie la liste de tous les objets de la case
            var cell = this.getCell(x,y);
            if (n === true || n == undefined){
                return cell[0];
            }
            else{
                return cell[0][n];
            }
        },

        setObject: function(x,y,what,where){
            arbre.setObject("obj",x,y,what,where);
        },

        replaceObject: function(x,y,what,n){
            // Remplace si c'est possible l'élément n de la case par what
            arbre.setObject("objRep",x,y,what,n);
        },

        suppressObject: function(x,y,n){
            arbre.setObject("objSupp",x,y,"",n);
            /*
            if (1 == objNiveau[y][x].length) objNiveau[y][x][0] = "";
            else{
                objNiveau[y][x].splice(n,1);
            }
             */
        },

        addEnnemy: function(data){
            arbre.addEnnemy(Math.floor(data[0]),Math.floor(data[1]),data,"ennemy");
        },

        clearEnnemy: function(x,y,data){
            arbre.addEnnemy(x,y,data,"clearEnnemy");
        },

        addParticle: function(x,y,data){
            arbre.addEnnemy(x,y,data,"particle");
        },

        clearParticle: function(x,y,data){
            arbre.addEnnemy(x,y,data,"clearParticle");
        },

        getAlti: function(x,y){
            // Cette fonction renvoie l'altitude de la case x,y indépendamment des éléments posés dessus
            return arbre.getAll(x,y)[1];
        },

        setAlti: function(x,y,value,painter,replace){
            // Cette fonction remplace l'altitude au point x,y si replace == true sinon elle ajoute la valeur
            // Il faut bien se souvenir que cette fonction doit aussi pouvoir modifier une case qui pourtant est vide. Et oui !
            arbre.setObject("alti",x,y,value,replace);
            // Aussi comme l'altitude de la case a changé il faut la mettre à jour ainsi que ces voisines.
            this.updateOutlinesCase(x,y,1);
        },

        getCell: function(x,y){
            // Retourne la case entière à la position x y sous la forme [objets,alti,particles,ennemis,outline]
            return arbre.getAll(x,y);
        },

        // Import/export de données sous forme de texte.

        getString: function(where){
            // Cette fonction retourne sous forme de string les données de where.
            if (where || where == undefined){
                var ddata = arbre.getJSON();
            }
            return JSON.stringify(ddata);
        }

    };
}();

var mapNode = function(){
    // Un noeud a besoin d'un certain nombre de valeurs.
    // Tout d'abord sa valeur pivot
    var pivot = [0,0];
    
    // Ensuite on a besoin de savoir qui sont les enfants du noeud
    var children = []; // Il y a entre 2 et 4 enfants, un node avec 1 enfant est sans intérêt
    //  0 1
    //  2 3

    // On a maintenant le nombre d'éléments dans chaque branche fille
    var tailleBranche = []; // Il y a autant de valeurs ici que dans children

    return {

        // Fonctions du noeud

        init: function(value,taille){
            pivot = value;
            children = [new mapVide(),new mapVide(),new mapVide(),new mapVide()];
        },

        getType: function(){
            // Fonction bête qui renvoie 1 pour dire qu'il sagit d'un node ou 0 s'il s'agit d'un élément.
            return 1;
        },

        getAll: function(x,y){
            // Fonction qui récupère l'élément placé en x,y et le retourne.
            var branche = 0;
            if (x > pivot[0]) branche += 1;  // Ici on évalue la branche par rapport au noeud.
            if (y > pivot[1]) branche += 2;

            // On va ensuite interroger ce qu'il y a déjà dans cette branche
            var id = children[branche].getType();
            if (id == 1){  // La branche donne sur un autre noeud à qui on va pouvoir refiler le bébé sans se poser de question.
                return children[branche].getAll(x,y);
            }
            else if (id == 0){
                // Il y a un élément sur cette branche on lui demande de renvoyer l'élément en x,y.
                return children[branche].getAll(x,y);
            }
            var vide = new mapVide();
            return vide.getAll();
            
        },

        addElem: function(elem,equi){
            // Fonction qui ajoute l'élément elem en dessous du noeud en question
            var branche = 0;
            var posElem = elem.position();
            if (posElem[0] > pivot[0]) branche += 1;  // Ici on évalue la branche du nouvel élément par rapport au noeud.
            if (posElem[1] > pivot[1]) branche += 2;
           
            // On va ensuite interroger ce qu'il y a déjà dans cette branche
            var id = children[branche].getType();
            if (id == 1){  // La branche donne sur un autre noeud à qui on va pouvoir refiler le bébé sans se poser de question.
                children[branche].addElem(elem);
            }
            else if (id == 0){ // Il y a déjà un élément ici ! Aïe il va falloir faire de la place pour le nouvel élément
                var formerElem = clone(children[branche]);
                children[branche] = new mapNode();
                var newPivot = posElem;
                var formerPivot = formerElem.position();
                newPivot = [(newPivot[0] + formerPivot[0])/2,(newPivot[1] + formerPivot[1])/2];
                children[branche].init(newPivot); // On initialise notre noeud avec une valeur de pivot.
                children[branche].addElem(elem); // Et on refile le bébé à notre nouveau noeud à la con.
                children[branche].addElem(formerElem); // Sans oublier de lui remettre l'ancien element.
            }
            else { // Il n'y a rien d'important sur cette branche. On y place simplement notre élément.
                children[branche] = elem;
            }

            // On n'oublie pas de rééquilibrer l'arbre lors de la remontée de la recursion.
            if (equi || equi == undefined){
                this.equilibre();
            }
        },

        setObject: function(type,x,y,where,what){
            // Fonction qui refile le bébé à ceux en dessous de lui en les chargeant de modifier le noeud en x,y
            var branche = 0;
            if (x > pivot[0]) branche += 1;  // Ici on évalue la branche du nouvel élément par rapport au noeud.
            if (y > pivot[1]) branche += 2;

            // On doit ensuite vérifier que la case que l'on va modifier existe bien. Si elle n'existe pas il va falloir la créer ce qui peut s'averer compliqué. Bon déjà on vérifie si l'enfant est un noeud.

            var typeC = children[branche].getType();
            if (typeC == 0){ // On remarque qu'il s'agit d'un élément. On doit alors vérifier si ses coordonnées corespondent
                var posC = children[branche].position();
                if (posC[0] != x || posC[1] != y){
                    typeC = -1;
                }
            }
            
            if (typeC < 0){ // typeC < 0 : cela signifie que la case que l'on veut modifier n'existe pas encore ! On va devoir la créer.
                // D'abord on setup l'élément
                var e = new mapElem();
                e.init([x,y],[[""],-1,[],[],[]]);
                // Et après on l'ajoute.
                this.addElem(e);
            }

            children[branche].setObject(type,x,y,where,what);
        },

        addEnnemy: function(x,y,data,type){
            // Fonction qui refile le bébé à ceux en dessous de lui en les chargeant de modifier le noeud en x,y
            var branche = 0;
            if (x > pivot[0]) branche += 1;  // Ici on évalue la branche du nouvel élément par rapport au noeud.
            if (y > pivot[1]) branche += 2;

            // On doit ensuite vérifier que la case que l'on va modifier existe bien. Si elle n'existe pas il va falloir la créer ce qui peut s'averer compliqué. Bon déjà on vérifie si l'enfant est un noeud.

            var typeC = children[branche].getType();
            if (typeC == 0){ // On remarque qu'il s'agit d'un élément. On doit alors vérifier si ses coordonnées corespondent
                var posC = children[branche].position();
                if (posC[0] != x || posC[1] != y){
                    typeC = -1;
                }
            }
            
            if (typeC < 0){ // typeC < 0 : cela signifie que la case que l'on veut modifier n'existe pas encore ! On va devoir la créer.
                // D'abord on setup l'élément
                var e = new mapElem();
                e.init([x,y],[[""],-1,[],[],[]]);
                // Et après on l'ajoute.
                this.addElem(e);
            }

            children[branche].addEnnemy(x,y,data,type);
        },

        setOutlines: function(x,y,outline){
            // Fonction qui remplace l'outline de la case x,y par outline.
            var branche = 0;
            if (x > pivot[0]) branche += 1;  // Ici on évalue la branche du nouvel élément par rapport au noeud.
            if (y > pivot[1]) branche += 2;

            // On demande a l'objet en bout de branche de se charger de la requête lui même.
            children[branche].setOutlines(x,y,outline);
        },

        getJSON: function(){
            // Fonction qui renvoie le noeud dans son ensemble sous la forme d'une liste. Alors c'est un peu compliqué mais pourquoi pas.
            var result = [1,pivot,[]];
            children.forEach(
                function(e){
                    result[2].push(e.getJSON());
                }
            );
            return (result);
        },

        fill: function(child,taille){
            child.forEach(
                function(e,i){
                    if (e[0] == 1){
                        children[i] = new mapNode();
                        children[i].init(e[1]);
                        children[i].fill(e[2],e[3]);
                    }
                    else if (e[0] == 0){
                        children[i] = new mapElem();
                        children[i].init(e[1],e[2]);
                    }
                }
            );
        },

        epure: function(){
            // fonction qui épure le noeud et tous ceux en dessous de lui.
            var nVide = 0;
            for (var i = 0;i < 4; i++){
                var type = children[i].getType();
                if (type == 1){
                    var newOne = children[i].epure();
                    children[i] = newOne;
                }
                
                type = children[i].getType();
                if (type == 0){
                    var value = children[i].getAll();
                    if (value[1] <= -1 && value[0].length == 1 && value[0][0] == ""){
                        // Le noeud est un noeud vide on va donc s'en débarasser.
                        children[i] = new mapVide();
                    }
                }
                
                type = children[i].getType();
                if (type == -1){
                    nVide += 1;
                }
            }
            // On connaît maintenant le nombre de branches significatives sous ce noeud.
            if (nVide == 4){ // Il n'y a aucunes branches valables sous ce noeud
                return new mapVide();
            }
            else if (nVide == 3){ // Une seule branche est non vide, rien ne sert d'un noeud pour les départager.
                for (var i = 0;i < 4; i++){
                    if (children[i].getType() != -1) {
                        return clone(children[i]);
                    }
                }
            }
            return this;
        },

        getTaille: function(){
            // Fonction qui renvoie le nombre d'élément sous la juridiction de ce noeud ma foi fort sympathique.
            var result = 0;
            for (var i = 0;i<4;i++){
                result += children[i].getTaille();
            }
            return result;
        },

        equilibre: function(){
            // Fonction qui rééquilibre le noeud.
            // Bon déjà la première chose à faire c'est determiner la taille des sous-branches pour savoir laquelle est la plus peuplée.
            var taitaille = [0,0,0,0];
            for (var i = 0;i<4;i++){
                taitaille[i] = children[i].getTaille();
            }

            // On a la taille des branches on va comparer en x puis en y

            var droite = taitaille[1] + taitaille[3];
            var gauche = taitaille[0] + taitaille[2];
            if (Math.abs(gauche - droite) >= 2){
                if (gauche > droite) { var mod = -1;}
                else var mod = 1;

                var extremes = this.getExtreme(mod,0,true);
                // On a l'extreme centre on va maintenant vérifier qu'on peut bien s'en servir
                if (extremes[2] == 1){
                    // Ok on a un élément on va devoir l'utiliser pour trouver un nouveau pivot puis déplacer l'élément.
                    //Nouveau pivot
                    var newX = extremes[0] + 0.5*mod;
                    var newY = pivot[1];
                    var elem = this.pop(extremes[0],extremes[1]);
                    pivot = [newX,newY]; // On a définit notre pivot
                    if (elem.getType() != -1) this.addElem(elem);
                }
            }
            var bas = taitaille[1] + taitaille[0];
            var haut = taitaille[3] + taitaille[2];
            if (Math.abs(haut - bas) >= 2){
                if (haut < bas) { var mod = -1;}
                else var mod = 1;

                var extremes = this.getExtreme(0,mod,true);
                // On a l'extreme centre on va maintenant vérifier qu'on peut bien s'en servir
                if (extremes[2] == 1){
                    // Ok on a un élément on va devoir l'utiliser pour trouver un nouveau pivot puis déplacer l'élément.
                    //Nouveau pivot
                    var newY = extremes[1] + 0.5*mod;
                    var newX = pivot[0];
                    var elem = this.pop(extremes[0],extremes[1]);
                    pivot = [newX,newY]; // On a définit notre pivot
                    if (elem.getType() != -1) this.addElem(elem);
                }
            }

        },

        pop: function(x,y){
            // Fonction qui supprime l'élément sur la case x,y et qui le renvoie parce qu'on est pas des chiens nom de dieu.
            var branche = 0;
            if (x > pivot[0]) branche += 1;  // Ici on évalue la branche du nouvel élément par rapport au noeud.
            if (y > pivot[1]) branche += 2;

            // On va ensuite interroger ce qu'il y a déjà dans cette branche
            var id = children[branche].getType();
            if (id == 1){  // La branche donne sur un autre noeud à qui on va pouvoir refiler le bébé sans se poser de question.
                return children[branche].pop(x,y);
            }
            else if (id == 0){ // Il y a déjà un élément ici ! On vérifie calmement si c'est celui qu'on cherchait.
                var pp = children[branche].position();
                if (pp[0] == x && pp[1] == y){ // OK ! C'est le bon élément ! On est sauvés.
                    var result = clone(children[branche]);
                    children[branche] = new mapVide(); // On a supprimé avec succès l'élément
                    return result;
                }
            }
            return new mapVide();
        },

        getExtreme: function(x,y,reverse){
            // Cette fonction va regarder les éléments les plus sur le bord et les compter. Elle renvoie alors leur nombre et la liste de leurs positions.

            var xx = x;
            var yy = y;
            if (reverse){
                xx = -1*x;
                yy = -1*y;
            }            
            
            if (y == 0 && x != 0){ // On va supposer quand même que x != 0 ça me semble raisonnable
                var extremes = [children[(1+x)/2].getExtreme(xx,yy),children[(1+x)/2 + 2].getExtreme(xx,yy)];

            }
            else if (x == 0 && y != 0){ // On va supposer quand même que y != 0 ça me semble raisonnable
                var extremes = [children[(1+y)].getExtreme(xx,yy),children[(1+y) + 1].getExtreme(xx,yy)];
            }
            else{
                var extremes = [children[(1+x)/2 + (1+y)].getExtreme(xx,yy)];
            }
            var max = 0;
            var n = 0;
            for (var i = 0;i < extremes.length;i++){
                if (extremes[i][2] == 0){
                    // On a affaire à un élément vide donc on s'en bat la race. Sauf s'il s'agit du max par défaut, là on a un problème
                    if (max == i) {
                        max += 1; // On prend l'élément suivant mais des fois ça peut dépasser ...
                        if (max == extremes.length) return [pivot[0],pivot[1],2];
                    }
                }
                else {
                    if (extremes[i][0]*xx == extremes[max][0]*xx && extremes[i][1]*yy == extremes[max][1]*yy) {
                        n += extremes[i][2];
                    }
                    else if (extremes[i][0]*xx >= extremes[max][0]*xx && extremes[i][1]*yy >= extremes[max][1]*yy) {
                        n = extremes[i][2];
                        max = i;
                    }
                }
            }
            // extremes = [x,y,n]
            return [extremes[max][0],extremes[max][1],n];
        }

    };
};

var mapElem = function(){
    //La classe qui sert à stocker les éléments d'une case.
    var obj = [""];
    var alti = 0;
    var particles = [];
    var ennemis = [];
    var outlines = [];

    var id = [0,0];

    return {

        init: function(place,liste){
            // fonction pour setup les données de l'objet
            id = place;

            obj = liste[0];
            alti = liste[1];
            particles = liste[2];
            ennemis = liste[3];
            outlines = liste[4];
        },

        getType: function(){
            // Fonction bête qui renvoie le type de la classe à savoir 0
            return 0;
        },

        setObject: function(type,x,y,what,where){
            // On va modifier la case x,y à l'aide des données type, where et what
            if (x == id[0] && y == id[1]){
                if (type == "obj" || type == "objRep" || type == "objSupp"){
                    if (where === true) obj = what;
                    else {
                        if (where > obj.length){
                            if (type == "objSupp") obj.splice(obj.length-1,1);
                            else obj.push(what);
                        }
                        else {
                            if (type == "obj")  {
                                if (obj.length <= 1 && obj[0] == "") obj = [what];
                                else obj.splice(where,0,what);
                            }
                            else if (type == "objSupp") {
                                if (obj.length <= 1) obj = [what];
                                else obj.splice(where,1);
                            }
                            else if (type == "objRep") obj[where] = what;
                        }
                    }
                }
                else if (type == "alti"){
                    if (where == true) alti = what;
                    else alti += what;
                }
            }
        },

        addEnnemy: function(x,y,data,type){
            if (type == "ennemy") ennemis.push(data);
            else if (type == "particle") particles.push(data);
            else if (type == "clearEnnemy") ennemis = [];
            else if (type == "clearParticle") particles = [];
            
        },

        setOutlines: function(x,y,outline){
            // Fonction qui modifie les outlines de la case enfin si c'est bien la bonne case ...
            if (id[0] == x && id[1] == y){
                outlines = outline;
            }
        },
        
        getAll: function(x,y){
            // fonction qui renvoie le tout
            if (x == undefined) return [obj,alti,particles,ennemis,outlines];
            else {
                if (x == id[0] && y == id[1]){
                    return [obj,alti,particles,ennemis,outlines];
                }
                else{
                    var vide = new mapVide();
                    return vide.getAll();
                }
            }
        },

        getJSON: function(){
            // Fonction qui retourne l'élément sous une forme lisible pour le stockage en .json
            return [0,id,this.getAll()];
        },

        getTaille: function(){
            return 1;
        },

        position: function(){
            // fonction qui renvoie la position sur le quadrillage
            return id;
        },

        getExtreme(x,y){
            // Fonction qui renvoie l'élément tout simplement
            return [id[0],id[1],1];
        }

    };

};

var mapVide = function(){

    return {
        getType: function(){
            return -1;
        },

        getJSON: function(){
            return [-1];
        },

        getAll: function(){
            return [[""],-1,[],[],[0,[0,0,0],0]];
        },

        getTaille: function(){
            return 0;
        },

        setObject: function(){},

        addEnnemy: function(){},

        setOutlines: function(){},

        getExtreme: function(x,y){
            return [x*-50000,y*-50000,0];
        }

    };
};

function clone(obj) {
    if( obj instanceof Image ) return obj;
    if( typeof obj !== 'object') return obj;
    if( Array.isArray(obj) ) {
        var arr = [];
        obj.forEach(function (itm) {
            arr.push( clone(itm) );
        });
        return arr;
    }
    var key, result = {};
    for( key in obj ) {
        result[key] = clone(obj[key]);
    }
    return result;
}
