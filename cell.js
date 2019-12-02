
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
            let x = this.i * w;
            let y = this.j * w;
            // draw cell
            if (this.walls[0]) { // top wall
                ctx.beginPath(); // Start a new path
                ctx.moveTo(x, y); // Move the pen to the line starting point
                ctx.lineTo(x + w, y); // Draw a line to the ending point
                ctx.stroke(); // Render the path            
            }
            if (this.walls[1]) { // rigth wall
                ctx.beginPath();
                ctx.moveTo(x + w, y);
                ctx.lineTo(x + w, y + w);
                ctx.stroke();
            }
            if (this.walls[2]) { // bottom wall
                ctx.beginPath();
                ctx.moveTo(x + w, y + w);
                ctx.lineTo(x, y + w);
                ctx.stroke();
            }
            if (this.walls[3]) { // left wall
                ctx.beginPath();
                ctx.moveTo(x, y + w);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            //ctx.font = '10px serif';
            //ctx.fillStyle = 'white';

            // color the visited cell
            if (this.visited) {
                ctx.fillStyle = 'white';
                ctx.fillText(`${this.i + this.j * cols}`, x + 15, y + 25);
                //ctx.fillRect( x, y , w, w );
            }
        };

        // determine if the cell's neighbors have been visited
        this.checkNeigbors = function () {
            let neighbors = [];

            let topNeighbor = grid[index(this.i, this.j - 1)];
            let rightNeighbor = grid[index(this.i + 1, this.j)];
            let bottomNeighbor = grid[index(this.i, this.j + 1)];
            let leftNeighbor = grid[index(this.i - 1, this.j)];

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
    }
}
