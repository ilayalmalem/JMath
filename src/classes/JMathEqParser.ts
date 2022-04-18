import { Branch } from "../types/Branch"

export default class JMathEqParser {
    public isNumber(n: any) {
        return !isNaN(n)
    }

    public isString(n: any) {
        return n.length === 1 && n.match(/[a-z]/i)
    }

    public isWhitespace(n: any) {
        return n.trim() === ''
    }

    public inArray(arr: any[], el: any) {
        return arr.includes(el)
    }

    public parse(expression: string): Branch[] {
        const tree: Branch[] = []
        const variables: any[] = []

        for(let l of expression) {
            if(this.isWhitespace(l)) {
                continue
            } 

            if(this.isNumber(l)) {
                tree.push({
                    type: 'Number',
                    content: Number.parseFloat(l)
                })
            }

            else if(this.isString(l) && !this.inArray(variables, l)) {
                tree.push({
                    type: 'Variable',
                    content: l
                })
            }

            else if(['+', '-', '/', '^', '*'].includes(l)) {
                tree.push({
                    type: 'Operator',
                    content: l
                })
            }
        }
        return tree
    }

    public evalTree(tree: Branch[], varValues: object) {
        let equation = ''

        tree.forEach((branch, index) => {
            switch (branch.type) {
                case 'Number':
                    if(tree[index + 1]?.type == 'Variable') {
                        equation += `${branch.content}`
                    } else {
                        equation += branch.content
                    }
                    break;

                case 'Variable':
                    if(tree[index - 1]?.type == 'Number') {
                        equation += `*(${varValues[branch.content as keyof typeof varValues]})`
                    } else {
                        equation += `(${varValues[branch.content as keyof typeof varValues]})`
                    }
                    break;
                
                case 'Operator': 
                    if(branch.content == '^') {
                        equation += '**'
                    } else {
                        equation += branch.content
                    }
                    break
                default:
                    break;
            }
        })
        return eval(equation)
    }
}