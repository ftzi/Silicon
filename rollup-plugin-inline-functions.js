// import path from "node:path"
// import * as acorn from "acorn"
// import { simple as walk } from "acorn-walk"
// import MagicString from "magic-string"

// export default function inlineFunctions() {
//   return {
//     name: "inline-functions",
//     transform(code, id) {
//       // Check if the file extension is .js or .ts
//       const ext = path.extname(id)
//       if (ext !== ".js" && ext !== ".ts") {
//         return null
//       }

//       const ast = acorn.parse(code, {
//         ecmaVersion: 2020,
//         sourceType: "module",
//         locations: true,
//         onComment: (block, text, start, end, startLoc, endLoc) => {
//           if (text.trim() === "@inline") {
//             this.inlineComments.push({ start, end })
//           }
//         },
//       })

//       this.inlineComments = []
//       const inlineFunctions = {}

//       // First pass: Find functions with @inline comment
//       walk(ast, {
//         FunctionDeclaration(node) {
//           const hasInlineComment = this.inlineComments.some(
//             (comment) => comment.start >= node.start && comment.end <= node.end,
//           )

//           if (hasInlineComment) {
//             const functionName = node.id.name
//             if (
//               node.body.body.length === 1 &&
//               node.body.body[0].type === "ReturnStatement"
//             ) {
//               inlineFunctions[functionName] = {
//                 params: node.params.map((param) => param.name),
//                 returnStatement: code.slice(
//                   node.body.body[0].argument.start,
//                   node.body.body[0].argument.end,
//                 ),
//               }
//               this.magicString.remove(node.start, node.end)
//             }
//           }
//         },
//       })

//       // Second pass: Replace function calls
//       walk(ast, {
//         CallExpression(node) {
//           if (
//             node.callee.type === "Identifier" &&
//             inlineFunctions[node.callee.name]
//           ) {
//             const inlineFunction = inlineFunctions[node.callee.name]
//             const args = node.arguments.map((arg) =>
//               code.slice(arg.start, arg.end),
//             )
//             let inlinedCode = inlineFunction.returnStatement

//             inlineFunction.params.forEach((param, index) => {
//               const regex = new RegExp(`\\b${param}\\b`, "g")
//               inlinedCode = inlinedCode.replace(
//                 regex,
//                 args[index] || "undefined",
//               )
//             })

//             this.magicString.overwrite(node.start, node.end, inlinedCode)
//           }
//         },
//       })

//       const result = {
//         code: this.magicString.toString(),
//         map: this.magicString.generateMap({ hires: true }),
//       }

//       return result
//     },
//     buildStart() {
//       this.inlineComments = []
//       this.magicString = new MagicString("")
//     },
//   }
// }
