---
title: AngularJs Routing
created: 2014-06-25 00:02
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_14
---
Routing is nothing but redirecting from one page to another page. In any web application routing is very important. AngularJs is a Single Page Application which never reloads once app is loaded. In this case How we acheive routing ? We can navigate from one template to another using Directive Templates, but it is not best practice to do it like that instead we brakeout the view into layout and template views and we show template views based in URL. Routing is not included in the angular.js file, we have download **ngRoute** dependency from [angular website](https://angularjs.org) and add it to our project. **ng-view** is a special directive included in **ngRoute.** It is used as a placeholder for $route view content. This directive can specify exactly where is DOM template rendered by current $route can be placed. __$routeProvider__ is the provider service that is used to configure routes in the config section of the app. $routeProvider provides two important methods on it. They are **when and otherwise.**

**when** takes two parameters as input they are path and route.
**Path:** It is matching string whenever a route path is matched to it. It executes whatever defined in 2nd parameter which is nothing but **route object.**
**Route:** This is a configuration parameter which determined exactly what to do if route in the 1st parameter matches. Route object has some paramters that need to be defined. They are as follows

  1. **template:** It is a template string whenever we specify template in configuration object angular will load HTML Template into ng-view DOM element.
  2. **templateUrl:** Instead of making route congifuration object bulky we can give path where we placed template
  3. **controller:** If we set controller on the configuration object, the controller given will be associated with the new scope of the route. If we pass a string, it associates controller defined on the module with that name to route. If we pass a function, this function will be associated with the template as the controller for the DOM element.
  4. **redirectTo:** This is similar to otherwise on $routeProvider. It is used to redirect from one template to another based on path provided. It accepts either a string or a function, if it is a function return value should be a path.
  5. **reloadOnSearch:** If the reloadOnSearch option is set to true (by default), then reload the route when $location.search() is changed. If you set this option to false, then the page won’t reload the route if the search part of the URL changes.
Let's see an example

```html
<html>
  <head lang="en">
    <meta charset="UTF-8"> <title></title>
    <script src="lib/angular.js">
    </script>
    <script src="lib/angular-route.js">
    </script>
    <script>
      var app = angular.module('app', ['ngRoute']);
      app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/clickController', {
          templateUrl: 'partials/05_Routing_ExternalController.html',
          controller: 'MyController'
        }).otherwise('/')
      }]);
      app.controller('MyController', function($scope) {
        $scope.message = "this is message from controller"
      })
    </script>
  </head>
  <body ng-app='app'> <a href="#clickController">This is from pressing a link</a>
    <p>\-------------------------- this is ng-view ----------------------------------</p>
    <ng-view></ng-view>
  </body>
</html>
```

In the above example I have configured a $routeProvider which redirects to different templates based on path provided. '#' is how angular detects path. Here

**clickController** will check for '/clickController' in the configuration when found will implement route object. It checks for **05_Routing_ExternalController.html** in the given path and assigns **MyController** to that template. So whenever I click on the link we get message defined in the controller on **ng-view.**

__$routeParams:__ We can pass information into path using __":"__ For example defiine path __/api/:name__ when we define url like "/api/anand". anand will be mapped to name they will be available as key-value pairs. We can pass any number of parameters like that. These params can be used in controller if defined by passing $routeParams service into controller. Let's see an example

```html
<html>
  <head lang="en">
    <meta charset="UTF-8"> <title></title>
    <script src="lib/angular.js">
    </script>
    <script src="lib/angular-route.js">
    </script>
    <script>
      var app = angular.module('app', ['ngRoute']);
      app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/clickController/:message', {
          templateUrl: 'partials/05_Routing_02_ExternalController.html',
          controller: 'MyController'
        }).otherwise('/')
      }]);
      app.controller('MyController', function($scope, $routeParams) {
        console.log($routeParams.message) $scope.message = $routeParams.message;
      })
    </script>
  </head>
  <body ng-app='app'> <a href="#clickController/HelloWorld">This is from pressing a link</a>
    <p>\-------------------------- this is ng-view ----------------------------------</p>
    <ng-view></ng-view>
  </body>
</html>
```

message defined on route is accessed in controller using $routeParams.

**Topics to know:** $routeProvider, $route, $routeParams, $location, $locationProvider, resolve, promises, # mode, Routing Events
