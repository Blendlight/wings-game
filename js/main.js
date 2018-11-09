let canvas = document.getElementById("game");
let ctx = canvas.getContext('2d');

let width = canvas.width = 820;
let height = canvas.height = width*3/4;

let room = new Vec2d(1000, 1000);
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

players.push( new Player(100,100,DefaultRadius, 'red') );
players.push( new Player(100,600,DefaultRadius, 'blue') );
players.push( new Player(600,100,DefaultRadius, 'gray') );
players.push( new Player(600,600,DefaultRadius, 'pink') );
players.push( new Player(1200,100,DefaultRadius, 'purple') );

let player = new Player(70, 70, DefaultRadius,'orange');

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
    
    viewPort.x = lerp(viewPort.x, tx, 1/20);
    viewPort.y = lerp(viewPort.y, ty, 1/20);
    
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
    
    ctx.translate(viewPort.x, viewPort.y);
    
    // let scaleFact = DefaultRadius/player.r;
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
        evt.clientX /* - viewPort.x */,
        evt.clientY /* - viewPort.y */
        );
    }
    
    