---
title: AngularJs DataBinding
date: 2014-06-21 23:24
categories: [AngularJs]
tags: [AngularJs, angularjs, databinding, ng-bind, ng-model, two way databinding]
---

Angular implements two way data binding. Data Binding is a process that links UI and business logic, changes done to either of them will reflect in both. Two-way data binding refers to the ability to bind changes to an object’s properties to changes in the UI, and vice-versa.

<span style="color:#ff6600;">How do we achieve data binding in AngularJs ?</span>

We use <strong>ng-model </strong>to bind the variable to scope and we use double curly braces <strong>{% raw %}{{ }}{% endraw %} or ng-bind </strong>to see the variable value. Whenever we use ng-model to a variable it will be binded to the scope. This scope for the variable will be available in UI as well as model. So changes done in UI will be reflected in model and changes done in model will be reflected in UI.

<!--more-->

Lets see an example using {% raw %}{{ }}{% endraw %}

{% highlight html %}
<html>
<head lang="en">
<meta charset="UTF-8">
<title></title>
<script src="lib/angular.js"></script>
</head>
<body ng-app=">
<div>
<input type="text" ng-model="name"/><br/>
<span ng-show="name">Hello, {% raw %}{{ name }}{% endraw %}</span>
</div>
</body>
</html>
{% endhighlight %}

<strong>ng-model </strong> is built in directive of AngularJs and will be used for data-binding. Variable "name" is now binded to the scope so when I type something in input field will be immediately reflected in the <strong>{% raw %}{{ name }}{% endraw %}. ng-show </strong>is another built in directive which returns true or false. If it returns true particular element will be shown, else it will not be shown.

Here is an example for ng-bind

{% highlight html %}
<html></pre>
<pre><head lang="en">
 <meta charset="UTF-8">
 <title></title>
 <script src="lib/angular.js"></script>
</head>
<body ng-app=">
<div>
 <input type="text" ng-model="name"/><br/>
 Hello, <span ng-bind="name"></span>
</div>
</body>
</html>
{% endhighlight %}

Instead of using {% raw %}{{ }}{% endraw %} to display ng-model value we use ng-bind.

<span style="color:#ff6600;">What is the main difference between ng-model and ng-bind ?</span>

<strong>ng-bind</strong> has one-way data binding (model to view). It has a shortcut <code>{% raw %}{{ val }}{% endraw %}</code> which displays the model value inserted into html.

<strong>ng-model</strong> has two-way data binding (model  --> view and view --> model).

To know exactly how two way data binding works in background google for $watch and $digest.

<strong>Topics to know:</strong> $watch, $digest loop

<strong>Terms to understand:</strong> model, view, Document Object Model.
