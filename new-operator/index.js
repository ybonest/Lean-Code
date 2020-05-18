

function newOperator(ctor) {
    if (!ctor instanceof Function) throw 'newOperator must accept a function params';

    function createThisEvit() {
        return Object.create(ctor.prototype);
    }

    function bindThisForCtor(bindingThis, args) {
        return ctor.apply(bindingThis, args);
    }

    function ruleOutBasicDataType(data) {
        return (data !== null && typeof data === 'object') || typeof data === 'function';
    }

    return function(...args) {
        const bindingThis = createThisEvit();
        const ctorReturn = bindThisForCtor(bindingThis, args);

        if (ruleOutBasicDataType(ctorReturn)) {
            return ctorReturn;
        }
        return bindingThis;
    }
}


function Student(name, sex) {
    this.name = name;
    this.sex = sex;
}

const student = newOperator(Student)('xiaoming', 'girl');

console.log(student) // Student { name: 'xiaoming', sex: 'girl' }

function School(name, city) {
    this.name = name;
    this.city = city;
    return student;
}

const school = newOperator(School)('chengduligongdaxue', 'chengdu');

console.log(school) // Student { name: 'xiaoming', sex: 'girl' }
