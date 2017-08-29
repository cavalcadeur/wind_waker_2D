var actx = new Audio("musiques/title.mp3");
var currentlyPlayed ="musiques/title.mp3";

function chooseMusic(gotoo){
    var result = "musiques/title.mp3";
    if (gotoo == "depart" || gotoo == "depart2") result = "musiques/aurore.mp3";

    //console.log(actx);
    if (currentlyPlayed != result) {actx.src = result; actx.play(); currentlyPlayed = result;}
}
