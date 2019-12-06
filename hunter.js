class Hunter {
    constructor( img, x, y, w, h, idx) {
        this.imgScr = img;
        this.posX = x;
        this.posY = y;
        this.imgW = w;
        this.imgH = h;
        this.idx = idx;

        // draw the hunter
        this.show = function( ctx ) {
            let hunterImg = new Image();
            hunterImg.src = this.imgScr;
            //hunterImg.addEventListener( 'load', () => {
                ctx.drawImage(hunterImg, (this.posX - this.imgW/2), (this.posY - this.imgH/2), this.imgW, this.imgH);
            //});
        }

        // player moves
        this.moves = () => {
            // implement a random selection to move the hunter
            // CODE GOES HERE
            
            
            // moves up
            if ( this.posY >= w/2 && !grid[this.idx].walls[0] ) {
                this.posY -= cellWith;
                this.idx -= cols;
            }
            // moves right
            if ( this.posX <= canva.width - w/2 && !grid[this.idx].walls[1] ) {
                this.posX += cellWith;
                this.idx += 1;
            }
            // moves down
            if ( this.posY <= canva.height - w/2 && !grid[this.idx].walls[2] ) {
                this.posY += cellWith;
                this.idx += cols;
            }
            // moves left
            if ( this.posX >= w/2 && !grid[this.idx].walls[3] ) {
                this.posX -= cellWith;
                this.idx -= 1;
            }            
        }
    }
}