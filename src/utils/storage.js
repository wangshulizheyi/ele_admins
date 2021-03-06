// 存储数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

// 删除单个
export const deleteItem = (key) => {
  window.localStorage.removeItem(key)
}

// 清除所有
export const clearItem = (key) => {
  window.localStorage.deleteItem(key)
}
