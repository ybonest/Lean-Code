var Type = {};

for (var i = 0, type; type = ['String', 'Array', 'Number'][i++];) {
    (function(type) {
        Type['is'+type] = function(obj) {
            return Object.prototype.toString.call(ob) === `[object ${type}]`;
        }
    })(type);
}

Type.isArray([]);


var isType = function( type ){
    return function( obj ){
        return Object.prototype.toString.call( obj ) === '[object '+ type +']';
    }
};

var isString = isType( 'String' );
var isArray = isType( 'Array' );
var isNumber = isType( 'Number' );

console.log( isArray( [ 1, 2, 3 ] ) );     // 输出：true