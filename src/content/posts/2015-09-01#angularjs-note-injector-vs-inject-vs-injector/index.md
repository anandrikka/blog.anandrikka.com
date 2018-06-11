---
layout: post
title: $injector Vs $inject Vs Injector()
date: 2015-09-01 02:17
categories:
- AngularJs
- Tips
tips:
- $injector vs $inject
- angular inject
- angular injector
- AngularJs
- inject
- injector
- Tips
permalink: /angularjs/tips/injectors
---

Following are the key differences:

###injector: Used to invoke or get dependencies into variables

{% highlight javascript %}
  $injector.get('A')
   //gets the implementation of service called 'A' 

   $injector.invoke('A')
   //returns the value of implementation of service 'A'
{% endhighlight %}

###$inject: Used to inject dependencies into a function arguments

{% highlight javascript %}
  var test = function('A', 'B'){} 
  test.$inject = ['A', 'B']
  $injector.invoke(explicit)
{% endhighlight %}

###injector(): Used on document object which is mainly used to bring non-angular environment code into angular environment.

{% highlight javascript %}
  var $div = $('&lt;div ng-controller=&quot;MyCtrl&quot;&gt;{{content.label}}&lt;/div&gt;'); 
   $(document.body).append($div); 
   angular.element(document).injector().invoke(function($compile) { 
     var scope = angular.element($div).scope(); 
     $compile($div)(scope); 
   });
{% endhighlight %}

