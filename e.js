// console.log(1)
//     setTimeout(() => {
//         console.log(2)
//         process.nextTick(() => {
//             console.log(11)
//         })
//     })
//     process.nextTick(() => {
//         console.log(3)
//     })
//     setImmediate(() => {
//         console.log(4)
//     })
//     new Promise(resolve => {
//         console.log(5)
//         resolve()
//         console.log(6)
//     })
//     .then(() => {
//         console.log(7)
//     })
//     Promise.resolve()
//     .then(() => {
//         console.log(8)
//         setTimeout(() => {
//             console.log(10)
//         })
//         process.nextTick(() => {
//             console.log(9)
//         })
//     })

let a = 0
console.log(a)
// console.log(b)
// let b = 0
console.log(c)
function c() {}