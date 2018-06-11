---
layout: post
title: 'AngularJs: Loading modules'
date: 2015-09-06 00:40:04.000000000 +05:30
type: post
published: true
status: publish
categories:
- AngularJs
tags:
- angularjs
- angularjs run module
- load modules
- module loading in angularjs
permalink: /angularjs/loading-modules
---
Loading modules is the most important step. Let's see how it's done !!

{% highlight javascript %}
function loadModules(modulesToLoad){
    var runBlocks = [], moduleFn, invokeQueue, i, ii;
    forEach(modulesToLoad, function(module) {
      if (loadedModules.get(module)) return;
      loadedModules.put(module, true);

      try {
        if (isString(module)) {
          moduleFn = angularModule(module);
          runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);

          for(invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i &amp;amp;lt; ii; i++) {
            var invokeArgs = invokeQueue[i],
                provider = providerInjector.get(invokeArgs[0]);

            provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
          }
        } else if (isFunction(module)) {
            runBlocks.push(providerInjector.invoke(module));
        } else if (isArray(module)) {
            runBlocks.push(providerInjector.invoke(module));
        } else {
          assertArgFn(module, 'module');
        }
      } catch (e) {
        if (isArray(module)) {
          module = module[module.length - 1];
        }
        if (e.message &amp;amp;amp;&amp;amp;amp; e.stack &amp;amp;amp;&amp;amp;amp; e.stack.indexOf(e.message) == -1) {
          // Safari &amp;amp;amp; FF's stack traces don't contain error.message content
          // unlike those of Chrome and IE
          // So if stack doesn't contain message, we create a new string that contains both.
          // Since error.stack is read-only in Safari, I'm overriding e and not e.stack here.
          /* jshint -W022 */
          e = e.message + '\n' + e.stack;
        }
        throw $injectorMinErr('modulerr', &quot;Failed to instantiate module {0} due to:\n{1}&quot;,
                  module, e.stack || e.message || e);
      }
    });
    return runBlocks;
  }
{% endhighlight %}

runBlocks and invokeQueues are two important aspects in module loading.

A module in angular is setup as follows:

<p style="text-align:center;"><strong>angular.module(<span class="hljs-string">'myModule'</span>, [dependency]);</strong></p>

First we retrieve the module object using the <strong>angularModule</strong> function. When the module is setup two arrays are populated runBlocks and invokeQueues.

**runBlocks:** This is an array that contains list of run blocks <strong>angular.module('test', []).run </strong>which needs to be run immediately after modules loaded.

**invokeQueue:** These are populated with each service that is added to the module using the familiar <strong><code>angular.module('myModule').controller, </code><code>angular.module('myModule').directive</code></strong>

Each item in the queue is an array with three elements. The first is the provider that will invoke the service, the second is the method on the provider to use and the third element is an array of any arguments passed to the service.

Let's see example:

{% highlight javascript %}
angular.module('test', [])
    .controller('testController', function($scope) {
      console.log('setting up controller');
    });
{% endhighlight %}

When controller is setup like this invokeQueue for this controller looks like <strong>[<span class="hljs-string">'$controllerProvider'</span>, <span class="hljs-string">'register'</span>, [<span class="hljs-string">'test'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">($scope)</span> </span>{...}]] </strong>

$controllerProvider - built-in Angular provider that enables registering controllers.

<b>register - </b> This will add service to the list of available controllers. Note that nothing gets added to the injectors cache. This means controllers cannot be injected into a service. If you really needed to get access to a controller (you do when unit testing) you would inject the <code>$controller</code> provider and retreive the controller by calling <code>get(controllerName).</code>
