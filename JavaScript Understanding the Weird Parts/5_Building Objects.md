# Building Objects
## Function Constructors and 'new' 

**A normal function that is used to construct objects.**

The `this` variable points a new empty object, and that object is returned from the function automatically.

In most cases with function constructors, we're passing some default values or set values to set as part of the object.

```javascript
function Person(firstname, lastname) {
    
    console.log(this);
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked.');
    
//    return {greeting: 'i got in the way'};
}

var john = new Person('John', 'Doe');
console.log(john);

var jane = new Person('Jane', 'Doe');
console.log(jane);
```

result:

```
Person {}
This function is invoked.
Person {firstname: "John", lastname: "Doe"}
Person {}
This function is invoked.
Person {firstname: "Jane", lastname: "Doe"}
```

Each invocation of the function using the `new` operator invokes the function but **first creates a new empty object**. Then using the `this` keyword, then as long as you don't have a return statement, the JavaScript  engine will return that object which you have now likely manipulated: **add properties, add methods**. That object sitting in that space created by the `new` keyword.

### Summary

The `new` operator makes the new object, and function constructors are used for adding properties and methods to that new object.

## Function Constructors and  '.prototype'

```javascript
function Person(firstname, lastname) {
    
    console.log(this);
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked.');
    
//    return {greeting: 'i got in the way'};
}

Person.prototype.getFullName = function() {
    return this.firstname + ' ' + this.lastname;
};

var john = new Person('John', 'Doe');
console.log(john.getFullName());
//console.log(john.getFormalFullName());

Person.prototype.getFormalFullName = function() {
    return this.lastname + ', ' + this.firstname;
};

var jane = new Person('Jane', 'Doe');
console.log(jane.getFormalFullName());
```

result:

```
Person {}
This function is invoked.
John Doe
Person {}
This function is invoked.
Doe, Jane
```

The prototype property **on** a function is not the prototype **of** the function. It's the property of any objects created if you're using the function as a function constructor.

The prototype chain is that every object has this special property that points to another object that is it's prototype. So it looks for properties and methods down that chain.

When we call the `new` keyword, it creates an empty object, and it sets the prototype of that empty object to the prototype property of the function that you then call.

The properties are set up inside the function constructor because they're often different values. But methods are sitting on the prototype because it would be save a lot of memory spaces if we create a lot of objects. 

The method inside a function constructor will take up memory space when every object created by this constructor. But the method in the prototype will only take memory space once when adding the method to the prototype.

## 'new' and Functions

There must a `new` before the name of a function constructor when using it to build a object.

**A simple convention**:

Any function that we intend to be a function constructor, we use a CAPITAL letter as the first letter for its name to remind us there should be a `new` before it.

## Build-In Function Constructors

```javascript
String.prototype.isLengthGreaterThan = function(limit) {
    return this.length > limit;  
};

console.log("John".isLengthGreaterThan(3));

Number.prototype.isPositive = function() {
    return this > 0;   
};

var a = Number(3);
console.log(a.isPositive());
```

result:

```
true
true
```

**Note**: It's dangerous to use build-in function constructor! It creates an **object** but not primitive.

## Arrays and for...in...

```javascript
Array.prototype.myCustomFeature = 'cool!';

var arr = ['John', 'Jane', 'Jim'];

for (var prop in arr) {
    console.log(prop + ': ' + arr[prop]);
}
```

result：

```
0: John
1: Jane
2: Jim
myCustomFeature: cool!
```

Note: Don't use for...in... in arrays. Because arrays are objects and their items are added properties.

Use:

```javascript
for (var i = 0; i < arr.length; i++) {
  
}
```

## Object.create and Pure Prototypal Inheritance

```javascript
// polyfill
if (!Object.create) {
  Object.create = function (o) {
    if (arguments.length > 1) {
      throw new Error('Object.create implementation'
      + ' only accepts the first parameter.');
    }
    function F() {}
    F.prototype = o;
    return new F();
  };
}

var person = {
    firstname: 'Default',
    lastname: 'Default',
    greet: function() {
        return 'Hi ' + this.firstname;   
    }
}


var john = Object.create(person);
john.firstname = 'John';
john.lastname = 'Doe';
console.log(john);
```

result:

```
Object {firstname: "John", lastname: "Doe"}
```

**Pure Prototypal Inheritance**:

We make objects and use `Object.create`  to create objects from them pointing to other objects (base objects) as their prototype. We simply override hide properties and methods on those created objects by setting the values of those properties and methods on the new objects themselves.

### Polyfill

**Code that adds a feature which the engine *may* lack.**

## ES6 and Classes

A class is also an object in JavaScript. 

```javascript
class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    
    greet() {
        return 'Hi ' + this.firstname;
    }
}

var john = new Person('John', 'Doe');
console.log(john);
console.log(john.greet());
```

result:

```
Person {firstname: "John", lastname: "Doe"}
Hi John
```

Use `extends` to set prototype

```javascript
class Person {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    
    greet() {
        return 'Hi ' + this.firstname;
    }
}

class InformalPerson extends Person {
    constructor(firstname,  lastname) {
        //call the constructor of the object that is my prototype
        super(firstname, lastname);
    }
    
    greet() {
        return 'Yo ' + this.firstname;
    }
}

var john = new InformalPerson('John', 'Doe');
console.log(john);
console.log(john.greet());
```

result:

```
InformalPerson {firstname: "John", lastname: "Doe"}
Yo John
```

### Syntactic Sugar

**A different way to *type* something that doesn't change how it works under the hood**

