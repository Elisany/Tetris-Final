//desenhar quadro
//comentario
function drawBoard(){
    for (let currentRow = 0; currentRow< ROW; currentRow++){
        for(let currentCol = 0; currentCol < COL; currentCol++){
            const currentSquareColor = board[currentRow][currentCol];
           drawSquare(currentRow, currentCol, currentSquareColor);
        }
    }

    scoreElement.innerHTML = score;
    speedElement.innerHTML = speed;
}

//pintar um quadrado no eixo x e y em determinda cor
function drawSquare(y, x, color){
ctx.fillStyle =  color;
ctx.fillRect(x * SQ, y * SQ, SQ, SQ);


//se a cor for cor normal pintar tbm a borda
if(color ==defaultColor){
    ctx.strokeStyle = defaultBorder;
}
//posição x e y multiplicado pelo tanto de pixel
ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}
//cria uma peça aleatoria puxando do array
function randomPiece(){
const ramdomPieceNumber = Math.floor(Math.random() *PIECES.length);// criando peça aleatória
return new Piece(
    PIECES[ramdomPieceNumber][0],//peça
    PIECES[ramdomPieceNumber][1],//cor
);
}

//função para queda do objeto
function drop() {
    const now = Date.now();
    const delta = now - dropStart;

    if (delta > (500 - speed * 50)) { // Ajusta o intervalo baseado na velocidade
        piece.moveDown();
        dropStart = Date.now();
    }
    requestAnimationFrame(drop);
}


function CONTROL(event) {

if (!canMove){
    return false;
}


    const moveFunctions ={
        ArrowLeft(){
          piece.moveLeft();
          dropStart = Date.now();
        },

        ArrowRight(){
        piece.moveRight();
        dropStart = Date.now();

        },
        ArrowUp(){
           piece.rotate();
           dropStart = Date.now();

        },
        ArrowDown() {
            piece.moveDown();
        }

    };


const movePiece = moveFunctions[event.code];
    movePiece();
}





//função repintar começar denovo
function updateRowAndScore(row) {
    // Remover a linha completa
    for (let col = 0; col < COL; col++) {
        board[row][col] = defaultColor;
    }

    // Mover todas as linhas acima para baixo
    for (let y = row; y > 0; y--) {
        for (let col = 0; col < COL; col++) {
            board[y][col] = board[y - 1][col];
        }
    }
}

function removeRow(rowToRemove,colToRemove) {
board[rowToRemove][colToRemove] = board[rowToRemove-1][colToRemove];
}



function gameOver(){
    let warning = confirm("Game over! Pressione ok para continuar");

    if (warning) {
        resetGame();
    }else{
        alert ("Game Over!")
    }
}

function resetGame(){
speed = 500;// a peça cai a cada meio segundo
dropStart = Date.now();
score = 0;


//loop para desenhar na tela novamente após game over
 board = [];
for (let currentRow =0; currentRow <ROW; currentRow++){
board [currentRow] = [];
for (let currentCol = 0; currentCol< COL; currentCol++){
    board[currentRow][currentCol]= defaultColor;
}

}

piece = randomPiece();
drawBoard();
}