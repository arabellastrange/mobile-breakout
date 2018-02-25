function view() {
    var moving = document.getElementById("move"),
        canvas = document.getElementById("canvas"),
        canvasBall = { fillColor: "pink", x: (canvas.width/8), y: (canvas.height/10) , r: 10},
        canvasPaddle = { fillColor: "#d6e9c6", x: (canvas.width - canvas.width/2), y: (canvas.height - canvas.height/6), width: (canvas.width/3), height: (canvas.height/10)},
        drawCircle = function (context, x,y,r, fill) {
            context.fillStyle = fill;
            context.fill();
            context.beginPath();
            context.arc(x,y,r,0,360);
            context.closePath();
        },
        drawRectangle = function (context, x, y, w, h, fill) {
            //context.beginPath();
            context.fillStyle = fill;
            context.fill();
            context.fillRect(x,y,w, h);
            //context.closePath();
        },
        canvasPaint =  function () {
            var context = canvas.getContext("2d");
            context.clearRect(0,0, canvas.width, canvas.height);
            drawCircle(context,canvasBall.x, canvasBall.y, canvasBall.r, canvasBall.fillColor);
            drawRectangle(context, canvasPaddle.x, canvasPaddle.y, canvasPaddle.width, canvasPaddle.height , canvasPaddle.fillColor);
        };

    this.movePaddle = function (distance) {
        var newLoc = ((canvasPaddle.x + distance)*75)/100;
        moving.innerHTML = "current pos of paddle: " + canvasPaddle.x + " moving to: " + newLoc;
        canvasPaddle.x = newLoc;
        canvasPaint();
    };

    this.init = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeighth;
        canvasPaint();
    };


    /*this.moveBall = function (distance) {
        var newLoc = ((canvasBall.x + distance)*75)/100;
        moving.innerHTML = "current pos of ball: " + canvasBall.x + " moving to: " + newLoc;
        canvasBall.x = newLoc;
        canvasPaint();
    };*/

};