---
layout: post
title: AngularJs Compile Vs Link
date: 2014-06-24 00:49
categories: [AngularJs]
tages: [AngularJs, angularjs, compile, direcitves, link]
permalink: /angularjs/compile-vs-link
---

There are lot of technical stuff looping aroung Link and Compile of Angular Directive. In simple terms <strong>Compile</strong> is used to do DOM manipulations without any scope where as if DOM Manipulations require scope then we use <strong>Link</strong>.

Example using Compile

{% highlight html %}
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="../05-Routing/lib/angular.js"></script>
    <script>
        var app = angular.module('app', []);
        app.directive('double', function() {
            return {
                restrict: 'E',
                compile: function(tElement, attrs) {
                    tElement.append('<p>I have modified DOM using directive</p>');
                    tElement.replaceWith(tElement.children());
                }
            }
        });
</script>
</head>
<body ng-app="app">
<double>
    <h1>Hello World !!</h1>
</double>
</body>
</html>
{% endhighlight %}

Example using link

{% highlight html %}
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="../05-Routing/lib/angular.js"></script>
    <script>
        var app = angular.module('app', []);
        app.controller('MyController', ['$scope', function($scope) {
            $scope.format = 'M/d/yy h:mm:ss a';
        }]);
        app.directive('myCurrentTime', ['$interval', 'dateFilter', function($interval, dateFilter) {
            return {
                link: function(scope, element, attributes){
                    var format,timeoutId;
                    function updateTime() {
                        element.text(dateFilter(new Date(), format));
                    }
                    scope.$watch(attributes.myCurrentTime, function(value) {
                        format = value;
                        updateTime();
                    });
                    element.on('$destroy', function() {
                        $interval.cancel(timeoutId);
                    });
                    // start the UI update process; save the timeoutId for canceling
                    timeoutId = $interval(function() {
                        updateTime(); // update DOM
                    }, 1000);
                }
            };
        }]);
    </script>
</head>
<body ng-app="app">
<div ng-controller="MyController">
    Date format: <input ng-model="format"> <hr/>
    Current time is: <span my-current-time="format"></span>
</div>
</body>
</html>
{% endhighlight %}

This example is directly from Angular Docs and it updates the DOM for every second.

<strong>Topics to know:</strong> compile phase, link phase, pre link, post link functions
