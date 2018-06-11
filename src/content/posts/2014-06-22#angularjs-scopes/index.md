---
layout: post
title: AngularJs Scopes
date: 2014-06-22 00:34
categories: [AngularJs]
tags: [AngularJs, angularjs, controller, scope, two way databinding]
permalink: /angularjs/scopes
---

Scopes are one of the core functionality in AngularJs. Scopes serve as a glue between controllers(for now say model) and view. Just before our application renders view to the user, scope links to the view and application sets up DOM(Document Object Model) to notify the angular for property changes. Scopes uses prototypical inheritance to get the value. Please click here to know the difference b/w <span style="color:#0000ff;"><a href="http://aaditmshah.github.io/why-prototypal-inheritance-matters/#constructors_vs_prototypes" target="_blank"><span style="color:#0000ff;">classical inheritance and prototypical inheritance</span></a></span>. Prototypical inheritance in simple words is nothing but searching for the value from present scope to top level scope.

<span style="color:#ff6600;">What Scopes can Do ?</span>
<ul>
	<li>They provide observers to watch for model changes.</li>
	<li>They provide an ability to propagate model changes through the application.</li>
	<li>They provide an execution environment in which expressions are evaluated</li>
</ul>
<!--more-->

<strong>Life Cycle of scope:</strong>
<ol>
	<li><b>Creation: </b><i>When we create a controller or directive, Angular creates a new scope with the $injector and passes this new scope for the controller or directive at run time</i>.</li>
	<li><b>Linking: </b><i>When the $scope is linked to the view, all directives that create $scopes will register their watches on the parent scope.</i></li>
	<li><b>Updating: </b><i>During the $digest cycle, which executes on the $rootScope, all of the children scopes will perform dirty digest checking.</i></li>
	<li><b>Destruction: </b><i>When a $scope is no longer needed, the child scope creator will need to call scope.$destroy() to clean up the child scope.</i></li>
</ol>
Let's see an example

{% highlight html %}
<html ng-app>
<head>
    <title></title>
    <script src="lib/angular.js"></script>
    <script>
        function ContactController($scope) {
            $scope.contacts = ['test1','test2','test3'];
        }
    </script>
</head>
<body>
<div ng-controller="ContactController">
    <ul>
        <li ng-repeat="contact in contacts"> {%raw%}{{ contact }}{%endraw%} </li>
    </ul>
</div>
</body>
</html>
{% endhighlight %}

Line 12-16 there is a div tag with <strong>ng-controller . </strong>I can write whatever logic I want for this controller in my script file and can make output available to view through <strong>$scope. </strong>Lets examine the <strong>ContactController. </strong>It takes $scope as an input and it is made available directly to controller through Dependency Injection. This $scope properties can be made available in view either using ng-bind or {%raw%}{{ }}{%endraw%}. Here we defined a list of contacts so in view we are using <strong>ng-repeat </strong>which is equivalent to <strong>for</strong> loop and each object is displayed using {%raw%}{{ }}{%endraw%}.

It is not mandatory that variables must be present in this scope only. It may present on it's parent scope also.

<strong>Topics to know</strong>: $scope, $rootScope.

<strong>Terms to understand</strong>: child scope, parent scope, prototypical inheritance.
