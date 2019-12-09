class Hunter {
    constructor( img, x, y, w, h, idx) {
        this.imgScr = img;
        this.posX = x;
        this.posY = y;
        this.imgW = w;
        this.imgH = h;
        this.idx = idx;
        this.hunted = undefined;

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
            //Hunter inside the grid
            if ( this.posY >= w/2 && this.posX <= canva.width - w/2 && 
                this.posY <= canva.height - w/2 && this.posX >= w/2) {
                // moves up
                if ( (!grid[this.idx].walls[0] && this.hunted !== this.idx - cols) ||
                    ( grid[this.idx].walls[1] && grid[this.idx].walls[2] && grid[this.idx].walls[3]) ) {
                    this.hunted = this.idx;
                    this.posY -= cellWith;
                    this.idx -= cols;
                }
                // moves right
                else if ( (!grid[this.idx].walls[1] && this.hunted !== this.idx + 1) ||
                    ( grid[this.idx].walls[0] && grid[this.idx].walls[2] && grid[this.idx].walls[3])) {
                    this.hunted = this.idx;
                    this.posX += cellWith;
                    this.idx += 1;
                }
                // moves down
                else if ( (!grid[this.idx].walls[2] && this.hunted !== this.idx + cols) ||
                    ( grid[this.idx].walls[0] && grid[this.idx].walls[1] && grid[this.idx].walls[3]) ) {
                    this.hunted = this.idx;
                    this.posY += cellWith;
                    this.idx += cols;
                }
                // moves left
                else if ( (!grid[this.idx].walls[3] && this.hunted !== this.idx - 1) ||
                    ( grid[this.idx].walls[0] && grid[this.idx].walls[1] && grid[this.idx].walls[2]) ) {
                    this.hunted = this.idx;
                    this.posX -= cellWith;
                    this.idx -= 1;
                }

            }       
        }
    }
}