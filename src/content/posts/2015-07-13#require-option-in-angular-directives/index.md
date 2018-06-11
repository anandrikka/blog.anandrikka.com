---
layout: post
title: Require option in directives
date: 2015-07-13 01:11
categories: [AngularJs]
tags: [AngularJs, AngularJs Directives, directives, require in angular directives, require option in angular directives]
permalink: /angularjs/require-option-in-directives
---

Have you ever came across a situation where you might be dependent on another directive to implement your directives. Keep these simple points in mind to overcome the issue. Angular provides a way to call another directive's controller into our directive, using <strong>require</strong> option. It can be defined in directive's return object specify directive name here to include that controller, most common use case is using ngModel controller in custom directives.

<strong>require:['myDirective']</strong> - requires ng-model controller from the same element.

<strong>require:['^myDirective']</strong> - ^ symbol searchs for the controller up the root not on the same directive, it fetchs parent controller.

<strong>require:['?myDirective']</strong> - ? symbol fetchs the directive controller on the same element, but it is optional, there will be no issues if didn't used it returns <strong>null</strong>, if you don't use it.

<strong>require:['?^myDirective']</strong> - both symbols means controller is fetched from the parent, but it's optional.

Finally injected controller is available as a fourth option in the link function, if you have multiple dependent directives pass them as array in require option &amp; they will be available in the same order in controller's option of link function.

Hope this post helps !!
