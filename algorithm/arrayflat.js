Array.prototype.flat  = function() {
  let arr = [];
  this.forEach(item => {
    if (Array.isArray(item)) {
      arr = arr.concat(item.flat());
    } else {
      arr.push(item)
    }
  });
  return arr;
}

console.log([1, 2, 3, 4, [5, 6, 7, [8, 9, 10, 11]]].flat())