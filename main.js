var cols, rows;
var w= 50;
var grid = [];
var current;

let canva = {
    width: 500,
    height: 500
};

function setup() {
    // insert canvas HTML
    let canvasHTML = `<canvas id="maze" width=${canva.width} height=${canva.height}></canvas>`;
    document.querySelector('body').insertAdjacentHTML('afterBegin', canvasHTML);  
    // set canvas context
    let ctx = document.getElementById('maze').getContext('2d');
    
    // number of columns & rows
    cols = Math.floor(document.getElementById('maze').width / w);
    rows = Math.floor(document.getElementById('maze').height / w);
    
    // draw the matrix
    draw( ctx );

}

function draw( ctx ) {
    // draw the background
    ctx.fillRect(0, 0, 500, 500);
    
    // create the cell objects
    for ( let y = 0; y <= rows; y++ ) {
        for ( let x = 0; x <= cols; x++ ) {
            let cell = new Cell(x, y);
            grid.push( cell );
        }
    }
    
    // start to build the maze at position 0,0
    current = grid[0];
    current.visited = true;
    
    // display the grid
    for ( let i = 0; i < grid.length; i++) {
        grid[i].show( ctx );
    }
    
}

// cells indexes
function index( i, j ) {
    if ( i < 0 || j < 0 || i > cols - 1 || j > cols - 1 ) return -1;
    return i + j * cols;
}

/* *********************************** */
 
function Cell( i, j ) {
    this.i = i;
    this.j = j;
    // [ top, right, botton, left ]
    this.walls = [true, true, true, true]
    this.visited = false;
    
    // draw the cells of the grid
    this.show = function( ctx ) {
        // cell location
        let x = this.i * w;
        let y = this.j * w;
        // draw cell
        ctx.moveTo( x,     y    );
        if ( this.walls[0] ) ctx.lineTo( x + w, y    );
        if ( this.walls[0] ) ctx.lineTo( x + w, y + w);
        if ( this.walls[0] ) ctx.lineTo( x ,    y + w);
        if ( this.walls[0] ) ctx.lineTo( x,     y    );
        ctx.lineWidth = 1;
        ctx.strokeStyle = "white";
        ctx.stroke();

        if ( this.visited ) {
            ctx.fillStyle = 'blue';
            ctx.fillRect( x, y , w, w);
        }
    }

    // determine if the cell's neighbors have been visited
    this.checkNeigbors = function() {
        let neighbors = [];

        let topNeighbor    = grid[ index( i,     j - 1 )];
        let rightNeighbor  = grid[ index( i + 1, j )];
        let bottomNeighbor = grid[ index( i,     j + 1 )];
        let leftNeighbor   = grid[ index( i - 1, j )];

        if ( topNeighbor && !topNeighbor.visited ) neighbors.push( topNeighbor )
        if ( rightNeighbor && !rightNeighbor.visited ) neighbors.push( rightNeighbor )
        if ( bottomNeighbor && !bottomNeighbor.visited ) neighbors.push( bottomNeighbor )
        if ( leftNeighbor && !leftNeighbor.visited ) neighbors.push( leftNeighbor )

        if ( neighbors.length > 0 ) {
            let random = Math.floor( Math.random() * neighbors.length );
            return neighbors[random];
        }
    }


}

// *************************************************** //

window.addEventListener('load', () => {
    setup();
});