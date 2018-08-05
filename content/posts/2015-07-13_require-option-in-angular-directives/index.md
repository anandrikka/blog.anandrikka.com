---
title: AngularJs Require option in directives
created: 2015-07-13 01:11
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_26
---
Have you ever came across a situation where you might be dependent on another directive to implement your directives. Keep these simple points in mind to overcome the issue. Angular provides a way to call another directive's controller into our directive, using **require** option. It can be defined in directive's return object specify directive name here to include that controller, most common use case is using ngModel controller in custom directives. **require:['myDirective']** \- requires ng-model controller from the same element. **require:['^myDirective']** \- ^ symbol searchs for the controller up the root not on the same directive, it fetchs parent controller. **require:['?myDirective']** \- ? symbol fetchs the directive controller on the same element, but it is optional, there will be no issues if didn't used it returns **null**, if you don't use it. **require:['?^myDirective']** \- both symbols means controller is fetched from the parent, but it's optional. Finally injected controller is available as a fourth option in the link function, if you have multiple dependent directives pass them as array in require option & they will be available in the same order in controller's option of link function. Hope this post helps !!