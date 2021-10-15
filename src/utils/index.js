/**
 * 通用函数工具集
 */

const dayjs = require('dayjs')

let UUIDIndex = 1

/**
 * 字符串下划线转驼峰
 * @param str
 * @returns {*}
 */
export function lineToHump (str) {
  return str.replace(/_(\w)/g, (all, letter) => letter.toUpperCase())
}

/**
 * 判断是否在钉钉环境中
 * @returns {boolean}
 */
export function isInDingTalk () {
  return !!(navigator.userAgent && navigator.userAgent.toLowerCase()
    .indexOf(('DingTalk').toLowerCase()) > -1)
}

/**
 * 判断是否在微信环境中
 * @returns {boolean}
 */
export function isInWeiXin () {
  return !!(navigator.userAgent && navigator.userAgent.toLowerCase()
    .indexOf(('MicroMessenger').toLowerCase()) > -1)
}

/**
 * 为DOM元素ID添加唯一标示
 * @returns {string}
 * @constructor
 */
export function DOMUUID () {
  UUIDIndex += 1
  return `m-dom-id-${UUIDIndex}`
}

/**
 * 数字保留小数点位
 * 默认保留三位有效小数
 * @param value
 * @param num 保留位，默认3
 * @param NaNStr 无效数值对应字符串
 * @returns {string|null}
 */
export function numFixed (value, num = 3, NaNStr = null) {
  let initNum = 3
  if (value === null || isNaN(value)) {
    if (NaNStr !== null && NaNStr !== undefined) {
      return NaNStr
    } else {
      return value
    }
  } else {
    if (num != null && num !== undefined && !isNaN(num) && +num >= 0) {
      initNum = num
    }
    const newValue = (+value).toFixed(initNum)
    if (newValue.indexOf('.') > 0) {
      return newValue.replace(/(\.?0+)$/gm, '')
    } else {
      return newValue
    }
  }
}

/**
 * 数组a是否完全包含数组b中所有元素
 * @param a
 * @param b
 * @returns {boolean}
 */
export function arrayContained (a, b) {
  if (!(a instanceof Array) || !(b instanceof Array)) {
    return false
  }
  if (a.length < b.length) {
    return false
  }
  const aStr = a.toString()
  for (let i = 0, len = b.length; i < len; i++) {
    if (aStr.indexOf(b[i]) === -1) {
      return false
    }
  }
  return true
}

/**
 * 从数组中移除指定的元素
 * @param arr 数组
 * @param val 指定元素
 */
export function arrayRemoveByValue (arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1)
      break
    }
  }
}

/**
 * 从数组中移除指定value的元素
 * @param arr 数组
 * @param val 数值
 * @param key key对应的属性名
 */
export function arrayRemoveByValueKey (arr, val, key) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key].toString() === val.toString()) {
      arr.splice(i, 1)
      break
    }
  }
}

/**
 * 字符串格式化
 * @param str 带{}类型字符串
 * @param args 数值对象
 * @returns {*}
 */
export function strFormat (str, args) {
  return str.replace(/(\{[0-9a-zA-Z-_]+\})/g, a => {
    let value = ''
    const key = a.replace(/[\{\}]/g, '').trim()
    if (args[key]) {
      value = args[key]
    }
    return value
  })
}

/**
 * 日期时间格式化
 * @param dateObj 日期对象
 * @param formatStr 格式化规则，默认 YYYY-MM-DD HH:mm
 * @returns {string}
 */
export function dateTimeFormat (dateObj, formatStr = 'YYYY-MM-DD HH:mm:ss', invalidDateStr = '') {
  if (dateObj === null || dateObj === undefined || (`${dateObj}`).trim() === '' || !dayjs(dateObj).isValid()) {
    return invalidDateStr
  }
  return dayjs(dayjs(dateObj)).format(formatStr) || ''
}

/**
 * 日期格式化
 * @param dateObj 日期对象
 * @param formatStr 格式化规则，默认 YYYY-MM-DD
 * @returns {string}
 */
export function dateFormat (dateObj, formatStr = 'YYYY-MM-DD', invalidDateStr = '') {
  if (dateObj === null || dateObj === undefined || (`${dateObj}`).trim() === '' || !dayjs(dateObj).isValid()) {
    return invalidDateStr
  }
  return dayjs(dayjs(dateObj)).format(formatStr) || ''
}


/**
 * 格式化显示最新时间
 * @param catchTimeStr
 * @returns {string}
 */
export function calcShowTime (catchTimeStr, nanStr = '未知日期') {
  if (catchTimeStr === null || catchTimeStr === undefined || (`${catchTimeStr}`).trim() === '') {
    return nanStr
  }
  if (!dayjs(catchTimeStr).isValid()) {
    return nanStr
  } else {
    const diffMinutes = dayjs(new Date()).diff(dayjs('catchTimeStr'), 'minute')
    if (diffMinutes <= 1) {
      return '刚刚'
    } else if (diffMinutes < 60) {
      return `${Math.ceil(diffMinutes)}分钟前`
    } else if (diffMinutes < 1440) {
      return `${Math.ceil(diffMinutes / 60)}小时前`
    } else {
      return `${Math.ceil(diffMinutes / 1440)}天前`
    }
  }
}

/**
 * 表达式正则格式化计算
 * @param formula 表达式，格式为：{a}-{b}
 * @param obj 数值key-value，如{a:1,b:2}
 * @param nanValue 非法表达式返回值
 */
export function formulaEval (formula, obj, nanValue) {
  let hasNan = false
  const evalStr = formula.replace(/(\{[0-9a-zA-Z-_]+\})/g, a => {
    const key = a.replace(/[\{\}]/g, '').trim()
    const value = obj[key]
    if (value === null || value === undefined || isNaN(value)) {
      hasNan = true
    }
    // 强制添加()，加强表达式健壮性
    return `(${value})`
  })
  // eslint-disable-next-line no-eval
  const evalValue = hasNan ? nanValue : eval(evalStr)
  return evalValue === Infinity ? nanValue : evalValue
}


export function saveAs (obj, fileName) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(obj, fileName)
  } else {
    const tmpDom = document.createElement('a')
    tmpDom.download = fileName || '下载'
    tmpDom.href = URL.createObjectURL(obj)
    tmpDom.click()
    // 延时释放
    setTimeout(() => {
      URL.revokeObjectURL(obj)
    }, 100)
  }
}

// 随机颜色
export function randomColor (hex = false) {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  if (hex) {
    // eslint-disable-next-line no-bitwise
    const coverNumToHex = num => (num | 1 << 8).toString(16).slice(1)
    return `#${coverNumToHex(r)}${coverNumToHex(g)}${coverNumToHex(b)}`
  } else {
    return `rgb(${r}, ${g}, ${b})`
  }
}

// 通过正则获取当前路由及参数信息（针对懒加载的情况）
export function getUrlPathParams (url) {
  const regex = /#([a-zA-z1-9\/]+)\??(.*)/gm
  // eslint-disable-next-line init-declarations
  let m
  const groups = []
  while ((m = regex.exec(url)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++
    }
    m.forEach((match, groupIndex) => {
      if (groupIndex > 0) {
        groups.push(match)
      }
    })
  }
  if (groups.length === 0) {
    return {
      path: '/',
      params: {}
    }
  } else {
    const path = groups[0]
    const params = {}
    if (groups[1]) {
      const paramSplit = groups[1].split('&')
      for (const obj of paramSplit) {
        const oneParam = obj.split('=')
        if (oneParam.length === 2) {
          params[oneParam[0]] = oneParam[1]
        }
      }
    }
    return {
      path,
      params
    }
  }
}

/**
 * 生成色带
 * @param count
 * @param start
 * @param end
 */
export function generateRibbon (count, start, end) {
  const startColor = start || [0, 255, 0]
  const endColor = end || [255, 0, 0]
  if (count < 3) {
    return [`rgb(${startColor.toString()})`, `rgb(${endColor.toString()})`]
  }
  const rStart = startColor[0]
  const rEnd = endColor[0]
  const rSpan = (rEnd - rStart) / (count - 1)
  const gStart = startColor[1]
  const gEnd = endColor[1]
  const gSpan = (gEnd - gStart) / (count - 1)
  const bStart = startColor[2]
  const bEnd = endColor[2]
  const bSpan = (bEnd - bStart) / (count - 1)
  const colors = []
  for (let i = 0; i < count; i++) {
    const r = Math.ceil(rStart + i * rSpan)
    const g = Math.ceil(gStart + i * gSpan)
    const b = Math.ceil(bStart + i * bSpan)
    const rgb = [
      Math.max(Math.min(r, 255), 0), Math.max(0, Math.min(g, 255)), Math.max(0, Math.min(b, 255))
    ]
    colors.push(`rgb(${rgb.toString()})`)
  }
  return colors
}

/**
 * 数组根据数组对象中的某个属性值进行排序的方法
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param desc 默认false，升序排序
 *
 */
export function sortBy (attr, desc = false) {
  // 第二个参数没有传递 默认升序排列
  const revFlag = (desc) ? -1 : 1
  const reA = /[^a-zA-Z]/g
  const reN = /[^0-9]/g
  return function (a, b) {
    const aA = `${a[attr]}`.replace(reA, '')
    const bA = `${b[attr]}`.replace(reA, '')
    if (aA === bA) {
      const aN = parseInt(`${a[attr]}`.replace(reN, ''), 10)
      const bN = parseInt(`${b[attr]}`.replace(reN, ''), 10)
      // eslint-disable-next-line no-nested-ternary
      return aN === bN ? 0 : aN > bN ? revFlag * 1 : revFlag * -1
    } else {
      return aA > bA ? revFlag * 1 : revFlag * -1
    }
  }
}

// 深拷贝方法 递归拷贝
export function deepClone (obj) {
  const objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        // 判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          // 如果不是，简单复制
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}
