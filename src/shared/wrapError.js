export function wrapError (data, lastRequestSettings) {
  const err = new Error()
  // eslint-disable-next-line init-declarations
  let res

  // 返回值处理
  if (data.response) {
    res = typeof data.response.data === 'object' ? data.response.data : {}
    res.status = data.response.status
  } else {
    // 根据实际业务接口场景
    res = {}
  }

  err.code = res.code

  window.trace('error', err.code)

  /*
   * 登录超时 508
   * 超时动作
   * 可以思考一下，如何做请求回复或者超时弹框处理
   * 1. 弹框让用户重新登录
   * 2. 登录完成重复操作
   */

  if (err.status === 508) {
    lastRequestSettings.push(data.config)
  }

  return err
}
