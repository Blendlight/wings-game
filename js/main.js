let canvas = document.getElementById("game");
let ctx = canvas.getContext('2d');

let width = canvas.width = 820;
let height = canvas.height = width*3/4;

let room = new Vec2d(6000, 6000);
/* let viewPort = {
    position:new Vec2d(0,0),
    widthHeight:new Vec2d(width, height)
}; */
let viewPort = new Vec2d(0,0);

let mouse = new Vec2d(10, 10);
let mouseTarget = new Vec2d(10, 10);

let mouse_clicked = false;

let zeroVec = new Vec2d(0,0);

let players = [];

let DefaultRadius = 20;

let scaleFact = 1;

for(i=0;i<30;i++){
    players.push( new Player(random(0, room.x),random(0, room.y),DefaultRadius, 'red') );
    players.push( new Player(random(0, room.x),random(0, room.y), 'blue') );
    players.push( new Player(random(0, room.x),random(0, room.y), 'gray') );
    players.push( new Player(random(0, room.x),random(0, room.y), 'pink') );
    players.push( new Player(random(0, room.x),random(0, room.y), 'purple') );
}
let player = new Player(room.x/2, room.y/2, DefaultRadius,'orange');

let minSpeedR = 50;

function update()
{
    
    mouse.set(mouseTarget.x - viewPort.x, mouseTarget.y - viewPort.y);
    
    
    player.update();
    
    if(player.position.x-player.r<0)
    {
        player.position.x = player.r;
    }
    if(player.position.x+player.r > room.x)
    {
        player.position.x = room.x-player.r;
    }
    
    if(player.position.y-player.r<0)
    {
        player.position.y = player.r;
    }
    if(player.position.y+player.r > room.y)
    {
        player.position.y = room.y-player.r;
    }
    
    
}

function draw()
{
    ctx.clearRect(0, 0, width, height);
    //save current state of canvas transform
    ctx.save();
    
    
    
    let tx = width/2-player.position.x;
    let ty = height/2-player.position.y;
    
    if(false){
        viewPort.x = lerp(viewPort.x, tx, 1/20);
        viewPort.y = lerp(viewPort.y, ty, 1/20);
    }else{
        viewPort.x = tx;
        viewPort.y = ty;
    }
    
    /* 
    if(player.position.x < width/2)
    {
        tx = 0;
    }
    if(player.position.y < height/2)
    {
        ty = 0;
    }
    */
    
    
    ctx.scale(scaleFact, scaleFact);
    ctx.translate(viewPort.x+(width-width*scaleFact), viewPort.y+(height-height*scaleFact));
    
    
    // ctx.scale(scaleFact, scaleFact);
    
    
    
    
    
    ctx.strokeStyle = 'red';
    ctx.strokeRect(0,0,room.x, room.y);
    
    
    
    
    player.draw();
    draw_cicle(player.position.x, player.position.y, minSpeedR, DRAW_METHODS.stroke);
    
    for(otherPlayer of players)
    {
        otherPlayer.draw();
    }
    
    
    draw_cicle(mouse.x, mouse.y, 5);
    
    ctx.restore();
}

function calling()
{
    update();
    draw();
}

setInterval(calling,1000/30);


// Other events

window.onmousedown = function(evt){
    mouse_clicked = true;
}

window.onmouseup = function(evt){
    mouse_clicked = false;
}

window.onmousemove = function(evt)
{
    // mouseTarget.set(evt.clientX, evt.clientY);
    //comment this to see effect
    // mouse.set(evt.clientX, evt.clientY);
    mouseTarget.set(
        evt.clientX/scaleFact/* - viewPort.x */,
        evt.clientY/scaleFact/* - viewPort.y */
        );
    }
    
    