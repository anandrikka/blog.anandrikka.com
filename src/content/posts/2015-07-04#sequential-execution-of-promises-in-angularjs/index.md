---
layout: post
title: Sequential execution of promises !!
date: 2015-07-04 02:16
categories: [AngularJs]
tags: [AngualrJs, AngularJs, chain promises, chain promises in angularjs, custom $q in angularjs, customised $q in angularjs, how $q works in angularjs, promises, promises in same order, promises one after another, sequence promises, sequence promises in angularjs, sequential execution of promises, sequential execution of promises in angularjs]
permalink: /angularjs/sequential-execution-of-promises
---

Promise is an asynchronous call. When <strong>$q.all </strong>called on array of promises, we can't guarantee that they execute in a sequence. However there will be situations where you would be forced to execute promises in a sequence. There are a lot of ways to do it, my first thought is <strong>chaining promises</strong> and is the only thought. I know how to chain promises &amp; implement them sequentially, but there are questions bugging me
<ol>
	<li>Am I need to repeat code each time when I need to implement promises in sequence ?</li>
	<li>What if the count of promises increases ?</li>
</ol>
I thought of writing a common logic where I give input as array of promises &amp; it would give me array of outputs, now the question is where to put it, when researched I came to know that we can implement our own logic/override existing logic for services provided by angularjs. So I though of putting it in $q.

Here is the logic, you can keep in decorators file of your project

{% highlight javascript %}
angular.module("myApp", [])
     .config(function ($provide) {
         $provide.decorator("$q", function ($delegate) {
             function seqAll(promises) {
                 //create a defer, which will return promise with setting resolve/reject
                 var deferred = $delegate.defer();
                 //create an array of results to store results of promises
                 var results = [];
                 var j = 0;
                 recursive(promises[j]);
                 //create a recursive function, which loops through all the promises one after the another
                 function recursive(promise) {
                     j++;
                     promise.then(function (data) {
                         // when success, push the data to results &amp; again go for next promise else set defer resovle to array of data collected
                         results.push(data);
                         if (j < promises.length) {
                             recursive(promises[j]);
                         } else {
                             deferred.resolve(results);
                         }
                     }, function (error) {
                         // If promise got failed reject it &amp; return from recursive loop of promises
                         deferred.reject('promises[' + (j - 1) + ']' + ' rejected with status: ' + error.status);
                         return;
                     });
                 }
                 return deferred.promise;
             }
         $delegate.seqAll = seqAll;
         return $delegate;
     });
 });
{% endhighlight %}

We can now call <strong>$q.seqAll([]) </strong>from our code which will execute promises sequentially. It is not always good to implement promises in sequence it might impact performance of the project. Hope this post helps
