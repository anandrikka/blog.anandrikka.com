---
layout: post
title: 'AngularJs: Understanding Loading modules'
date: 2015-09-08 01:43:19.000000000 +05:30
type: post
published: true
status: publish
categories:
- AngularJs
tags:
- angualar loadModules
- angular module loading
- how modules are loaded in angularjs
- module loading
- modules
- ngModule
permalink: /angularjs/understanding-loading-modules
---
Banging my head for 2 days gave me some insight into how AngularJs loads modules. In the previous posts I have been talking about $injector, $provider, DI, createInjector bla bla bla.. All the information I have shared researching online material gave me bits and pieces of information but not a complete picture. Then I have decided to go through source code, with the knowledge gained from previous research I was able to understand how it's achieved.

This post is going to be a bit longer. concepts like $injector, $provider, DI are touched in this post, which are covered in detail in my previous posts.

<span style="color:#ff6600;"><em>*Click on images to open in new tab for reading explanation for the code.</em></span>

<em>So let's begin the show</em> :)

When we write a simple angular program -  There are lot many questions that might be araising in our head
<ol>
  <li>When was core ng-module loaded</li>
  <li>How AngularJs was able to fetch my dependencies like $location, $window, $scope etc.. by just passing string into array or function</li>
  <li>How our module dependencies are loaded</li>
</ol>
and lot more.. <em>By End of this post you will get answers to most of your questions.</em>

First of all angular.js is a self invoking function which takes two parameters <strong>window &amp; document. </strong>When we include this script file in html all the code is executed once and variables are set if any. This will help AngularJs to publish it's internal methods which can be accessed via keyword <strong>angular.</strong>

Example: angular.extend, angular.bootstrap, angular.injector, angular.toLowerCase etc..

angular is added as property to window object whose value is empty object.
<p style="text-align:center;"><strong>angular = window.angular || (window.angular = {})</strong></p>
Since angular is a self invoking function, at the end of script file there are three methods called
<ol>
  <li>bindJQuery()</li>
  <li>publishExternalAPI(angular) - makes available list of commonly used methods globally.</li>
  <li>angularInit(document, bootstrap) - This will bootstrap module provided on document via ngApp or using angular.injector().</li>
</ol>
Before looking into publishExternalAPI and angularInit, let's have look at setupModuleLoader function

This is called within publishExternalAPI and bootstrap to create moduleInstance, like what needs to be returned when module is created and called. I have placed my comments directly in the source code for better understanding. Refer image below for more details on <strong>setupModuleLoader</strong>

<strong><a href="https://techanand.files.wordpress.com/2015/09/angularmodule.jpg" target="_blank"><img class="aligncenter wp-image-524 size-full" src="https://techanand.files.wordpress.com/2015/09/angularmodule.jpg" alt="SetupModuleLoad" width="920" height="1280" /></a></strong>

In short, setupModuleLoader will add  module to <strong>angular.module.modules </strong>object with moduleInstance contaning controller, filter, provider, factory, value, constant, config run, <strong>_invokeQueues and _runBlocks</strong> these 2 queues get filled when invoke function is called on any of the above functions are called on module, refer image for better understanding.

<strong>publishExternalAPI: </strong>This is the most interesting and one of the core modules that drives AngularJs. I'm explaining all the important points right beside code for easier understanding. Enlarge picture for more information<a href="https://techanand.files.wordpress.com/2015/09/externalapi_1.jpg" target="_blank"><img class="aligncenter wp-image-532 size-full" src="https://techanand.files.wordpress.com/2015/09/externalapi_1.jpg" alt="Publish External API" width="920" height="1615" /></a>

Till now publishing methods on angular to external world is done and there are two modules added to angular.module.modules section
<ol>
  <li>ngLocale</li>
  <li>ng - This module has configFn where all the setup related to inbuild services &amp; directives is there.</li>
</ol>
<strong>angularInit(document, bootstrap):</strong> angularInit is the place where bootstrapping is done, This is where module loading and Dependency Injection starts. After some initial startup angularInit finally calls <strong>bootstrap</strong> function on the element.

<strong>Bootstrap: </strong>After some initial setup bootstrap calls <strong>doBootStrap</strong> function which finally returns our eagerly waiting <strong>$injector </strong>on successful loading of modules. Enlarge picture for more details on what doBootstrap does. <a href="https://techanand.files.wordpress.com/2015/09/dobootstrap.jpg" target="_blank"><img class="aligncenter wp-image-533 size-full" src="https://techanand.files.wordpress.com/2015/09/dobootstrap.jpg" alt="Do Bootstrap" width="920" height="359" /></a>

Bootstrap calls createInjector method with list of modules that needs to be loaded. This includes ng module as well, what does createInjector method with the array of modules given to it ?

createInjector - This is where actually modules are loaded, before loading modules there is another setup createInjector does for us. It creates 2 cache objects for us
<ol>
  <li>providerCache - contains 2 objects
<ul>
  <li>$provider - with six methods on it provider, value, constant, service, factory and decorator.</li>
  <li>$injector</li>
</ul>
</li>
  <li>instanceCache - contains $injector method on it and this injector will be returned by createInjector method.</li>
</ol>
Let's see what exactly code does in createInjector.<a href="https://techanand.files.wordpress.com/2015/09/createinjector.jpg"><img class="aligncenter size-full wp-image-535" src="https://techanand.files.wordpress.com/2015/09/createinjector.jpg" alt="Create Injector" width="920" height="444" /></a>I'm not going to discuss in detail about what createInternalInjector does . I have already covered that in detail in my <a href="https://techanand.wordpress.com/2015/09/01/angularjs-notes-understand-di-injector/" target="_blank">previous post</a>. In short createInternalInjector returns a object which contains five methods on it
<ol>
  <li>invoke - invokes original method by calling javascript's apply on it</li>
  <li>instantiate - creates new service object.</li>
  <li>getService - fetches the service from cache</li>
  <li>annotate - process the input function and returns array of dependencies that need to be injected</li>
  <li>has - checks whether the service present or not in cache.</li>
</ol>
so only part left is <strong>loadModules, </strong>let's explore it. click on image to open in new tab to read comments beside code for more information.

<a href="https://techanand.files.wordpress.com/2015/09/loadmodules.jpg" target="_blank"><img class="aligncenter wp-image-536 size-full" src="https://techanand.files.wordpress.com/2015/09/loadmodules.jpg" alt="loadModules" width="920" height="642" /></a>

This is how modules are loaded into AngularJs Application. This is a very big post and might be confusing as well because of not using proper english. Share your questions via comments and I would be happy to help