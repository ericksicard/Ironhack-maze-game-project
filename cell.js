
/* eslint-disable linebreak-style */
class Cell {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true]; // [ top, right, botton, left ]
        this.visited = false;

        // draw the cells of the grid
        this.show = function (ctx) {
            // cell location
            let x = this.i * cellWith;
            let y = this.j * cellWith;
            // draw cell
            if (this.walls[0]) { // top wall
                ctx.beginPath(); // Start a new path
                ctx.moveTo(x, y); // Move the pen to the line starting point
                ctx.lineTo(x + cellWith, y); // Draw a line to the ending point
                ctx.stroke(); // Render the path            
            }
            if (this.walls[1]) { // rigth wall
                ctx.beginPath();
                ctx.moveTo(x + cellWith, y);
                ctx.lineTo(x + cellWith, y + cellWith);
                ctx.stroke();
            }
            if (this.walls[2]) { // bottom wall
                ctx.beginPath();
                ctx.moveTo(x + cellWith, y + cellWith);
                ctx.lineTo(x, y + cellWith);
                ctx.stroke();
            }
            if (this.walls[3]) { // left wall
                ctx.beginPath();
                ctx.moveTo(x, y + cellWith);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            //ctx.font = '10px serif';
            //ctx.fillStyle = 'white';

            // color the visited cell
            //if (this.visited) {
            //    ctx.fillStyle = 'white';
            //    ctx.fillText(`${this.i + this.j * cols}`, x + 15, y + 25);
            //    //ctx.fillRect( x, y , w, w );
            //}
        };

        // determine if the cell's neighbors have been visited
        this.checkNeigbors = function () {
            let neighbors = [];

            let topNeighbor = grid[this.index(this.i, this.j - 1)];
            let rightNeighbor = grid[this.index(this.i + 1, this.j)];
            let bottomNeighbor = grid[this.index(this.i, this.j + 1)];
            let leftNeighbor = grid[this.index(this.i - 1, this.j)];

            if (topNeighbor && !topNeighbor.visited)
                neighbors.push(topNeighbor);
            if (rightNeighbor && !rightNeighbor.visited)
                neighbors.push(rightNeighbor);
            if (bottomNeighbor && !bottomNeighbor.visited)
                neighbors.push(bottomNeighbor);
            if (leftNeighbor && !leftNeighbor.visited)
                neighbors.push(leftNeighbor);

            if (neighbors.length > 0) {
                let random = Math.floor(Math.random() * neighbors.length);
                return neighbors[random];
            }
        };

        // cells indexes
        this.index = function( i, j ) {
            if ( i < 0 || j < 0 || i > cols - 1 || j > cols - 1 ) {
                return -1;
            }
            else {
                return i + j * cols;
            }
        }
    }
}
