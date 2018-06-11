---
layout: post
title: 'AngularJs: Revisiting createInjector'
date: 2015-09-05 23:32:28.000000000 +05:30
categories:
- AngularJs
tags:
- "$injector in detail"
- "$injector.annotate"
- "$injector.get"
- "$injector.invoke"
- angularjs
- angularjs $injector
- how DI is implemented in Angularjs
- injector
permalink: /angularjs/create-injector
---

In the previous posts we have seen how DI is achieved using $provider and $injector. In this post we go further details of how exactly dependencies are injected into angular. It all starts when module gets loaded. It calls createInjector method with parameter modules to load.

createInjector(modulestoLoad) returns an object called $injector with following methods instantiate, get, has, invoke and annotate. we have gone through details in <a href="https://techanand.wordpress.com/2015/09/01/angularjs-notes-understand-di-injector/">previous post</a>. Let's see what exactly each method does in real.
<ol>
	<li>Annotate: Angular must know which dependencies needs to be loaded, annotate will take care of this. It will return an array of dependencies that needs to be injected. Refer below image for more details.<a href="https://techanand.files.wordpress.com/2015/09/annotate.jpg" target="_blank"><img class="aligncenter wp-image-497 size-full" src="https://techanand.files.wordpress.com/2015/09/annotate.jpg" alt="Annotate implemenation" width="915" height="550" /></a></li>
	<li><strong>Invoke</strong>: will call actual implementation of the method by calling javascript's apply() method by getting all the required information<a href="https://techanand.files.wordpress.com/2015/09/invoke.jpg" target="_blank"><img class="aligncenter wp-image-498 size-full" src="https://techanand.files.wordpress.com/2015/09/invoke.jpg" alt="invoke implementation" width="923" height="672" /></a></li>
	<li><strong>getService</strong>: Based on the string it got, it tries to fetch the service from cache, I will talk about cache in next post. If it finds it in cache, it returns the service else instatiate the serivce using factory method, adds it to the cache and returns the service.<a href="https://techanand.files.wordpress.com/2015/09/getservice.jpg" target="_blank"><img class="aligncenter wp-image-499 size-full" src="https://techanand.files.wordpress.com/2015/09/getservice.jpg" alt="getservice implementation" width="864" height="370" /></a></li>
	<li><strong>Instantiate</strong>: It will create a new constructor function for the service and returns the newly created instantiated object.<a href="https://techanand.files.wordpress.com/2015/09/instantiate.jpg" target="_blank"><img class="aligncenter wp-image-500 size-full" src="https://techanand.files.wordpress.com/2015/09/instantiate.jpg" alt="instantiate" width="949" height="330" /></a></li>
</ol>