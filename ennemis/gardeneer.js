var Gardeneer = function(){
    var x = 0;
    var y = 0;
    var z = 0;
    var r = 0;
    var g = 0;
    var img = 4;
    var mort = 0;
    var scale = 1;
    var scaleY = 1;
    var fx;
    var fy;
    var fm;
    var n = 0;
    var sens = 3;
    var high = 1;
    var eyeSight = 5;
    var champsVision = [];
    var objectif = [0,0,0];
    var degat = 0.5;
    var pv = 300;
    var flyMode = 3;
    var animCount = 0;
    var att = 1;
    var onHeros = [0,0];
    var taille = 2;
    var mortal = true;

    function floating(){
        if (n == 0){
            if (rnd(25) == 1){
                this.doing = planting;
                n -= 1;
            }
            else {
                var direc = accessible();
                if (direc.length == 0){
                    this.doing = planting;
                }
                else{
                    sens = direc[rnd(direc.length)];
                }
                //img = sens;
            }
        }
        //x += vecteurs[sens][1]/200;
        //y += vecteurs[sens][0]/200;
        n += 1;
        animCount += 1;
        img = [4,5,6,5][Math.round(animCount/10)%4];
        x += vecteurs[sens][1]/200;
        y += vecteurs[sens][0]/200;
        if (n == 200){
            n = 0;
        }
    }

    function centering(){
        animCount += 1;
        img = [4,5,6,5][Math.round(animCount/10)%4];
        if (Math.abs(x - Math.round(x) + 0.5) > 0.1){
            if (x > Math.round(x) + 0.5) {
                x -= 1/200;
            }
            else x += 1/200;
        }
        if (Math.abs(y - Math.round(y) + 0.5) > 0.1){
            if (y > Math.round(y) + 0.5) {
                y -= 1/200;
            }
            else y += 1/200;
        }
        if (Math.abs(x - Math.round(x) + 0.5) <= 0.1 && Math.abs(y - Math.round(y) + 0.5) <= 0.1){
            this.doing = floating;
            n = 0;
        }
    }

    function planting(){
        if (n == 0){
            if (Map.getObject(Math.floor(x),Math.floor(y),0) == ""){
                if (Map.getFloor(Math.floor(x),Math.floor(y),z) >= -0.4){
                    n += 1;
                }
            }
            if (n == 0) {this.doing = floating; return;}
        }
        if (n < 30){
            img = 4 + Math.floor(n/10);
        }
        if (n == 30){
            img = 7;
            addParticles("cutGrass",x-0.5,y-0.5,z,-0.2,0,80,"gardeneer");
        }
        if (n == 40) img = 8;
        if (n == 50) {
            img = 4;
            this.doing = floating;
            n = -1;
            Map.setObject(Math.floor(x),Math.floor(y),"herbe0",0);
        }
        n += 1;
    }

    function damageFly(){
        r += 0.1;
        if (z <= Map.superGetFloor(x,y,z)){
            mortal = true;
            this.doing = centering;
            r = 0;
        }
        else{
            x += vecteurs[sens][1]*0.1;
            y += vecteurs[sens][0]*0.1;
            if (z <= Map.superGetFloor(x,y,z)){
                sens = (sens+2)%4;
                x += vecteurs[sens][1]*0.1;
                y += vecteurs[sens][0]*0.1;
            }
        }
    }

    function vision(){
       
    }

    function accessible(){
        var result = [];
        for (var i = 0;i<4;i++){
            var YY = Math.floor(y) + vecteurs[i][0];
            var XX = Math.floor(x) + vecteurs[i][1];
            var ZZ = Map.getFloor(XX,YY,z);
            if (ZZ <= z + high && ZZ > z - high){
                result.push(i);
            }
        }
        return result;
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
                fx = xx;
                fy = yy;
                fm = mm;
                z = Map.getAlti(x,y);
                this.doing = floating;
                mort = mm;
            }
        },
        act: function(){
            // Partie physique
            if (z > Map.getFloor(Math.floor(x),Math.floor(y),z)){
                g -= 0.05;
                z += g/2;
            }
            else{
                g = 0;
                z = Map.getFloor(Math.floor(x),Math.floor(y),z);
            }
        },
        display: function(){
            Painter.imgEnnemy( ctx, x, y, Map.getFloor(Math.floor(x),Math.floor(y),z), scale, 0, imgMonstre[9], scaleY );
            Painter.imgEnnemy( ctx, x, y, z, scale, r, imgMonstre[img], scaleY );
        },
        doing: function(){

        },
        giveY(){
            return Math.floor(y);
        },
        giveX(){
            return Math.floor(x);
        },
        takeBack(){
            if (fm == 2) mort = 2;
            return [fx,fy,"gardeneer",mort];
        },
        isThere(XX,YY,ZZ){
            if (Math.hypot(x-XX,y-YY,z-ZZ) < 1){
                return true;
            }
            else return false;
        },
        hit(xx,yy,zz,radius,damage,sensN){
            if (mortal && Math.abs(x - xx) <= radius && Math.abs(y - yy) <= radius && z  <= radius + zz && z + taille >= z - radius){
                if (sensN == undefined){
                    sensN = 0;
                    if (xx < x) sensN = 1;
                    else if (yy < y) sensN = 2;
                    else if (xx > x) sensN = 3;
                }
                this.damageSelf(damage,sensN);
            }
        },
        damageSelf(degat,sensD){
            mortal = false;
            this.doing = damageFly;
            n = 0;
            g = 1;
            z += 0.05;
            sens = sensD;
            pv -= degat;
            scale = 1;
            flyMode = 1;
            //addParticles("cutGrass",x-0.5,y-0.5,z,-0.2,0,80,"gardeneer");
            addParticles("hitA",x-0.5,y-0.5,z+2,0,0,10);
            //if (Map.getFloor(Math.floor(x) + vecteurs[sens][1],Math.floor(y) + vecteurs[sens][0],z) > z) flyMode = 0;
        },
        touchDamage(xx,yy,zz,n){
            /*
             if (Math.hypot(x-xx,y-yy,z-zz) < 1){
             if (heros[n].vx > 0) var Sens = 1;
             else if (heros[n].vx < 0) var Sens = 3;
             else if (heros[n].vy < 0) var Sens = 0;
             else if (heros[n].vy < 0) var Sens = 2;
             else var Sens = sens;
             hitHeros(n,att,Sens);
             }
             */
        },
        carried(N){
            onHeros = [0,N];
            this.doing = carriedOver;
            n = 0;
            scaleY = -1;
        },
        throw(s){
            x = heros[onHeros[1]].x+0.5 + heros[onHeros[1]].vx/50;
            y = heros[onHeros[1]].y+0.5 + heros[onHeros[1]].vy/50;
            z = heros[onHeros[1]].z + 2.9;
            //onHeros = [0,0];
            this.doing = damageFly;
            n = -10;
            scaleY = 1;
            sens = s;
        }
    };
}
