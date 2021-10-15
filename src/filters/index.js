export function phoneFormat(phone) {
  if (!phone) {
    return ''
  }
  return `${phone}`.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export function prefix(value, pre) {
  return pre + value
}
