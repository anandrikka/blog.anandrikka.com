---
title: AngularJs Controllers
date: 2014-06-22 01:46
categories: [AngularJs]
tags: [AngularJs, angularjs, angularjs controller, controller scope, controllers, scope]
---

HTML page can be divided into multiple sections to display information. If we want particular section of the page to have modifications according to database changes we can achieve that through controllers. Controllers acts like a bridge b/w view and model changes. We must not use controllers for DOM Manipulation other than holding model values. These controllers are no different from other framework controllers. For example while developing application using Servlets and Jsp's we pass the data from view to controller and from controller we connect to data base and fetch the results and send back to view using controllers. In the similar fashion here also we use the controllers for the same purpose, but here there is no need to pass data to view they are binding using $scope of the controller to the view.

<!--more-->

All scopes of the controller are created using prototypical inheritance. controllers can be nested which means that if value is not found on child controller's scope then angular searches it in parent controller's scope since angular follows prototypical inheritance.

Let's see a simple example

{% highlight html %}
<html ng-app>
<head>
    <title></title>
    <script src="lib/angular.js"></script>
    <script>
        function MyController($scope) {
            $scope.alphabet = "ad";
            console.log($scope.alphabet);
            $scope.$watch('alphabet', function(newVal, oldVal,scope){
               $scope.varStatus=false;
               if(newVal.length === 1){
                   $scope.varStatus=true;
               }
            });
        }
    </script>
</head>
<body ng-app="">
<div ng-controller="MyController">
    <input type="text" ng-model="alphabet"/>
    <span ng-show="varStatus">{%raw%}{{alphabet}}{%endraw%}</span>
</div>
</body>
</html>
{% endhighlight %}

In the above example I have defined a behavior for text field using "MyController" . Whenever there is only single letter or number or symbol it shows the typed one. For that I'am watching "alphabet" for changes and making "varStatus" true which gets reflected in view via defined controller scope.

<strong>Topics to know:</strong> controller hierarchy, nested controllers, $watch, prototypical inheritance
