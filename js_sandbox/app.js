// Global vars:
let canvas;
let canvasContext;

window.onload = () => {
  canvas = document.querySelector('#gridCanvas');
  canvas.setAttribute('style', 'border: 1px solid black');

  canvasContext = canvas.getContext('2d');  
  canvasContext.fillStyle = 'gray';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  grid(canvas.width, canvas.height);

  // canvasContext.beginPath();
  // canvasContext.arc(canvas.width/2, canvas.height/2, 0.05*canvas.height, 0, 2*Math.PI);
  // canvasContext.stroke();
}

const gridY = (width) => {
  canvasContext.moveTo(width, 0);
  canvasContext.lineTo(width, canvas.height);
  canvasContext.stroke();
}

const gridX = (height) => {
  canvasContext.moveTo(0, height);
  canvasContext.lineTo(canvas.width, height);
  canvasContext.stroke();
}

const grid = (width, height) => {
  for(let i = 0; i < width; i += 0.1*width) {
    for(let j = 0; j < height; j += 0.1*height) {
      gridY(i);
      gridX(j);
    }
  }
}