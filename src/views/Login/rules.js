import i18n from '@/i18n/index.js'

export const passwordValidate = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}

export const usernameValidate = () => {
  return (rule, value, callback) => {
    if (value.length <= 0) {
      callback(new Error(i18n.global.t('msg.login.usernameRule')))
    } else {
      callback()
    }
  }
}
