var cnv = document.getElementById('canvas');
var ctx = cnv.getContext('2d');

var snake = new Game(10);
snake.draw();

function Game(length) {
  this.length = length || 3;
  this.speed = 0.1; // in px
  this.direction = '';
  this.isStart = false;

  this.segmentSize = {
    w: 6,
    h: 6
  };

  this.position = {
    x: 20,
    y: 30
  };

  this.turn = {};
  this.turns = [];

  this.snake = createBody(this.length, this.segmentSize, this.position);

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

  this.updatePosition = function() {
    // if (this.turns.length === 0) {
    //   updatePos.call(this);
    // }
    updatePos2.call(this);

    function updatePos2() {
      if (this.direction === 'down') {
        this.snake.forEach(function(segment, index, arr) {
          for (var i = 0; i < this.turns.length; i++) {
            if (this.turns[i].prevDirection === 'right') {
              if (segment.x >= this.turns[i].x) {
                segment.y += this.speed;
                segment.x = this.turns[i].x;
              } else {
                segment.x += this.speed;
              }
            } else if (this.turns[i].prevDirection === 'left') {
              if (segment.x <= this.turns[i].x) {
                segment.y += this.speed;
                segment.x = this.turns[i].x;
              } else {
                segment.x -= this.speed;
              }
            } else {
              segment.y += this.speed;
            }

            if (segment.y > cnv.height) {
              segment.y = -this.segmentSize.h;
            }
          }
        }, this);
      }
      if (this.direction === 'up') {
        this.snake.forEach(function(segment) {
          if (turnItem.prevDirection === 'right') {
            if (segment.x >= turnItem.x) {
              segment.y -= this.speed;
              segment.x = turnItem.x;
            } else {
              segment.x += this.speed;
            }
          } else if (turnItem.prevDirection === 'left') {
            if (segment.x <= turnItem.x) {
              segment.y -= this.speed;
              segment.x = turnItem.x;
            } else {
              segment.x -= this.speed;
            }
          } else {
            // return;
          }

          if (segment.y < 0) {
            segment.y = cnv.height + this.segmentSize.h;
          }
        }, this);
      }
      if (this.direction === 'right') {
        this.snake.forEach(function(segment, index, arr) {
          for (var i = 0; i < this.turns.length; i++) {
            if (this.turns[i].prevDirection === 'down') {
              if (segment.y >= this.turns[i].y) {
                segment.x += this.speed;
                segment.y = this.turns[i].y;

                if (index === arr.length - 1) {
                  this.turns.pop();
                }
                break;
              } else {
                segment.y += this.speed;
              }
            } else if (this.turns[i].prevDirection === 'up') {
              if (segment.y <= this.turns[i].y) {
                segment.x += this.speed;
                segment.y = this.turns[i].y;

                if (index === arr.length - 1) {
                  this.turns.pop();
                }

                break;
              } else {
                segment.y -= this.speed;
              }
            } else {
              // segment.x += this.speed;
            }

            if (segment.x > cnv.width) {
              segment.x = -this.segmentSize.w;
            }
          }
        }, this);
      }
      if (this.direction === 'left') {
        this.snake.forEach(function(segment) {
          if (turnItem.prevDirection === 'down') {
            if (segment.y >= turnItem.y) {
              segment.x -= this.speed;
              segment.y = turnItem.y;
            } else {
              segment.y += this.speed;
            }
          } else if (turnItem.prevDirection === 'up') {
            if (segment.y <= turnItem.y) {
              segment.x -= this.speed;
              segment.y = turnItem.y;
            } else {
              segment.y -= this.speed;
            }
          } else {
          }

          if (segment.x < 0) {
            segment.x = cnv.width + this.segmentSize.w;
          }
        }, this);
      }
    }

    // this.turns.forEach(function(turnItem) {
    //   updatePos.call(this, turnItem);
    // }, this);

    function updatePos(turnItem) {
      if (this.direction === 'down') {
        this.snake.forEach(function(segment) {
          if (turnItem.prevDirection === 'right') {
            if (segment.x >= this.turn.x) {
              segment.y += this.speed;
              segment.x = turnItem.x;
            } else {
              segment.x += this.speed;
            }
          } else if (turnItem.prevDirection === 'left') {
            if (segment.x <= turnItem.x) {
              segment.y += this.speed;
              segment.x = turnItem.x;
            } else {
              segment.x -= this.speed;
            }
          } else {
            segment.y += this.speed;
          }

          if (segment.y > cnv.height) {
            segment.y = -this.segmentSize.h;
          }
        }, this);
      }
      if (this.direction === 'up') {
        this.snake.forEach(function(segment) {
          if (turnItem.prevDirection === 'right') {
            if (segment.x >= turnItem.x) {
              segment.y -= this.speed;
              segment.x = turnItem.x;
            } else {
              segment.x += this.speed;
            }
          } else if (turnItem.prevDirection === 'left') {
            if (segment.x <= turnItem.x) {
              segment.y -= this.speed;
              segment.x = turnItem.x;
            } else {
              segment.x -= this.speed;
            }
          } else {
            // return;
          }

          if (segment.y < 0) {
            segment.y = cnv.height + this.segmentSize.h;
          }
        }, this);
      }
      if (this.direction === 'right') {
        this.snake.forEach(function(segment, i) {
          if (turnItem.prevDirection === 'down') {
            if (segment.y >= turnItem.y) {
              segment.x += this.speed;
              segment.y = turnItem.y;
            } else {
              segment.y += this.speed;
            }
          } else if (turnItem.prevDirection === 'up') {
            if (segment.y <= turnItem.y) {
              segment.x += this.speed;
              segment.y = turnItem.y;
            } else {
              segment.y -= this.speed;
            }
          } else {
            // segment.x += this.speed;
          }

          if (segment.x > cnv.width) {
            segment.x = -this.segmentSize.w;
          }
        }, this);
      }
      if (this.direction === 'left') {
        this.snake.forEach(function(segment) {
          if (turnItem.prevDirection === 'down') {
            if (segment.y >= turnItem.y) {
              segment.x -= this.speed;
              segment.y = turnItem.y;
            } else {
              segment.y += this.speed;
            }
          } else if (turnItem.prevDirection === 'up') {
            if (segment.y <= turnItem.y) {
              segment.x -= this.speed;
              segment.y = turnItem.y;
            } else {
              segment.y -= this.speed;
            }
          } else {
          }

          if (segment.x < 0) {
            segment.x = cnv.width + this.segmentSize.w;
          }
        }, this);
      }
    }
  };

  this.setNewDirection = function(newDirection) {
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

  this.draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';

    this.snake.forEach(function(segment, i) {
      // ctx.fillRect(segment.x, segment.y, segment.w, segment.h);
      ctx.beginPath();
      ctx.arc(segment.x, segment.y, segment.w / 2, 0, 2 * Math.PI, false);
      ctx.fill();
      // ctx.strokeStyle = "#000";
      // ctx.strokeRect(segment.x - 1, segment.y - 1, segment.w + 2, segment.h + 2);
    });

    requestAnimationFrame(this.draw.bind(this));

    if (this.isStart) {
      this.updatePosition();
    }
  };
}

document.addEventListener('keydown', function(e) {
  e = e || window.event;

  if (e.keyCode == '37') {
    // left arrow
    snake.setNewDirection('left');
    // snake.isStart = true;
  } else if (e.keyCode == '38') {
    // up arrow
    snake.setNewDirection('up');
    // snake.isStart = true;
  } else if (e.keyCode == '39') {
    // right arrow
    snake.setNewDirection('right');
    // snake.isStart = true;
  } else if (e.keyCode == '40') {
    // down arrow
    snake.setNewDirection('down');
    snake.isStart = true;
  } else {
    return;
  }
});
