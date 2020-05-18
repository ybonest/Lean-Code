function bubble(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
            }
        }
    }
    return arr;
}

console.log(bubble([1, 3, 4, 2, 5]));


// function quickSort(arr, left = 0, right = arr.length - 1) {
//     const low = left;
//     const high = right;
//     const flag =  arr[low];

//     while(left <= right) {
        
//     }
// }

// 是否重复字符串
function strIsRepeat(str) {
    const base = Array.from(new Set(str)).join(''); 
    return base.padEnd(str.length, base) === str;
}

console.log(strIsRepeat('abc abc abc '));

function strIsRepeat2(str) {
    return (str+str).substring(1, (str+str).length-1).includes(str);
}

console.log(strIsRepeat2('abcabcabc'));

function strIsRepeat3(str) {
    const base = Array.from(new Set(str)).join(''); 
    return base.repeat(str.length / base.length) === str;
}

console.log(strIsRepeat3('abcabcabc'));

function strIsRepeat4(str) {
    let point = 0
    let repeatSub = str[point];
    const len = str.length;
    while(len / 2 > repeatSub.length) {
        if (repeatSub.repeat(len / repeatSub.length) === str) {
            return true
        }
        repeatSub = str.substring(0, ++point);
    }
    return false;
}

console.log(strIsRepeat4('abcabcabc'));

function strIsRepeat5(str) {
    return  /^(\w+)1+/.test(str);
}

console.log(strIsRepeat5('abcabcabc'));