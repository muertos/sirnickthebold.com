const canvas = document.getElementById('asteroid');
const context = canvas.getContext('2d');

// context.scale(1.5,1.5);
//fill background to black
// context.fillStyle = "#000";
// context.fillRect(0, 0, asteroid.width, asteroid.height);

//convert radians to degrees
function radToDeg(angle) {
  return angle * (180/Math.PI);
}

//convert degrees to radians
function degToRad(angle) {
  return angle * (Math.PI/180);
}

function clear() {
  context.fillStyle = "#FFF";
  context.fillRect(0, 0, asteroid.width, asteroid.height);
}

class Line {
  constructor(x1, y1, x2, y2, theta, color, speed) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.theta = theta;
    this.color = color;
    this.speed = speed;
    this.centerx = this.x1 + (this.x2 - this.x1)/2;
    this.centery = this.y1 + (this.y2 - this.y1)/2;
    this.length = Math.sqrt(
      (Math.pow(this.x2, 2) - Math.pow(this.x1, 2)) + (Math.pow(this.y2, 2) - Math.pow(this.y1, 2))
    );
  }

  drawHalfLine(theta) {
    var newx = this.centerx + ((this.length / 2) * Math.cos(degToRad(theta))/2);
    var newy = this.centery - ((this.length / 2) * Math.sin(degToRad(theta))/2);
    context.beginPath();
    context.strokeStyle = this.color;
    context.moveTo(newx, newy);
    context.lineTo(this.centerx, this.centery);
    context.stroke();
  }

  draw() {
    this.drawHalfLine(this.theta);
    this.drawHalfLine(this.theta + 180);
  }

  drawCircle() {
    for (var theta = 0; theta < 360; theta += 1) {
      this.drawHalfLine(theta);
    }
  }

  rotate(theta) {
    clear();
    this.theta += theta;
    }

} //end Line class



// var yOffset = 20;
// var fallingLineSpeed = 10;
// var fallingLine = new Line(asteroid.width / 2, 0, asteroid.width / 2, yOffset, 90, '#000');


function collides() {
  //insert collision detection here
}

var lines = [];
var len = 40;
//length of falling line
var yOffset = 50;

//initialize the falling line objects
for (var i = 0; i < len; i++) {
  var randx = 600 * Math.random() | 0;
  var randSpeed = 8 * Math.random() | 1;
  var randTheta = 360 * Math.random() | 0;
  lines[i] = new Line(randx, 0, randx, yOffset, randTheta, '#000', randSpeed);
}
console.log(lines);

function update() {
  //I had to clear the screen at the beginning of the loop and I'm really not sure why
  clear();

  //increment the falling lines
  for (var i = 0; i < len; i++) {
    lines[i].centery += lines[i].speed;
    if (lines[i].centery > asteroid.height) {
      lines[i].centery = 0;
    }
    lines[i].theta += 1;
    lines[i].draw();
  }
  //draw all the things
  line.draw();

  //this does not work!
  //clear();

  //I need this to I guess recursively call update() b/c without it, nothing works
  requestAnimationFrame(update);
}

//properties of player-controlled objects
var lw = asteroid.width;
var lh = asteroid.height;
var lineColor = '#F04324';
var line = new Line(lw / 2, lh / 2, lw / 2 + 50, lh / 2 + 50, 0, lineColor, 0);


var dTheta = 0;

document.addEventListener('keydown', event => {
  console.log(event);
  //
  if (event.keyCode == 65) {
    line.rotate(6);
    console.log(line.theta)
  }
  if (event.keyCode == 68) {
    line.rotate(-6);
    console.log(line.theta)
  }
  //left
  if (event.keyCode == 37) {
    line.centerx -= 10;
  }
  //right
  if (event.keyCode == 39) {
    line.centerx += 10;
  }
  //up
  if (event.keyCode == 38) {
    line.centery -= 10;
  }
  //down
  if (event.keyCode == 40) {
    line.centery += 10;
  }
  // clear();
  // line.draw();
  });

//main loop
update();
