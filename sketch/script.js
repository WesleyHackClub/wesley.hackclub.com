var config = {
    apiKey: 'AIxaSyGsAkHke9lXEU_97a8rYpMn7gOH3eWDxrM',
    authDomain: 'collaborative-sketch.firebaseapp.com',
    databaseURL: 'https://collaborative-sketch.firebaseio.com',
    storageBucket: 'collaborative-sketch.appspot.com'
}
firebase.initializeApp(config)
var pointsData = firebase.database().ref()
var points = []
var hslRainbowColor = 1
const deleteButton = document.getElementById("clearDrawing");
console.log(localStorage.getItem("deleteDisabled"))


function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    background(255)
    fill(0)
    pointsData.on('child_added', function (point) {
        points.push(point.val())
    })
    pointsData.on('child_removed', function () {
        points = []
    })
    canvas.mousePressed(drawPoint);
    canvas.mousePressed(drawPointIfMousePressed);
    canvas.mouseMoved(drawPointIfMousePressed);
    canvas.touchMoved(drawPoint);
}

function draw() {
    background(255)
    for (var i = 0; i < points.length; i++) {
    var point = points[i]
    stroke(point.color);
    fill(point.color);
    ellipse(point.x, point.y, point.width, point.width);
    }
}

function drawPoint() {
    pointsData.push({x: mouseX,
        y: mouseY,
        width: document.getElementById("size").value,
        color: document.getElementById("color").value});
}

function drawPointIfMousePressed() {
    if (mouseIsPressed) {
        drawPoint()
    }
}

function rainbowEffect() {
    if (document.getElementById('rainbow').checked == true) {
        if(hslRainbowColor==359) {
            hslRainbowColor=1;
        }
        hslRainbowColor += 1;
        document.getElementById("color").value = hslToHex(hslRainbowColor, 100, 50);
        
    }
}

setInterval(rainbowEffect, 7);

$('#saveDrawing').on('click', saveDrawing)

function saveDrawing() {
    saveCanvas(window.prompt("Save as", "collaborative sketch"))
}


function deleteDrawing() {
    if(localStorage.getItem("deleteDisabled")==1) {
        alert("Please wait for 30 seconds");
    } 
    if(localStorage.getItem("deleteDisabled")==0) {
        console.log("deleting")
        clearDrawing()
        localStorage.setItem("deleteDisabled", "1");
        console.log(localStorage.getItem("deleteDisabled"))
        deleteButton.disabled = true;
        setTimeout(enableDeleteButton(), 30000)
    }
}

function enableDeleteButton() {
    localStorage.setItem("deleteDisabled", "0");
    deleteButton.disabled = false;
}

$('#clearDrawing').on('click', deleteDrawing)

function clearDrawing() {
    pointsData.remove()
    points = []
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
  
