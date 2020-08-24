import $ from 'jquery';
import io from 'socket.io-client';

let socket = io('http://localhost:3000');

socket.on('connect', function () {
    console.log('Connected!');
});

$('#create').on('click', function () {
    let name = $('#name').val();
    socket.emit('gcreate', function (name) {

    });
    console.log(socket.id);
    setCookie("username", name, 1);
    setCookie("id", socket.id, 1);
    const gcode = Math.floor(Math.random() * 1000);
    setCookie("gcode", gcode, 1);
    window.location.href = "create-game.html";
    //alert();
});

$('#join').on('click', function () {
    let name = $('#name').val();
    let gcode = $('#gcode').val();
    this.socket.emit('gjoin', function (name, gcode) {
        setCookie("username", name, 1);
        setCookie("id", socket.id, 1);
        setCookie("gcode", gcode, 1);
    });
})

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


