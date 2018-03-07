var bview = new view(),
    bmodel = new model(),
    bcontroller = null;

function controller() {
    this.initial = function () {
        console.log("start");
        bview.init();
        bmodel.init();

       if(window.DeviceOrientationEvent){
            window.addEventListener("deviceorientation", function (e) {
                bview.movePaddle(bmodel.getDistance(e));
            });
        };

       if(window.DeviceMotionEvent){
            window.addEventListener("devicemotion", function (e) {
                bview.movePaddle(bmodel.getDistance(e));
            });
       };

    };
};

bcontroller = new controller();
window.addEventListener("load", bcontroller.initial);