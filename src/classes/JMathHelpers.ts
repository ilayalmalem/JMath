export default class JMathHelpers {
    public isString(n: any) {
        return n?.length === 1 && (n?.match(/[a-z]/i) || this.isConstant(n))
    }

    public isWhitespace(n: any) {
        return n.trim() === ''
    }

    public inArray(arr: any[], el: any) {
        return arr.includes(el)
    }

    public isNumber(n: any) {
        return !isNaN(n) && !this.isWhitespace(n)
    }
    public cot(x: number) {
        return 1 / Math.tan(x);
    }

    public isConstant(str: string) {
        return ['e', 'π', 'γ', 'Φ', 'Ω', 'K'].includes(str)
    }

    public parseConstant(str: string) {
        switch(str) {
            case 'π':
                return Math.PI
            case 'e':
                return Math.E
            case 'γ':
                return 0.57721566490153286060   
            case ('Φ'):
                return 1.61803398874989484820
            case 'Ω':
                return 0.56714329040978387299 
            case 'K':
                return 0.91596559417721901505   
        }
    }
}