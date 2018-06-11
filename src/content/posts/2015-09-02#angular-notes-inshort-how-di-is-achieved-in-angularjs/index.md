---
layout: post
title: DI in angularjs
date: 2015-09-02 02:35
comments: true
categories:
- AngularJs
- Tips
tags:
- dependency injection
- AngularJs
- angular
permalink: angularjs/tips/di-in-angularjs
---

<strong>createInjector </strong>is called when application is bootstrapped in this method all the modules are loaded and resolved, so when we call services on modules using any of the service types provider, factory, service, constant and value they are registered using $injector. Once the bootstrap process is completed we can directly inject services where $injector will take care of creating and sending it to us. As an end user there is no need to worry how they are created and sent to you. Isn't it cool !!!.

Refer angular.js for more information on createInjector, this is my understanding of DI in AngularJs please correct me if I'm wrong. Hope this post helps !!
