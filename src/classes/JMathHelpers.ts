export default class JMathHelpers {
    public isString(n: any) {
        return n?.length === 1 && n?.match(/[a-z]/i)
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

}