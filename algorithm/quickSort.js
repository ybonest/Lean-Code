function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low >= high) {
    return;
  }
  let left = low;
  let right = high;
  let flag = arr[left];
  while(left !== right) {
    while (left < right && flag <= arr[right]) {
      right--;
    }
    arr[left] = arr[right];
  
    while (left < right && flag >= arr[left]) {
      left++;
    }
    arr[right] = arr[left];
  }
  arr[left] = flag;
  quickSort(arr, low, left - 1);
  quickSort(arr, left + 1, high)
  return arr;
}


console.log(quickSort([2, 2, 4, 1, 6, 9, 12, 3]))