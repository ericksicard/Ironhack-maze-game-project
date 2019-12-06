/* eslint-disable linebreak-style */
var cols, rows;
var cellWith = 60;
var grid= [];

let canva = {
    width: 600,
    height: 600
};

function setup( playerStartPoint , hunterStartPoint ) {
    // insert canvas HTML
    let canvasHTML = `<canvas id="maze" width=${canva.width} height=${canva.height}></canvas>`;
    document.querySelector('body').insertAdjacentHTML('afterBegin', canvasHTML);  
    // set canvas context
    let ctx = document.getElementById('maze').getContext('2d');
    
    // number of columns & rows
    cols = Math.floor(document.getElementById('maze').width / cellWith);
    rows = Math.floor(document.getElementById('maze').height / cellWith);

    
    //create every cell of the grid to build the maze
    buildGrid();
    
    // create maze path statrting at position (0,0)
    path();
    
    // hunter: (image source, x, y, width, height, position)
    let hunter = new Hunter( 
        './img/hunter.png',                                 // img
        grid[hunterStartPoint].i * cellWith + cellWith/2,   // posX
        grid[hunterStartPoint].j * cellWith + cellWith/2,   // posY
        cellWith/2,                                         // imgH
        cellWith/2,                                         // imgW
        hunterStartPoint                                    // idx    
        );

    // player: (image source, x, y, width, height, position)
    let player = new Player(
        './img/walker.png',                                 // img
        grid[playerStartPoint].i * cellWith + cellWith/2,   // posX
        grid[playerStartPoint].j * cellWith + cellWith/2,   // posY
        cellWith/2,                                         // imgH
        cellWith/2,                                         // imgW
        playerStartPoint                                    // idx
        );
    
    document.addEventListener('keydown' , event => {
        player.moves( event )
    });
        
    // draw the maze
    draw ( ctx, player, hunter );
}

// create the cell objects of the grid
function buildGrid () {
    for ( let y = 0; y < rows; y++ ) {
        for ( let x = 0; x < cols; x++ ) {
            let cell = new Cell(x, y);
            grid.push( cell );
        }
    }
}

// Build the maze using while loop
function path() {
    let current = grid[0];
    current.visited = true;
    let non = nonVisited();
    let next = {};
    let stack = [];
    
    while ( non.length > 0 ) {
        next = current.checkNeigbors();
        if ( next ) {
            next.visited = true;
            stack.push( current );
            removeWalls( current, next );
            current = next;
            non = nonVisited();
        }
        else if ( stack.length > 0 ) {
            current = stack.pop();
            non = nonVisited();
        }
        else return;
    }
}

// display the maze
function draw ( ctx, player, hunter ) {

    let intv = setInterval( function(){
        ctx.clearRect(0, 0, canva.width, canva.height);
    
        // draw the background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canva.width, canva.height);    
    
        // display the grid
        for ( let i = 0; i < grid.length; i++) {
            grid[i].show( ctx );
        }
    
        // display player
        player.show( ctx )
    
        // display hunter
        hunter.show( ctx );
        hunter.moves()
    }, 1000/5 )
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

function nonVisited() {
    let non = grid.filter( el => !el.visited );
    return non;
}


// *************************************************** //

window.addEventListener('load', () => {
    setup( 0, 99 );
});