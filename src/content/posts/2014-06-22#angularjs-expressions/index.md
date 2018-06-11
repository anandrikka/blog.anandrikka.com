---
title: AngularJs Expressions
date: 2014-06-22 13:41
categories: [AngularJs]
tags: [AngularJs, angularjs, angularjs expressions, compile, eval javascript expressions, expressions, interpolate, parse]
---

{%raw%}

Expression in simple terms is nothing but evaluation of variables to single value. In AngularJs we evaluate expressions using {{ }}. For example expression <strong> {{ 1+ 2}} </strong>is evaluated to '3'.  In JavaScript we use <strong>eval() </strong>function to evaluate expressions but using eval for evaluating expressions arises security concerns. Here is the example for eval.

{%endraw%}

{% highlight html %}
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="lib/angular.js"></script>
    <script>
        //javascript eval examples
        console.log(eval('x=42'));
        var obj = { a: 20, b: 30 };
        var getPropName = function(){
            return "a";
        }
        var name = getPropName();  //returns "a" or "b"
        console.log(eval( "obj." + name ));
        console.log(eval(a*b*c));
    </script>
</head>
<body>
</body>
</html>
{% endhighlight %}

{%raw%}

In AngularJs variable attached to scope is an expression ex: {{exp}}. There are some basic differences between Angular Expressions and JavaScript Expressions
<ol>
	<li>All Angular Expressions are evaluated in the context of scope whereas JavaScript expressions are evaluated against global window.</li>
	<li>Angular Expressions are forgiving in nature means for example if variable 'a' is not defined in {{a}} it will not throw error whereas JavaScript Expressions will throw reference errors if the variables are not defined in the expression.</li>
	<li>Angular Expressions will not allow any control flow statements except ternary operator</li>
	<li>Angular accepts filters in the expressions.</li>
	<li>So how do Angular evaluate the expressions ? Angular automatically runs $parse when it runs $digest loop. <strong>$parse</strong> is the way angular evaluates the expressions.</li>
</ol>
Angular has three levels of evaluating expressions. They are as follows:
<ol>
	<li><strong>$parse: </strong>Only single expressions are evaluated using parse. Example <strong>{{name}}</strong></li>
	<li><strong>$interpolate: </strong>Evaluates strings containing multiple expressions. $interpolate intern calls $parse for evaluation. Example:<strong><img ng-src='/path/{{name}}.{{ext}}'/></strong></li>
	<li><strong>$compile: </strong>It is heart of AngularJs and can turn html string with directives, interpolation expressions to live DOM.</li>
</ol>
Let's see an example using <strong>$parse</strong>

{%endraw%}

{% highlight html %}
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="lib/angular.js"></script>
    <script>
        var myApp = angular.module("myApp",[]);
        myApp.controller("MyController", function($scope, $parse){
            $scope.$watch("expr",function(newVal, oldVal, $scope){
                if(newVal!==oldVal){
                    $scope.parsedValue = $parse(newVal)($scope);
                }
            });
        });
    </script>
</head>
<body ng-app="myApp">
<div ng-controller="MyController">
    <input ng-model="expr" type="text" placeholder="Enter an expression" />
    <h2>{%raw%}{{ parsedValue }}{%endraw%}</h2>
</div>
</body>
</html>
{% endhighlight %}

In this example I'am evaluating variable 'expr' in 'MyController' scope. Generally this is taken care by Angular. I just want to show how it happens internally. Let's have a look at controller. I'am watching the variable 'expr' for any changes if there is any change made to the variable. I am using inbuilt $parse to evaluate the expression and assigned it to a new scope variable 'parsedValue'. For Example if we input 1+2 in the text field it evaluates the expression to 3 and assign it to 'parsedValue' which we are displaying in the view.

Example for $interpolate

{% highlight html %}
<html>
<head>
    <script src="lib/angular.js"></script>
    <script>
        var app = angular.module('myApp', []);
        app.controller("MyController", function($scope, $parse, $interpolate){
            $scope.lastName="";
            $scope.firstName="";
            $scope.interpolateText="This is my {{lastName}} {{firstName}}"
            $scope.$watch('lastName', function(newval, oldVal, scope){
                $scope.testParse = $interpolate($scope.interpolateText)($scope);
            });
            $scope.$watch('firstName', function(newVal, oldVal, scope){
                $scope.testParse = $interpolate($scope.interpolateText)($scope);
            })
        });
    </script>
</head>
<body>
<div ng-app="myApp">
    <div ng-controller="MyController">
        <input ng-model="lastName"/>
        <input ng-model="firstName"/>
        {%raw%}{{testParse}}{%endraw%}
    </div>
</div>
</body>
</html>
{% endhighlight %}

<strong>Topics to know: </strong>$parse, $interpolate, $compile, $interpolateProvider, $compileProvider