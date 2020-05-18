// 二分法查找

// 递归
function binarySearch(arr, target, low = 0, high = arr.length - 1) {
  const middle = Math.floor((low + high) / 2);
  if (target === arr[middle]) {
    return middle;
  }

  if (low < high && target < arr[middle]) {
    return binarySearch(arr, target, low, middle - 1);
  }
  if (low < high && target > arr[middle]) {
    return binarySearch(arr, target, middle + 1, high);
  }
  return -1
}

// 遍历
function binarySearchWhile(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  let middle = -1;
  while(low < high) {
    middle = Math.floor((low + high) / 2);
    
    if (target < arr[middle]) {
      high = middle - 1;
    } else if (target > arr[middle]) {
      low = middle + 1;
    } else {
      break;
    }
  }
  return middle;
}

console.log('binarySearch 15：' + binarySearch([1,2,3,4,5,7,9,11,14,16,17,22,33,55,65],15))
console.log('binarySearch 4：' +binarySearch([1,2,3,4,5,7,9,11,14,16,17,22,33,55,65],4))
console.log('binarySearchWhile 15：' +binarySearchWhile([1,2,3,4,5,7,9,11,14,16,17,22,33,55,65],15))
console.log('binarySearchWhile 4：' +binarySearchWhile([1,2,3,4,5,7,9,11,14,16,17,22,33,55,65],4))