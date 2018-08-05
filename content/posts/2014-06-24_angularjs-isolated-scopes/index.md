---
title: AngularJs Isolated Scopes
created: 2014-06-24 00:28
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_13
---
To have a solid understanding of isolated scopes we must understand how scope works in AngularJs. we can pass data to directives using scope variables, but this has so many compilcations for example if we want to use directive some other place it has to be defined in only controller in order to pass scope variables moreover we can even change the scope variables whenever we want this is force us to change the directive definition. In order to aviod these complications AngularJs has **Isolated Scopes.** Isolated scopes are completely separate from the current scope of the DOM. In order to set the properties on scope object we need to pass the data via attributes, So what are the ways we have to pass data through attributes ? We have three ways of passing data to attributes. For that we are going to use "**scope**" property of Directive. There is a point to notice what ever the value that we need to send to directive is set as an attribute in the DOM and these attributes must be defined on scopes with camelCase names Example: "myUrl" defined on isolated scope will be used as "my-url" attribute on DOM. All the properties defiend in the scope are accessible all across the directive and this scope will be local to directive i.e each time we use a directive new scope will be created for that directive.  There are three types of isolated scopes we are going to use in directive definition **"@"**: attributes are provided as a result of evaluated expression as a String. We use '@' as follows in the directive 

scope:{

myUrl:'@'

}

this means we are going to get the property of "myUrl" defined on the directive from html attribute "my-url". The input to myUrl will be  the output of the evaluated expression of my-url. For example we define "my-url=message". myUrl will be taking {{message}}. Let's see an example

```html
<html>
  <head lang="en">
    <meta charset="UTF-8"> <title></title>
    <script src="../05-Routing/lib/angular.js">
    </script>
    <script>
      var app = angular.module("app", []);
      app.controller("MyController", function($scope) {
        $scope.message = "from scope";
      });
      app.directive("attrScope", function() {
        return {
          template: '<div>{{message}}</div>', // this is similar to what we done in scope property below, but we used link function,
          link: function(scope, element, attrs) {
            scope.message = attrs.message;
          }, // this will create a variable called 'message' in scope // and read attribute called scope form html and evaluate it as String
          scope: {
            message: '@'
          }
        }
      });
    </script>
  </head>
  <body ng-app="app">
    <div ng-controller="MyController"> <input type="text" ng-model="message" /> <div
        attr-scope message="{{message}}"></div>
    </div>
  </body>
</html>
```

In the above example evaluated expression result "{{message}}" is passed as a String to directive and it can be made availabe on scope as explained above. The output will be whatever we type in the input field will be displayed through our directive. This is a one way binding i.e only message from HTML will be mapped to Directive and the same message property from directive cannot be mapped back to HTML because we are not passing any object through our attribute it is just a string. If not understood see the example below

```html
<html>
  <head lang="en">
    <meta charset="UTF-8"> <title></title>
    <script src="../05-Routing/lib/angular.js">
    </script>
    <script>
      var app = angular.module("app", []);
      app.controller("MyController", function($scope) {
        $scope.message = "from scope";
      });
      app.directive("attrScope", function() {
        return {
          template: '<div>' + 'From Directive:' + '<br/>' +
            '<input type="text" ng-model="message"/></div>',
          scope: {
            message: '@'
          }
        }
      });
    </script>
  </head>
  <body ng-app="app">
    <div ng-controller="MyController"> From DOM:<br/> <input type="text" ng-model="message" />
        <br/>
          <div attr-scope message="{{message}}"></div>
    </div>
  </body>
</html>
```

In the above example when we type something from DOM. It will be reflected in the directive template via "message" attribute through scope "message" defined on the directive but the reverse cannot be done because using "@" will bind data in only one direction. This can be useful in some cases but the most basic concept of AngularJs "two way data binding" is not achieved through "@" so in order to overcome this we have something called "__=__" __"=":__ Using "@" will not achieve two way databinding in order to acheive we pass the attributes to scope of directive as an object using =. Only difference b/w @ and = is @ passes String = passes Object. In the above example replace '@' with '=' and '{{message}}' with simply 'message'. Result we will observe two way databinding. __"&":__ In order to pass data from directives to methods on controller we use "&". For example calling a method on controller using our own directive. Let's see an example

```html
<html>
  <head lang="en">
    <meta charset="UTF-8"> <title></title>
    <script src="../05-Routing/lib/angular.js">
    </script>
    <script>
      var app = angular.module("app", []);
      app.controller("MyController", function($scope) {
        $scope.alertMessage = function(message) {
          alert(message);
        }
      });
      app.directive("attrScope", function() {
        return {
          template: '<div> ' + '<input type="text" ng-model="demoMessage"/>' +
            '<input type="button" ng-click="demo({message:demoMessage})">Click Me</input>' +
            '</div>',
          scope: {
            demo: '&'
          }
        }
      });
    </script>
  </head>
  <body ng-app="app">
    <div ng-controller="MyController">
      <div attr-scope demo="alertMessage(message)"></div>
    </div>
  </body>
</html>
```

In order to pass data from directive to controller I will use {task:task} left hand 'task' is the property that is defined on html and right hand 'task' is the property that need to be passed from directive to html. I am calling **alertMessage** defined on controller using "demo" directive and we get "message" from directive via {message:demoMessage}.