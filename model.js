function model(){
    var smoothX = 99999,
    smoothY = 0,
    smoothZ = 0,
    alpha,
    beta,
    gamma,
    x,
    y,
    z,
    pitch,
    roll;

    function round(number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    };

    this.init = function () {
        if(window.DeviceOrientationEvent){
            window.addEventListener("deviceorientation", function (e) {
                alpha = e.alpha;
                beta = e.beta;
                gamma = e.gamma;
            });
        } else if(window.DeviceMotionEvent){
            window.addEventListener("devicemotion", function (e) {
                x = e.accelerationIncludingGravity.x;
                y = e.accelerationIncludingGravity.y;
                z = e.accelerationIncludingGravity.z;

                if(smoothX === 99999){
                    smoothX = x;
                    smoothY = y;
                    smoothZ = z;
                } else {
                    smoothX = 0.1 * x + (1 - 0.1) * smoothX;
                    smoothY = 0.1 * y + (1 - 0.1) * smoothY;
                    smoothZ = 0.1 * z + (1 - 0.1) * smoothZ;
                };
                pitch = Math.atan(y/z) * 180/Math.PI; //equivalent to gamma
                roll = Math.atan(-x/Math.sqrt(y*y + z*z)) * 180/Math.PI; //equivalent to beta
            });
        };

    };

    this.getDistance = function() {
        if(window.DeviceOrientationEvent){
             return round(gamma,2);

        } else if(window.DeviceMotionEvent){
            return round(roll,2);
        };
    };
};