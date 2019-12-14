/* eslint-disable linebreak-style */
var cols, rows;
var cellWith = 0;
var grid= [];
var hunterArr = [];
let frames = 0;
let intv;

var canva = {
    width: 600,
    height: 600
};


function setup( playerStartPoint, difLevel ) {

    // insert canvas HTML
    let canvasHTML = `<div id="maze-container">
                        <canvas id="maze" width=${canva.width} height=${canva.height}></canvas>
                      </div>`;
    document.querySelector('.game_frame').insertAdjacentHTML('afterBegin', canvasHTML);  
    // set canvas context
    let ctx = document.getElementById('maze').getContext('2d');

    // maze difficulty
    if( difLevel === 'select') cellWith = 600;
    else if( difLevel === 'easy') cellWith = 60;
    else if( difLevel === 'medium') cellWith = 50;
    else if( difLevel === 'hard') cellWith = 30;
    
    // number of columns & rows
    cols = canva.width / cellWith;
    rows = canva.height / cellWith;
    
    //create every cell of the grid to build the maze
    buildGrid();
    
    // create maze path statrting at position (0,0)
    path();
    
    // hunters' general starting position
    let hunterStartPoint = cols * rows;

    // hunter bottom right
    let hunter1 = new Hunter( 
        './img/hunter.png',                                     // img
        grid[hunterStartPoint - 1].i * cellWith + cellWith/2,   // posX
        grid[hunterStartPoint - 1].j * cellWith + cellWith/2,   // posY
        cellWith/2,                                             // imgH
        cellWith/2,                                             // imgW
        hunterStartPoint - 1                                    // idx    
    );

    // hunter2 bottom left
    let hunter2 = new Hunter( 
        './img/hunter.png',                                      // img
        grid[hunterStartPoint - cols].i * cellWith + cellWith/2, // posX
        grid[hunterStartPoint - cols].j * cellWith + cellWith/2, // posY
        cellWith/2,                                              // imgH
        cellWith/2,                                              // imgW
        hunterStartPoint - cols                                  // idx    
    );

    // hunter3 top left
    let hunter3 = new Hunter( 
        './img/hunter.png',                                     // img
        grid[cols - 1].i * cellWith + cellWith/2,               // posX
        grid[rows - 1].j * cellWith + cellWith/2,               // posY
        cellWith/2,                                             // imgH
        cellWith/2,                                             // imgW
        rows - 1                                                // idx    
    );

    // hunters difficulty
    if( difLevel === 'easy') hunterArr = [hunter1];
    else if( difLevel === 'medium') hunterArr = [hunter1, hunter2];
    else if( difLevel === 'hard') hunterArr = [hunter1, hunter2, hunter3];


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
        player.moves( event );
    });
        
    // draw the maze
    draw ( ctx, player );
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
    let non = nonVisited();  // array of non-visited cells
    let next = {};
    let stack = [];
    
    while ( non.length > 0 ) {
        next = current.checkNeigbors(); // getting a random non-visited neighbor
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
function draw ( ctx, player ) {
   
    
    intv = setInterval( () => {
        ctx.clearRect(0, 0, canva.width, canva.height);
    
        // draw the background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canva.width, canva.height);    
    
        // display the grid
        for ( let i = 0; i < grid.length; i++) {
            grid[i].show( ctx );
        }
    
        // display player
        player.show( ctx );
    
        // display hunters
        for ( let i = 0; i < hunterArr.length; i++ ) {
            hunterArr[i].show( ctx );
        }

        // cheacking collision with hunters
        let collisioned = collision( player, hunterArr);
        if ( collisioned ) clearInterval( intv );

        // winning
        let won = winning( player );
        if( won ) {
            clearInterval( intv );
            setTimeout(() => alert( "YOU WON!!!!!"), 1)
            window.location.reload();            
        }
        // moves hunters
        if(frames % 2 === 0) {
            for ( let i = 0; i < hunterArr.length; i++ ) {
                hunterArr[i].moves();
            }
        }

        frames++;

    }, 1200/ 6 );
}

// removing cells to create the path
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
//function index( i, j ) {
//    if ( i < 0 || j < 0 || i > cols - 1 || j > cols - 1 ) {
//        return -1;
//    }
//    else {
//        return i + j * cols;
//    }
//}

// creating array of non visted cells
function nonVisited() {
    let non = grid.filter( el => !el.visited );
    return non;
}

// cheacking for collision player - hunter
function collision( player, hunterArr ) {
    let collArr = [];

    for( let i = 0; i < hunterArr.length; i++ ) {        
        let colRight = ( (player.posX + player.imgW/2 >= hunterArr[i].posX) && (player.posX <= hunterArr[i].posX) );
        let colLeft = ( (player.posX - player.imgW/2 <= hunterArr[i].posX + hunterArr[i].imgW/2) && (player.posX + player.imgW/2 >= hunterArr[i].posX + hunterArr[i].imgW/2) );
        let colTop = ( (player.posY - player.imgH/2 <= hunterArr[i].posY + hunterArr[i].imgH/2) && (player.posY + player.imgH/2 >= hunterArr[i].posY + hunterArr[i].imgH/2) );
        let colBot = ( (player.posY + player.imgH/2 >= hunterArr[i].posY - hunterArr[i].imgH/2) && (player.posY <= hunterArr[i].posY) );

        if ( (colRight || colLeft) && (colTop || colBot)) {
            collArr.push( true );
        } 
        else collArr.push( false );
    }

    if( collArr.includes( true ) ) return true;
    return false;
}

// checking for winning condition
function winning( player ) {
    if( player.idx == grid.length - 1 ) return true;
    return false;
}


// *************************************************** //

window.addEventListener('load', () => {

    let level = document.querySelector('.select-level').value;

    document.querySelector('.select-level').addEventListener('change', (e) => {
        level = e.target.value;
    });

    document.querySelector('.start').addEventListener('click', () => {

        if(intv){
            clearInterval(intv)
        }
        grid = [];
        frames = 0;
        if( document.getElementById('empty') ) document.getElementById('empty').remove();
        if( document.getElementById('maze-container') ) document.getElementById('maze-container').remove();
        setup( 0, level );
    });
});