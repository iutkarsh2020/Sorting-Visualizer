export function getInsertionSortAnimations(array) {
    const animations = [];
    const n = array.length;
    const arr = array.slice();
    for (i = 1; i < n; i++) {
        let j = i;
        while (j > 0 && arr[j] < arr[j - 1]) {
            animations.push([j - 1, j]);
            animations.push([j - 1, j]);
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            animations.push([j - 1, arr[j - 1]]);
            animations.push([j, arr[j]]);
        }
    }
    return animations;
}