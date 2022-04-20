## JMath - A JS library for computation and function evaluation
#### Installation 
> npm i @ilayalmalem/jmath

#### Usage
> From here - v1.0.0@alpha
First, determine which class you should use.
There are 3 classes: 
* JMathBasic - basic arithmetic operations
* JMathEqParser - you probably shouldn't use this, as it's used mainly to parse functions and equations
* JMathFunctions - evaluation of functions

The main use case is JMathFunctions ->
Create a new instance by:
```const funcs = new JMathFunctions()```
Then evaluate a function by:
```const values = funcs.getValues('x^2-2x^3+4', [-10, 10])```
First parameter is the function, and the second is the range
This will calculate all integer x values for this function, in the domain {-10<x<10}
You can also get the slope of a function by calling slope(), and passing two points:
> funcs.slope({x: 12, y: 15}, {x: 1, y: 19})

> v1.0.0@beta
* Added support for natural logs
* Added support for constants: pi, and e
* Fixed bugs in the parsing engine

> v1.0.1@alpha
* Added more constants. γ, Φ, Ω and K
