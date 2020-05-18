const compose = (...args) => [...args].reduce((a, b) => (...x) => a(b(...x)));

const a = x => x+1;
const b = x => x*2;
const c = x => x-2;

const result1 = compose(a, b)(1); // 3
const result2 = compose(a, b, c)(1); // -1

function curry(func, context, length) {
    length = length || func.length;

    return (...args) => {
        return args.length >= length
            ? func.apply(context, args)
            : curry(func.bind(context, ...args), context, length - args.length);
    }
}
// console.log(result1)
// console.log(result2)

const url = 'http://location:8080?a=1&b=2&c=3';

// const getSearch = url => url.split('?')[1];
// const splitUrl = search => search.split('&');
// const splitWithEqual = str => str.split('=');
// const arrToObj = ([key, value]) => ({[key]: value});

// const enhanceArrToObj = compose(arrToObj, splitWithEqual);
// const reduce = curry((func, strArr) => strArr.reduce((init, ele) => ({...init, ...func(ele) }), {}))(enhanceArrToObj);
// const analysisSearch = compose(splitUrl, getSearch);
// const analysisUrl = compose(reduce, analysisSearch);

// const result = analysisUrl(url);

// console.log(result, ":::::::::::::")

// const search = url.split('?')[1];
// const searchArr = search.split('&');
// const obj = {};

// for (const item of searchArr) {
//     const [key, value] = item.split('=');
//     obj[key] = value;
// }

// console.log(obj)


// const Container = function(x) {
//     this.__value = x;
// }
// Container.of = x => new Container(x);
// Container.prototype.map = function(f) {
//     return Container.of(f(this.__value))
// };

// const result = Container.of(1).map(x => x + 1).map(x => x + 2).map(x => x + 3)

// console.log(result, ":::::::::")



const Container = function(x) {
    this.__value = x;
}
Container.of = x => new Container(x);
Container.prototype.map = function(f) {
    return this.isNullOrUndefined() ? Container.of(null) : Container.of(f(this.__value))
};
Container.prototype.isNullOrUndefined = function() {
    return this.__value === null || this.__value === undefined;
};
const result = Container.of(1).map(x => null).map(x => x + 2).map().map(x => x + 3)

console.log(result, ":::::::::")