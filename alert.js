var firstTime = true;

window.alert = function(msg,n) {
    var elem = document.getElementById("alert");
    alerting = 1;
    elem.textContent = msg;
    elem.className = 'show';
};

window.disalert = function(n) {
    var elem = document.getElementById("alert");
    alerting = 0;
    elem.className = ' ';
};

window.alertBlackVersion = function(msg,n) {
    var elem = document.getElementById("alert");
	//alerting = 1;
    elem.textContent = msg;
    elem.className = 'blackOne';
};

window.disAlertBlackVersion = function() {
    var elem = document.getElementById("alert");
	//alerting = 1;
    //elem.textContent = msg;
    elem.className = 'blackOneHide';
};
