var ary = [];

for ( var i = 1; i <= 1000; i++ ){
    ary.push( i );
};

var renderFriendList = function( data ){
    for ( var i = 0, l = data.length; i < l; i++ ){
        var div = document.createElement( 'div' );
        div.innerHTML = i;
        document.body.appendChild( div );
    }
};

renderFriendList( ary ); 

// 在短时间内往页面中大量添加DOM节点显然也会让浏览器吃不消，我们看到的结果往往就是浏览器的卡顿甚至假死
// 这个问题的解决方案之一是下面的timeChunk函数，timeChunk 函数让创建节点的工作分批进行，比如把1秒钟创建1000个节点，改为每隔200毫秒创建8个节点。


var timeChunck = function(ary, fn ,count) {
    let timer;
    const execute = function() {
        for (let i=0; i < Math.min(count || 1, ary.length); i++) {
            fn(ary.shift());
        }
    }
    return function() {
        timer = setInterval(function() {
            if (ary.length === 0) {
                clearInterval(timer);
            } else {
                execute();
            }
        }, 200)
    }
}

var renderFriendList = timeChunk( ary, function( n ){
    var div = document.createElement( 'div' );
    div.innerHTML = n;
    document.body.appendChild( div );
}, 8 );