function currying(func, length) {
    length = length || func.length;

    return (...args) => {
        return args.length >= length ? func.apply(this, args) : currying(func.bind(this, ...args), length - args.length);
    }
}

const add = currying(function(a, b) {
    return a + b
});

console.log(add(1)(2))


function enHanceadd() {
    let args = [].slice.call(arguments);
    const func = function() {
        let in_args = [].slice.call(arguments);
        return enHanceadd.apply(null, args.concat(in_args));
    }
    func.toString = function() {
        return args.reduce((a , b) => a + b);
    }
    return func;
}
console.log(enHanceadd(1));


let timer = null
function addAsync(...arg1){
	return function(...arg2){
		let arg = [...arg1,...arg2]
		clearTimeout(timer)
		timer = setTimeout(()=>{
			console.log(arg.reduce((p,c)=>p+c))
		},0)
		return addAsync(...arg);
	}
}

addAsync(2,3)(4)(5,6)(9)()(1) //30