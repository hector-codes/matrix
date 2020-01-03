const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#000000';

/** @type {CanvasRenderingContext2D} */
const c = canvas.getContext('2d');


const letters = '  0123456789.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!@#$%^&*()_+/*~<>?|{}[] '.split('');
const green = '#00ff00';
const num = 100;
const {height:maxHeight, width:maxWidth} = canvas;
const helpers = {

    offset: 20,
    randomInt: function( min, max ) {
        return Math.floor( min + Math.random() * (max - min + 1) );
    },

    getLetter: function() {
        return letters[ helpers.randomInt( 0, letters.length - 1 )]
    },

    getRandomX: function() {
        return helpers.randomInt( helpers.offset , maxWidth - helpers.offset )
    },

    getRandomY : function() {
        return helpers.randomInt( helpers.offset, maxHeight - maxHeight / 2 )
    },
}

let objects = [];

const init = function() {
    c.font = '20px monospace';
    let x, y, l;

    for (let i = 0; i < num; i++) {
        console.log(num)
        x = helpers.getRandomX();
        y = helpers.getRandomY();
        l = helpers.getLetter();
        for (let j=0; j < 20; j ++) {
            objects.push( new Objects( x, y + helpers.getRandomY(), l ) );
        }
    }
}

class Objects {
    constructor(x, y, letter, color = green) {
        this.x = x;
        this.y = y;
        this.l = letter;
        this.color = color;
    };

    draw() {
        c.fillStyle = this.color;
        c.fillText( helpers.getLetter(), this.x, this.y );
    };

    update() {

        this.y = this.y + 10;
        
        if ( this.y >= maxHeight ) {
            this.y = helpers.getRandomY();
            this.color = '#ffffff';
        } else {
            this.color = green;
        }

        this.l = helpers.getLetter();

        this.draw()
    };

}

function animate() {

    setTimeout(function() {
        requestAnimationFrame(animate);
    }, 1000 / 30);

    c.clearRect(0, 0, maxWidth, maxHeight);
    for( let i=0; i < objects.length; i++ ) {
        objects[i].update();
    }
}

init();
animate();