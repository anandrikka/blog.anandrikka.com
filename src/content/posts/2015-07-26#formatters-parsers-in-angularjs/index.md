---
layout: post
title: Formatters & Parsers
date: 2015-07-26 00:08
categories: [AngularJs]
tags: [$formatters, $parsers, AngularJs, angularjs change display value of model, change modelValue, change ViewValue, custom directives, custom ng-model directives, ng-model, ng-model controller, ngModel, ngmodel directives, ngModelController, use ng-model value]
permalink: /angularjs/formatters-parsers
---

Have you ever faced a situation where you doesn't want to change your underlying model, but change how that model is viewed or when you want something changed in your view, should add some behaviour to underlying model. For Example I have a JSON object from the server which needs to be binded to few labels in the view or when I type small letters in the view, but model should reflect CAPTIAL letters.

Don't worry AngularJs provides <strong>$formatters and $parsers</strong> which will handle these kind of scenarios.

<strong>1. What are formatters &amp; parsers ?</strong>

Formatters and parsers are array of functions that can be implemented on view and model. They are only available in ng-model directive, so if we want to use them, we need to pass ngModel as require in our custom directives. Know more about ngModel from <a href="https://docs.angularjs.org/api/ng/type/ngModel.NgModelController" target="_blank">here</a>

<strong>2. How they are defined inside directive ?</strong>

{% highlight javascript %}
app.directive('testNgModel', function(){
    return{
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModelCtrl){

            ngModelCtrl.$formatters.push(function(value){
                return modifiedViewVal;
            });

            ngModelCtrl.$parsers.push(function(value){
                return modifiedModelVal;
            });

        }
    };
});
{% endhighlight %}

<strong>3. What $formatters do ?</strong>

$formatter will take modelValue as input and change the viewValue(viewed by user), but it doesn't actually change the umderlying model object. Formatters are applied when page loads or model changes from backend without user intervention.

{% highlight javascript %}
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="lib/angular.js"></script>
    <script src="lib/ui-bootstrap-tpls-0.13.0.js"></script>
    <script src="js/main_module.js"></script>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
    <script>
        angular.module('Test')
                .controller('ParserController', ['$scope', function($scope){
                    $scope.dt = new Date();
                }])
                .directive('testNgModel', ['$filter', function($filter){
                    return {
                        restrict:'EA',
                        require:'ngModel',
                        link:function(scope, ele, attrs, ngModelCtrl){
                            ngModelCtrl.$formatters.push(function(modalVal){
                                //Applied filter on model value to return ISO format of the date.
                                var changedInput = $filter('date')(modalVal, 'yyyy-MM-dd');
                                return changedInput;
                            })
                        }
                    }
                }])

    </script>
</head>
<body ng-app="Test">
    <div ng-controller="ParserController">
        <input type="text" ng-model="dt" test-ng-model>
        {{dt}}
    </div>
</body>
</html>
{% endhighlight %}

<strong>4. What $parsers do ?</strong>

$parsers will actually change the underlying model object based on your input. Parsers are called whenever user interacts from front-end.

[code language="html"]
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="lib/angular.js"></script>
    <script src="lib/ui-bootstrap-tpls-0.13.0.js"></script>
    <script src="js/main_module.js"></script>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
    <script>
        angular.module('Test')
                .controller('ParserController', ['$scope', function($scope){

                }])
                .directive('testNgModel', ['$filter', function($filter){
                    return {
                        restrict:'EA',
                        require:'ngModel',
                        link:function(scope, ele, attrs, ngModelCtrl){
                            ngModelCtrl.$parsers.push(function(viewValue){
                                // returns the changed model object
                                return viewValue.toUpperCase()
                            })
                        }
                    }
                }])

    </script>
</head>
<body ng-app="Test">
    <div ng-controller="ParserController">
        <input type="text" ng-model="name" test-ng-model>
        {{name}}
    </div>
</body>
</html>

<strong>Blind Rule:</strong>

<strong>$formatters</strong> - change the view, but not underlying model object.

<strong>$parsers</strong> - change the underlying model, based on user input.

That's it guys, please let me know if you have any questions.
