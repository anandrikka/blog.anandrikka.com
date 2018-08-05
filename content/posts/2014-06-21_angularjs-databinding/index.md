---
title: AngularJs DataBinding
created: 2014-06-21 23:24
status: published
cover: ../../assets/covers//angular1.png
category: Angularjs
tags: ["angularjs"]
identifier: post_6
---
# AngularJs DataBinding

Angular implements two way data binding. Data Binding is a process that links UI and business logic, changes done to either of them will reflect in both. Two-way data binding refers to the ability to bind changes to an object’s properties to changes in the UI, and vice-versa. How do we achieve data binding in AngularJs ? We use **ng-model** to bind the variable to scope and we use double curly braces **{{ }} or ng-bind** to see the variable value. Whenever we use ng-model to a variable it will be binded to the scope. This scope for the variable will be available in UI as well as model. So changes done in UI will be reflected in model and changes done in model will be reflected in UI.  Lets see an example using {{ }}

```html
  <html>
    <head lang="en">
      <meta charset="UTF-8">
      <title></title>
      <script src="lib/angular.js"></script>
    </head>
    <body ng-app="">
      <div>
        <input type="text" ng-model="name"/>
        <br/>
        <span ng-show="name">Hello, {{name}}</span>
      </div>
    </body>
  </html>
```

**ng-model** is built in directive of AngularJs and will be used for data-binding. Variable "name" is now binded to the scope so when I type something in input field will be immediately reflected in the **{{name}}. ng-show** is another built in directive which returns true or false. If it returns true particular element will be shown, else it will not be shown. Here is an example for ng-bind

```html
  <html>
    <head lang="en">
      <meta charset="UTF-8">
      <title></title>
      <script src="lib/angular.js"></script>
    </head>
    <body ng-app="">
      <div>
        <input type="text" ng-model="name"/>
        <br/>
        Hello, <span ng-bind="name"></span>
      </div>
    </body>
  </html>
```

Instead of using {{ }} to display ng-model value we use ng-bind. What is the main difference between ng-model and ng-bind ? **ng-bind** has one-way data binding (model to view). It has a shortcut `{{ val }}` which displays the model value inserted into html. **ng-model** has two-way data binding (model  --> view and view --> model). To know exactly how two way data binding works in background google for $watch and $digest. **Topics to know:** $watch, $digest loop **Terms to understand:** model, view, Document Object Model.