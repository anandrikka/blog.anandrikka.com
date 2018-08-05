---
title: AngularJs $provider
created: 2015/09/02 02:17
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_32
---
In the [previous post](https://techanand.wordpress.com/2015/09/01/angularjs-notes-understand-di-injector/) we have seen how $injector is used for Dependency Injection. In this post we will see the role of $provider in DI. Basically $provider is a service, which is used to register components with $injector. How services are created in AngularJs ? 

  1. An Angular service is a singleton object created by a service factory.
  2. These service factories are functions which, in turn, are created by a service provider.
  3. The service providers are constructor functions. When instantiated they must contain a property called `$get`, which holds the service factory function.
Don't get confused with the terminology, I' have copy pasted the definition from angular docs. Coming to explanation looking at **createInjector()** method in angular.js will give us better understanding of what is said above, so let's look at what was there in createInjector() method. ![$provider_01](https://techanand.files.wordpress.com/2015/09/provider_011.jpg) Angular provides 5 different ways to create services and register them with injector. They are provider, factory, service, constant and value, Of  these provider is the only way of creating service rest of them internally calls provider to create a service, please refer above image for more details. Definitions to each of them is self explanatory from above image. 

  1. $provider.provider - registers a service provider with the $injector
  2. $provide.constant - registers a value/object that can be accessed by providers and services.
  3. $provide.value- registers a value/object that can only be accessed by services, not providers.
  4. $provide.factory - registers a service factory function, that will be wrapped in a service provider object, whose '$get' property will contain the given factory function.
  5. $provide.service - registers a constructor function, 'class' that will be wrapped in a service provider object, whose '$get' property will instantiate a new object using the given constructor function.
Next what is the differences b/w these services ? Of the five constant and value are the simple, using 'value' and 'constant' we can register a constant which can be DI across application. The main difference is 'constant' can be used in the configuration stage of the application. A part from 'value' & 'constant', 'provider', 'factory', 'service' they do pretty much the same job to register service with the injector, However 'provider' can be used in configuration stage, whereas 'factory' & 'service' are not. Why do we need these many services, Can't we go with provider ? Yes, we can simply use provider, However there would be lot of effort goes to create a provider even for a simple service, so it better to have multiple each doing specific task. Constant and value can be used to register constants. Provider can be used in the configuration phase. But it doesn’t provide an user friendly way of creating an service object, so use it only when something needs to injected in configuration stage. so we are left with service and factory which are widely used, there is no difference b/w them expect for the way they create service objects. Using any of them is fine and is completely dependent on user. Hope this post helps to understand what $provide will do and how it helps to register services with injector. Please let me know if there are any issues ** All the examples and information taken from angular.js