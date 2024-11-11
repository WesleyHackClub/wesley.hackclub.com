var widthSlider;
var config = {
  apiKey: 'AIxaSyGsAkHke9lXEU_97a8rYpMn7gOH3eWDxrM',
  authDomain: 'collaborative-sketch.firebaseapp.com',
  databaseURL: 'https://collaborative-sketch.firebaseio.com',
  storageBucket: 'collaborative-sketch.appspot.com'
}
firebase.initializeApp(config)
var pointsData = firebase.database().ref()
var points = []

function setup() {
    widthSlider = createSlider(1, 10, 3);
    widthSlider.position(20, 40);
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
    canvas.mouseMoved(drawPointIfMousePressed);
    canvas.touchMoved(drawPoint);


}

function draw() {
    background(255)

    for (var i = 0; i < points.length; i++) {
      var point = points[i]
      ellipse(point.x, point.y, point.width, point.width);
    }
}

function drawPoint() {
    pointsData.push({x: mouseX,
        y: mouseY,
        width: widthSlider.value()});
}

function drawPointIfMousePressed() {
    if (mouseIsPressed) {
        drawPoint()
    }
}

$('#saveDrawing').on('click', saveDrawing)

function saveDrawing() {
    saveCanvas()
}

$('#clearDrawing').on('click', clearDrawing)

function clearDrawing() {
    pointsData.remove()
    points = []
}
