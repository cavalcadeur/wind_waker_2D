// Ce fichier contient toutes les fonctions des PNJs et celles relatives aux quêtes
// Il y a ici say() unsay()

function say(msg,x,y,n){
    msg = msg[n];
    var alti;
    if (x == undefined || y == undefined){
        x = -8000;
        y = 0;
        alti = 0;
    }
    else {
        alti = Map.getAlti(x,y);
    }
    alerting = 1;
    //figer = 1;
    addParticles("bla",x,y,alti,0,0,-1,msg);
    //particles.push({n:0,type:"bla",x:x,y:y,g:0,alti:alti,lim:-1,content:msg,actu:"",xx:0,yy:0,y2:0,x2:0});
    //console.log(particles);
}

function unsay(){
    alerting = 0;
    disalert();
}

