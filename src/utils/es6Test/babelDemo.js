// babel⾥我们主要⽤到types属性
export default function ({ types: t }) {
  return { visitor: {} }
}

// defineType('BinaryExpression', {
//   builder: ['operator', 'left', 'right'],
//   fields: {
//     operator: { validate: assertValueType('string') },
//     left: { validate: assertNodeType('Expression') },
//     right: { validate: assertNodeType('Expression') }
//   },
//   visitor: ['left', 'right'],
//   aliases: ['Binary', 'Expression']
// })
