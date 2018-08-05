---
title: AngularJs Scopes
created: 2014-06-22 00:34
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_10
---

# AngularJs Scopes

Scopes are one of the core functionality in AngularJs. Scopes serve as a glue between controllers(for now say model) and view. Just before our application renders view to the user, scope links to the view and application sets up DOM(Document Object Model) to notify the angular for property changes. Scopes uses prototypical inheritance to get the value. Please click here to know the difference b/w [classical inheritance and prototypical inheritance](http://aaditmshah.github.io/why-prototypal-inheritance-matters/#constructors_vs_prototypes). Prototypical inheritance in simple words is nothing but searching for the value from present scope to top level scope. What Scopes can Do ?

  * They provide observers to watch for model changes.
  * They provide an ability to propagate model changes through the application.
  * They provide an execution environment in which expressions are evaluated

**Life Cycle of scope:**

  1. **Creation:** _When we create a controller or directive, Angular creates a new scope with the $injector and passes this new scope for the controller or directive at run time_.
  2. **Linking:** _When the $scope is linked to the view, all directives that create $scopes will register their watches on the parent scope._
  3. **Updating:** _During the $digest cycle, which executes on the $rootScope, all of the children scopes will perform dirty digest checking._
  4. **Destruction:** _When a $scope is no longer needed, the child scope creator will need to call scope.$destroy() to clean up the child scope._

Let's see an example
```html
  <html ng-app>
    <head>
      <title></title>
      <script src="lib/angular.js">
      </script>
      <script>
        function ContactController($scope) {
          $scope.contacts = ['test1', 'test2', 'test3'];
        }
      </script>
    </head>
    <body>
      <div ng-controller="ContactController">
        <ul>
          <li ng-repeat="contact in contacts"> {{ contact }} </li>
        </ul>
      </div>
    </body>
  </html>
```

Line 12-16 there is a div tag with **ng-controller .** I can write whatever logic I want for this controller in my script file and can make output available to view through **$scope. Lets examine the **ContactController.** It takes $scope as an input and it is made available directly to controller through Dependency Injection. This $scope properties can be made available in view either using ng-bind or {{ }}. Here we defined a list of contacts so in view we are using **ng-repeat** which is equivalent to **for** loop and each object is displayed using {{ }}. It is not mandatory that variables must be present in this scope only. It may present on it's parent scope also. **Topics to know**: $scope, $rootScope. **Terms to understand**: child scope, parent scope, prototypical inheritance.