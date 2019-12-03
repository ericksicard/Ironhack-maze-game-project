class Player {
    constructor( img, x, y, w, h, idx) {
        this.imgScr = img;
        this.posX = x;
        this.posY = y;
        this.imgW = w;
        this.imgH = h;
        this.idx = idx;

        // player moves
        this.moves = function( event ) {
            let keyCodes = [38, 39, 40, 37];  //top, right, bottom, left
            const key = event.keyCode;
            console.log(key)
                    
            if ( keyCodes.includes(key) ) {
                event.preventDefault();
                if ( key === 38 && this.posY >= w/2 && !grid[this.idx].walls[0] ) {
                    this.posY -= cellWith;
                    this.idx -= cols;
                }
                else if ( key === 39 && this.posX <= canva.width - w/2 && !grid[this.idx].walls[1] ) {
                    this.posX += cellWith;
                    this.idx += 1;
                }
                else if ( key === 40 && this.posY <= canva.height - w/2 && !grid[this.idx].walls[2] ) {
                    this.posY += cellWith;
                    this.idx += cols;
                }
                else if ( key === 37 && this.posX >= w/2 && !grid[this.idx].walls[3] ) {
                    this.posX -= cellWith;
                    this.idx -= 1;
                }
            }
        }
    }
}