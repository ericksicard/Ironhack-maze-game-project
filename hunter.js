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
            ctx.drawImage(hunterImg, (this.posX - this.imgW/2), (this.posY - this.imgH/2), this.imgW, this.imgH);
        }

        // hunter moves
        this.moves = () => {

            //Hunter inside the grid
            if ( this.posY >= w/2 && this.posX <= canva.width - w/2 && 
                this.posY <= canva.height - w/2 && this.posX >= w/2) {
                console.log(this.idx);    
                // moves up
                if ( grid[this.idx].walls[1] && grid[this.idx].walls[2] && grid[this.idx].walls[3] ) {
                    this.hunted = this.idx;
                    this.movesUp();
                }
                // moves right
                else if ( grid[this.idx].walls[0] && grid[this.idx].walls[2] && grid[this.idx].walls[3] ) {
                    this.hunted = this.idx;
                    this.movesRight();
                }
                // moves down
                else if ( grid[this.idx].walls[0] && grid[this.idx].walls[1] && grid[this.idx].walls[3] ) {
                    this.hunted = this.idx;
                    this.movesDown();
                }
                // moves left
                else if ( grid[this.idx].walls[0] && grid[this.idx].walls[1] && grid[this.idx].walls[2] ) {
                    this.hunted = this.idx;
                    this.movesLeft();
                }

                // moves left or down
                else if ( grid[this.idx].walls[0] && grid[this.idx].walls[1] ) {
                    if ( this.hunted !== this.idx - 1 ) {
                        this.hunted = this.idx;
                        this.movesLeft();
                    }
                    else if ( this.hunted !== this.idx + cols ) {
                        this.hunted = this.idx;
                        this.movesDown();
                    }
                }
                // moves left or up
                else if ( grid[this.idx].walls[1] && grid[this.idx].walls[2] ) {
                    if ( this.hunted !== this.idx - 1 ) {
                        this.hunted = this.idx;
                        this.movesLeft();
                    }
                    else if ( this.hunted !== this.idx - cols ) {
                        this.hunted = this.idx;
                        this.movesUp();
                    }
                }
                // moves right or up
                else if ( grid[this.idx].walls[2] && grid[this.idx].walls[3] ) {
                    if ( this.hunted !== this.idx + 1 ) {
                        this.hunted = this.idx;
                        this.movesRight();
                    }
                    else if ( this.hunted !== this.idx - cols ) {
                        this.hunted = this.idx;
                        this.movesUp();
                    }
                }
                // moves right or down
                else if ( grid[this.idx].walls[0] && grid[this.idx].walls[3] ) {
                    if ( this.hunted !== this.idx + 1 ) {
                        this.hunted = this.idx;
                        this.movesRight();
                    }
                    else if ( this.hunted !== this.idx + cols ) {
                        this.hunted = this.idx;
                        this.movesDown();
                    }
                }
                // moves up or down
                else if ( grid[this.idx].walls[1] && grid[this.idx].walls[3] ) {
                    if ( this.hunted !== this.idx - cols ) {
                        this.hunted = this.idx;
                        this.movesUp();
                    }
                    else if ( this.hunted !== this.idx + cols ) {
                        this.hunted = this.idx;
                        this.movesDown();
                    }
                }
                // moves right or left
                else if ( grid[this.idx].walls[0] && grid[this.idx].walls[2] ) {
                    if ( this.hunted !== this.idx + 1 ) {
                        this.hunted = this.idx;
                        this.movesRight();
                    }
                    else if ( this.hunted !== this.idx - 1 ) {
                        this.hunted = this.idx;
                        this.movesLeft();
                    }
                }
                // moves right or left or down
                else if ( grid[this.idx].walls[0] ) {
                    let r = this.randomMove();
                    if ( this.hunted === this.idx + 1 ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesLeft();
                        else if ( r == 1 ) this.movesDown();
                    }
                    else if ( this.hunted == this.idx - 1 ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesRight();
                        else if ( r == 1 ) this.movesDown();
                    }
                    else if ( this.hunted == this.idx + cols ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesLeft();
                        else if ( r == 1 ) this.movesRight();
                    }
                }
                // moves up or down or left
                else if ( grid[this.idx].walls[1] ) {
                    let r = this.randomMove();
                    if ( this.hunted == this.idx - cols ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesLeft();
                        else if ( r == 1 ) this.movesDown();
                    }
                    else if ( this.hunted == this.idx + cols ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesLeft();
                        else if ( r == 1 ) this.movesUp();
                    }
                    else if ( this.hunted == this.idx - 1 ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesDown();
                        else if ( r == 1 ) this.movesUp();
                    }
                }
                // moves right or left or up
                else if ( grid[this.idx].walls[2] ) {
                    let r = this.randomMove();
                    if ( this.hunted == this.idx + 1 ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesLeft();
                        else if ( r == 1 ) this.movesUp();
                    }
                    else if ( this.hunted == this.idx - 1 ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesRight();
                        else if ( r == 1 ) this.movesUp();
                    }
                    else if ( this.hunted == this.idx - cols ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesRight();
                        else if ( r == 1 ) this.movesLeft();
                    }
                }
                // moves up or down or right
                else if ( grid[this.idx].walls[3] ) {
                    let r = this.randomMove();
                    if ( this.hunted == this.idx - cols ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesRight();
                        else if ( r == 1 ) this.movesDown();
                    }
                    else if ( this.hunted == this.idx + cols ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesRight();
                        else if ( r == 1 ) this.movesUp();
                    }
                    else if ( this.hunted == this.idx + 1 ) {
                        this.hunted = this.idx;
                        if ( r == 0 ) this.movesUp();
                        else if ( r == 1 ) this.movesDown();
                    }
                }
            }       
        }

        this.movesUp = () => {
            this.posY -= cellWith;
            this.idx -= cols;
        }
        this.movesRight = () => {
            this.posX += cellWith
            this.idx += 1;
        }
        this.movesDown = () => {
            this.posY += cellWith;
            this.idx += cols;
        }
        this.movesLeft = () => {
            this.posX -= cellWith;
            this.idx -= 1;
        }
        this.randomMove = () => Math.floor( Math.random() * 2 );
    }
}