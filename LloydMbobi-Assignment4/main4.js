const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const para = document.querySelector('p');
let count = 0;

const wideside = (canvas.width = window.innerWidth);
const tallside = (canvas.height = window.innerHeight);

function gennum(smallest, biggest) {
    return Math.floor(Math.random() * (biggest - smallest + 1) + smallest);
}

function gencolor() {
    return `rgb(${gennum(0, 255)}, ${gennum(0, 255)}, ${gennum(0, 255)})`;
}

const BallArray = [];
class BallSetting {
    constructor(x, y, placeX, placeY, color, size) {
       // super(x, y, placeX, placeY);

        this.x = x;
        this.y = y;
        this.placeX = placeX;
        this.placeY = placeY;
        this.color = color;
        this.size = size;
        this.exists = true;
    }

    drawing() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    checkborder() {
        if (this.x + this.size > wideside || this.x - this.size < 0) {
            this.placeX = -this.placeX;
        }

        if (this.y + this.size > tallside || this.y - this.size < 0) {
            this.placeY = -this.placeY;
        }

        this.x += this.placeX;
        this.y += this.placeY;
    }
    contact_detection() {
        for (const ball of BallArray) {
            if (!(this===ball) && ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const dd = Math.sqrt(dx * dx + dy * dy);
            
                if (dd < this.size + ball.size) {
                    ball.color = this.color = gencolor();
                    
                    
                }
                
            }
        }
    }

}

class Shape {
    constructor(x, y, posX, posY) {
        this.x = x;
        this.y = y;
        this.posX = posX;
        this.posY = posY;
    }
}

class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = 'white';
        this.size = 10;
    }

    checkborder() {
        if (this.x + this.size > wideside) {
            devilCircle.x -= devilCircle.posX;
        }

        if (this.x - this.size < 0) {
            devilCircle.x += devilCircle.posX;
        }

        if (this.y + this.size > tallside) {
            devilCircle.y -= devilCircle.posY;
        }

        if (this.y - this.size < 0) {
            devilCircle.y += devilCircle.posY;
        }
        
    }

    drawing() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    contact_detection() {
        for (const ball of BallArray) {
            if (ball.exists) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const dd = Math.sqrt(dx * dx + dy * dy);
            
                if (dd < this.size + ball.size) {
                    ball.exists == false;
                    ball.color = gencolor();
                }
                
            }
        }
    }    
}

const devilCircle = new EvilCircle(50, 50);

while (BallArray.length < 25) {
    const size = gennum(10, 20);
    const novaball = new BallSetting(
        gennum(0 + size, wideside - size),
        gennum(0 + size, tallside - size),
        gennum(-7, 7),
        gennum(-7, 7),
        gencolor(),
        size,
    );
    BallArray.push(novaball);
    count++;
}

function keepgoing() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, wideside, tallside);

    for (const ball of BallArray) {
        ball.drawing();
        ball.checkborder();
        ball.contact_detection();
    }

    devilCircle.drawing();
    devilCircle.checkborder();
    devilCircle.contact_detection();
    requestAnimationFrame(keepgoing);
}

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "a":
            devilCircle.x -= devilCircle.posX;
            break;
        case "d":
            devilCircle.x += devilCircle.posX;
            break;
        case "w":
            devilCircle.y -= devilCircle.posY;
            break;
        case "s":
            devilCircle.y += devilCircle.posY;
            break;
            
    }
});

keepgoing();
