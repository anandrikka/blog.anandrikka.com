---
title: AngularJs Services
created: 2014-06-25 00:51
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_15
---
Services are generally used to write methods that fetch or modify databases. Can't we use controllers for the same ? Yes we can use controllers to define logic but there are some limitations. Controllers are initiated only when they are needed and discarded when they are not required. So whenever we switch the route or reload the page old scope will be discarded and new scope will be generated. This is not acceptable in production envinorment. In order to overcome this situation angular provides us **Services** we have already used services a lot. Services provide a way to keep data for lifetime of the app and communicates across controllers in consistent manner. Services are singleton objects means they are only created once and they are lazy loaded tooo !! means only intantiated when needed. What are the different ways to create services  ? Angular provides five ways to define our own services based on requirement. Let's see them with examples. All services takes two parameters 'service name' and object which is nothing but what service must do...

**factory:** It simply returns an object whatever we want to define on this service needs to be done as properties on this object, so when we use this factory in a controller or directive they are accessable via this object Example for factory

```html
<html>
  <head lang="en">
    <meta charset="UTF-8"> <title></title>
    <script src="lib/angular.js">
    </script>
    <script>
      var myAppServices = angular.module('myAppServices', []);
      myAppServices.factory('Person', function() {
        var name;
        return {
          getName: function() {
            return name;
          },
          setName: function(passedName) {
            name = passedName;
          }
        }
      });
      var myApp = angular.module('myApp', ['myAppServices']);
      myApp.controller('MyController', function($scope, Person) {
        $scope.$watch('message', function() {
          Person.setName($scope.message);
          console.log(Person.getName());
        })
      });
    </script>
  </head>
  <body ng-app="myApp">
    <div ng-controller="MyController"> <input type="text" ng-model="message" /> </div>
  </body>
</html>
```

**service:** When declaring service name as an injectable argument. we are provided with an instance of the function. For more understanding of the service please refer about creating new objects in javascript using new. When we define service using service we implement every method using "**this**" because whenever we use service a new instance is created. Let's see an example

```html
<html>
  <head lang="en">
    <meta charset="UTF-8"> <title></title>
    <script src="lib/angular.js">
    </script>
    <script>
      var myAppServices = angular.module('myAppServices', []);
      myAppServices.service('Person', function() {
        this.getName = function() {
          return this.name;
        }
        this.setName = function(name) {
          this.name = name;
        }
      });
      var myApp = angular.module('myApp', ['myAppServices']);
      myApp.controller('MyController', function($scope, Person) {
        $scope.$watch('message', function() {
          Person.setName($scope.message);
          console.log(Person.getName());
        })
      });
    </script>
  </head>
  <body ng-app="myApp">
    <div ng-controller="MyController"> <input type="text" ng-model="message" /> </div>
  </body>
</html>
```

**provider:** When we define a service using provider we can use this service in the configuration.For example if we define a service called "myService" it can be used in the config section using "myServiceProvider". Provider returns an object that was defined only on __$get__ Let's see an example

```html
<html>
  <head lang="en">
    <meta charset="UTF-8"> <title></title>
    <script src="lib/angular.js">
    </script>
    <script>
      var myAppServices = angular.module('myAppServices', []);
      myAppServices.provider('messageService', function() {
        console.log('this is provider app') this.name = "";
        this.setName = function(name) {
          this.name = name;
          console.log(this.name)
        };
        this.$get = function() {
          var name = this.name;
          return {
            getName: function() {
              return name;
            }
          }
        }
      });
      var myApp = angular.module('myApp', ['myAppServices']);
      myApp.config(['messageServiceProvider', function(messageServiceProvider) {
        messageServiceProvider.setName(
          "this is from config of another app!!");
      }]);
      myApp.controller('MyController', function($scope, messageService) {
        console.log(messageService.getName())
      });
    </script>
  </head>
  <body ng-app="myApp">
    <div ng-controller="MyController"> </div>
  </body>
</html>
```

**constant and value:** They are self explanatory whenever we want to define a constant that needs to be accessed all across the modules we use **constant** service and if we want value to be accessed all across the modules we use **value** service What are differences b/w constant and value? Constants can be injected into config modules whereas values can't. constants can't be overriden whereas we can override values. Values are similar to factory. When we have situation where we need only a value to be returned through object we don't strain ourselfs creating a factory we simply create a value service. Let's see an example

```html
<html>
  <head lang="en">
    <meta charset="UTF-8"> <title></title>
    <script src="lib/angular.js">
    </script>
    <script>
      var app = angular.module('app.constant', []);
      app.constant('key', '12345');
    </script>
    <script>
      var myApp = angular.module('myApp', ['app.constant']);
      myApp.controller('MyController', ['$scope', 'key', function($scope, key) {
        $scope.message = key;
      }])
    </script>
  </head>
  <body ng-app="myApp">
    <div ng-controller="MyController"> {{message}} </div>
  </body>
</html>
```

replace constant with value the output for value service.
**Topics to know:** Differences b/w service, factory & provider, $provider, decorators