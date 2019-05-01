(() => {
  'use strict';

  const eyegaze = true;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const canvasBoundingRect = canvas.getBoundingClientRect();
  const frameLength = 2;
  let mouseX = 0;
  let mouseY = 0;
  let score = 0;

  const circles = [
    { x: 100, y: 100, radius: 10, xMove: '+', yMove: '+', color: 'red' },
    { x: 40, y: 200, radius: 15, xMove: '-', yMove: '+', color: 'blue' },
    { x: 250, y: 300, radius: 30, xMove: '+', yMove: '-', color: 'red' },
    { x: 150, y: 35, radius: 40, xMove: '-', yMove: '-', color: 'blue' },
    { x: 134, y: 523, radius: 19, xMove: '+', yMove: '+', color: 'red' },
    { x: 40, y: 222, radius: 53, xMove: '-', yMove: '+', color: 'blue' },
    { x: 234, y: 532, radius: 10, xMove: '+', yMove: '-', color: 'red' },
    { x: 342, y: 123, radius: 5, xMove: '-', yMove: '-', color: 'blue' }
  ];

  const rect = {
    x: 300,
    y: 300,
    width: 50,
    height: 50
  };

  canvasInit();

  function canvasInit() {
    // Set width and height of the canvas to the window dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw rect
    drawRect(rect);

    // Draw circles
    for (let i = 0; i < circles.length; i++) {
      drawCircle(circles[i]);
    };

    // First animation frame
    window.requestAnimationFrame(moveCircle);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function moveCircle() {
    clearCanvas();

    // Draw rect
    drawRect({
      ...rect,
      x: mouseX,
      y: mouseY
    });

    // Iterate over all the circles.
    for (let i = 0; i < circles.length; i++) {
      const collision = intersects(circles[i], rect);
      if(collision) score += 1;

      if (circles[i].xMove == '+') {
        circles[i].x += frameLength;
      }
      else {
        circles[i].x -= frameLength;
      }
      if (circles[i].yMove == '+') {
        circles[i].y += frameLength;
      }
      else {
        circles[i].y -= frameLength;
      }

      drawCircle(circles[i])

      if((circles[i].x + circles[i].radius) >= canvas.width) {
        circles[i].xMove = '-';
      }
      if((circles[i].x - circles[i].radius) <= 0) {
        circles[i].xMove = '+';
      }
      if((circles[i].y + circles[i].radius) >= canvas.height) {
        circles[i].yMove = '-';
      }
      if((circles[i].y - circles[i].radius) <= 0) {
        circles[i].yMove = '+';
      }
    }

    displayScore(score);

    // Render it again
    window.requestAnimationFrame(moveCircle);
  }

  function drawRect({
    x,
    y,
    width,
    height
  }) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, width, height);
  }

  function drawCircle({
    x,
    y,
    radius,
    color
  }) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function intersects(circle, rect) {
    const DeltaX = circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
    const DeltaY = circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
    return (DeltaX * DeltaX + DeltaY * DeltaY) < (circle.radius * circle.radius);
  }

  function displayScore(text, x = 300, y = 300, fontSize = '50') {
    ctx.font = `${fontSize}px Helvetica`;
    ctx.fillText(`Score: ${text}`, x, y);
  }

  if (eyegaze) {
    webgazer.setGazeListener(function(data, elapsedTime) {
      if (data == null) {
        return;
      }

      mouseX = data.x; //these x coordinates are relative to the viewport
      mouseY = data.y; //these y coordinates are relative to the viewport
      // console.log(xprediction, yprediction, elapsedTime); //elapsed time is based on time since begin was called
    }).begin();
  }
  else {
    canvas.addEventListener('mousemove', e => {
      mouseX = e.clientX - canvasBoundingRect.left;
      mouseY = e.clientY - canvasBoundingRect.top;
    });
  }
})();
