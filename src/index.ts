import JMathEqParser from "./classes/JMathEqParser"
import JMathFunctions from "./classes/JMathFunctions"


const funcs = new JMathFunctions()
const parser = new JMathEqParser()

// console.log(parser.parse('ln(2.718)'))
let values = funcs.getValues('x^2', [0, 10])