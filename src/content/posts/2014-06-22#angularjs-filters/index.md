---
title: AngularJs Filters
date: 2014-06-22 17:06
categories: [AngularJs]
tags: [AngularJs, angularjs, angularjs filters, custom filters, filters]
---

Filters provide a way to modify data before presenting it to user. Filters can be used in view templates, controllers or services. Angular out of box provides lowercase, uppercase, currency, number, date, json, limitTo, orderBy filters

Let's see an example:

{% highlight html %}
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="lib/angular.js"></script>
    <script>
       var myApp = angular.module("myApp",[]);
       myApp.controller("MyController",function($rootScope, $scope){
            $rootScope.presentDate = new Date();
           $scope.numbers = [1, 2, 3, 4 ,5 ,6, 7, 8, 9, 0];
       });
    </script>
</head>
<body ng-app="myApp">
<div ng-controller="MyController">
    <h2>Default Filters defined in Angular Js</h2><br/>
    <h4>Lower Case  : </h4>{%raw%}{{"This Is Example For Lower Case" | lowercase}}{%endraw%}
    <h4>Upper Case  : </h4>{%raw%}{{"this is example for upper case" | uppercase}}{%endraw%}
    <h4>Currency    : </h4>{%raw%}{{"123.12" | currency}}{%endraw%} <!--defaults to $-->
    <h4>Number      : </h4>{%raw%}{{"123.486765" | number}}{%endraw%} <!-- defaults up to 3 digits-->
    <h4>Date        : </h4>{%raw%}{{presentDate | date:'medium'}}{%endraw%}
    <h4>Json        : </h4>{%raw%}{% raw %}{{{name:'anand'} | json}} {% endraw %}
    <h4>LimitTo     : </h4>{%raw%}{{numbers | limitTo:5}}{%endraw%}
</div>
</body>
</html>
{% endhighlight %}

<!--more-->

We can define our custom filters. It is very easy to define a filter all we need to do is to create a module and add filter to the module.
Below is the example with custom filter.

{% highlight html %}
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="lib/angular.js"></script>
    <script>
        var myApp = angular.module("myApp", []);
        var capitalize = myApp.filter('capitalize', function(){
           return function(input){
                if(input){
                    return input[0].toUpperCase() + input.slice(1);
                }
           };
        });
    </script>
</head>
<body ng-app="myApp">
<p>custom filter: {%raw%}{{'this is my first filter' | lowercase | capitalize}}{%endraw%}</p><br/>
<p>capital filter: {%raw%}{{'this is my first filter' | uppercase}}{%endraw%}</p><br/>
</body>
</html>
{% endhighlight %}

This custom filter 'capitalize' takes the expression as input and convert first letter to capital letter.

<strong>Topics to know:</strong> $filter, $filterProvider, custom filters
