## JMath - A JS library for computation and function evaluation
#### Installation 
> npm i @ilayalmalem/jmath

#### Usage
#### v1.0.0@alpha
First, determine which class you should use.
There are 3 classes: 
* JMathBasic - basic arithmetic operations
* JMathEqParser - you probably shouldn't use this, as it's used mainly to parse functions and equations
* JMathFunctions - evaluation of functions
* The parsing engine released with it is Ivory@1.0

The main use case is JMathFunctions ->
Create a new instance by:

```const funcs = new JMathFunctions()```

Then evaluate a function by:

```const values = funcs.getValues('x^2-2x^3+4', [-10, 10])```

First parameter is the function, and the second is the range
This will calculate all integer x values for this function, in the domain {-10<x<10}
You can also get the slope of a function by calling slope(), and passing two points:

``` funcs.slope({x: 12, y: 15}, {x: 1, y: 19}) ```

#### v1.0.0@beta
* Added support for natural logs
* Added support for constants: pi, and e
* Fixed bugs in Ivory, and released Ivory@1.1

#### v1.0.1@alpha
* Added more constants. γ, Φ, Ω and K
* released Ivory@1.2

#### v1.0.2@alpha
* Generalised functions, and now it's much easier to implement functions such as trig functions and logs
* Added support for sqrt
* Released Ivory@1.3

#### v1.1.0@alpha
* Released a preview of the Nova engine - Nova@1.0(preview). although still not using recursion as needed, the engine can handle pretty much everything + deep nesting.
* Released Ivory@1.4 - this engine will be deprecated soon.
* Extracted functionality to JMathHelpers
* Started performance measuring




### JMath@next
#### Patch - v1.1.1
* Adding more constants
* Add helpers for the Point type
* Reduce functionValues 1000000 time to 10s

#### Minor - v1.2.0
* Complete deprecation of Ivory, and the release of the Nova@2.0 engine, a recursive, more intelligent and capable parsing engine

#### Major - v2.0.0
* Releasing Nove@2.0 
* Controlling radian/degree calculations
* Implementing all function of the Math lib into the Nova engine
* Adding atleast 60 constants from math, physics and chemistry
* Adding the option to add more than one variable to a function
* Reduce functionValues 1000000 time to 5s

### Performance

| size/type  |  parse |  readTree | functionValues  |   |
|---|---|---|---|---|
|  100 |   |   | 3.0330ms  |   |
|  1000 |   |   | 21.581ms  |   |
|  1000000 |   |   | 13.804s  |   |




