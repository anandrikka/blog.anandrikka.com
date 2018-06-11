---
layout: post
title: AngularJs Directives
date: 2014-06-23 00:25
categories: [AngularJs]
tags: [AngualrJs, AngularJs, AngularJs Directives, angularjs priority, directive, link, transculde]
permalink: /angularjs/directives
---

Directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler to attach a specified behavior to that DOM element or even transform the DOM element and its children. We have already seen directives like ng-model, ng-controller, ng-bind etc.. Angular app starts with ng-app which is designed to be used as only attribute. We can also define our own custom directives and add behaviour to them. Built in directives are prefixed with "ng-" or "data-ng-" so we must not use "ng-" as prefix. All directives within our app will have <strong>$rootScope</strong>. Compiling directives on html is nothing but compiling the java script behind the scenes. We use <strong>module.directive</strong> to define our own directive. It takes two parameters <strong>String - </strong>directive name and<strong> function - </strong>which returns object(explains how directive must behave).

Let's see an example

{% highlight html %}
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="../05-Routing/lib/angular.js"></script>
    <script>
        myApp = angular.module("myApp",[]);
        myApp.directive("firstDir", function(){
            return {
                restrict:'E',
                template:'<div>This is my First Directive</div>'
            }
        });
    </script>
</head>
<body>
<div ng-app="myApp">
    <first-dir></first-dir>
</div>
</body>
</html>
{% endhighlight %}

<!--more-->

When we compile the above html file we get the output as "This is my First Directive". But directives in real world will not be this much simple. Directives have some properties defined that can be returned in an object 'restrict and template' are one of them we used in the above example.

Directives can be defined with these following properties on it's return object
<ol>
	<li><strong>restrict</strong>(optional): defaults to false. We can restrict our directive to be element, class, attribute, comment or combination of them. E - Element, C - Class, A - Attribute, M-Comment</li>
	<li><strong>priority</strong>(optional): This property tells which directives to execute first and which last. We generally not use this property. It takes number as input.</li>
	<li><strong>terminal</strong>(optional): defaults to false. When we set it to true all the directives with lower priorities to the present directive priority will be stopped executing.</li>
	<li><strong>template</strong>(optional): It takes either string or function. If it is a function it expects the return object to be a html string.</li>
	<li><strong>templateUrl</strong>(optional): It gives path to fetch the template.</li>
	<li><strong>replace</strong>(optional): It is set to false by default. If it is set to true directive’s template will be appended as a child node within the element where the directive was invoked.</li>
	<li><strong>scope</strong>(optional): Scope is optional. It can be set to true or to an object, {}. By default, it is set to false. When scope is set to true, a new scope object is created that prototypically inherits from its parent scope. Directives have something called isolated scopes.</li>
	<li><strong>transclude</strong>(optional): If provided, it must be set to true. It is set to false by default. Transclude keeps the html content present in b/w your directive inside directive because when html is compiled with our custom directive all the html content will be deleted in b/w the directive and replaced with template of the directive.</li>
	<li><strong>controller</strong>(optional): The controller option takes a string or a function. When set to a string, the name of the string is
used to look up a controller constructor function registered elsewhere in our application.</li>
	<li><strong>controllerAs</strong>(optional): The controllerAs option enables us to set a controller alias, thus allowing us to publish our
controller under this name and giving the scope access to the controllerAs name.</li>
	<li><strong>require</strong>(optional): It tales either string or array The string(s) contain the name of another directive. require is used to inject the controller of the required directive as the fourth parameter of the current directive’s linking function.</li>
	<li><strong>link</strong>(optional): If there will be any manipulations that may require $scope through your directive we use link function</li>
	<li><strong>compile</strong>(optional): If we don't require any $scope for DOM manipulations we use compile.</li>
</ol>
<strong>compile vs link</strong> I will try to cover it another post with detailed examples.

For now if you want to create a directive of your own these are all the properties that can be available that can be used to define our directive functionality.

Example using  <strong>priority and terminate</strong>

{% highlight html %}
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="../05-Routing/lib/angular.js"></script>
    <script>
        var app = angular.module("app", []);
        app.directive("dir1", function(){
            return {
                priority:79,
                terminal:true,
                link:function(scope, element, attrs){
                    element.bind(alert("ok1"));
                }
            }
        });

        app.directive("dir2", function(){
            return {
                priority:69,
                link:function(scope, element, attrs){
                    element.bind(alert("ok2"));
                }
            }
        });

        app.directive("dir3", function(){
            return {
                priority:89,
                link:function(scope, element, attrs){
                    element.bind(alert("ok3"));
                }
            }
        });
    </script>
</head>
<body ng-app="app">
<div dir1 dir2 dir3></div>
</body>
</html>
{% endhighlight %}

I have created three simple directives dir1, dir2, dir3 defaults to attributes if explicitly 'restrict' was not defined. I am simply giving their priorities and linking an alert popup on the element it is present. Analyze the output by removing highlighed line and placing the highlighted line. you will get to know the importance of priority and terminate properties.

Example using <strong>Transclude</strong>

{% highlight html %}
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <style rel="stylesheet" type="text/css">
        .panel {
            background: #f2f2f2;
            border: solid 1px #e6e6e6;
            margin: 0 0 22px 0;
            padding: 20px
        }
    </style>
    <script src="../05-Routing/lib/angular.js"></script>
    <script>
        var app = angular.module("app", []);

        app.directive("myDirective",function(){
           return{
               transclude:true,
               scope:{
                   title:'@'
               },
               template:'<div class="panel"><h2>{%raw%}{{title}}{%endraw%}</h2> <div ng-transclude></div></div>'
           }

        });
    </script>
</head>
<body ng-app="app">
<div my-directive title="Links">
    <ul>
        <li>First link</li>
        <li>Second link</li>
    </ul>
</div>
</body>
</html>
{% endhighlight %}

Test the example with commenting and uncommenting the transculde option.

<strong>Topics to know: </strong>what are isolated scopes, transcule,differences b/w link and compile , role of controller in directives.
