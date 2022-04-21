import { AngleMode } from "../types/AngleMode"
import { Point } from "../types/Point"
import JMathBasic from "./JMathBasic"
import JMathEqParser from "./JMathEqParser"

export default class JMathFunctions {
    private jmb: JMathBasic
    private jmp: JMathEqParser
    private angleMode: AngleMode
    constructor() {
        this.jmb = new JMathBasic(0)
        this.jmp = new JMathEqParser()
        this.angleMode = 'rad'
    }


    public slope(point1: Point, point2: Point) {
        return (point2.y - point1.y) / (point2.x - point1.x)
    }

    public getValues(func: string, range: [number, number]) {
        const [start, end] = range
        const points: Point[] = []

        for (let i = start; i < end; i++) {
            const parsed = this.jmp.parse(func)
            const evaled = this.jmp.evalTree(parsed, {x: i})
            points.push({x: i, y: evaled})
        }

        return points
    }
}