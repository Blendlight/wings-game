function particle(x,y,r,xv=0,yv=0, fac=0.9)
{
    this.position = new Vec2d(x, y);
    this.velocity = new Vec2d(xv, yv);
    this.r = r;
    this.update = function(){
        this.position = this.position.add(this.velocity);
        this.r *= fac;
    }
    this.draw = function(){
        draw_cicle(this.position.x, this.position.y, this.r, DRAW_METHODS.fill);
    }
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
    this.direction = new Vec2d(0,0);
    this.speed = 0;
    this.particles = [];
    
    this.draw = function(){
        let tmp = ctx.fillStyle;//red
        ctx.fillStyle = this.color;//blue
        let pp = null;
        let tmpWidth = ctx.lineWidth;
        for(part of this.particles)
        {
            // part.draw();
            if(pp!=null)
            {
                ctx.lineWidth = part.r;
                draw_line(part.position.x, part.position.y, pp.position.x, pp.position.y);
            }else{
                let last = this.particles[this.particles.length-1];
                ctx.lineWidth = last.r;
                draw_line(this.position.x, this.position.y, last.position.x, last.position.y);
            }

            pp = part;
        }
        ctx.lineWidth = tmpWidth;
        draw_cicle(this.position.x, this.position.y, this.r);
        ctx.fillStyle = tmp;//red
        draw_vector(this.position.x, this.position.y, this.velocity.scale(6));
        ctx.fillText(this.velocity.length(), this.position.x-10,this.position.y-30);
    }
    
    this.update = function(){
        // if(mouse_clicked == true)
        let diff = mouse.subtract(this.position);
        let speed = Math.min(diff.length()/30, 10);
        
        if(diff.length() > minSpeedR-10)
        {
            moveVec = diff.unit(speed);//length 10;
            // this.velocity.x += lerp(this.velocity.x, unitVect.x, .1);
            // this.velocity.y += lerp(this.velocity.y, unitVect.y, .1);
            this.velocity = this.velocity.lerp(moveVec, .1);
            
        }else{
            this.velocity = this.velocity.lerp(zeroVec, .1)
        }
        this.position = this.position.add(this.velocity);
        
        if(this.velocity.length()>1)
        {
            if(this.particles.length<10)
            {
                this.particles.push(new particle(this.position.x, this.position.y, this.velocity.length(), -player.velocity.x, -player.velocity.y));
            }
        }
        
        
        let newParticles = [];
        for(part of this.particles)
        {
            part.update();
            if(part.r>=0.9)
            {
                newParticles.push(part);
            }
        }
        this.particles = newParticles;
    }
    
}