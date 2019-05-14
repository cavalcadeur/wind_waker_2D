let Gotelem = function(){
    let x = 0;
    let y = 0;
    let z = 0;
    let xBody = 0;
    let yBody = 0;
    let zBody = 0;
    let r = 0;
    let g = 0;
    let gBody = 0;
    let posay = false;
    let posayBody = true;
    let img = 10;
    let mort = 0;
    let scale = 1;
    let scaleY = 1;
    let taille = 1.6;
    let fx;
    let fy;
    let fm;
    let n = 0;
    let sens = 3;
    let high = 1;
    let eyeSight = 5;
    let champsVision = [];
    let objectif = [0,0,0];
    let degat = 0.5;
    let pv = 3;
    let flyMode = 5;
    let animCount = 0;
    let att = 0.5;
    let onHeros = [0,0];
    let mortal = true;
    let goal = [0,0];
    let rockettable = false;

    // Un ennemi un peu particulier puisqu'il peut se trouver en deux endroits à la fois. La tête se détache parfois. S'il n'est possible d'infliger des dégâts qu'à la tête, les deux parties sont offensives et infligent des dégâts en cas de contact.
    // Si la tête est sur le corps, elle prends des dégâts de façon normale. Mais si elle en est détachée alors c'est une mort instantannée.

    function walking(){
        if (n == 0){
            if (rnd(20) == 30){
                this.doing = standing;
                n -= 1;
            }
            else {
                let direc = accessible();
                if (direc.length == 0){
                    this.doing = standing;
                }
                else{
                    sens = direc[rnd(direc.length)];
                    if (sens == 1) scale = -1;
                    else if (sens == 3) scale = 1;
                }
                //img = sens;
            }
        }
        //x += vecteurs[sens][1]/200;
        //y += vecteurs[sens][0]/200;
        n += 1;
        animCount += 1;
        let fImg = img;
        img = Math.round(animCount/10)%2;
        if (img != fImg) {
            x += vecteurs[sens][1]/20;
            y += vecteurs[sens][0]/20;
        }
        /*
         if (n%10 == 0){
         vision();
         let truc = react();
         if (truc == "go"){
         this.doing = fleeing;
         n = 0;
         }
         else if (truc == "hit"){
         this.doing = attacking;
         n = 0;
         }
         }
         */
        if (n == 200){
            n = 0;
        }
    }

    function standing(){ // En mode repos, le gotelem regarde quand même pour vérifier qu'il n'est pas à proximité d'un des héros.
        let to0 = Math.abs(x - (heros[0].x+0.5)) + Math.abs(y - (heros[0].y+0.5));
        let to1 = Math.abs(x - (heros[1].x+0.5)) + Math.abs(y - (heros[1].y+0.5));
        let distance = Math.min(to0,to1);
        let closer = 0;
        if (to1 < to0) closer = 1;
        if (distance <= eyeSight){
            // Ok. Le gotelem a repéré sa cible. Il va attribuer à chacune des cases voisines un nombre.
            let attir = [0,0,0,0,0];
            let alti = 0;
            for (let i = 0; i < 4; i++){
                attir[i] = Math.abs(x - (heros[closer].x+0.5) + vecteurs[i][1]) + Math.abs(y - (heros[closer].y+0.5) + vecteurs[i][0]);
                alti = Map.superGetFloor(Math.floor(x) + vecteurs[i][1],Math.floor(y) + vecteurs[i][0],z);
                attir[i] += Math.abs(alti - z);
                if (alti <= -1 || alti >= z + 2) attir[i] += 666;                
            }
            attir[4] = distance + 3;
            let choice = 0;
            for (let i = 1; i < 5;i ++){
                if (attir[i] < attir[choice]) choice = i;
            }
            sens = choice;
            if (sens == 4) {goal = [x,y]; sens = 2;}
            else goal = [x + vecteurs[sens][1],y + vecteurs[sens][0]];
            z += 0.01; g = 0.9;
            /*
            if ((distance >= 1.5 && distance <= 2.5 && (Math.abs(x - (heros[closer].x+0.5)) <= 0.1 || Math.abs(y - (heros[closer].y+0.5)) <= 0.1)) || (distance <= 1.5 && rnd(10) == 1) ){
                //console.log("HEY");
                //console.log(x + " " + y + " " + heros[closer].x + " " + heros[closer].y);
                if (sens == 4) {goal = [x,y]; sens = 2;}
                else goal = [goal[0] + vecteurs[sens][1],goal[1] + vecteurs[sens][0]];
                this.doing = telegraphing;
                n = 40;
            }
            else {
            */
                 zBody += 0.01; gBody = 0.9;
                this.doing = jumping;
            //}
        }
    }

    function telegraphing(){
        if (n > 0){
            n -= 1;
            r += Math.PI/20;
        }
        else {
            r = 0;
            g -= 0.2;
            this.doing = throwing;
        }
    }
    
    function jumping(){
        if (Math.abs(goal[0] - x) > 0.025 || Math.abs(goal[1] - y) > 0.025){
            x += vecteurs[sens][1] * 0.05; xBody += vecteurs[sens][1] * 0.05;
            y += vecteurs[sens][0] * 0.05; yBody += vecteurs[sens][0] * 0.05;
        }
        else if (posay){
            this.doing = waiting;
            n = (pv-1)*40 + 20;
        }
    }

    function throwing(){
        if (Math.abs(goal[0] - x) > 0.05 || Math.abs(goal[1] - y) > 0.05){
            if (posay) g = 0.5;
            x += vecteurs[sens][1] * 0.07;
            y += vecteurs[sens][0] * 0.07;
        }
        else if (posay){
            if (goal[0] == xBody && goal[1] == yBody){
                this.doing = waiting;
                x = xBody;
                y = yBody;
                n = (pv-1)*15 + 20;
            }
            else{
                this.doing = splitting;
                n = 5;
            }
        }
    }
    
    function waiting(){
        n -= 1;
        if (n <= 0) this.doing = standing;
    }

    function splitting(){
        n -= 1;
        if (n <= 0) { // La tête retourne à sa place.
            goal[0] = xBody;
            goal[1] = yBody;
            for (let i = 0; i < 4; i ++){
                if (Math.abs(x + 2*vecteurs[i][1] - xBody) + Math.abs(y + 2*vecteurs[i][0] - yBody) < 0.5) sens = i;
            }
            z += 0.01; g = 0.8;
            this.doing = throwing;;
        }
    }
    
    function dying(){
        mortal = false;
        r += Math.PI/9;
        if (z <= zBody){
            rockettable = false;
            if (pv <= 0) {
                mortal = false;
                mort = 0;
                addParticles("fumeeM",Math.floor(x),Math.floor(y),z+0.9,0,0,25);
                addParticles("exploM",Math.floor(x),Math.floor(y),z+0.9,0,0,80);
                this.act = nada;
                this.display = nada;
                this.doing = nada;
                this.isThere = nadaR;
            }
            else {
                this.doing = waiting;
                n = 30;
                mortal = true;
                r = 0;
            }
        }
        
    }

    function rocketing(){
        mortal = false;
        rockettable = true;
        x += vecteurs[sens][1] / 25 * flyMode;
        y += vecteurs[sens][0] / 25 * flyMode;
        r += 0.2;
    }

    function vision(){
        let XX = Math.floor(x);
        let YY = Math.floor(y);
        for (let i = 0;i < eyeSight;i++){
            YY += vecteurs[sens][0];
            XX += vecteurs[sens][1];
            let ZZ = Map.getAlti(XX,YY);
            if (ZZ <= z + high && Map.getFloor(XX,YY,z) > z - high){
                champsVision[i] = [Map.getObject(XX,YY,0),XX,YY];
            }
            if (Map.getFloor(XX,YY,z) > z + high){
                return;
            }
        }
    }

    function react(){
        let result = "nope";
        for (let i = 0; i < 4;i++){
            sens = (sens+1)%4;
            let XX = Math.floor(x) + vecteurs[sens][1];
            let YY = Math.floor(y) + vecteurs[sens][0];
            if ((XX == heros[0].x && YY == heros[0].y) || (XX == heros[1].x && YY == heros[1].y)){
                if (Math.abs(Map.getFloor(Math.floor(x),Math.floor(y),z) - Map.getFloor(XX,YY,z)) < high){
                    result = "hit";
                    objectif[2] = sens;
                }
            }
        }
        if (result == "nope"){
            champsVision.forEach(
                function (e,i){
                    if (e[1] == heros[0].x && e[2] == heros[0].y){
                        objectif = [e[1],e[2]];
                        result = "go";
                    }
                    else if (e[1] == heros[1].x && e[2] == heros[1].y){
                        objectif = [e[1],e[2]];
                        result = "go";
                    }
                }
            );
        }
        return result;
    }

    function accessible(){
        let result = [];
        for (let i = 0;i<4;i++){
            let YY = Math.floor(y) + vecteurs[i][0];
            let XX = Math.floor(x) + vecteurs[i][1];
            let ZZ = Map.getFloor(XX,YY,z);
            if (ZZ <= z + high && ZZ > -1){
                result.push(i);
            }
        }
        return result;
    }

    function findSens(XX,YY){
        if (Math.abs(XX) > Math.abs(YY)){
            if (XX > 0) return 1;
            else if (XX  < 0) return 3;
        }
        else if (Math.abs(YY) > Math.abs(XX)) {
            if (YY > 0) return 2;
            else if (YY < 0) return 0;
        }
        return 4;
    }

    function nada(){

    }
    function nadaR(){
        return false;
    }
    function meurs(){
        //alert("Je suis MORT !");
        this.act = nada;
        this.display = nada;
        this.doing = nada;
        this.isThere = nadaR;
    }

    function explodeOnContact(){
        if (z + 1.2 <= Map.getFloor(Math.floor(x),Math.floor(y),z)){
            addParticles("fumeeM",Math.floor(x),Math.floor(y),z+0.9,0,0,25);
            addParticles("exploM",Math.floor(x),Math.floor(y),z+0.9,0,0,80);
            meurs();
        }
    }

    return {
        create: function(xx,yy,mm){
            if (mm == 0){
                this.act = nada;
                this.display = nada;
                this.doing = nada;
                this.isThere = nadaR;
                return;
            }
            else {
                x = xx;
                y = yy;
                xBody = xx;
                yBody = yy;
                fx = xx;
                fy = yy;
                fm = mm;
                z = Map.getAlti(x,y);
                zBody = Map.getAlti(xBody,yBody);
                this.doing = standing;
                mort = mm;
            }
        },
        act: function(){
            posay = false;
            let margin = 1.2;
            if (x == xBody && y == yBody) margin = 0;
            if (z + margin > Map.getFloor(Math.floor(x),Math.floor(y),z)){
                g -= 0.1;
                z += g/2;
            }
            else{
                posay = true;
                g = 0;
                z = Map.getFloor(Math.floor(x),Math.floor(y),z) - margin;
            }
            if (x == xBody && y == yBody){
                damageSpot(Math.floor(x),Math.floor(y),z,0.8,att,1,sens);
            }
            else{
                damageSpot(Math.floor(x),Math.floor(y),z,0.8,att,1,findSens(x - xBody,y - yBody));
            }
            
            posayBody = false;
            if (zBody > Map.getFloor(Math.floor(xBody),Math.floor(yBody),zBody)){
                gBody -= 0.1;
                zBody += g/2;
            }
            else{
                gBody = 0;
                posayBody = true;
                zBody = Map.getFloor(Math.floor(xBody),Math.floor(yBody),zBody);
            }

            if (zBody <= -1 && rockettable == false){
                addParticles("rond",Math.floor(xBody),Math.floor(yBody),-1,0,0,30,0.3);
                addParticles("eclabousse",Math.floor(xBody),Math.floor(yBody),-1,15,0,30,0);
                mort = 0;
                if (Math.abs(xBody - x) >= 0.5 || Math.abs(yBody - y) >= 0.5){
                    addParticles("fumeeM",Math.floor(x),Math.floor(y),z+0.9,0,0,25);
                    addParticles("exploM",Math.floor(x),Math.floor(y),z+0.9,0,0,80);
                }
                meurs();
            }
        },
        display: function(){
            Painter.imgEnnemy( ctx, xBody, yBody, zBody, scale, 0, imgMonstre[img+1], scaleY );
            Painter.imgEnnemy( ctx, x, y, z, scale, r, imgMonstre[img], scaleY );
        },
        doing: function(){

        },
        giveY(){
            return Math.max(Math.floor(y),Math.floor(yBody));
        },
        giveX(){
            return Math.floor(x);
        },
        takeBack(){
            if (fm == 2) mort = 2;
            return [fx,fy,"gotelem",mort];
        },
        isThere(XX,YY,ZZ){
            if (Math.hypot(x-XX,y-YY,z-ZZ) < 1 || Math.hypot(xBody-XX,yBody-YY,zBody-ZZ) < 1){
                return true;
            }
            else return false;
        },
        damage(degat,sensD){
            if (x == xBody && y == yBody && rockettable == false){
                this.doing = dying;
                console.log(rockettable);
                mortal = false;
                n = 0;
                sens = sensD;
                pv -= degat;
                scale = 1;
                g = 0.9;
                z += 0.01;
                flyMode = 1;
                addParticles("hitA",Math.floor(x),Math.floor(y),z+1.9,0,0,10);
                if (Map.getFloor(Math.floor(x) + vecteurs[sens][1],Math.floor(y) + vecteurs[sens][0],z) > z) flyMode = 0;
            }
            else{
                this.doing = rocketing;
                this.act = explodeOnContact;
                sens = sensD;
                xBody -= 60000;
                yBody -= 60000;
            }
        },
        touchDamage(xx,yy,zz,n){
        },
        hit(xx,yy,zz,radius,damage,sensN){
            if ((mortal || rockettable) && Math.abs(x - xx) <= radius && Math.abs(y - yy) <= radius && (z+0.3)  <= radius + zz && (z+0.3) + taille >= zz - radius){
                if (sensN == undefined){
                    sensN = 0;
                    if (xx < x) sensN = 1;
                    else if (yy < y) sensN = 2;
                    else if (xx > x) sensN = 3;
                }
                if (mortal == false) damage = 0;
                this.damage(damage,sensN);
            }
        }
    };
}
