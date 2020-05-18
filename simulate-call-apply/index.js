
const apply = function(that, args) {
    const target = this;
    const symbolKey = Symbol('targetAssignToThat');
    const $that = Object(that);

    if (typeof target !== 'function') {
        throw new TypeError(target.name + 'is not a fucntion');
    }
    args = Array.isArray(args) ? args : [];

    function assignTargetToThat() {
        $that[symbolKey] = target;
    }
    function deleteTargetFromThat() {
        delete $that[symbolKey];
    }
    function codeBuilder() {
        let length = args.length - 1;
        const argsCode = [];
        do {
            argsCode.unshift(`args[${length}]`);
        } while (length--);
        return `return that[symbolKey](${argsCode.join(',')})`;
    }
    function functionBuilder(code) {
        return new Function('that', 'symbolKey', 'args', code)
    }
    assignTargetToThat();
    const code = codeBuilder();
    const result = functionBuilder(code)($that, symbolKey, args);
    deleteTargetFromThat();

    return result;
}

Function.prototype.applyFn = apply;


// const xiaoming = { name: 'xiaoming' };
// const student = Student.applyFn(xiaoming, ['girl']);
// console.log(student);

const call = function(that, ...args) {
    return this.applyFn(that, args);
}
Function.prototype.callFn = call;

function Student(sex) {
    this.sex = sex;
    return this;
}

const xiaoming = { name: 'xiaoming' };
const student = Student.callFn(xiaoming, 'girl');
console.log(student);


