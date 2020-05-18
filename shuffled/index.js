// function shuffled(arr) {
//     const len = arr.length;
//     for (let i=0; i < len - 1; i++) {
//         const idx = Math.floor(Math.random() * (len - i));
//         [arr[idx], arr[len - i - 1]] = [arr[len - i - 1], arr[idx]];
//     }
//     return arr;
// }

// console.log(shuffled([1, 2, 3, 4, 5]))


// function add(x) {
//     return function(y) {
//         return x + y;
//     }
// }
// function one(x) {
//     if (typeof x === 'function') {
//         return x(1)
//     }
//     return 1
// }
// function two(y) {
//     if (typeof y === 'function') {
//         return y(2);
//     }
//     return 2;
// }
// console.log(one(add(two()))) // 3
// console.log(two(add(one()))) // 3


// // cacheRequest 

// const cache = {};
// let timer;

// function cacheRequest(uri, func) {
//     clearTimeout(timer);
//     if (!cache[uri]) {
//         cache[uri] = func;
//     }
//     timer = setTimeout(function() {
//         cache[uri]()
//     }, 0)
// }

// cacheRequest('/user', data => {
//     console.log('我是从 A 中请求的 user，数据为' + data)
// })
// // b.js
// cacheRequest('/user', data => {
//     console.log('我是从 B 中请求的 user，数据为' + data)
// })

const t = '{"a": 1, "b": "str", "c":[2, 3], "d":{"e": 4}}'

const len = t.length;
let str = '';
let i = 0;
const stack = [];

function buildEmpty(length) {
    if (!length) return '';
    let str = ''
    while(length--) {
        str += ' ';
    }
    return str;
}

do {
    const s = t[i];
    if (!s.trim()) continue;

    if (s === '{' || s === '[') {
        stack.push(s);
        const stacklenth = stack.length;
        str = str+s+'\n' + buildEmpty(stacklenth * 2);
    } else if (s === ',') {
        const stacklenth = stack.length;
        str = str+s+'\n' + buildEmpty(stacklenth * 2);
    } else if (s === ']' || s === '}') {
        stack.pop();
        const stacklenth = stack.length;
        let tabs = '';
        if (stacklenth > 0) {
          tabs = buildEmpty(stacklenth * 2);
        } 
        str = str+'\n' + tabs +s;
    } else {
        str += s;
    }
} while (len > ++i);

console.log(str);

function currying(func, length) {
    const arglenth = length || func.length;
    const context = this;
    return (...args) => {
        return args.length >= arglenth ? func.apply(context, args) : currying(func.bind(this, ...args), arglenth - args.length )
    } 
}