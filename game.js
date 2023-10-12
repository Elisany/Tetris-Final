const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElements = document.getElementsByClassName("score");
const speedElement = document.getElementById("speed");

//tamanho do quadro
const ROW = 20;
const COL = 10;
const SQ = 30;
const defaultColor = "#111111";
const defaultBorder ="rgba(255,255,255,0.1)";


let canMove = true;
let speed = 500;// a peça cai a cada meio segundo
let dropStart = Date.now();
let score = 0;


//loop para desenhar na tela
let board = [];
for (let currentRow =0; currentRow <ROW; currentRow++){
board [currentRow] = [];
for (let currentCol = 0; currentCol< COL; currentCol++){
    board[currentRow][currentCol]= defaultColor;
}

}
drawBoard(); 

const PIECES =[
[Z, 'red'],
[S,'green'],
[T,'yellow'],
[O,'blue'],
[L,'purple'],
[I,'cyan'],
[J,'orange'],
];

let piece = randomPiece();

drop();

document.addEventListener("keydown",CONTROL);