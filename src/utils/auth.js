import * as local from './storage.js'
import { TIME_STAMP, TIME_OUT } from '@/common/common.js'
export const setTimeStamp = () => {
  // 保存时间
  local.setItem(TIME_STAMP, Date.now())
}

const getTimeStamp = () => {
  return local.getItem(TIME_STAMP)
}

export const isCheckTimeOut = () => {
  const currentTime = Date.now()

  const timestamp = getTimeStamp()

  return currentTime - timestamp <= TIME_OUT
}
