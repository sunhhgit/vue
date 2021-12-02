class Test {
  _name = '';

  constructor () {
    this.name = 'lubai'
  }

  static getFormatName () {
    return `${this.name} - xixi`
  }

  get name () {
    return this._name
  }

  set name (val) {
    console.log('name setter')
    this._name = val
  }
}
console.log(new Test().name)
console.log(Test.getFormatName())
