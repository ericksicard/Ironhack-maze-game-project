/* eslint-disable linebreak-style */
var cols, rows;
var cellWith = 60;
var grid= [];

let canva = {
    width: 600,
    height: 600
};

function setup() {
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
    
    // player: (image source, x, y, width, height, position)
    let player = new Player( './img/walker.png', cellWith/2, cellWith/2, cellWith/2, cellWith/2, 0 );
    document.addEventListener('keydown' , event => {
        player.moves( event )
        draw ( ctx, player );
    });
        
    // draw the maze
    draw ( ctx, player );

}

// create the cell objects
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

function draw ( ctx, obj ) {

    ctx.clearRect(0, 0, canva.width, canva.height);

    // draw the background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canva.width, canva.height);    

    // display the grid
    for ( let i = 0; i < grid.length; i++) {
        grid[i].show( ctx );
    }

    // display player
    let img = new Image();
    img.src = obj.imgScr;
    img.addEventListener( 'load', function() {
        ctx.drawImage(img, (obj.posX - obj.imgW/2), (obj.posY - obj.imgH/2), obj.imgW, obj.imgH);
    });
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
    setup();
});