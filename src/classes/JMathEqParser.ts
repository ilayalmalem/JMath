import { Branch } from "../types/Branch"

export default class JMathEqParser {
    public isNumber(n: any) {
        return !isNaN(n)
    }

    public isString(n: any) {
        return n.length === 1 && n.match(/[a-z]/i)
    }

    public isConstant(str: string) {
        return ['e', 'pi', 'π'].includes(str)
    }

    public isWhitespace(n: any) {
        return n.trim() === ''
    }

    public inArray(arr: any[], el: any) {
        return arr.includes(el)
    }

    public pushToTree(tree: Branch[], type: string, content: any) {
        tree.push({
            type: type,
            content: content
        })
    }

    public getBranchByIndex(tree: Branch[], index: number) {
        return tree[index]
    }

    parseConstant(l: string) {
        switch(l) {
            case 'π':
                return Math.PI
            case 'e':
                return Math.E
        }
    }
    
    public parse(expression: string): Branch[] {
        const tree: Branch[] = []
        const variables: any[] = []
        let stack: string = ''
        let numberStack: string = ''

        let index = -1
        for(let l of expression) {
            index++
            if(this.isWhitespace(l)) {
                continue
            } 

            if(this.isNumber(l)) {
                let skips = -1
                for(let j = index; j <= expression.length; j++) {
                    let current = expression[j]   
                    skips++
                    if(this.isNumber(current) || current == '.') {
                        numberStack += current
                    } else {
                        this.pushToTree(tree, 'Number', Number.parseFloat(numberStack))
                        break
                    }
                }
                index += skips
            }

            else if(this.isConstant(l)) {
                this.pushToTree(tree, 'Constant', this.parseConstant(l))
            }

            else if(this.isString(l) && !this.inArray(variables, l)) {
                // currently only accept x and y as vars
                if(l == 'x' || l == 'y') {
                    this.pushToTree(tree, 'Variable', l)
                } else {
                    stack += l
                }
            }

            else if(['+', '-', '/', '^', '*'].includes(l)) {
                this.pushToTree(tree, 'Operator', l)
            }

            else if(l == '(') {
                this.pushToTree(tree, 'BlockStart', '')
            }

            else if(l == ')') {
                this.pushToTree(tree, 'BlockEnd', '')
            }

            // Stack checks 
            if(stack) {
                if(stack == 'ln') {
                    this.pushToTree(tree, 'NaturalLog', '')
                    stack = ''
                }
            }
        }
        return tree
    }

    public evalTree(toEvalTree: Branch[], varValues: {x: any}) {
        let equation = ''
        let tree = toEvalTree

        for(var index = 0; index <= tree.length; index++) {
            var branch: Branch = tree[index]
            
            switch (branch?.type) {
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

                case 'Constant': 
                    const appendableTypes = ['Number', 'Variable', 'Constant']
                    if(appendableTypes.includes(tree[index - 1]?.type) && appendableTypes.includes(tree[index + 1]?.type)) {
                        equation += `*${branch.content}*`
                    }
                    
                    else if(appendableTypes.includes(tree[index + 1]?.type)) {
                        equation += `${branch.content}*`
                    }
                    
                    else if(appendableTypes.includes(tree[index - 1]?.type)) {
                        equation += `*${branch.content}`
                    }

                    else {
                        equation += branch.content
                    }
                    break

                case 'BlockStart': 
                    equation += '('
                    break

                case 'BlockEnd': 
                    equation += ')'
                    break
                
                case 'NaturalLog':
                    let eq = ''
                    let skips = -1

                    for(let i = index; i <= tree.length; i++) {                        
                        const element = tree[i]
                        if(element?.type == 'BlockEnd') {
                            skips++
                            break
                        } else {
                            eq += element?.content
                            skips++
                        }
                    }
                    
                    console.log(index);
                    index = index + skips
                    
                    let logInside = this.evalTree(this.parse(eq), {x: (varValues.x || 0)})   
                    let logValue = Math.log(eval(logInside))

                    equation += (this.evalTree([{type: 'Number', content: logValue}], {x: varValues[branch.content as keyof typeof varValues]}))
                    break
                default:
                    break;
            }
        }
        return eval(equation)
    }
}