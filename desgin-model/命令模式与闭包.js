// 面向对象写法
const Tv = {
    open() {
        console.log('open tv');
    },
    close() {
        console.log('close tv');
    }
}

const OpenTvCommand = function(receiver) {
    this.receiver = receiver;
}

OpenTvCommand.prototype.execute = function() {
    this.receiver.open();
}

OpenTvCommand.prototype.undo = function() {
    this.receiver.close();
}

const setCommand = function(command) {
    document.getElementById('execute').onclick = function() {
        command.execute();
    }
    document.getElementById('undo').onclick = function() {
        command.undo();
    }
}

setCommand(new OpenTvCommand(Tv));


// 闭包
var createCommand2 = function( receiver ){
    var execute = function(){
        return receiver.open();    // 执行命令，打开电视机
    }
    var undo = function(){
        return receiver.close();    // 执行命令，关闭电视机
    }
    return {
        execute: execute,
        undo: undo
    }
};

var setCommand2 = function( command ){
    document.getElementById( 'execute' ).onclick = function(){
        command.execute();     // 输出：打开电视机
    }
    document.getElementById( 'undo' ).onclick = function(){
        command.undo();    // 输出：关闭电视机
    }
};

setCommand2( createCommand2( Tv ) );