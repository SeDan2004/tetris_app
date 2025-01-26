const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;
const TETRAMINOS = {
    ["T"]: {
        color: "green",
        matrix: [
            [1, 1, 1],
            [0, 1, 0],
            [0, 0, 0]
        ]
    },
    ["J"]: {
        color: "red",
        matrix: [
            [0, 2, 0],
            [0, 2, 0],
            [2, 2, 0]
        ]
    },
    ["L"]: {
        color: "yellow",
        matrix: [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ]
    },
    ["Z"]: {
        color: "blue",
        matrix: [
            [4, 4, 0],
            [0, 4, 4],
            [0, 0, 0]
        ]
    },
    ["S"]: {
        color: "orange",
        matrix: [
            [0, 5, 5],
            [5, 5, 0],
            [0, 0, 0]
        ]
    },
    ["O"]: {
        color: "purple",
        matrix: [
            [6, 6],
            [6, 6]
        ]
    },
    ["I"]: {
        color: "aqua",
        matrix: [
            [7, 7, 7, 7],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    }
};

let ctx,
    canvas,
    tetris,
    startBtn,
	backToMenuBtn,
	tetrisStatus,
	tetrisScoreTxt,
	board,
	speed,
	score,
	tetraminosSequence,
	figure,
	figureX, 
	figureY,
	figureEnd,
	timeInter,
	nextFigureInter;

canvas = $(".canvas")[0];
ctx = canvas.getContext("2d");

tetris = $(".tetris");
startBtn = $(".start");
backToMenuBtn = $(".back_to_menu");
tetrisStatus = $(".tetris_status");
tetrisScoreTxt = $(".tetris_score_txt");
tetraminosSequence = [];
score = 0;
speed = 1000;

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function addEvent() {
  startBtn.on("click", start);
  backToMenuBtn.on("click", backToMenuFromTetris);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getEmptyBoard() {
  let emptyBoard = [];

  for (let i = 0, j = 0; i < ROWS; i++) {
    let row = [];
    
    while (j < COLS) {
      row.push(0);
      j++;
    }

    j = 0;
    emptyBoard.push(row);
  }

  return emptyBoard;
}

function getRandomTetraminosSequence() {
  let sequence = [],
      tetraminosKeys = Object.keys(TETRAMINOS);

  while (tetraminosKeys.length !== 0) {
    let randomKeyInd = getRandomInt(0, tetraminosKeys.length - 1),
        key = tetraminosKeys.splice(randomKeyInd, 1)[0];

    sequence.push(key);
  }

  return sequence;
}

function rotate(figureMatrix) {
  let n = figureMatrix.length - 1;

  return figureMatrix.map((row, i) => {
    return row.map((col, j) => figureMatrix[n - j][i]);
  })
}

function getNextFigure() {
  if (tetraminosSequence.length === 0) {
    tetraminosSequence = getRandomTetraminosSequence();
  }

  return TETRAMINOS[tetraminosSequence.pop()];
}

function figureCycle(action) {
  var matrix = figure.matrix;

  function add() {
    board[cellY][cellX] = matrix[y][x];
  }

  function clear() {
    board[cellY][cellX] = 0;
    ctx.clearRect(cellX, cellY, 1, 1);
  }

  function draw() {
    ctx.fillStyle = figure.color;
    ctx.fillRect(cellX, cellY, 1, 1);
  }

  function checkFigureCellInBoard(x, y) {
    return board[y] !== undefined && 
           board[y][x] !== undefined && 
           board[y][x] === 0;
  }

  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      var cellX = figureX + x;
      var cellY = figureY + y;

      if (matrix[y][x] > 0) {
        if (action === "add") add();
        if (action === "draw") draw();
        if (action === "clear") clear();
        if (action === "check") {
          if (!checkFigureCellInBoard(cellX, cellY)) {
            return false;
          }
        }
      }
    }
  }
}

function move(e) {
  let key = e.key,
      matrix = figure.matrix;

  if (figureEnd) return;
	  
  figureCycle("clear");

  if (key === "ArrowRight") {
    figureX++;
    if (figureCycle("check") === false) figureX--;
  }

  if (key === "ArrowLeft") {
    figureX--;
    if (figureCycle("check") === false) figureX++;
  }

  if (key === "ArrowUp") {
    figure.matrix = rotate(matrix);
    if (figureCycle("check") === false) {
      figure.matrix = matrix;
    }
  }

  if (key === "ArrowDown") {
    figureY++;
    score += 1;

    if (figureCycle("check") === false) {
      figureY--;
      figureEnd = true;
    }
  }

  figureCycle("add");
  figureCycle("draw");
}

function figureDown() {
  figureCycle("clear");
  
  figureY++;

  if (figureCycle("check") === false) {
    figureY--;
    figureEnd = true;
  }

  figureCycle("add");
  figureCycle("draw");
}

function checkFullRowsInBoard() {
  let rowIndexes, maxInd;

  rowIndexes = board.filter((row) => {
    let notEmptyCellCount = 0;
    for (let cell of row) {
      if (cell > 0) {
        notEmptyCellCount++;
      }
    }
    return notEmptyCellCount === row.length;
  });

  if (rowIndexes.length === 0) return;

  rowIndexes = rowIndexes.map(row => board.indexOf(row));
  
  maxInd = rowIndexes.reduce((res, ind) => {
    if (res < ind) res = ind;
    return res;
  });

  score += (200 * rowIndexes.length);

  for (let i = 0; i < rowIndexes.length; i++) {
    let rowIndex = rowIndexes[i],
        emptyRow = "0".repeat(COLS).split("").map(cell => +cell);

    board.splice(rowIndex, 1);
    board.unshift(emptyRow);

    for (let j = 0; j < COLS; j++) {
      ctx.clearRect(j, rowIndex, 1, 1);
    }
  }

  for (let y = 0; y <= maxInd; y++) {
    let row = board[y];
    for (let x = 0; x < row.length; x++) {
      let cell = row[x];
      
      if (cell === 0) {
        ctx.clearRect(x, y, 1, 1);
      } else {
        let figureColor = Object.values(TETRAMINOS)
                .find(figure => figure.matrix.find(row => row.includes(cell)))
                .color;

        ctx.fillStyle = figureColor;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}

function start() {
  if (score !== 0) score = 0;
	
  board = getEmptyBoard();
  startBtn.css("display", "none");
  backToMenuBtn.css("display", "none");
  tetrisScoreTxt.css("visibility", "visible");
  tetrisStatus.css("visibility", "visible");
  
  if (tetrisStatus.text() === "Игра закончена") {
	score = 0;
	tetrisStatus.text();
	tetrisScoreTxt.find("span").text("0");
    
	tetrisStatus.text("");
	tetrisStatus.css("color", "");
	
	clearBoard();
  }
    
  showTetrisTime();
  
  setTimeout(() => {
	nextFigureInter = setInterval(() => {
	  figureDown();
	    
	  if (figureEnd) {
	    checkFullRowsInBoard();
		tetrisScoreTxt.find("span").text(score);
		        
	    setTimeout(() => {
	      let endGame = nextStep();
		  
	      if (endGame) {
			tetrisStatus.css("color", "red");
			tetrisStatus.text("Игра закончена");
			startBtn.css("display", "block");
			backToMenuBtn.css("display", "block");
			document.body.removeEventListener("keydown", move);
			
	        clearInterval(timeInter);
	        clearInterval(nextFigureInter);
			
			if (score > userScore) {
			  userScore = score;
			  scoreSpan.text(userScore);
			  saveScore();
			}
	      }
	    }, 100);
	  }
	}, speed);

	nextStep();
  }, 1000);
}

function nextStep() {
  figureX = 3;
  figureY = 0;
  figureEnd = false;
  figure = JSON.parse(JSON.stringify(getNextFigure()));
  
  document.body.addEventListener("keydown", move);

  if (figureCycle("check") === false) {
    return true;
  }

  figureCycle("add");
  figureCycle("draw");
}

function showTetrisTime() {
  let time,
      date = new Date();
  
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  
  timeInter = setInterval(() => {
    time = date.toLocaleTimeString();
	
	if (date.getHours() === 0) {
	  time = time.slice(time.indexOf(":") + 1);
	}
	
	tetrisStatus.text(time);
	date.setSeconds(date.getSeconds() + 1);
  }, 1000);
}

function clearBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
	  ctx.clearRect(x, y, 1, 1);
	}
  }
}

function saveScore() {  
  $.ajax({
	method: "POST",
	url: "/score/save_score",
	contentType: "application/json",
	data: JSON.stringify({
	  "score": userScore
	})
  })
}

function backToMenuFromTetris(e) {
  if (board !== undefined) {
	clearBoard();
  }

  score = 0;
  
  tetrisStatus.text("");
  tetrisStatus.css("color", "");
  tetrisStatus.css("visibility", "hidden");
	  
  tetrisScoreTxt.find("span").text("0");
  tetrisScoreTxt.css("visibility", "hidden");
	  
  tetris.animate({"opacity": 0}, {
    duration: 500,
    complete: function () {
	  tetris.hide();
	  menu.show();
	  menu.animate({"opacity": 1});
    }
  });
}

addEvent();