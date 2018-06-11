---
layout: post
title: 'AngularJs: Double Injectors !!'
date: 2015-09-06 00:05:57.000000000 +05:30
categories:
- AngularJs
tags:
- angularjs
- createInjector
- injector
permalink: /angularjs/double-injectors
---

When createInjector is called to load modules, there are two injectors created they are providerInjector &amp; instanceInjector, createInjector will return instanceInjector method. Lets look at the implementation<a href="https://techanand.files.wordpress.com/2015/09/injectors.jpg"><img class="aligncenter size-full wp-image-505" src="https://techanand.files.wordpress.com/2015/09/injectors.jpg" alt="injectors" width="920" height="404" /></a>Two parameters are passed into createInternalInjector method cache and factory function. Cache is used for lookup and factory function is used to instantiate service when not found in cache.

<strong>InstanceInjector</strong>: It stores the list of instantiated services, whereas cacheInjector stores the list of uninstantiated services. When createInternalInjector is called the second parameter passed is a factory function. It will try to get the service by appending 'provider' suffix and then invokes the $get function on provider and returns the result.

<strong>providerInjector</strong>: cache for providerInjector is initialized with one service $provider. It is through this service that all other services are registered. Details of provider implementation are present <a href="https://techanand.wordpress.com/2015/09/02/angularjs-provider/">here</a>.

Now that we understood how createInjector will resolve dependencies,. Let's see how it loads modules in the next post.
