export const setItem = (key, item) => {
  // item 如果是对象，转换为字符串
//   if (item instanceof Object) {
//     item = JSON.stringify(item)
//   }
  window.localStorage.setItem(key, JSON.stringify(item))
}

export const getItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
