# Execution Contexts and Lexical Environments

## 1. Syntax Parser

**A program that reads your code and determines what it does and if its grammar is valid**

Your code isn't magic. Someone else wrote a program to translate it for the computer.

## 2. Lexical Environment

**Where something sits physically in the code you write**

'Lexical' means 'having to do with words or grammar'. A lexical environment exists in programming languages in which **where** you write something is *important*.

## 3. Execution Context

**A wrapper to help manage the code that is running**

There are lots of lexical environments. Which one is currently running is managed via execution contexts. It can contain things beyond what you've written in your code.

---

## Name/Value Pair

**A name which maps to a unique value**

The name may be defined more than once, but only can have one value in any given **context**.

That value may be more name/value pairs.

```
Address = '100 Main St.'
```



## Object

**A collection of name value pairs**

The simplest definition when talking about **JavaScript**.

```
Address:
	{
      Street: 'Main',
      Number: 100
      Apartment:
      	{
          Floor: 3,
          Number: 301
      	}
	}
```

 ---

# Execution Context

## Global

Global Object (window) = 'this' (a special variable)

> created by JavaScript engine 

**Global**: "Not inside a function"

Outer Environment

## Creation and 'Hoisting'

All variables initially set to **undefined**.

All functions are sitting in memory in their entirety.

**undefined** is a special value and also a special keyword in JavaScript.

## Two Phases

### 1. Creation Phase

### 2. Execution Phase

line by line.

---

## Single Threaded

**One command at a time**

Under the hood of the browser, maybe not.

## Synchronous

**One at a time**

And in order...

## Invocation

**Running a function**

In JavaScript, by using parenthesis ().

## Execution Stack

Every time a function is called, a new execution context is created for that function, and put on top of the stack. When the function finishes, it's popped off.

* The first be created is the **Global** Execution Context.

## Variable Environment

**Where the variables live**

And how they relate to each other in memory.

* Every  execution context has its own variable environment.

## The Scope Chain

Every execution context has a reference to its outer environment.

Outer environment is Outer **Lexical** Environment.

**Scope Chain**:

The entire act of searching the chain of references to outer environments until the global environment. Down those outer environment references until it finds it or doesn't.

## Scope

**Where a variable is available in your code**

And if it's truly the same variable, or a new copy

### let 

Allow the JavaScript engine to use what's called block scoping.

During the creation phase, the variable is still placed into memory and set to undefined. 

However you're not allowed to use let until the line of code is run.

It's declared inside a block {}, it's only available inside that block at that period of time for the running code.

## Asynchronous

**More than one at a time**

The **Event Queue** won't be processed until the execution stack is empty, until JavaScript is finished running all of that other code line by line.

What's happening is the browser asynchronously is putting things into the event queue, but the code that is running is still running line by line.

Any event that happen **outside of the engine** get placed into that queue, and if the execution stack is empty, it'll process those events. It'll process the events in the order they happened.