---
title: AngularJs Understand DI & $injector
created: 2015-09-01 01:49
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_30
---
# AngularJs: Understand DI & $injector

We all know in AngularJs requried components are **Dependency Injected.** For example, if we need $scope in controller, we simply inject '$scope' as one of the parameters to the controller function. We are least bothered how we $scope object was created and given to us. This is called Dependency Injection. # Dependency Injection is acheived by using $injector & $provider in AngularJs. I will try to cover most of the important points related to $injector in this post. In general Dependency Injection is achieved by annotations i.e using '@' example spring framework. However Javascript doesn't support annotations. In Order to provide DI angular uses a service called **$injector**. return object for $injector looks like ![$provider_return_function](https://techanand.files.wordpress.com/2015/09/provider_01.jpg) However $injector.invoke calls annotate & get methods to resolve dependencies. $injector#get - Returns an instance of the service. $injector#invoke - Invoke the method and supply the method arguments from the `$injector`returns invoked function results $injector#has - Checks whether particular service exists or not $injector#annotate - Returns an array of service names which the function is requesting for injection. This API is used by the injector to determine which services need to be injected into the function when the function is invoked. There are three ways in which the function can be annotated with the needed dependencies # Argument names The simplest form is to extract the dependencies from the arguments of the function. This is done by converting the function into a string using `toString()` method and extracting the argument names.

```javascript
// Given function 
MyController($scope, $route) {
  // ...
} // Then
expect(injector.annotate(MyController)).toEqual(['$scope', '$route']);
```

The '$inject' property If a function has an '$inject' property and its value is an array of strings, then the strings represent names of services to be injected into the function.

```javascript
// Given 
var MyController = function(obfuscatedScope, obfuscatedRoute) {
  // ... 
}
// Define function dependencies 
MyController['$inject'] = ['$scope', '$route'];
// Then 
expect(injector.annotate(MyController)).toEqual(['$scope', '$route']);
```

The array notation It is often desirable to in-line Injected functions and that's when setting the `$inject` property is very inconvenient. In these situations using the array notation to specify the dependencies in a way that survives minification is a better choice:

```javascript
injector.invoke(['$compile', '$rootScope', function(obfCompile, obfRootScope) {
  // ... 
}]); // Therefore 
expect(injector.annotate(['$compile', '$rootScope', function(obfus_$compile,
  obfus_$rootScope) {}])).toEqual(['$compile', '$rootScope']);
```

This is how Dependency Injection is done in AngularJs. Sometimes you want to get access to the injector of a currently running Angular app from outside Angular. Perhaps, you want to inject and compile some markup after the application has been bootstrapped. We can do this using the extra 'injector()' present document object. In the following example a new block of HTML containing a 'ng-controller' directive is added to the end of the document body by JQuery. We then compile and link it into the current AngularJS scope.

```javascript
var $div = $('<div>{{content.label}}</div>');
$(document.body).append($div);
angular.element(document).injector().invoke(function($compile) {
  var scope = angular.element($div).scope();
  $compile($div)(scope);
});
```

**All the examples and information taken from angular.js**
