class Piece {
    constructor(piece, color) {
        this.piece = piece;
        this.color = color;

        this.pieceN = 0;
        this.activePiece = this.piece[this.pieceN];

        this.x = 3;
        this.y = -2; // isso porque a peça começa antes do jogo começar
    }

    fill(color) {
        for (let currentRow = 0; currentRow < this.activePiece.length; currentRow++) {
            for (let currentCol = 0; currentCol < this.activePiece.length; currentCol++) {
                if (this.activePiece[currentRow][currentCol]) {
                    drawSquare(this.y + currentRow, this.x + currentCol, color);

                }
            }
        }
    }


    draw() {
        this.fill(this.color);
    }

    unDraw() {
        this.fill(defaultColor);
    }

    moveLeft() {
        if (!this.collision(-1, 0, this.activePiece)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    moveRight() {
        if (!this.collision(1, 0, this.activePiece)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    rotate() {

        let nextPattern = this.piece[(this.pieceN + 1) % this.piece.length];
        let kick = 0;

        if (this.collision(0, 0, nextPattern)) {
            kick = 1;


            if (this.x > COL / 2) {
                kick = -1;
            }
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.pieceN = (this.pieceN + 1) % this.piece.length;
            this.activePiece = this.piece[this.pieceN];
            this.draw();
        }
    }

    moveDown() {// cada vez que rodar, apaga a peça e pinta novamente
        if (!this.collision(0, 1, this.activePiece)) {
            this.unDraw();
            this.y++;
            this.draw();
            return;
        }
        this.lock();
        piece = randomPiece();
    }

    collision(x, y, futurePiece) {
        for (let currentRow = 0; currentRow < futurePiece.length; currentRow++) {
            for (let currentCol = 0; currentCol < futurePiece.length; currentCol++) {
                if (!futurePiece[currentRow][currentCol]) {
                    continue;
                }

                const newX = this.x + currentCol + x;
                const newY = this.y + currentRow + y;

                if (newX < 0 || newX >= COL || newY >= ROW) {
                    return true;
                }

                if (newY < 0) {
                    continue;
                }

                if (board[newY][newX] != defaultColor) {
                    return true;
                }

            }
        }
        return false;
    }

    lock() {
        canMove = false;
        let completedLines = 0;

        // Trava a peça no lugar
        for (let currentRow = 0; currentRow < this.activePiece.length; currentRow++) {
            for (let currentCol = 0; currentCol < this.activePiece.length; currentCol++) {
                if (!this.activePiece[currentRow][currentCol]) {
                    continue;
                }

                if (this.y + currentRow < 0) {
                    gameOver();
                    return; // Encerra o jogo se a peça estiver acima do topo do quadro
                }

                // Copia a cor da peça para o quadro
                board[this.y + currentRow][this.x + currentCol] = this.color;
            }
        }

        // Verifica linhas completas
        for (let currentRow = 0; currentRow < ROW; currentRow++) {
            let isRowFull = true;

            for (let currentCol = 0; currentCol < COL; currentCol++) {
                if (board[currentRow][currentCol] === defaultColor) {
                    isRowFull = false;
                    break;
                }
            }

            if (isRowFull) {
                this.removeRow(currentRow);
                completedLines++;
                currentRow--; // Decrementa o índice para verificar novamente a linha que foi movida para baixo
            }
        }

        // Aplica pontuação baseada no número de linhas completadas
        if (completedLines > 0) {
            applyScore(completedLines);
        }

        piece = randomPiece(); // Gera nova peça
        drawBoard();
        canMove = true;
    }

    removeRow(rowToRemove) {
        for (let col = 0; col < COL; col++) {
            board[rowToRemove][col] = defaultColor;
        }

        for (let y = rowToRemove; y > 0; y--) {
            for (let col = 0; col < COL; col++) {
                board[y][col] = board[y - 1][col];
            }
        }
    }
}
    function applyScore(completedLines) {
        let scoreToAdd = 0;

        switch (completedLines) {
            case 1:
                scoreToAdd = 50;
                break;
            case 2:
                scoreToAdd = 120;
                break;
            case 3:
                scoreToAdd = 190;
                break;
            case 4:
                scoreToAdd = 300;
                break;
            default:
                scoreToAdd = 0;
                break;
        }

        score += scoreToAdd;
        scoreElement.innerHTML = score;
    }
