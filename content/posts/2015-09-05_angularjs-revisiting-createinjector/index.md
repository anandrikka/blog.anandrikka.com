---
title: AngularJs Revisiting createInjector
created: 2015-09-05 23:32
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_33
---


# AngularJs: Revisiting createInjector

In the previous posts we have seen how DI is achieved using $provider and $injector. In this post we go further details of how exactly dependencies are injected into angular. It all starts when module gets loaded. It calls createInjector method with parameter modules to load. createInjector(modulestoLoad) returns an object called $injector with following methods instantiate, get, has, invoke and annotate. we have gone through details in [previous post](https://techanand.wordpress.com/2015/09/01/angularjs-notes-understand-di-injector/). Let's see what exactly each method does in real. 

  1. Annotate: Angular must know which dependencies needs to be loaded, annotate will take care of this. It will return an array of dependencies that needs to be injected. Refer below image for more details.![Annotate implemenation](https://techanand.files.wordpress.com/2015/09/annotate.jpg)
  2. **Invoke**: will call actual implementation of the method by calling javascript's apply() method by getting all the required information![invoke implementation](https://techanand.files.wordpress.com/2015/09/invoke.jpg)
  3. **getService**: Based on the string it got, it tries to fetch the service from cache, I will talk about cache in next post. If it finds it in cache, it returns the service else instatiate the serivce using factory method, adds it to the cache and returns the service.![getservice implementation](https://techanand.files.wordpress.com/2015/09/getservice.jpg)
  4. **Instantiate**: It will create a new constructor function for the service and returns the newly created instantiated object.![instantiate](https://techanand.files.wordpress.com/2015/09/instantiate.jpg)