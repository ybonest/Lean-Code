// let str = 'abcdabcdabcd';

// function duplicate(str) {
//     let copy = str;
//     let flagWord = str[0];
//     let i = 1;
//     let repeaWord = false;
//     while(flagWord.length <= Math.floor(str.length / 2)) {
//         copy = copy.substring(i);
//         if (copy === flagWord) {
//             repeaWord = flagWord;
//             break;   
//         }
//         if (flagWord !== copy.substring(0, flagWord.length)) {
//             i = flagWord.length + 1;
//             flagWord = str.substring(0, flagWord.length + 1);
//             copy = str;
//             continue;
//         }
//     }
//     return repeaWord;
// }

// console.log(duplicate(str), ":::::::")


let str = 'abcdabcdabcd4';

function duplicate(str) {
    let copy = str;
    let flagWord = str[0];
    let i = 1;
    let repeaWord = false;
    while(flagWord.length <= Math.floor(str.length / 2)) {
        copy = copy.substring(i);
        if (copy === flagWord) {
            repeaWord = flagWord;
            break;   
        }
        if (flagWord !== copy.substring(0, flagWord.length)) {
            i = flagWord.length + 1;
            flagWord = str.substring(0, flagWord.length + 1);
            copy = str;
            continue;
        }
    }
    return repeaWord;
}

console.log(duplicate(str), ":::::::")


function repeate(s) {
    return (s+s).slicc(1, -1).includes(s);
}

function repateReg(s) {
    return  /^(\w+)1+/.test(s);
}

function replateSlice(s) {
    let len = s.length;
    let i = 1;
    while(i < len / 2) {
        if (len % i === 0 && s.slice(0, i).repeat(len / i) === s) {
            return true;
        }
        i++;
    }
    return false;
}

console.log(replateSlice(str))