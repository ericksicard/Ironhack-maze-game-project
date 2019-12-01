/* eslint-disable linebreak-style */
var cols, rows;
var w= 50;
var grid= [];
var stack = [];

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
    mazePath( grid[0] );
    
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
    current.visited = true;
    let next = current.checkNeigbors();

    if (next) {
        next.visited = true;
        stack.push( current );
        removeWalls( current, next );
        current = next;
        mazePath( current );
    } 
    else if( stack.length > 0 ) {
        current = stack.pop();
        mazePath( current );
    } 
    else return; 
}

function drawGrid( ctx ) {    
    // draw the background
    ctx.fillRect(0, 0, canva.width, canva.height);    

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


// *************************************************** //

window.addEventListener('load', () => {
    setup();
});