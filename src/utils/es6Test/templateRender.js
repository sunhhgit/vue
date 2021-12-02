function render (template) {
  return function (context) {
    return template.replace(/\$\{(.*?)\}/g, (match, key) => context[key])
  }
}

const year = '2021'
const month = '10'
const day = '01'
const template = `${year}-${month}-${day}`
const context = { year, month, day }
const str = render(template)(context)
console.log(str) // 2021-10-01

