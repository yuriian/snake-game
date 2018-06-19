var SnakeGame = (function () {
  var cvs = null;
  var ctx = null;

  var SnakeGame = function (bodyLength, direction, canvas) {
    this.length = bodyLength || 3;
    this.direction = direction || this.defaultDirection;
    this.isStart = false;
    this.snake = createBody(this.length, this.segmentSize, this.initPos);

    cvs = canvas;
    ctx = canvas.getContext('2d');
  }

  SnakeGame.prototype = {
    speed: 70, // in ms
    segmentSize: {
      w: 6,
      h: 6
    },
    initPos: {
      x: 20,
      y: 50
    },
    defaultDirection: 'down',

    init: function () {
      addListeners.call(this);
      draw.call(this);
    },

    start: function (event) {
      if (!this.isStart) {
        this.isStart = true;
        this.intervalId = setInterval(draw.bind(this), this.speed);
      }
    },
  };

  var createBody = function (length, segmentSize, position) {
    var snake = [];
    var segment;

    for (var i = 0; i < length; i++) {
      segment = {};

      if (i === 0) {
        segment.w = segmentSize.w + 2;
        segment.h = segmentSize.h + 2;

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

  var updateBody = function () {
    this.snake.pop();

    const newSegment = {};

    if (this.direction === 'down') {
      newSegment.x = this.snake[0].x;
      newSegment.y = this.snake[0].y + this.segmentSize.h;

      if (newSegment.y > cvs.height) {
        newSegment.y = -this.segmentSize.h;
      }
    }
    if (this.direction === 'up') {
      newSegment.x = this.snake[0].x;
      newSegment.y = this.snake[0].y - this.segmentSize.h;

      if (newSegment.y < 0) {
        newSegment.y = cvs.height + this.segmentSize.h;
      }
    }
    if (this.direction === 'right') {
      newSegment.x = this.snake[0].x + this.segmentSize.w;
      newSegment.y = this.snake[0].y;

      if (newSegment.x > cvs.width) {
        newSegment.x = -this.segmentSize.w;
      }
    }
    if (this.direction === 'left') {
      newSegment.x = this.snake[0].x - this.segmentSize.w;
      newSegment.y = this.snake[0].y;

      if (newSegment.x < 0) {
        newSegment.x = cvs.width + this.segmentSize.w;
      }
    }

    newSegment.w = this.segmentSize.w + 2;
    newSegment.h = this.segmentSize.h;

    this.snake.unshift(newSegment);
  };

  var addListeners = function () {
    document.addEventListener('keydown', setNewDirection.bind(this));
    document.addEventListener('keydown', this.start.bind(this));
  };

  var draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';

    this.snake.forEach(function (segment, index, array) {
      // ctx.fillRect(segment.x, segment.y, segment.w, segment.h);
      ctx.beginPath();

      if (index !== 0) {
        segment.w = array[0].w - 2;
      }

      ctx.arc(segment.x, segment.y, segment.w / 2, 0, 2 * Math.PI, false);
      ctx.fill();
      // ctx.strokeStyle = "#000";
      // ctx.strokeRect(segment.x - 1, segment.y - 1, segment.w + 2, segment.h + 2);

      // updatePosition(segment, this.speed);
    });

    // requestAnimationFrame(this.draw.bind(this));

    if (this.isStart) {
      updateBody.call(this);
    }
  };

  var setNewDirection = function (event) {
    e = event || window.event;
    let newDirection = '';

    if (e.keyCode == '37') {
      newDirection = 'left';
    } else if (e.keyCode == '38') {
      newDirection = 'up';
    } else if (e.keyCode == '39') {
      newDirection = 'right';
    } else if (e.keyCode == '40') {
      newDirection = 'down';
    } else {
      return;
    }

    if (
      this.direction === newDirection ||
      (this.direction === 'down' && newDirection === 'up') ||
      (this.direction === 'up' && newDirection === 'down') ||
      (this.direction === 'right' && newDirection === 'left') ||
      (this.direction === 'left' && newDirection === 'right')
    ) {
      return;
    }

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

  return SnakeGame;
})();

new SnakeGame(5, null, document.getElementById('canvas'))
  .init();