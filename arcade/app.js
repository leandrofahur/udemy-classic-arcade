// Global vars:
let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 4;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
let paddle1Y = 250;
let paddle2Y = 250;

let player1Score = 0;
let player2Score = 0;

window.onload = () => {
  canvas = document.querySelector('#gameCanvas');
  canvas.setAttribute('style', 'border: 1px solid black');

  canvasContext = canvas.getContext('2d');  

  let framesPerSecond = 30;
  setInterval(() => {
    move();
    draw();
  }, 1000/framesPerSecond);

  addEventListener('mousemove', (evt) => {
    let mousePos = calculateMousePosition(evt);
    paddle1Y = mousePos.y - PADDLE_HEIGHT/2;
    // paddle2Y = mousePos.y - PADDLE_HEIGHT/2;
  })

}

function computeMovement() {
  let paddle2YCenter = paddle2Y + PADDLE_HEIGHT/2;
  if(paddle2YCenter < ballY - 35) {
    paddle2Y += 5;
  } else if (paddle2YCenter < ballY + 35){
    paddle2Y -= 5;
  }
}

function move() {
  computeMovement();
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if(ballX >= canvas.width) {
    if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX *= -1
      // let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
      // ballSpeedY = deltaY*0.35;
    } else {
      ballReset();
      player1Score++;
    }
  } 
  if(ballX <= 0) {
    if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX *= -1
      // let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
      // ballSpeedY = deltaY*0.35;
    } else {
      ballReset();
      player2Score++;
    }
  }
  if(ballY >= canvas.height) {
    ballSpeedY *= -1
  } 
  if(ballY <= 0) {
    ballSpeedY *= -1
  }
}

function draw() {
  canvasContext.fillStyle = 'black';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);

  // left player paddle:
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

  // right player paddle:
  colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

  // ball
  colorCircle(ballX, ballY, 10, 0, 'white');
  
  canvasContext.fillText(`${player1Score}`, 100, 100);
  canvasContext.fillText(`${player2Score}`, canvas.width-100, 100);
}

function colorRect(originX, originY, width, height, color) {
  canvasContext.fillStyle = color;
  canvasContext.fillRect(originX, originY, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, 2*Math.PI, true);
  canvasContext.fill ();
}

function calculateMousePosition(evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX,
    y:mouseY
  };
}

function ballReset() {
  ballSpeedX *= -1
  ballX = canvas.width/2;
  ballY = canvas.height/2;
}