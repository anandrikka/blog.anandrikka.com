---
title: AngularJs Double Injectors !!
created: 2015-09-06 00:05
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_34
---
When createInjector is called to load modules, there are two injectors created they are providerInjector & instanceInjector, createInjector will return instanceInjector method. Lets look at the implementation![injectors](https://techanand.files.wordpress.com/2015/09/injectors.jpg)Two parameters are passed into createInternalInjector method cache and factory function. Cache is used for lookup and factory function is used to instantiate service when not found in cache. **InstanceInjector**: It stores the list of instantiated services, whereas cacheInjector stores the list of uninstantiated services. When createInternalInjector is called the second parameter passed is a factory function. It will try to get the service by appending 'provider' suffix and then invokes the $get function on provider and returns the result. **providerInjector**: cache for providerInjector is initialized with one service $provider. It is through this service that all other services are registered. Details of provider implementation are present [here](https://techanand.wordpress.com/2015/09/02/angularjs-provider/). Now that we understood how createInjector will resolve dependencies,. Let's see how it loads modules in the next post.