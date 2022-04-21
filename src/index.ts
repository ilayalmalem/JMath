import JMathFunctions from "./classes/JMathFunctions";
import NovaParser from "./new_engines/Nova";

const nova = new NovaParser()

const equation = 'x^2'
console.time()
const evaled = nova.functionValues(equation, [0,1000000])
console.timeEnd()