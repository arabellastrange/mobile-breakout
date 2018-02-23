var bview = new view(),
    bmodel = new model(),
    bcontroller = null,
    returned = document.getElementById("return");

function controller() {
    this.initial = function () {
        console.log("start");
        bview.init();
        bmodel.init();

       if(window.DeviceOrientationEvent){
            window.addEventListener("deviceorientation", function (e) {
                returned.innerHTML = "<p>The returned value from Orientation is: "+ bmodel.getDistance() +"</p>";
                bview.movePaddle(bmodel.getDistance(e));
            });
        };

       if(window.DeviceMotionEvent){
            window.addEventListener("devicemotion", function (e) {
                returned.innerHTML = "<p>The returned value from Motion is: "+ bmodel.getDistance() +"</p>";
                bview.movePaddle(bmodel.getDistance(e));
            });
       };

    };
};

bcontroller = new controller();
window.addEventListener("load", bcontroller.initial);