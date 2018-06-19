var cnv = document.getElementById('canvas');
var ctx = cnv.getContext('2d');

var game = new Game(5);
game.draw();

function Game(length) {
  this.length = length || 3;
  this.speed = 0.1; // in px
  this.direction = '';
  this.isStart = false;

  this.segmentSize = {
    w: 6,
    h: 6
  };

  this.initPos = {
    x: 20,
    y: 50
  };

  this.turn = {};
  this.turns = [];

  this.snake = createBody(this.length, this.segmentSize, this.initPos);

  function createBody(length, segmentSize, position) {
    var snake = [];
    var segment;

    for (var i = 0; i < length; i++) {
      segment = {};

      if (i === 0) {
        segment.w = segmentSize.w;
        segment.h = segmentSize.h;

        segment.x = position.x;
      } else {
        segment.w = segmentSize.w;
        segment.h = segmentSize.h;

        segment.x = position.x;
      }

      // segment.y = position.y - (segment.h + 1) * i;
      segment.y = position.y - segment.h * i;

      snake.push(segment);
    }

    return snake;
  }

  this.updateBody = function () {
    this.snake.pop();

    const newSegment = {};
    const firstBodySegment = this.snake[0];

    if (this.direction === 'down') {
      newSegment.x = firstBodySegment.x;
      newSegment.y = firstBodySegment.y + this.segmentSize.h;

      if (newSegment.y > cnv.height) {
        newSegment.y = -this.segmentSize.h;
      }
    }
    if (this.direction === 'up') {
      newSegment.x = firstBodySegment.x;
      newSegment.y = firstBodySegment.y - this.segmentSize.h;

      if (newSegment.y < 0) {
        newSegment.y = cnv.height + this.segmentSize.h;
      }
    }
    if (this.direction === 'right') {
      newSegment.x = firstBodySegment.x + this.segmentSize.w;
      newSegment.y = firstBodySegment.y;

      if (newSegment.x > cnv.width) {
        newSegment.x = -this.segmentSize.w;
      }
    }
    if (this.direction === 'left') {
      newSegment.x = firstBodySegment.x - this.segmentSize.w;
      newSegment.y = firstBodySegment.y;

      if (newSegment.x < 0) {
        newSegment.x = cnv.width + this.segmentSize.w;
      }
    }

    newSegment.w = this.segmentSize.w;
    newSegment.h = this.segmentSize.h;

    this.snake.unshift(newSegment);
  };

  this.setNewDirection = function (newDirection) {
    if (
      this.direction === newDirection ||
      (this.direction === 'down' && newDirection === 'up') ||
      (this.direction === 'up' && newDirection === 'down') ||
      (this.direction === 'right' && newDirection === 'left') ||
      (this.direction === 'left' && newDirection === 'right')
    ) {
      return;
    }
    this.turn = {
      x: this.snake[0].x,
      y: this.snake[0].y,
      prevDirection: this.direction
    };

    this.turns.unshift(this.turn);
    console.log('push ', this.turn);

    this.direction = newDirection;
  };

  function updatePosition(segment, speed) {
    if (this.direction === 'down') {
      segment.y += speed;
    }
    if (this.direction === 'up') {
      segment.y -= speed;
    }
    if (this.direction === 'right') {
      segment.x += speed;
    }
    if (this.direction === 'left') {
      segment.x -= speed;
    }
  }

  this.draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';

    this.snake.forEach(function (segment, i) {
      // ctx.fillRect(segment.x, segment.y, segment.w, segment.h);
      ctx.beginPath();
      ctx.arc(segment.x, segment.y, segment.w / 2, 0, 2 * Math.PI, false);
      ctx.fill();
      // ctx.strokeStyle = "#000";
      // ctx.strokeRect(segment.x - 1, segment.y - 1, segment.w + 2, segment.h + 2);

      // updatePosition(segment, this.speed);
    });

    // requestAnimationFrame(this.draw.bind(this));

    if (this.isStart) {
      this.updateBody();
    }
  };
}
let intervalId = setInterval(game.draw.bind(game), 150);

document.addEventListener('keydown', function (e) {
  e = e || window.event;

  if (e.keyCode == '37') {
    // left arrow
    game.setNewDirection('left');
    // game.isStart = true;
  } else if (e.keyCode == '38') {
    // up arrow
    game.setNewDirection('up');
    // game.isStart = true;
  } else if (e.keyCode == '39') {
    // right arrow
    game.setNewDirection('right');
    // game.isStart = true;
  } else if (e.keyCode == '40') {
    // down arrow
    game.setNewDirection('down');
    game.isStart = true;
  } else {
    return;
  }
});