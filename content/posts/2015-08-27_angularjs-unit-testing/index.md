---
title: Jasmine Framework !!
created: 2015-08-27 02:45
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_31
---
Jasmine is a very good, easily configurable unit testing framework for AngularJs. A simple test includes following pattern

```javascript
//test starts with describe and takes two parameters - name & function describe('calculator',
function() { //includes conditions that need to fulfilled before each test, takes
  single
  function parameter beforeEach(function() {}); //inlcudes conditions that need
  to fulfilled after each test, takes single
  function parameter afterEach(function() {}) //it - used to implement test scenarios, there can any number of it's in a describe
  it('test name', function() {
    matchers
  })
});
```

Matchers include

  * toBe: represents the exact equality (===) operator.
  * toEqual: represents the regular equality (==) operator.
  * toMatch: calls the RegExp match() method behind the scenes to compare string data.
  * toBeDefined: opposite of the JS "undefined" constant.
  * toBeUndefined: tests the actual against "undefined".
  * toBeNull: tests the actual against a null value - useful for certain functions that may return null, like those of regular expressions (same as toBe(null))
  * toBeTruthy: simulates JavaScript boolean casting.
  * toBeFalsy: like toBeTruthy, but tests against anything that evaluates to false, such as empty strings, zero, undefined, etc…
  * toContain: performs a search on an array for the actual value.
  * toBeLessThan/toBeGreaterThan: for numerical comparisons.
  * toBeCloseTo: for floating point comparisons.
  * toThrow: for catching expected exceptions

A part from that we have spy's which can be used to fake the data, we can use spyOn to spy on functions in a test. [Click here to know more about Jasmine](http://jasmine.github.io/2.0/introduction.html)