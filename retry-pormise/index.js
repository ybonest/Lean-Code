

function retryPromise(fn, interval, times) {
    let i = 0;
    return new Promise(function(resolve, reject) {
        function loop() {
            setTimeout(() => {
                fn().then(data => {
                    resolve(data)
                }).catch((err) => {
                    console.log('inner err:', err);
                    if (++i === times) {
                        reject(err);
                    } else {
                        loop();
                    }
                })
            }, interval)
        }
        loop();
    });
}

function p() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            reject(123);
        }, 100)
    })
}

retryPromise(p, 100, 10).then(()=>{}, (err) => {
    console.log('err', err);
});