function bubleSort(arr) {
  let flag;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j+1]) {
        flag = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = flag;
      }
    }
  }
  return arr;
}

console.log(bubleSort([2, 2, 4, 1, 6, 9, 12, 3]))