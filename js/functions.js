
function draw_cicle(x, y, r)
{
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
}

function draw_vector(x,y, vec)
{
    draw_line(x,y, x+vec.x, y+vec.y);
}

function draw_line(x1,y1,x2,y2)
{
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

/**
 *
 *
 * @param {number} [x=0]
 * @param {number} [y=0]
 * @param {number} [r=10]
 * @param {string} [color='black']
 * @param {*} [id=random(100,400)]
 */
function Player(x=0, y=0, r=10, color='black', id=random(100,400))
{
    this.position = new Vec2d(x, y);
    this.r = r;
    this.id = id;
    this.color = color;
    this.velocity = new Vec2d(0,0);
    
    this.draw = function(){
        let tmp = ctx.fillStyle;//red
        ctx.fillStyle = this.color;//blue
        draw_cicle(this.position.x, this.position.y, this.r);
        ctx.fillStyle = tmp;//red
    }
    
    this.update = function(){
        
        if(mouse_clicked == true)
        {
            let diff = mouse.subtract(this.position);
            moveVec = diff.unit(10);//length 10;
            
            // this.velocity.x += lerp(this.velocity.x, unitVect.x, .1);
            // this.velocity.y += lerp(this.velocity.y, unitVect.y, .1);
            
            this.velocity = this.velocity.lerp(moveVec, .1);
            
            draw_vector(this.position.x, this.position.y, moveVec);
        }else{
            this.velocity = this.velocity.lerp(zeroVec, .1)
        }
        this.position = this.position.add(this.velocity);
    }
    
}