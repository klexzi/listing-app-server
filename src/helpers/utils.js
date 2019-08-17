export function copyObject(obj, unselect = []) {
  var newObj = {};
  for (var key in obj) {
    //copy fields that is not included in the unselect
    if (!unselect.includes(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}
