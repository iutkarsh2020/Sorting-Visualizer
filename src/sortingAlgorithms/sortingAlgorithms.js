export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
// function for bubble sorting
export function getBubbleSortAnimations(array) {
  const animations = [];
  const n = array.length;
  const arr = array.slice();
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // this push is for highlighting
      animations.push([j, j + 1]);
      // this push is for removing highlight
      animations.push([j, j + 1]);
      if (arr[j] > arr[j + 1]) {

        // Swap arr[j] and arr[j+1]
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
      animations.push([j, arr[j]]);
      animations.push([j + 1, arr[j + 1]]);
    }
    // in case swapper or not we will put these values to the new array


    // If no two elements were
    // swapped by inner loop, then break
    if (swapped == false)
      break;
  }
  return animations;
}
// function for heap sort
export function getHeapSortAnimations(array) {
  const animations = [];
  const n = array.length;
  const arr = array.slice();
  // Build heap (rearrange array)
  for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i, animations);
  // One by one extract an element from heap
  let index = 1;
  for (var i = n - 1; i > 0; i--) {
    // Move current root to end
    // this would mean I am changing the values of the array
    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    animations.push([-1, -1]);
    animations.push([n - index, temp]);
    index = index + 1;
    // call max heapify on the reduced heap
    heapify(arr, i, 0, animations);
  }

  return animations;
}

function heapify(arr, N, i, animations) {
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < N && arr[l] > arr[largest])
    largest = l;

  // If right child is larger than largest so far
  if (r < N && arr[r] > arr[largest])
    largest = r;
  // this would mean I would just change the colours
  // If largest is not root
  if (largest != i) {
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;
    animations.push([-2, -2]);
    animations.push([i, largest]);
    animations.push([i, largest]);
    animations.push([-1, -1]);
    animations.push([i, arr[i]]);
    animations.push([largest, arr[largest]]);
    // to change color
    // Recursively heapify the affected sub-tree
    heapify(arr, N, largest, animations);
  }
}
export function getInsertionSortAnimations(array) {
  const animations = [];
  const n = array.length;
  const arr = array.slice();
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      animations.push([j - 1, j]);
      animations.push([j - 1, j]);
      let temp = arr[j];
      arr[j] = arr[j - 1];
      arr[j - 1] = temp;
      animations.push([j - 1, arr[j - 1]]);
      animations.push([j, arr[j]]);
      j = j - 1;
    }
  }
  return animations;
}
export function getQuickSortAnimations(array) {
  const animations = [];
  const n = array.length;
  const arr = array.slice();
  quickSort(arr, 0, n - 1, animations);
  return animations;
}
function partition(arr, low, high, animations) {
  // Choosing the pivot
  let pivot = arr[high];

  // Index of smaller element and indicates the right position of pivot found so far
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      // Increment index of smaller element
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
      animations.push([i, j]);
      animations.push([i, j]);
      animations.push([j, arr[j]]);
      animations.push([i, arr[i]]);
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position
  animations.push([i + 1, high]);
  animations.push([i + 1, high]);
  animations.push([high, arr[high]]);
  animations.push([i + 1, arr[i + 1]]);
  return i + 1; // Return the partition index
}

// The main function that implements QuickSort
function quickSort(arr, low, high, animations) {
  if (low < high) {
    // pi is the partitioning index, arr[pi] is now at the right place
    let pi = partition(arr, low, high, animations);

    // Separately sort elements before partition and after partition
    quickSort(arr, low, pi - 1, animations);
    quickSort(arr, pi + 1, high, animations);
  }
}

