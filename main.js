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
    
    // create the cell objects
    for ( let y = 0; y <= rows; y++ ) {
        for ( let x = 0; x <= cols; x++ ) {
            let cell = new Cell(x, y);
            grid.push( cell );
        }
    }
    // draw the matrix
    draw( ctx );
}

function draw( ctx ) {
    ctx.fillRect(0, 0, 500, 500);

    for ( let i = 0; i < grid.length; i++) {
        grid[i].show( ctx );
    }
}

function Cell( i, j ) {
    this.i = i;
    this.j = j;
    // [ top, right, botton, left ]
    this.walls = [true, true, true, true]

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
    }
}

// *************************************************** //

window.addEventListener('load', () => {
    setup();
});