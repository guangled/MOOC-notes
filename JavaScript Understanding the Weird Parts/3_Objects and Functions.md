# Objects and Functions

## Objects and the Dot

**Object**

* Primitive "property"
* Object "property"
* Function "method"

```javascript
var person = new Object();

person['firstname'] = 'Tony';
person['lastname'] = 'Alicea';

var firstNameProperty = 'firstname';

console.log(person);
console.log(person[firstNameProperty]);

console.log(person.lastname);

person.address = new Object();
person.address.street = '111 Main St.';
person.address.city = 'New York';
person.address.state = 'NY';

console.log(person.address.street);
console.log(person.address.city);
console.log(person['address']['state']);
```

result:

```
Object {firstname: "Tony", lastname: "Alicea"}
Tony
Alicea
111 Main St.
New York
NY
```

The preferred approach is using the dot operator.

## Objects and Object Literals

```javascript
var Tony = { 
    firstname: 'Tony', 
    lastname: 'Alicea',
    address: {
        street: '111 Main St.',
        city: 'New York',
        state: 'NY'
    }
};

function greet(person) {
    console.log('Hi ' + person.firstname);
}

greet(Tony);

greet({ 
    firstname: 'Mary', 
    lastname: 'Doe' 
});

Tony.address2 = {
    street: '333 Second St.'
}
```

result:

```
Hi Tony
Hi Mary
```

## Name Space 

**A container for variables and functions**

Typically to keep variables and functions with the same name separate.

### Faking Name Spaces

```
var greet = 'Hello!';
var greet = 'Hola!'; 

console.log(greet);

var english = { 
    greetings: { 
        basic: 'Hello!' 
    } 
};

var spanish = {};

spanish.greet = 'Hola!';

console.log(english);
```

result:

```
'Hola!'
Object
```

## JSON and Object Literals

**J**ava**S**cript **O**bject **N**otation

JSON is technically a subset of the object literal syntax

* requires quotes around the names
* doesn't let you put functions as values
* ...

```javascript
var objectLiteral = {
    firstname: 'Mary',
    isAProgrammer: true
}

console.log(JSON.stringify(objectLiteral));

var jsonValue = JSON.parse('{ "firstname": "Mary", "isAProgrammer": true }');

console.log(jsonValue);
```

result:

```
{"firstname":"Mary","isAProgrammer":true}
Object
```

## Functions are Objects

### First Class Functions

**Everything you can do with other types you can do with functions.**

Assign them variables, pass them around, create them on the fly.

Function is a special type of object, it can attach:

* Primitive
* Object
* Function

It has some hidden special properties, such as:

* NAME (optional, can be anonymous)
* CODE ("Invocable" ())

```javascript
function greet() {
    console.log('hi');
}
greet.language = 'english';
console.log(greet)
console.log(greet.language);
```

result:

```
function greet {
    console.log('hi'); 
}
english
```

In this example:

NAME: `greet`

CODE: `console.log('hi');`	// it's "invocable" ()

## Function statements and Function Expressions

### Expression

**A unit of code that results in a value**

It doesn't have to save to a variable.

**Statement** doesn't return any value.

```javascript
greet();

/* function statement */
function greet() {
    console.log('hi');   
}

/* using a function expression */
var anonymousGreet = function() {
    console.log('hi');   
};

anonymousGreet();

function log(a) {
   a();    
}

log(function() {
    console.log('hi');   
});
```

result:

```
hi
hi
hi
```

**Note: Function expressions aren't hoisted.**

## By Value VS By Reference   

All **primitive types** are by **value**.

All *objects* are by *reference*.

```javascript
// by value (primitives)
var a = 3;
var b;

b = a;
a = 2;

console.log(a);
console.log(b);

// by reference (all objects (including functions))
var c = { greeting: 'hi' };
var d;

d = c;
c.greeting = 'hello'; // mutate

console.log(c);
console.log(d);

// by reference (even as parameters)
function changeGreeting(obj) {
    obj.greeting = 'Hola'; // mutate   
}

changeGreeting(d);
console.log(c);
console.log(d);

// equals operator sets up new memory space (new address)
c = { greeting: 'howdy' };
console.log(c);
console.log(d);
```

### Mutate

**To change something**

"Immutable" means it can't be changed.

## Objects, Functions and 'this'

```javascript
function a() {
    console.log(this);
    this.newvariable = 'hello';
}

var b = function() {
    console.log(this);   
}

a();

console.log(newvariable); // not good!

b();

var c = {
    name: 'The c object',
    log: function() {
        var self = this;
        
        self.name = 'Updated c object';
        console.log(self);
        
        var setname = function(newname) {
            self.name = newname;   
        }
        setname('Updated again! The c object');
        console.log(self);
    }
}

c.log();
```

result:

```
>Window {...}
hello
>Window {...}
>Object {name: "Updated c object"}
>Object {name: "Updated again! The c object"}
```

**NOTE**: a internal functions have a problem when using `this` (created and added  by the equals operator on the global object), so we use the concept of setting a variable (such as `self`) equal to `this`.

## Arrays

A JavaScript array can hold collections of anything.

## 'Arguments' and Spread 

### Arguments

**The parameters you pass to a function**

JavaScript gives you a keyword of the same name which contains them all.

```javascript
function greet(firstname, lastname, language = 'en') {
 
//    language = language || 'en';
    
    if (arguments.length === 0) {
        console.log('Missing parameters!');
        console.log('-------------');
        return;
    }
    
    console.log(firstname);
    console.log(lastname);
    console.log(language);
    console.log(arguments);
    console.log('arg 0: ' + arguments[0]);
    console.log('-------------');
    
}

greet();
greet('John');
greet('John', 'Doe');
greet('John', 'Doe', 'es');

// in ES6 I can do:  function greet(firstname, ...other)
// and 'other' will be an array that contains the rest of the arguments
```

result:

```
Missing parameters!
-------------
John
undefined
en
["John"]
John
-------------
John
Doe
en
["John", "Doe"]
arg 0: John
-------------
John
Doe
es
["John", "Doe", "es"]
John
-------------
```

the [ ] in the result actually is *[* *]*, which is not array but array-like.

## Function Overloading

use first class functions

```javascript
function greet(firstname, lastname, language) {
        
    language = language || 'en';
    
    if (language === 'en') {
        console.log('Hello ' + firstname + ' ' + lastname);   
    }
    
    if (language === 'es') {
        console.log('Hola ' + firstname + ' ' + lastname);   
    }
    
}

function greetEnglish(firstname, lastname) {
    greet(firstname, lastname, 'en');   
}

function greetSpanish(firstname, lastname) {
    greet(firstname, lastname, 'es');   
}

greetEnglish('John', 'Doe');
greetSpanish('John', 'Doe');
```

result:

```
Hello John Doe
Hola John Doe
```

## Whitespace

**Invisible characters that create literal 'space' in your written code**

Carriage returns, tabs, spaces.

 ## Immediately Invoked Functions Expressions (IIFEs)

```javascript
// function statement
function greet(name) {
    console.log('Hello ' + name);   
}
greet('John');

// using a function expression
var greetFunc = function(name) {
    console.log('Hello ' + name);
};
greetFunc('John');

// using an Immediately Invoked Function Expression (IIFE)
var greeting = function(name) {
    
    return 'Hello ' + name;
    
}('John');

console.log(greeting);

// IIFE
var firstname = 'John';

(function(name) {
    
    var greeting = 'Inside IIFE: Hello';
    console.log(greeting + ' ' + name);
    
}(firstname)); // IIFE
```

result:

```
Hello John
Hello John
Hello John
Inside IIFE: Hello John
```

## IIFE and Safe Code

app.js

```
// IIFE
(function(global, name) {
    
    var greeting = 'Hello';
    global.greeting = 'Hello';
    console.log(greeting + ' ' + name);
    
}(window, 'John')); // IIFE

console.log(greeting);
```

greet.js

```
var greeting = 'Hola';
```

the index.html reference both of them.

result:

```
Hello John
Hello
```

The function in () is safe, the variables in it will not collide with other variables in global execution context.

If this function wants to access the global object, just pass it into the function.

## Closures

The execution context has closed in its outer variables, the variables that would normally have reference to anyway even though those execution context are gone. This phenomenon of it closing in all the variables that it's supposed to have access to, is called a **closure**.

**exp1.**

```javascript
function greet(whattosay) {

   return function(name) {
       console.log(whattosay + ' ' + name);
   }

}

var sayHi = greet('Hi');
sayHi('Tony');
```

result:

```
Hi Tony
```

**exp2.**

```javascript
function buildFunctions() {
 
    var arr = [];
    
    for (var i = 0; i < 3; i++) {
        
        arr.push(
            function() {
                console.log(i);   
            }
        )
        
    }
    
    return arr;
}

var fs = buildFunctions();

fs[0]();
fs[1]();
fs[2]();
```

result:

```
3
3
3
```

Because the value of `i` is what it is at **the moment that I execute the function**. 

`i`=3 and the `arr` with three anonymous functions left in the outer environment after `var fs = buildFunction();` executes and this execution context of `buildFunction()` pops off.

 The three anonymous functions don't executes during this execution context, but only be pushed into the `arr`.

**exp3.**

```javascript
function buildFunctions() {
 
    var arr = [];
    
    for (var i = 0; i < 3; i++) {
        let j = i;
        arr.push(
            function() {
                console.log(j);   
            }
        )
        
    }
    
    return arr;
}

var fs = buildFunctions();

fs[0]();
fs[1]();
fs[2]();
```

result:

```
0
1
2
```

We use `let` in ES6.

When `j` is created, it is scoped to the block of for{} loop. So every time the for loop runs, there will be a new variable in memory. It will be segmented in the side of memory of the execution context. So when the anonymous function is called, it would be pointing each time at a different  spot within that memory. These are sub-segmented essentially as separately scoped variables.

**exp4.**

```javascript
function buildFunctions2() {
 
    var arr = [];
    
    for (var i = 0; i < 3; i++) {
        arr.push(
            (function(j) {
                return function() {
                    console.log(j);   
                }
            }(i))
        )
        
    }
    
    return arr;
}

var fs2 = buildFunctions2();

fs2[0]();
fs2[1]();
fs2[2]();
```

result:

```
0
1
2
```

We use IIFE to get an execution context is to execute a function, i.e., execute a function on the fly.

every time the loop runs, it's going to execute `function(j){}(i)`,  each of those executions creates its own execution context, and `j` will be stored in each of those three execution contexts. Even though those execution contexts will go away after this line is run, thanks to the closures, all the three `j` for those three different execution contexts will be hanging out.

We are doing a push and this push is going to push the result of executing this function, and executing this function gives us back a function.

## Function Factories

```javascript
function makeGreeting(language) {
 
    return function(firstname, lastname) {
     
        if (language === 'en') {
            console.log('Hello ' + firstname + ' ' + lastname);   
        }

        if (language === 'es') {
            console.log('Hola ' + firstname + ' ' + lastname);   
        }
        
    }
    
}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('John', 'Doe');
greetSpanish('John', 'Doe');
```

result:

```
Hello John Doe
Hola John Doe
```

Every time we call a function, it gets its own execution context, and any functions created inside of it will point to that execution context. So we have different closures.

## Callback Function

**A function you give to another function, to be run when the other function is finished**

So the function you call (i.e. invoke), 'calls back' by calling the function you gave it when it finishes.

```javascript
function sayHiLater() {
 
    var greeting = 'Hi!';
    
    setTimeout(function() {
        
        console.log(greeting);
        
    }, 3000);
    
}

sayHiLater();

// jQuery uses function expressions and first-class functions!
//$("button").click(function() {
//    
//});

function tellMeWhenDone(callback) {
 
    var a = 1000; // some work
    var b = 2000; // some work
    
    callback(); // the 'callback', it runs the function I give it!
    
}

tellMeWhenDone(function() {
   
    console.log('I am done!');
    
});

tellMeWhenDone(function() {
   
    console.log('All done...');
    
});
```

result:

```
I am done!
All done...
Hi!
```

## call(), apply() and bind()

```javascript
var person = {
    firstname: 'John',
    lastname: 'Doe',
    getFullName: function() {
        
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
        
    }
};

var logName = function(lang1, lang2) {

    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
};
```

### bind()

when we write:

```javascript
var logPersonName = logName.bind(person);
logPersonName('en');
```

result:

```
Logged: John Doe
Arguments: en undefined
-----------
```

The `.bind` creates a copy of function `logName` you're calling it on, then the object `person` pass to method `bind`.

The `person` object is what the `this` variable points to by reference.

### call()

when we write:

```javascript
logName.call(person, 'en', 'es');
```

result:

```
Logged: John Doe
Arguments: en es
-----------
```

The `.call` let us decide what `this` variable will be. The first thing I pass to `call` is what the `this` keyword should point to. I can also pass it parameters `lang1` and `lang2`.

 Unlike `bind`, which creates a copy of the function, `call` actually executes it.

### apply()

when we write:

```javascript
logName.apply(person, ['en', 'es']);

(function(lang1, lang2) {

    console.log('Logged: ' + this.getFullName());
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
    
}).apply(person, ['es', 'en']);
```

result:

```
Logged: John Doe
Arguments: en es
-----------
Logged: John Doe
Arguments: es en
-----------
```

The `.apply` method does exactly same thing as `.call` except that the `apply` method wants a array of parameters rather than just normal list.

### Examples

when we write:

```javascript
// function borrowing
var person2 = {
    firstname: 'Jane',
    lastname: 'Doe'
};

console.log(person.getFullName.apply(person2));

// function currying
function multiply(a, b) {
    return a*b;   
}

// set a = 2 permanently
var multipleByTwo = multiply.bind(this, 2);
// we pass b to this function when we call it
console.log(multipleByTwo(4));

// set a = 3 permanently
var multipleByThree = multiply.bind(this, 3);
// we pass b to this function when we call it
console.log(multipleByThree(4));
```

result:

```
Jane Doe
8
12
```

### Function Currying

**Creating a copy of a function but with some preset parameters**

Very useful in mathematical situations.

## Functional Programming

 ```javascript
function mapForEach(arr, fn) {
    
    var newArr = [];
    for (var i=0; i < arr.length; i++) {
        newArr.push(
            fn(arr[i])   
        );
    }
    
    return newArr;
}

var arr1 = [1,2,3];
console.log(arr1);


var arr2 = mapForEach(arr1, function(item) {
   return item * 2; 
});
console.log(arr2);


var arr3 = mapForEach(arr1, function(item) {
   return item > 2; 
});
console.log(arr3);


var checkPastLimit = function(limiter, item) {
    return item > limiter;   
};
var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 1));
console.log(arr4);


var checkPastLimitSimplified = function(limiter) {
    return function(limiter, item) {
        return item > limiter;   
    }.bind(this, limiter); 
};

var arr5 = mapForEach(arr1, checkPastLimitSimplified(1));
console.log(arr5);
 ```

result:

```
[1, 2, 3]
[2, 4, 6]
[false, false, true]
[false, true, true]
[false, true, true]
```



underscore.js

lodash

