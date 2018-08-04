---
title: AngularJs Understanding Loading modules
created: 2015/09/08 01:43
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_36
---

# AngularJs: Understanding Loading modules

Banging my head for 2 days gave me some insight into how AngularJs loads modules. In the previous posts I have been talking about $injector, $provider, DI, createInjector bla bla bla.. All the information I have shared researching online material gave me bits and pieces of information but not a complete picture. Then I have decided to go through source code, with the knowledge gained from previous research I was able to understand how it's achieved. This post is going to be a bit longer. concepts like $injector, $provider, DI are touched in this post, which are covered in detail in my previous posts. _*Click on images to open in new tab for reading explanation for the code._ _So let's begin the show_ :) When we write a simple angular program -  There are lot many questions that might be araising in our head 

  1. When was core ng-module loaded
  2. How AngularJs was able to fetch my dependencies like $location, $window, $scope etc.. by just passing string into array or function
  3. How our module dependencies are loaded
and lot more.. _By End of this post you will get answers to most of your questions._ First of all angular.js is a self invoking function which takes two parameters **window & document. **When we include this script file in html all the code is executed once and variables are set if any. This will help AngularJs to publish it's internal methods which can be accessed via keyword **angular.** Example: angular.extend, angular.bootstrap, angular.injector, angular.toLowerCase etc.. angular is added as property to window object whose value is empty object. 

**angular = window.angular || (window.angular = {})**

Since angular is a self invoking function, at the end of script file there are three methods called 

  1. bindJQuery()
  2. publishExternalAPI(angular) - makes available list of commonly used methods globally.
  3. angularInit(document, bootstrap) - This will bootstrap module provided on document via ngApp or using angular.injector().
Before looking into publishExternalAPI and angularInit, let's have look at setupModuleLoader function This is called within publishExternalAPI and bootstrap to create moduleInstance, like what needs to be returned when module is created and called. I have placed my comments directly in the source code for better understanding. Refer image below for more details on **setupModuleLoader** **![SetupModuleLoad](https://techanand.files.wordpress.com/2015/09/angularmodule.jpg)** In short, setupModuleLoader will add  module to **angular.module.modules **object with moduleInstance contaning controller, filter, provider, factory, value, constant, config run, **_invokeQueues and _runBlocks** these 2 queues get filled when invoke function is called on any of the above functions are called on module, refer image for better understanding. **publishExternalAPI: **This is the most interesting and one of the core modules that drives AngularJs. I'm explaining all the important points right beside code for easier understanding. Enlarge picture for more information![Publish External API](https://techanand.files.wordpress.com/2015/09/externalapi_1.jpg) Till now publishing methods on angular to external world is done and there are two modules added to angular.module.modules section 

  1. ngLocale
  2. ng - This module has configFn where all the setup related to inbuild services & directives is there.
**angularInit(document, bootstrap):** angularInit is the place where bootstrapping is done, This is where module loading and Dependency Injection starts. After some initial startup angularInit finally calls **bootstrap** function on the element. **Bootstrap: **After some initial setup bootstrap calls **doBootStrap** function which finally returns our eagerly waiting **$injector **on successful loading of modules. Enlarge picture for more details on what doBootstrap does. ![Do Bootstrap](https://techanand.files.wordpress.com/2015/09/dobootstrap.jpg) Bootstrap calls createInjector method with list of modules that needs to be loaded. This includes ng module as well, what does createInjector method with the array of modules given to it ? createInjector - This is where actually modules are loaded, before loading modules there is another setup createInjector does for us. It creates 2 cache objects for us 

  1. providerCache - contains 2 objects 
    * $provider - with six methods on it provider, value, constant, service, factory and decorator.
    * $injector
  2. instanceCache - contains $injector method on it and this injector will be returned by createInjector method.
Let's see what exactly code does in createInjector.![Create Injector](https://techanand.files.wordpress.com/2015/09/createinjector.jpg)I'm not going to discuss in detail about what createInternalInjector does . I have already covered that in detail in my [previous post](https://techanand.wordpress.com/2015/09/01/angularjs-notes-understand-di-injector/). In short createInternalInjector returns a object which contains five methods on it 

  1. invoke - invokes original method by calling javascript's apply on it
  2. instantiate - creates new service object.
  3. getService - fetches the service from cache
  4. annotate - process the input function and returns array of dependencies that need to be injected
  5. has - checks whether the service present or not in cache.
so only part left is **loadModules, **let's explore it. click on image to open in new tab to read comments beside code for more information. ![loadModules](https://techanand.files.wordpress.com/2015/09/loadmodules.jpg) This is how modules are loaded into AngularJs Application. This is a very big post and might be confusing as well because of not using proper english. Share your questions via comments and I would be happy to help