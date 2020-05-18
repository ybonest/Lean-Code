var throttle = function(func, interval) {
    let timer, isFirstTime = true;
    return function() {
        if (isFirstTime) {
            return func.apply(this, arguments);
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(function() {
            clearTimeout(timer);
            timer = null;
            func.apply(this, arguments);
        }, interval)
    }
}