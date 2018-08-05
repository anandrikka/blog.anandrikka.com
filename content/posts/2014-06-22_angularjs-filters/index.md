---
title: AngularJs Filters
author: anandrikka
created: 2014-06-22 17:06
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_9
---
Filters provide a way to modify data before presenting it to user. Filters can be used in view templates, controllers or services. Angular out of box provides lowercase, uppercase, currency, number, date, json, limitTo, orderBy filters Let's see an example:

```html
<html>
  <head lang="en">
      <meta charset="UTF-8">
      <title></title>
      <script src="lib/angular.js"></script> <script> var myApp = angular.module("myApp",[]); myApp.controller("MyController",function($rootScope, $scope){ $rootScope.presentDate = new Date(); $scope.numbers = [1, 2, 3, 4 ,5 ,6, 7, 8, 9, 0]; }); </script>
  </head>
  <body ng-app="myApp">
      <div ng-controller="MyController">
        <h2>Default Filters defined in Angular Js</h2>
        <br/>
        <h4>Lower Case : </h4>
        {{"This Is Example For Lower Case" | lowercase}}
        <h4>Upper Case : </h4>
        {{"this is example for upper case" | uppercase}}
        <h4>Currency : </h4>
        {{"123.12" | currency}} <!--defaults to $-->
        <h4>Number : </h4>
        {{"123.486765" | number}} <!-- defaults up to 3 digits-->
        <h4>Date : </h4>
        {{presentDate | date:'medium'}}
        <h4>Json : </h4>
        {{{name:'anand'} | json}}
        <h4>LimitTo : </h4>
        {{numbers | limitTo:5}}
      </div>
  </body>
</html>
```

We can define our custom filters. It is very easy to define a filter all we need to do is to create a module and add filter to the module. Below is the example with custom filter.

```html
<html>
  <head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="lib/angular.js"></script> <script> var myApp = angular.module("myApp", []); var capitalize = myApp.filter('capitalize', function(){ return function(input){ if(input){ return input[0].toUpperCase() + input.slice(1); } }; }); </script>
  </head>
  <body ng-app="myApp">
    <p>custom filter: {{'this is my first filter' | lowercase | capitalize}}</p>
    <br/>
    <p>capital filter: {{'this is my first filter' | uppercase}}</p>
    <br/>
  </body>
</html>
```

This custom filter 'capitalize' takes the expression as input and convert first letter to capital letter. **Topics to know:** $filter, $filterProvider, custom filters
