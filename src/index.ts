import JMathEqParser from "./classes/JMathEqParser"
import JMathFunctions from "./classes/JMathFunctions"


const funcs = new JMathFunctions()
const parser = new JMathEqParser()
let values = funcs.getValues('e / (πx)', [0, 10])
console.log(values);
