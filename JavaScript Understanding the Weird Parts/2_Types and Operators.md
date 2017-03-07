# Types and Operators

## Dynamic Typing

**You don't tell the engine what type of data a variable holds, it figures it out while your code is running**

Variables can hold different types of values because it's all figured out during execution.

## Primitive Type

**A type of data that represents a single value**

That is, not an object.

1.  **Undefined**: `undefined` represents lack of existence (you shouldn't set a variable to this)
2. **Null**: `null` represents lack of existence (you can set a variable to this)
3. **Boolean**: `true` or `false`	
4. **Number**: *Floating point* number (there's always some decimals). Unlike other programming languages, there's only one 'number' type... and it can make math weird.
5. **String**: a sequence of characters (both '' and "" can be used)
6. **Symbol**: Used in ES6

## Operators

**A special function that is syntactically (written) differently**

Generally, operator take two parameters and return one result.

Infix notation: the function name (the operator) sits between the two parameters.

```javascript
var a = 4 + 3;
var a = 4 - 3;
var a = 4 > 3;
```

Operators are functions.

## Operator Precedence

**Which operator function gets called first**

Functions are called in order of precedence (*HIGHER precedence wins*)

## Associativity

**What order operator functions get called in: left-to-right or right-to-left**

When functions have the *SAME* precedence

exp. 

assignment: `= ` right-to-left

```javascript
var a = 2, b = 3, c = 4;
a = b = c;
console.log(a);
console.log(b);
console.log(c);
```

result:

```
4
4
4
```

Note: `b = c` will return the value on the right, i.e., `4`

## Coercion

**converting a value from one type to another**

This happens quite often in JavaScript because it's dynamically typed.

```javascript
var a = 1 + '2';
console.log(a);
```

result:

```
12
```

Because JavaScript Engine coerces number `1` to string `'1'`.

## Comparison Operators

```javascript
console.log(3 < 2 < 1);
```

result:

```
true
```

Because `<` is left-to-right, `3 < 2` returns `false`, then `false` will be coerced to number `0`. Of course `0 < 1` returns `true`. 

Note:  `Number(false) = 0 `, `Number(true) = 1`

Tip: use strictly equality `===` and strict inequality `!==` by default.

## Default Values

```javascript
name = name || '<Your name here>';
```

All JavaScript files are treated as a single file, i.e., all the variables are treated as global variables sitting inside the global execution context, and thus attached to the `window` object, in the case of the browser. So, we need define the variables default values to avoid collisions between them of different .js files.

```javascript
window.libraryName = window.libraryName || "Lib 2";
```

