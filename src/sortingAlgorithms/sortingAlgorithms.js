/*
 * Nathan Hinton
 * 7/22/2020
 * 
 * Purpose -
 *    - Algorithms that sort arrays of integers
 *    - All will return an animation array which will specify indexes of the 
 *      array-bars div to color or swap heights
 * 
 */




/*
 * ================= Merge Sort ================================
 */

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
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

/*
 * ================= Quick Sort ================================
 */

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }

  function quickSortHelper(array, low, high, animations) {
    if (low < high) {
      // Do partition function
      let pi = partition(array, low, high, animations);

      // Recursively sort each half
      quickSortHelper(array, low, pi - 1, animations);
      quickSortHelper(array, pi + 1, high, animations);
    }
    else return;
  }

  function partition(array, low, high, animations) {
    // Choose last element as pivot (Element to be placed at right position)
    let pivot = array[high];  
 
    let i = (low - 1)  // Index of smaller element

    // If current element is smaller than the pivot swap values
    for (let j = low; j <= high - 1; j++) {
      
      if (array[j] < pivot) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, high, 0, 0, 0]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, high, 0, 0, 1]); 
        // increment index of smaller element
        i++;    
        // Push the indexes to swap to animations and swap the values
        animations.push([i, j, array[i], array[j], 2])
        swapValues(array, i, j);
      }
    }
    // Push the indexes to swap to animations and swap the values
    animations.push([i + 1, high, array[i+1], array[high], 2])
    swapValues(array, i + 1, high);
    return (i + 1);
  }

/*
 * ================= Heap Sort ================================
 */

export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, array.length, animations);
  return animations;
}

  function heapSortHelper(array, length, animations) {
    // Build heap (rearrange array) 
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
      heapify(array, length, i, animations); 
    }

    // One by one extract an element from heap 
    for (let i = length - 1; i > 0; i--) { 
      // Move current root to end 
      // Push the indexes to swap to animations
      animations.push([0, i, array[0], array[i], 2])
      swapValues(array, 0, i); 
    
      // call max heapify on the reduced heap 
      heapify(array, i, 0, animations); 
    } 

    return;
  }

  function heapify(array, length, index, animations) {
    var largest = index;        // Initialize largest as root 
    var left = 2 * index + 1;   // left = 2*i + 1 
    var right = 2 * index + 2;  // right = 2*i + 2 
  
    // If left child is larger than root 
    if (left < length && array[left] > array[largest]) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([left, largest, 0, 0, 0]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([left, largest, 0, 0, 1]);
      // Assign new largest
      largest = left; 
    }
  
    // If right child is larger than largest so far 
    if (right < length && array[right] > array[largest]) { 
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([right, largest, 0, 0, 0]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([right, largest, 0, 0, 1]);
      // Assign new largest
      largest = right; 
    }
  
    // If largest is not root 
    if (largest !== index) { 
      // Push the indexes to swap to animations and swap the values
      animations.push([index, largest, array[index], array[largest], 2])
      swapValues(array, index, largest); 
  
      // Recursively heapify the affected sub-tree 
      heapify(array, length, largest, animations); 
    } 
  }

  /*
 * ================= Heap Sort ================================
 */

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, array.length, animations);
  return animations;
}

  function bubbleSortHelper(array, length, animations) {
    var i, j;  
    for (i = 0; i < length-1; i++) {
      // Last i elements are already in place  
      for (j = 0; j < length-1-i; j++) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j + 1, 0, 0, 0]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j + 1, 0, 0, 1]);
          if (array[j] > array[j+1]) {
            // Push the indexes to swap to animations and swap the values
            animations.push([j, j + 1, array[j], array[j + 1], 2])
            swapValues(array, j, j+1);
          }
      } 
    }
  }

// Helper function for bubble sort, quick sort and heap sort
function swapValues(array, x, y) {
  var temp = array[x];
  array[x] = array[y];
  array[y] = temp;
}