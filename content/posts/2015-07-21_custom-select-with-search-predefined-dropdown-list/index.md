---
title: AngularJs Custom Select with search & predefined dropdown list
created: 2015-07-21 01:25
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_27
---
Directives are the most powerful concept in AngularJs. We can almost do anything using our custom directives. Today I came across a requirement where I need a predefined dropdown with search option, where search needs to bring list from server.I'm using [bootstrap-ui dropdown](https://angular-ui.github.io/bootstrap/) directives to get more features for the custom directive. This directive can be further stream-lined for more specific usages. **selectDemo.html**

```html
<!doctype html>
<html ng-app="CustomSelectDemo">
  <head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.js">
    </script>
    <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.13.0.js">
    </script>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
    <script>
      angular.module('CustomSelectDemo', ['ui.bootstrap']);
      angular.module('CustomSelectDemo').directive('zDropdown', ['$compile',
        '$http',
        function($compile, $http) {
          return {
            restrict: 'E',
            require: '^ngModel',
            scope: {
              items: '=',
              ngModel: '=',
              dataUrl: '@'
            },
            templateUrl: 'select_template_2.html',
            link: function(scope, element, attrs, ctrl) {
              var ngModelCtrl = ctrl scope.expression = attrs.optionsExp;
              scope.setLabel = function() {
                if (typeof(scope.ngModel) == "undefined" || !scope.ngModel ||
                  scope.ngModel.length < 1) {
                  scope.currentLabelItem = attrs.defaultText;
                } else {
                  scope.currentLabelItem = scope.ngModel[attrs.displayText];
                }
              }
              scope.searchText = '';
              scope.searchResults = [];
              scope.isOpen = false scope.$watch('searchText', function() {
                $http.get(scope.dataUrl, {
                  params: {
                    search: scope.searchText
                  }
                }).then(function(data) {
                  scope.searchResults = data;
                })
              });
              scope.displayText = function() {
                return attrs.displayText;
              }
              scope.search = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                scope.isOpen = true
              }
              scope.$watch('ngModel', function(v) {
                scope.setLabel();
              }, true);
              scope.setLabel();
              scope.selectVal = function(item) {
                console.log('selected Item', item);
                scope.ngModel = item;
                ngModelCtrl.$setViewValue(scope.ngModel);
                scope.isOpen = false
              };
            }
          };
        }
      ]);
      angular.module('CustomSelectDemo').controller('MainCtrl', function($scope,
        $log, $timeout) {
        $scope.myItems = [{
          code: '1',
          name: 'One'
        }, {
          code: '2',
          name: 'Two'
        }, {
          code: '3',
          name: 'Three'
        }, {
          code: '4',
          name: 'Four'
        }, {
          code: '5',
          name: 'Five'
        }];
      });
    </script>
  </head>
  <body>
    <div ng-controller="MainCtrl">
      <z-dropdown ng-model="selectedItem" default-text="Select" display-text="name" items="myItems"></z-dropdown>
      <br/> {{selectedItem}}
    </div>
  </body>
</html>
```

custom select template:

```html
<div class="btn-group" dropdown auto-close="disbaled" is-open="isOpen">
  <button type="button" class="btn btn-primary dropdown-toggle" style="color: red; background-color: #ffffff; text-overflow: ellipsis; padding:0px 6px 0px 6px; border-color: #00bfff;"
    dropdown-toggle>{{currentLabelItem}}<span class="caret" style="color: #00bfff; margin-left: 10px"></span>
  </button>
  <ul class="dropdown-menu" role="menu" style="height: 100px;overflow-y: auto">
    <li><input type="text" ng-model="searchText" ng-focus="search($event)" ng-click="search($event)"></li>
    <li ng-if="searchText.length>0 && searchResults.size ===0"> No Results Found</li>
    <li ng-if="searchText.length>0 && && searchResults.size>0" ng-repeat="item in searchResults">
      <a tabindex="-1" style="cursor: pointer" data-ng-click="selectVal(item)">{{items[$index][displayText()]}}</a>
    </li>
    <li ng-if="searchText.length==0" ng-repeat="item in items">
      <a tabindex="-1" style="cursor: pointer" data-ng-click="selectVal(item)">{{items[$index][displayText()]}}</a>
    </li>
  </ul>
</div>
```

Hope this helps !!
