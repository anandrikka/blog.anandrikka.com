---
title: AngularJs Loading modules
created: 2015-09-06 00:40
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_35
---
Loading modules is the most important step. Let's see how it's done !! 

```javascript
function loadModules(modulesToLoad) {
  var runBlocks = [],
    moduleFn, invokeQueue, i, ii;
  forEach(modulesToLoad, function(module) {
    if (loadedModules.get(module)) return;
    loadedModules.put(module, true);
    try {
      if (isString(module)) {
        moduleFn = angularModule(module);
        runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(
          moduleFn._runBlocks);
        for (invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i &
          amp; lt; ii; i++) {
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
      if (e.message & amp; amp; & amp; amp; e.stack & amp; amp; & amp; amp; e
        .stack.indexOf(e.message) == -1) {
        // Safari &amp;amp; FF's stack traces don't contain error.message content 
        // unlike those of Chrome and IE 
        // So if stack doesn't contain message, we create a new string that contains both. 
        // Since error.stack is read-only in Safari, I'm overriding e and not e.stack here. /* jshint -W022 */ 
        e = e.message + '\n' + e.stack;
      }
      throw $injectorMinErr('modulerr',
        "Failed to instantiate module {0} due to:\n{1}", module, e.stack ||
        e.message || e);
    }
  });
  return runBlocks;
}
```

runBlocks and invokeQueues are two important aspects in module loading. A module in angular is setup as follows:

**angular.module('myModule', [dependency]);**

First we retrieve the module object using the **angularModule** function. When the module is setup two arrays are populated runBlocks and invokeQueues. **runBlocks** This is an array that contains list of run blocks **angular.module('test', []).run** which needs to be run immediately after modules loaded. **invokeQueue** These are populated with each service that is added to the module using the familiar **`angular.module('myModule').controller, ``angular.module('myModule').directive`** Each item in the queue is an array with three elements. The first is the provider that will invoke the service, the second is the method on the provider to use and the third element is an array of any arguments passed to the service. Let's see example:

```javascript
angular.module('test', []).controller('testController', function($scope) {
  console.log('setting up controller');
});
```

When controller is setup like this invokeQueue for this controller looks like __['$controllerProvider', 'register', ['test', function($scope) {...}]]__ __$controllerProvider -__ built-in Angular provider that enables registering controllers. **register -** This will add service to the list of available controllers. Note that nothing gets added to the injectors cache. This means controllers cannot be injected into a service. If you really needed to get access to a controller (you do when unit testing) you would inject the `$controller` provider and retreive the controller by calling `get(controllerName).`