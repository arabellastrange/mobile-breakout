function view() {
    var moving = document.getElementById("move"),
        canvas = document.getElementById("canvas"),
        canvasBall,
        canvasPaddle,
        canvasBrick,
        bricks = [],
        brickRows = 4,
        brickCols = 5,
        gravity = 0.5,
        angle = (45 * Math.PI/180),
        speed = 10,
        bounce = 0.70 ,
        friction = 0.01,
        acceleration = 0.05;
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
        canvasPaint =  function () {
            var context = canvas.getContext("2d");
            context.clearRect(0,0, canvas.width, canvas.height);
            moveBall();
            drawCircle(context,canvasBall.x, canvasBall.y, canvasBall.r, canvasBall.fillColor);
            drawRectangle(context, canvasPaddle.x, canvasPaddle.y, canvasPaddle.width, canvasPaddle.height , canvasPaddle.fillColor);
            //drawRectangle(context, canvasBrick.x, canvasBrick.y, canvasBrick.width, canvasBrick.height, canvasBrick.fillColor);

            for(var i = 0; i < brickCols; i++) {
                for(var n = 0; n < brickRows; n++) {
                    drawRectangle(context, canvasBrick.x, canvasBrick.y, canvasBrick.width, canvasBrick.height, canvasBrick.fillColor);

                    canvasBrick.x = canvasBrick.x + percentage(canvas.width,3) + canvasBrick.width;
                }
                canvasBrick.x = 0;
                canvasBrick.y = canvasBrick.y + percentage(canvas.height,1) + canvasBrick.height;
            };
            canvasBrick.x = 0;
            canvasBrick.y = 0;
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
        canvasBall = {fillColor: "pink", x: percentage(canvas.width,10), y: percentage(canvas.height,15) , r: 50, xVelocity: (Math.cos(angle)*speed), yVelocity: (Math.sin(angle)*speed)};
        canvasPaddle = {fillColor: "#d6e9c6", x: (canvas.width - percentage(canvas.width,70)), y: (canvas.height - percentage(canvas.height,5)), width: percentage(canvas.width,30), height: percentage(canvas.height,15)};
        canvasBrick = {fillColor: "#fdf3c3", x: 0, y: 0, width: percentage(canvas.width,23),  height: percentage(canvas.height, 4)};

        for(var i = 0; i < brickCols; i++) {
            bricks[i] = [];
            for(var n = 0; n < brickRows; n++) {
                bricks[i][n] = canvasBrick;
            };
        };

        loop();
    };

    function moveBall() {
        canvasBall.yVelocity += gravity;
        canvasBall.xVelocity = canvasBall.xVelocity - (canvasBall.xVelocity * friction);

        canvasBall.x += canvasBall.xVelocity;
        canvasBall.y += canvasBall.yVelocity;

        if(canvasBall.x + canvasBall.r  >= canvas.width){
            canvasBall.x = canvas.width - canvasBall.r;
            canvasBall.xVelocity = - canvasBall.xVelocity;
            canvasBall.xVelocity *= bounce;
        }else if(canvasBall.x - canvasBall.r <= 0){
            canvasBall.x = canvasBall.r;
            canvasBall.xVelocity = - canvasBall.xVelocity;
            canvasBall.xVelocity *= bounce;
        };

        if(canvasBall.y + canvasBall.r >= canvas.height){
            canvasBall.y = canvas.height - canvasBall.r;
            canvasBall.yVelocity = - canvasBall.yVelocity;
            canvasBall.yVelocity *= bounce;

        }else if(canvasBall.y - canvasBall.r <= 0){
            canvasBall.y = canvas.r;
            canvasBall.yVelocity = - canvasBall.yVelocity;
            canvasBall.yVelocity *= bounce;
        };

        if(canvasBall.y + canvasBall.r >= canvasPaddle.y){
            if(canvasBall.x > canvasPaddle.x && canvasBall.x < canvasPaddle.x + canvasPaddle.width){
                var incomingAngle = Math.atan2(canvasBall.yVelocity, canvasBall.xVelocity),
                    theta = 180 - incomingAngle;
                theta = - theta * (Math.PI/180);
                var cos = Math.cos(theta),
                    sin = Math.sin(theta),
                    vy= Math.round(10000*(canvasBall.xVelocity* sin + canvasBall.yVelocity * cos))/10000,
                    vx = Math.round(10000*(canvasBall.xVelocity * cos - canvasBall.yVelocity * sin))/10000;
                canvasBall.xVelocity = vx;
                canvasBall.yVelocity = vy;

                canvasBall.xVelocity += acceleration;
                canvasBall.yVelocity += acceleration;
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

};