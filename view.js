function view() {
    var moving = document.getElementById("move"),
        ball,
        paddle,
        canvasBall = {x:15, y:10, r: 10, fillColor: "pink"},
        canvasPaddle = {x:0, y:0, width: 100, height: 150, fillColor: "#d6e9c6"},
        drawCircle = function (context, x, y, r, fill) {
            context.beginPath();
            context.arc(x,y,r,0,360);
            context.fillStyle = fill;
            context.fill();
        },
        drawRectangle = function (context, x, y, w, h, fill) {
            context.fillStyle = fill;
            context.fill();
            context.fillRect(x,y,w,h);
        },
        canvasPaint =  function () {
            var contextB = ball.getContext("2d");
            var contextP = paddle.getContext("2d");
            contextB.clearRect(0,0, ball.width, ball.height);
            contextP.clearRect(0,0, paddle.width, paddle.height);
            drawCircle(contextB, canvasBall.x, canvasBall.y, canvasBall.r, canvasBall.fillColor);
            drawRectangle(contextP, canvasPaddle.x, canvasPaddle.y, canvasPaddle.width, canvasPaddle.height, canvasPaddle.fillColor);
        };

    this.init = function () {
        ball = document.getElementById("ball");
        paddle = document.getElementById("paddle");
        canvasPaint();

    };

    this.movePaddle = function (distance) {
        var newLoc = ((canvasPaddle.x + distance)*75)/100;
        moving.innerHTML = "current pos of paddle: " + canvasPaddle.x + " moving to: " + newLoc;
        canvasPaddle.x = newLoc;
        canvasPaint();
    };

    this.moveBall = function (distance) {
        var newLoc = ((canvasBall.x + distance)*75)/100;
        moving.innerHTML = "current pos of ball: " + canvasBall.x + " moving to: " + newLoc;
        canvasBall.x = newLoc;
        canvasPaint();
    };

};