import NovaParser from "./new_engines/Nova";

const nova = new NovaParser()
const equation = 'cot(x)'
const parse = nova.parse(equation)
const read = nova.readTree(parse, {x: 2})
const evaled = nova.functionValues(equation, [0,10])
console.log([parse, read, evaled]);
