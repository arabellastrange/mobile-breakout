function view() {
    var moving = document.getElementById("move"),
        canvas = document.getElementById("canvas"),
        canvasBall,
        canvasPaddle,
        gravity = 1,
        angle = (45 * Math.PI/180),
        speed = 5,
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
        };

    this.movePaddle = function (distance) {
        var newLoc = percentage((canvasPaddle.x + distance),95);
        moving.innerHTML = "current pos of paddle: " + canvasPaddle.x + " moving to: " + newLoc;
        canvasPaddle.x = newLoc;
        canvasPaint();
    };

     function moveBall() {
        //requestAnimationFrame(this.moveBall);
        if(canvasBall.x + canvasBall.r  >= canvas.width){
            canvasBall.xVelocity = - canvasBall.xVelocity;
            canvasBall.x = canvas.width - canvasBall.r;
        }else if(canvasBall.x - canvasBall.r <= 0){
            canvasBall.xVelocity = - canvasBall.xVelocity;
            canvasBall.x = canvasBall.r;
        };

        if(canvasBall.y + canvasBall.r >= canvas.height){
            canvasBall.yVelocity = - canvasBall.yVelocity;
            canvasBall.y = canvas.height - canvasBall.r;
        }else if(canvasBall.y - canvasBall.r <= 0){
            canvasBall.yVelocity = - canvasBall.yVelocity;
            canvasBall.y = canvas.r;
        };

        canvasBall.yVelocity += gravity;
        canvasBall.x += canvasBall.xVelocity;
        canvasBall.y += canvasBall.yVelocity;
    };

    this.init = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvasBall = {fillColor: "pink", x: (canvas.width/10), y: (canvas.height/15) , r: 50, xVelocity: (Math.cos(angle)*speed), yVelocity: (Math.sin(angle)*speed)};
        canvasPaddle = {fillColor: "#d6e9c6", x: (canvas.width - percentage(canvas.width,90)), y: (canvas.height - percentage(canvas.height,8)), width: (canvas.width/3), height: (canvas.height/15)};
        loop();
    };

    function loop() {
        window.setTimeout(loop, 20);
        canvasPaint();
    };

    function percentage(number, percent) {
        return (number*percent)/100;
    };

};