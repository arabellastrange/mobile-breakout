function view() {
    var moving = document.getElementById("move"),
        canvas = document.getElementById("canvas"),
        canvasBall,
        canvasPaddle,
        bricks = [],
        brickRows = 4,
        brickCols = 5,
        gravity = 0.1,
        angle = (90 * Math.PI/180),
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
        canvasPaint =  function () {
            var context = canvas.getContext("2d"),
                currentx = 0,
                currenty = 0;
            context.clearRect(0,0, canvas.width, canvas.height);
            drawRectangle(context, canvasPaddle.x, canvasPaddle.y, canvasPaddle.width, canvasPaddle.height , canvasPaddle.fillColor);

            for(var i = 0; i < brickCols; i++) {
                bricks[i] = [];
                for(var n = 0; n < brickRows; n++) {
                    bricks[i][n] = {};
                    bricks[i][n].fillColor = "#fdf3c3";
                    bricks[i][n].x = currentx;
                    bricks[i][n].y = currenty;
                    bricks[i][n].width = percentage(canvas.width,23);
                    bricks[i][n].height = percentage(canvas.height, 4);

                    console.log("paint at col: " + i + " row " + n + " brick x is " + bricks[i][n].x + " y is " + bricks[i][n].y);

                    drawRectangle(context, bricks[i][n].x, bricks[i][n].y, bricks[i][n].width, bricks[i][n].height, bricks[i][n].fillColor);
                    currentx = currentx + percentage(canvas.width,3) + bricks[i][n].width;
                    bricks[i][n].x = currentx;
                    bricks[i][n].y = currenty;
                }
                currentx = 0;
                currenty = currenty + percentage(canvas.height,1) + percentage(canvas.height, 4);
            };
            currentx = 0;
            currenty = 0;

            console.log("paint outside loop at col: " + 2 + " row " + 3 + " brick x is " + bricks[2][3].x + " y is " + bricks[2][3].y);

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
        loop();
    };

    function moveBall() {
        canvasBall.yVelocity += gravity;
        canvasBall.xVelocity = canvasBall.xVelocity - (canvasBall.xVelocity * friction);

        canvasBall.x += canvasBall.xVelocity;
        canvasBall.y += canvasBall.yVelocity;

        wallCollision();
        paddleCollision();

        for(var i = 0; i < brickCols; i++) {
            for(var n = 0; n < brickRows; n++) {
                console.log("move at col: " + i + " row " + n + " brick x is " + bricks[i][n].x + " y is " + bricks[i][n].y);
                brickCollision(bricks[i][n]);
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
        //console.log("Current brick x: " + b.x);
        //console.log("Current brick y: " + b.y);
       // console.log("Current ball x: " + canvasBall.x + " y: " + canvasBall.y);
        if(canvasBall.x > b.x && canvasBall.x < b.x + b.width && canvasBall.y > b.y && canvasBall.y < b.y + b.height) {
            console.log("i collided!");
            canvasBall.yVelocity = -canvasBall.yVelocity;
            canvasBall.yVelocity *= bounce;
        };
    };

};