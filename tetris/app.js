const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');


const ROW = 20;
const COLUMN = 10;
const VACANT = 'white';
const SQ =  20;


function drawSquare(x, y, color) {
  ctx.fill = color;
  ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
  ctx.strokeStyle = 'black';
  ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

let board = [];
for( r = 0; r <ROW; r++){
    board[r] = [];
    for(c = 0; c<COLUMN; c++){
        board[r][c] = VACANT;
    }
}

function drawBoard() {
  for(r=0;r<ROW;r++) {
    for(c=0;c<COLUMN;c++) {
      drawSquare(c,r,board[r][c]);
    }
  }
}
drawBoard();