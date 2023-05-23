
function hi() {
  const arr = [1, 2, 2, 1, 1, 3];
  let occr = {};
  let result = {};
  for (i = 0; i < arr.length; i++) {
    if (occr[arr[i]]) {
      occr[arr[i]]++;
    } else {
      occr[arr[i]] = 1;
    }
  }
  for (key in occr) {
    if (result[occr[key]]) return false;
    else result[occr[key]] = true;
  }
  return true;
}
console.log(hi())

