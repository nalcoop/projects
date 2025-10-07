window.requestAnimationFrame = window.requestAnimationFrame || function(callback) {
    return setTimeout(callback, 1000 / 60); // Fallback for browsers that don't support it
};

var loaded = false;
var init = function() {
    if (loaded) return;
    loaded = true;

    var mobile = window.checkDevice;
    var sizer = mobile ? 0.5 : 1;
    var canvas = document.getElementById('heart');
    var nextSize = canvas.getContext('2d');
    var width = canvas.width = sizer * innerWidth;
    var height = canvas.height = sizer * innerHeight;
    var random = Math.random;

    nextSize.fillStyle = "rgba(0,0,0,1)";
    nextSize.fillRect(0, 0, width, height);

    var heartPosition = function(random) {
        return [Math.pow(Math.sin(random), 3), -(15 * Math.cos(random) - 5 * Math.cos(2 * random) - 2 * Math.cos(3 * random) - Math.cos(4 * random))];
    };

    var scaleTranslation = function(pos, sx, sy, dx, dy) {
        return [dx + pos[0] * sx, dy + pos[1] * sy];
    };

    window.addEventListener('resize', function() {
        width = canvas.width = sizer * innerWidth;
        height = canvas.height = sizer * innerHeight;
        nextSize.fillStyle = "rgba(0,0,0,1)";
        nextSize.fillRect(0, 0, width, height);
    });

    var countTrace = mobile ? 20 : 50;
    var origin = [];
    var i;
    var screen = mobile ? 0.3 : 0.1;

    for (i = 0; i < Math.PI * 2; i += screen) origin.push(scaleTranslation(heartPosition(i), 210, 13, 0, 0));
    for (i = 0; i < Math.PI * 2; i += screen) origin.push(scaleTranslation(heartPosition(i), 150, 9, 0, 0));
    for (i = 0; i < Math.PI * 2; i += screen) origin.push(scaleTranslation(heartPosition(i), 90, 5, 0, 0));
    var heartPoints = origin.length;

    var currentPoints = [];
    var pulse = function(kx, ky) {
        for (i = 0; i < origin.length; i++) {
            currentPoints[i] = [];
            currentPoints[i][0] = kx * origin[i][0] + width / 2;
            currentPoints[i][1] = ky * origin[i][1] + height / 2; // Fixed index
        }
    };

    var e = [];
    for (i = 0; i < heartPoints; i++) {
        var x = random() * width;
        var y = random() * height;
        e[i] = {
            vx: 0,
            vy: 0,
            R: 2,
            speed: random() + 5,
            q: ~~(random() * heartPoints),
            D: 2 * (i % 2) - 1,
            force: 0.2 * random() + 0.7,
            f: "rgba(38, 191, 89, 1)",
            trace: []
        };
        for (var k = 0; k < countTrace; k++) e[i].trace[k] = { x: x, y: y };
    }

    var config = {
        traceK: 0.4,
        timeDelta: 0.01
    };

    var time = 0;
    var loop = function() {
        var n = -Math.cos(time);
        pulse((1 + n) * .5, (1 + n) * .5);
        time += ((Math.sin(time)) < 0 ? 9 : (n > 0.8) ? .2 : 1) * config.timeDelta;

        nextSize.fillStyle = "rgba(0,0,0,.1)";
        nextSize.fillRect(0, 0, width, height); // Fixed method call

        for (i = e.length; i--;) {
            var u = e[i];
            var q = currentPoints[u.q];
            var dx = u.trace[0].x - q[0];
            var dy = u.trace[0].y - q[1];
            var length = Math.sqrt(dx * dx + dy * dy);

            if (10 > length) {
                if (0.95 < random()) {
                    u.q = ~~(random() * heartPoints);
                } else {
                    if (0.99 < random()) {
                        u.D *= -1;
                    }
                    u.q += u.D;
                    u.q %= heartPoints;
                    if (0 > u.q) {
                        u.q += heartPoints;
                    }
                }
            }

            u.vx += -dx / length * u.speed;
            u.vy += -dy / length * u.speed;
            u.trace[0].x += u.vx;
            u.trace[0].y += u.vy;
            u.vx *= u.force;
            u.vy *= u.force;

            for (k = 0; k < u.trace.length - 1;) {
                var T = u.trace[k];
                var N = u.trace[++k];
                N.x -= config.traceK * (N.x - T.x);
                N.y -= config.traceK * (N.y - T.y);
            }

            nextSize.fillStyle = u.f;
            for (k = 0; k < u.trace.length; k++) {
                nextSize.fillRect(u.trace[k].x, u.trace[k].y, 1, 1); // Fixed method call
            }
        }

        window.requestAnimationFrame(loop); // Corrected call
    };
    loop();
};

var s = document.readyState;
if (s === 'complete' || s === 'loaded' || s === 'interactive') init();
else document.addEventListener('DOMContentLoaded', init, false);

