var actx = new Audio("musiques/title.ogg");
var currentlyPlayed ="musiques/title.ogg";

function chooseMusic(gotoo){
    var result = "musiques/title.ogg";
    if (gotoo == "ocean") result = "musiques/archipelago.ogg";

    //console.log(actx);
    if (currentlyPlayed != result) {actx.src = result; actx.play(); currentlyPlayed = result;}
}
