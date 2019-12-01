/* eslint-disable linebreak-style */
var cols, rows;
var w= 50;
var grid = [];

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
    
    //build the matrix
    buildGrid();

    // select random cells statrting at position (0,0)
    let current = grid[0];
    current.visited = true;
    mazePath( current );
    
    // draw the matrix and maze
    drawGrid( ctx );
    
}

function buildGrid () {
    // create the cell objects
    for ( let y = 0; y < rows; y++ ) {
        for ( let x = 0; x < cols; x++ ) {
            let cell = new Cell(x, y);
            grid.push( cell );
        }
    }
}

function mazePath ( current ) {
    let next = current.checkNeigbors();
    if (next) {
        next.visited = true;
        removeWalls( current, next );
        current = next;
        mazePath( current );
    } else return;
}

function drawGrid( ctx ) {    
    // draw the background
    ctx.fillRect(0, 0, 500, 500);    

    // display the grid
    for ( let i = 0; i < grid.length; i++) {
        grid[i].show( ctx );
    }    
}

function removeWalls( curentCell, nextCell ) {
    let x = curentCell.i - nextCell.i;
    let y = curentCell.j - nextCell.j;
    
    //removing walls horizontally 
    if ( x === 1) {
        curentCell.walls[3] = false;
        nextCell.walls[1] = false;
    }
    else if( x === -1 ) {
        curentCell.walls[1] = false;
        nextCell.walls[3] = false;
    }

    //removing walls vertically 
    if ( y === 1) {
        curentCell.walls[0] = false;
        nextCell.walls[2] = false;
    }
    else if( y === -1 ) {
        curentCell.walls[2] = false;
        nextCell.walls[0] = false;
    }



}

// cells indexes
function index( i, j ) {
    if ( i < 0 || j < 0 || i > cols - 1 || j > cols - 1 ) {
        return -1;
    }
    else {
        return i + j * cols;
    }
}

/* *********************************** */
 
function Cell( i, j ) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true]; // [ top, right, botton, left ]
    this.visited = false;
    
    // draw the cells of the grid
    this.show = function( ctx ) {
        // cell location
        let x = this.i * w;
        let y = this.j * w;
        
        // draw cell
        if ( this.walls[0] ) {     // top wall
            ctx.beginPath();       // Start a new path
            ctx.moveTo(x, y);      // Move the pen to the line starting point
            ctx.lineTo(x + w, y);  // Draw a line to the ending point
            ctx.stroke();          // Render the path            
        }
        if ( this.walls[1] ) {     // rigth wall
            ctx.beginPath();       
            ctx.moveTo( x + w, y );      
            ctx.lineTo( x + w, y + w );  
            ctx.stroke();
        }
        if ( this.walls[2] ) {     // bottom wall
            ctx.beginPath();       
            ctx.moveTo( x + w, y + w );      
            ctx.lineTo( x ,    y + w );  
            ctx.stroke();
        }
        if ( this.walls[3] ) {     // left wall
            ctx.beginPath();       
            ctx.moveTo( x ,    y + w  );      
            ctx.lineTo( x,     y );  
            ctx.stroke();
        }

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.font = '10px serif';
        ctx.fillStyle = 'white';
        
        // color the visited cell
        if ( this.visited ) {
            ctx.fillStyle = 'red';
            ctx.fillText(`${this.visited}`, x + 15, y + 25);
            //ctx.fillRect( x, y , w, w );
        }
    };

    // determine if the cell's neighbors have been visited
    this.checkNeigbors = function() {
        let neighbors = [];

        let topNeighbor    = grid[ index( this.i,     this.j - 1 ) ];
        let rightNeighbor  = grid[ index( this.i + 1, this.j ) ];
        let bottomNeighbor = grid[ index( this.i,     this.j + 1 ) ];
        let leftNeighbor   = grid[ index( this.i - 1, this.j ) ];

        if ( topNeighbor && !topNeighbor.visited ) neighbors.push( topNeighbor );
        if ( rightNeighbor && !rightNeighbor.visited ) neighbors.push( rightNeighbor );
        if ( bottomNeighbor && !bottomNeighbor.visited ) neighbors.push( bottomNeighbor );
        if ( leftNeighbor && !leftNeighbor.visited ) neighbors.push( leftNeighbor );

        if ( neighbors.length > 0 ) {
            let random = Math.floor( Math.random() * neighbors.length );
            return neighbors[random];
        }
    };
}

// *************************************************** //

window.addEventListener('load', () => {
    setup();
});