function throttle(func, time) {
    let lastTime = Date.now();
    return function() {
        const current = Date.now();

        if (current - lastTime < time) {
            return;
        }
        func();
        lastTime = current;
    }
}

const t = throttle(function() {
    console.log(Date.now());
}, 1000);

setInterval(function() {
    t();
}, 500);

function throttleUseTime(func, time) {
    let timeout;
    return function() {
        if (!timeout) {
            timeout = setTimeout(function() {
                func();
                timeout = undefined;
            },time);
        }
    }
}


function fullThrottle(func, wait, options) {
    let previous, timeout;
    return function(...args) {
        const now = Date.now();
        if (!previous) previous = now;
        const remaining = wait - (now - previous);
        if (remaining <= 0) {
            func();
            previous = now;
        } else {
            timeout = setTimeout(function() {
                previous = Date.now();
                timeout = undefined;
                func();
            }, remaining)
        }
    }
}