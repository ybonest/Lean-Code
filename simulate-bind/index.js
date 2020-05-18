const slice = Array.prototype.slice;
const concat = Array.prototype.concat;
const apply = Function.prototype.apply;

function argsName(length) {
    const args = [];
    do {
        args.unshift('$'+length)
    } while (length--);
    return args.join(',');
}

const bind = function(that) {
    const target = this;
    const args = slice.call(arguments, 1);
    let bound;

    function binder() {
        // bind返回的模板被new操作符实例化，此时this指向当前函数上下文
        // 调用bind改变this指向的函数这时会忽略之前传入的that，而是指向实例化对象
        const fullArgs = concat.call(args, slice.call(arguments))
        if (this instanceof bound) {
            const result = apply.call(target, this, fullArgs);
            
            // target若返回引用类型，则返回该引用类型，否则返回当前实例对象
            if (Object(result) == result) {
                return result; 
            } 
            return this;
        }
        return apply.call(target, that, fullArgs);
    }
    bound = Function('binder', `return function(${argsName(target.length - args.length)}) { return binder.apply(this, arguments); }`)(binder)
    return bound;
}

Function.prototype.bindFn = bind;

function Student(params) {
    params.name && (this.name = params.name);
    params.sex && (this.sex = params.sex);
    params.age && (this.age = params.age);
    return this;
}
const xiaoming = { name: 'xiaoming', sex: 'girl' };

const bindStudent = Student.bindFn(xiaoming)
const callBindStudent = bindStudent({age: 18});
console.log(callBindStudent, xiaoming === callBindStudent) // { name: 'xiaoming', sex: 'girl', age: 18 } true

const newBindStud = new bindStudent({ age: 19 });
console.log(newBindStud, newBindStud === xiaoming); // { age: 19 } false