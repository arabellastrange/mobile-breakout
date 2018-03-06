function view() {
    var moving = document.getElementById("move"),
        canvas = document.getElementById("canvas"),
        canvasBall,
        canvasPaddle,
        bricks = [],
        brickRows = 4,
        brickCols = 5,
        //gravity = 0.05,
        angle = (90 * Math.PI/180), // change to 45
        speed = 25,
        bounce = 0.8,
        friction = 0.01,
        acceleration = 0.5;
        drawCircle = function (context, x,y,r, fill) {
            context.beginPath();
            context.fillStyle = fill;
            context.arc(x,y,r,0,360);
            context.fill();
            context.closePath();
        },
        drawRectangle = function (context, x, y, w, h, fill) {
            context.beginPath();
            context.fillStyle = fill;
            context.fillRect(x,y,w, h);
            context.fill();
            context.closePath();
        },
        drawBricks = function (context) {
            var currentx = 0,
                currenty = 0;
            for(var i = 0; i < brickCols; i++){
                for(var n = 0; n < brickRows; n++){
                    if(bricks[i][n].status === 1){
                        context.beginPath();
                        context.fillStyle = bricks[i][n].fillColor;
                        context.fillRect(currentx,currenty,bricks[i][n].width,bricks[i][n].height);
                        //context.fill();
                        context.closePath();
                        bricks[i][n].x = currentx;
                        bricks[i][n].y = currenty;
                        currentx = currentx + percentage(canvas.width,3) + bricks[i][n].width;
                    }
                }
                currentx = 0;
                currenty = currenty + percentage(canvas.height,1)+ percentage(canvas.height, 4);
            }
            currentx = 0;
            currenty = 0;
        },
        canvasPaint =  function (){
            var context = canvas.getContext("2d");

            context.clearRect(0,0, canvas.width, canvas.height);
            drawRectangle(context, canvasPaddle.x, canvasPaddle.y, canvasPaddle.width, canvasPaddle.height , canvasPaddle.fillColor);
            drawBricks(context);

            moveBall();
            drawCircle(context,canvasBall.x, canvasBall.y, canvasBall.r, canvasBall.fillColor);
        };

    this.movePaddle = function (distance) {
        var newLoc = percentage((canvasPaddle.x + distance),95);
        moving.innerHTML = "current pos of paddle: " + canvasPaddle.x + " moving to: " + newLoc;
        canvasPaddle.x = newLoc;
        canvasPaint();
    };

    this.init = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        canvasBall = {fillColor: "pink", x: percentage(canvas.width,50), y: percentage(canvas.height,50) , r: 50, xVelocity: (Math.cos(angle)*speed), yVelocity: (Math.sin(angle)*speed)};
        canvasPaddle = {fillColor: "#d6e9c6", x: (canvas.width - percentage(canvas.width,70)), y: (canvas.height - percentage(canvas.height,5)), width: percentage(canvas.width,30), height: percentage(canvas.height,15)};

        bricks = [];
        for(var i = 0; i < brickCols; i++){
            bricks[i] = []
            for(var n = 0; n < brickRows; n++){
                bricks[i][n] = {fillColor: "#fdf3c3", x: 0, y: 0, width: percentage(canvas.width,23), height: percentage(canvas.height, 4), status: 1};
            }
        }
        loop();
    };

    function moveBall() {
        //canvasBall.yVelocity += gravity;
        canvasBall.xVelocity = canvasBall.xVelocity - (canvasBall.xVelocity * friction);

        canvasBall.x += canvasBall.xVelocity;
        canvasBall.y += canvasBall.yVelocity;

        wallCollision();
        paddleCollision();

        for(var i = 0; i < brickCols; i++) {
            for(var n = 0; n < brickRows; n++) {
                if(brickCollision(bricks[i][n])){
                    bricks[i][n].status = 0;
                };
            };
        };
    };

    function loop() {
        window.setTimeout(loop, 20);
        canvasPaint();
    };

    function percentage(number, percent) {
        return (number*percent)/100;
    };

    function wallCollision() {
        if(canvasBall.x + canvasBall.r  >= canvas.width){
            canvasBall.x = canvas.width - canvasBall.r;
            canvasBall.xVelocity = -canvasBall.xVelocity;
            canvasBall.xVelocity *= bounce;
        }else if(canvasBall.x - canvasBall.r <= 0){
            canvasBall.x = canvasBall.r;
            canvasBall.xVelocity = -canvasBall.xVelocity;
            canvasBall.xVelocity *= bounce;
        };

        if(canvasBall.y + canvasBall.r >= canvas.height){
            canvasBall.y = canvas.height - canvasBall.r;
            canvasBall.yVelocity = - canvasBall.yVelocity;
            canvasBall.yVelocity *= bounce;

        }else if(canvasBall.y - canvasBall.r <= 0){
            canvasBall.y = canvasBall.r;
            canvasBall.yVelocity = - canvasBall.yVelocity;
            canvasBall.yVelocity *= bounce;
        };
    };

    function paddleCollision() {
        if(canvasBall.y + canvasBall.r >= canvasPaddle.y){
            if(canvasBall.x >= canvasPaddle.x && canvasBall.x <= canvasPaddle.x + canvasPaddle.width){
                canvasBall.yVelocity = - canvasBall.yVelocity;
                canvasBall.xVelocity += acceleration;
                canvasBall.yVelocity += acceleration;
            };
        };
    };

    function brickCollision(b) {
        if(canvasBall.x - canvasBall.r > b.x && canvasBall.x - canvasBall.r < b.x + b.width && canvasBall.y - canvasBall.r > b.y &&  canvasBall.y - canvasBall.r < b.y + b.height) {
            canvasBall.yVelocity = -canvasBall.yVelocity;
            canvasBall.yVelocity *= bounce;
            return true;
        }else{
            return false;
        };
    };

};