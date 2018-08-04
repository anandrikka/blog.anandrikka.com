---
title: Angular# Auto Dropdown based on another select element
created: 2015-07-02 23:53
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_22
---
# AngularJs: Auto Dropdown based on another select element

Ever got requirement of auto opening dropdown based on another dropdown. This directive in angularjs will help you to do that. [code lang="html"] <!DOCTYPE html> <html> <head lang="en"> <meta charset="UTF-8"> <title></title> <script src="../lib/angular.js"></script> <script> var app = angular.module('select-test', []) app.directive('openselect', function () {      var showDropdown = function (element) {           var event;           event = document.createEvent('MouseEvents');           event.initMouseEvent('mousedown', true, true, window);           element.dispatchEvent(event);      };      return {           require:'^ngModel',           restrict: 'A',           scope: {                'elementId': '@'           },           link: function (scope, elem, attrs, ctrl) {                var ngModelCtrl=ctrl                ngModelCtrl.$viewChangeListeners.push(function(){                var elementId = document.getElementById(scope.elementId);                showDropdown(elementId);                });           }      };      }); app.controller('testController', function($scope){      var data={           "myOptions": [                {                     "id": 101,                     "group": "Group 1",                     "label": "Item 1"                },                {                     "id": 102,                     "group": "Group 1",                     "label": "Item 2"                }           ]      }      $scope.myOptions = data.myOptions      $scope.myOption=$scope.myOptions[0]; }) </script> </head>      <body ng-app="select-test">           <div ng-controller="testController">           Select From:           <select openselect element-id="testId" ng-model="myOption"                ng-options="value.id as value.label for value in myOptions">            </select>&nbsp;&nbsp;&nbsp;&nbsp; Auto DropDown:           <select id="testId">                <option>One</option>                <option>Two</option>                <option>Three</option>           </select> </div> </body> </html> [/code]

## Comments

**[dineshramitc](#32 "2015-07-07 12:39:28"):** Reblogged this on [Dinesh Ram Kali.](https://dineshramitc.wordpress.com/2015/07/07/auto-dropdown-based-on-another-select-element/).

