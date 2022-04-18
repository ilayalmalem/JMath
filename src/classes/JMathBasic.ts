export default class JMathBasic {
    constructor(
        private queryCount: number
    ) {
        queryCount++
    }

    public add(nums: number[]) {
        return nums.reduce((pNum, cNum) => pNum + cNum)
    }

    public sub(nums: number[]) {
        return nums.reduce((pNum, cNum) => pNum - cNum)
    }

    public mult(nums: number[]) {
        return nums.reduce((pNum, cNum) => pNum * cNum)
    }

    public div(nums: number[]) {
        return nums.reduce((pNum, cNum) => pNum / cNum)
    }

    public fact(n: number): number {
        if(n == 0) return 1
        if(n < 0) return -1
        if(!this.isWhole(n)) return -1
        return n*this.fact(n-1)
    }

    public isWhole(n: number): boolean {
        if(n % 1 != 0) return true
        else return false
    }

    public exp(base: number, power: number): number {
        return base ** power
    }

    public abs(n: number) {
        if(n < 0) return n * -1
        else if(n > 0) return n
        else return 0
    }

    public isPos(n: number): boolean {
        if(n > 0 ) return true
        else return false
    }
}