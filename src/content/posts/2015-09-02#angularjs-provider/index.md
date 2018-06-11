---
layout: post
title: 'AngularJs: $provider'
date: 2015-09-02 02:17:04.000000000 +05:30
categories:
- AngularJs
tags:
- angularjs proivers
- angularjs services
- difference between provider
- different types of services in angularjs
- factory and service in angularjs
- factory in angularjs
- provider
- provider in angularjs
- providers
- service in angularjs
- services
permalink: /angularjs/provider
---
In the <a href="https://techanand.wordpress.com/2015/09/01/angularjs-notes-understand-di-injector/" target="_blank">previous post</a> we have seen how $injector is used for Dependency Injection. In this post we will see the role of $provider in DI.

Basically $provider is a service, which is used to register components with $injector.

How services are created in AngularJs ?
<ol>
	<li>An Angular service is a singleton object created by a service factory.</li>
	<li>These service factories are functions which, in turn, are created by a service provider.</li>
	<li>The service providers are constructor functions. When instantiated they must contain a property called `$get`, which holds the service factory function.</li>
</ol>
Don't get confused with the terminology, I' have copy pasted the definition from angular docs. Coming to explanation looking at <strong>createInjector() </strong>method in angular.js will give us better understanding of what is said above, so let's look at what was there in createInjector() method.

<a href="https://techanand.files.wordpress.com/2015/09/provider_011.jpg"><img class="aligncenter size-full wp-image-471" src="https://techanand.files.wordpress.com/2015/09/provider_011.jpg" alt="$provider_01" width="833" height="765" /></a>

Angular provides 5 different ways to create services and register them with injector. They are

provider, factory, service, constant and value, Of  these provider is the only way of creating service rest of them internally calls provider to create a service, please refer above image for more details.

Definitions to each of them is self explanatory from above image.
<ol>
	<li>$provider.provider - registers a service provider with the $injector</li>
	<li>$provide.constant - registers a value/object that can be accessed by providers and services.</li>
	<li>$provide.value- registers a value/object that can only be accessed by services, not providers.</li>
	<li>$provide.factory - registers a service factory function, that will be wrapped in a service provider object, whose '$get' property will contain the given factory function.</li>
	<li>$provide.service - registers a constructor function, 'class' that will be wrapped in a service provider object, whose '$get' property will instantiate a new object using the given constructor function.</li>
</ol>
Next what is the differences b/w these services ?

Of the five constant and value are the simple, using 'value' and 'constant' we can register a constant which can be DI across application. The main difference is 'constant' can be used in the configuration stage of the application. A part from 'value' &amp; 'constant', 'provider', 'factory', 'service' they do pretty much the same job to register service with the injector, However 'provider' can be used in configuration stage, whereas 'factory' &amp; 'service' are not.

Why do we need these many services, Can't we go with provider ?

Yes, we can simply use provider, However there would be lot of effort goes to create a provider even for a simple service, so it better to have multiple each doing specific task. Constant and value can be used to register constants. Provider can be used in the configuration phase. But it doesn’t provide an user friendly way of creating an service object, so use it only when something needs to injected in configuration stage. so we are left with service and factory which are widely used, there is no difference b/w them expect for the way they create service objects. Using any of them is fine and is completely dependent on user.

Hope this post helps to understand what $provide will do and how it helps to register services with injector. Please let me know if there are any issues

<span style="color:#ff0000;">** All the examples and information taken from angular.js</span>
