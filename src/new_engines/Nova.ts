// Nova-Engine@1.0

import JMathHelpers from "../classes/JMathHelpers"
import { Point } from "../types/Point"
import { Range } from "../types/Range"

export default class NovaParser {
    private helpers: JMathHelpers
    constructor() {
        this.helpers = new JMathHelpers()
    }

    public parse(equation: string) {
        let stack = ''
        let tree = []
        let newEquation = [...equation]
        
        if(equation) {
            // only run if equation is not null
            for(let index = 0; index <= equation.length; index++) {
                // get current letter each iteration
                let currentLetter = equation[index]
                stack += currentLetter
                // Remove first letter from the new equation
                newEquation.shift()
                if(currentLetter == '(') {
                    tree.push({
                        type: 'BlockStart',
                        children: []
                    })
                    stack = ''
                }

                if(currentLetter == ')') {
                    tree.push({
                        type: 'BlockEnd',
                        children: []
                    })
                    stack = ''
                }

                if(this.helpers.isString(currentLetter)) {
                    if(currentLetter == 'x') {
                        tree.push({
                            type: 'Variable',
                            content: currentLetter
                        })
                    } else {
                        if(this.helpers.isConstant(currentLetter)) {
                            tree.push({
                                type: 'Constant',
                                content: currentLetter
                            })
                        }
                    }
                }

                if(['+', '-', '/', '^', '*'].includes(currentLetter)) {
                    tree.push({
                        type: 'Operator',
                        variant: currentLetter
                    })
                }
               
                if(this.helpers.isNumber(currentLetter)) {
                    let skips = -2
                    let numberStack = ''
                    for(let j = index; j <= equation.length; j++) {
                        let current = equation[j]   
                        skips++
                        if(this.helpers.isNumber(current) || current == '.') {
                            numberStack += current
                        } else {
                            tree.push({
                                type: 'Number',
                                content: Number.parseFloat(numberStack)
                            })
                            break
                        }
                    }
                    index += skips
                }

                if(['ln', 'sin', 'cos', 'tan', 'cot'].includes(stack)) {
                    // let children: any = this.parse(newEquation.join(''))
                    // console.log(children);
                                        
                    tree.push({
                        type: 'Function',
                        variant: stack,
                        content: '',
                        // children: children
                    })
                    stack = ''
                }
            }

            return tree
        }
    }

    public readTree(tree: any, varValues: any) {
        let eq = ''
        for(let index = 0; index <= tree.length; index++) {
            let current = tree[index]
            switch(current?.type) {
                case 'Function': 
                    let translated = {
                        'ln': 'Math.log',
                        'sin': 'Math.sin',
                        'cos': 'Math.cos',
                        'tan': 'Math.tan',
                        'cot': 'this.helpers.cot',
                        'sqrt': 'Math.sqrt'
                    }
                    Math.atan
                    eq += translated[current.variant as keyof typeof translated]
                    break

                case 'BlockStart': 
                    eq += '('
                    break

                case 'BlockEnd': 
                    eq += ')'
                    break

                case 'Variable': 
                    if(tree[index - 1]?.type == 'Number') eq += `*${varValues[current.content]}`
                    else eq += `${varValues[current.content]}`
                    break

                case 'Operator': 
                    if(current.variant == '^') eq += '**'
                    else eq += current.variant
                    break

                case 'Number': 
                    eq += current.content
                    break

                case 'Constant':
                    let val = this.helpers.parseConstant(current.content)
                    if(['Number', 'Variable', 'Constant'].includes(tree[index - 1]?.type)) eq += `*${val}`
                    else if(['Number', 'Variable', 'Constant'].includes(tree[index + 1]?.type)) eq += `${val}*`
                    else if(['Number', 'Variable', 'Constant'].includes(tree[index - 1]?.type) && ['Number', 'Variable', 'Constant'].includes(tree[index + 1]?.type)) eq += `${val}*`
                    else eq += `${val}`
                    break

            }
        }

        return eq
    }

    public functionValues(expression: any, range: Range) {
        const [start, end] = range
        const values: Point[] = []

        for(let i = start; i <= end; i++) {
            const parsed = this.parse(expression)
            const read = this.readTree(parsed, {x: i})
            values.push({
                x: i,
                y: eval(read)
            })
        }
        return values
    }
}