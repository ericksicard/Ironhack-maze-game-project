class Player {
    constructor( img, x, y, w, h, idx) {
        this.imgScr = img;
        this.posX = x;
        this.posY = y;
        this.imgW = w;
        this.imgH = h;
        this.idx = idx;

        // player moves
        //function moves() {
        //    document.onkeydown = event => {
        //        let keyCodes = [38, 39, 40, 37];  //top, right, bottom, left
        //        const key = event.keyCode;
        //        
        //        if ( keyCodes.includes(key) ) {
        //            console.log(keyCodes.includes(key));
        //            event.preventDefault();
        //            if ( key === 38 && this.posY >= 0 ) this.posY -= 20;
        //            else if ( key === 39 && this.posX <= 500 - this.imgW ) this.posX += 20;
        //            else if ( key === 40 && this.posY <= 760 - this.imgH ) this.posY += 20;
        //            else if ( key === 37 && this.posX >= 0 ) this.posX -= 20;
        //        } 
        //    };
        //}
    }
}