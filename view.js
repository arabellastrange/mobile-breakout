function view() {
    var moving = document.getElementById("move"),
        canvas = document.getElementById("canvas"),
        overlay = document.getElementById("losingOverlay"),
        replay = document.getElementById("replay"),
        canvasBall,
        canvasPaddle,
        bricks = [],
        brickRows = 4,
        brickCols = 5,
        angle = (45 * Math.PI/180), // change to 45
        speed = 25,
        acceleration = 0.5,
        gameLoop,
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
                currenty = 0,
                h;
            for(var i = 0; i < brickRows; i++){
                for(var n = 0; n < brickCols; n++){
               // console.log("in loop x is: " + bricks[i][n].x + " and y is: " + bricks[i][n].y + " status is: " +  bricks[i][n].status);
                    if(bricks[i][n].status === 1){
                        context.beginPath();
                        context.fillStyle = bricks[i][n].fillColor;
                        context.fillRect(currentx,currenty,bricks[i][n].width,bricks[i][n].height);
                        h = bricks[i][n].height;
                        context.closePath();
                        bricks[i][n].x = currentx;
                        bricks[i][n].y = currenty;
                        currentx = currentx + percentage(canvas.width,3) + bricks[i][n].width;
                    }
                }
                currentx = 0;
                currenty = currenty + percentage(canvas.height,1)+ h;
            }
            currentx = 0;
            currenty = 0;
           // console.log("outside loop x is: " + bricks[2][1].x + " and y is: " + bricks[2][1].y + " status is: " +  bricks[2][1].status);
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
        setReplayFunction();

        canvasBall = {fillColor: "pink", x: percentage(canvas.width,50), y: percentage(canvas.height,50) , r: 50, xVelocity: (Math.cos(angle)*speed), yVelocity: (Math.sin(angle)*speed)};
        canvasPaddle = {fillColor: "#d6e9c6", x: (canvas.width - percentage(canvas.width,70)), y: (canvas.height - percentage(canvas.height,5)), width: percentage(canvas.width,30), height: percentage(canvas.height,15)};

        bricks = [];
        for(var i = 0; i < brickRows; i++){
            bricks[i] = []
            for(var n = 0; n < brickCols; n++){
                bricks[i][n] = {fillColor: "#fdf3c3", x: 0, y: 0, width: percentage(canvas.width,18), height: percentage(canvas.height, 4), status: 1};
            }
        };

        loop();
    };
    
    function losingScreen() {
        overlay.style.width = "100%";
    }

    function moveBall() {
        canvasBall.x += canvasBall.xVelocity;
        canvasBall.y += canvasBall.yVelocity;

        paddleCollision();
        wallCollision();

        for(var i = 0; i < brickRows; i++) {
            for(var n = 0; n < brickCols; n++) {
               if( bricks[i][n].status === 1){
                   if(brickCollision(bricks[i][n])){
                       bricks[i][n].status = 0;
                       /*console.log ("Collision  row " + i +" column " + n );
                       console.log("collision x is: " + bricks[i][n].x + " and y is: " + bricks[i][n].y + " status is: " +  bricks[i][n].status);
                       console.log("Ball x is  " +canvasBall.x + " y is " + canvasBall.y );
                       console.log("Ball x + radius  is  " + (canvasBall.x + canvasBall.r) + " y is " + (canvasBall.y - canvasBall.r) );*/
                   };
               };
            };
        };
    };

    function loop() {
        gameLoop = setInterval(canvasPaint, 30);
    };

    function percentage(number, percent) {
        return (number*percent)/100;
    };

    function wallCollision() {
        if(canvasBall.x + canvasBall.r  >= canvas.width){
            canvasBall.x = canvas.width - canvasBall.r;
            canvasBall.xVelocity = -canvasBall.xVelocity;
        }else if(canvasBall.x - canvasBall.r <= 0){
            canvasBall.x = canvasBall.r;
            canvasBall.xVelocity = -canvasBall.xVelocity;
        };
        if(canvasBall.y + canvasBall.r >= canvas.height){
            clearInterval(gameLoop);
            losingScreen();

        }else if(canvasBall.y - canvasBall.r <= 0){
            canvasBall.y = canvasBall.r;
            canvasBall.yVelocity = - canvasBall.yVelocity;
        };
    };

    function paddleCollision() {
        if(canvasBall.y + canvasBall.r >= canvasPaddle.y){
            if(canvasBall.x >= canvasPaddle.x && canvasBall.x <= canvasPaddle.x + canvasPaddle.width){
                canvasBall.yVelocity = - canvasBall.yVelocity;
                canvasBall.yVelocity += acceleration;
            };
        };
    };

    function brickCollision(b) {
        if(canvasBall.x  >= b.x && canvasBall.x <= b.x + b.width
            && canvasBall.y - canvasBall.r >= b.y &&  canvasBall.y - canvasBall.r <= b.y + b.height) {
            canvasBall.yVelocity = -canvasBall.yVelocity;
            return true;
        }else{
            return false;
        };
    };
    
    function setReplayFunction() {
        replay.addEventListener("click", function () {
            document.location.reload();
        });
    };

};