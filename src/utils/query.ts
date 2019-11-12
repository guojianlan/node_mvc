import * as R from "ramda";
/**
 *
 *
 * @export
 * @param {string[]} arr
 * @param {*} data
 * @returns {*}
 */
export function normalizeData_end(arr: string[], data: any): any {
  return R.pickBy((val, key) => {
    return !R.isNil(val) && arr.includes(key);
  }, data);
}
export function normalizeData(arr: string[], data: any): any {
  return R.map(item => {
    if (R.isNil(item)) {
      return (item = "");
    }
    return item;
  }, R.pickAll(arr, data));
}
