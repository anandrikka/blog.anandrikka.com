---
title: Angular $injector Vs $inject Vs Injector()
created: 2015-09-01 02:17
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_29
---
# AngularJs Note: $injector Vs $inject Vs Injector()

Following are the key differences:   #injector: Used to invoke or get dependencies into variables [code language="javascript"] $injector.get('A') //gets the implementation of service called 'A' $injector.invoke('A') //returns the value of implementation of service 'A' [/code] #$inject: Used to inject dependencies into a function arguments [code language="javascript"] var test = function('A', 'B'){} test.$inject = ['A', 'B'] $injector.invoke(explicit) [/code] #injector(): Used on document object which is mainly used to bring non-angular environment code into angular environment. [code language="javascript"] var $div = $('<div ng-controller="MyCtrl">{{content.label}}</div>'); $(document.body).append($div); angular.element(document).injector().invoke(function($compile) { var scope = angular.element($div).scope(); $compile($div)(scope); }); [/code]