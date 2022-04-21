import { Point } from "../types/Point";

export default class JMathPointHelper {
    constructor(
        public point: Point
    ) {}

    public getX() {
        return this.point.x
    }

    public getY() {
        return this.point.y
    }

    public isDefined() {
        return this.point.y ? true : false
    }
}