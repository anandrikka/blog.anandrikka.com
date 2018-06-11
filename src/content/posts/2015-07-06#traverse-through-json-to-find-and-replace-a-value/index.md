---
layout: post
title: Traverse through JSON to find and replace a value
date: 2015-07-06 23:52
categories: [AngularJs]
tags: [AngularJs, json traversing, traversing json, traversing json using javascript]
permalink: /angularjs/traverse-through-json-to-replace-value
---

This small code snippet helps you to traverse through JSON Object and replace a particular value.

{% highlight javascript %}
function findAndReplaceValueforKeyInJson(object, value, replacevalue, targetKey) {
        //key must not be null
        if (targetKey !== null && targetKey !== '') {
                //split the given key using '.' which will help us to traverse through JSON object
                var keys = targetKey.split('.');
                //loop through JSON Object
                for (var x in object) {
                        //check for key matches
                        if (keys.indexOf(x) !== -1) {
                        //check whether matched key-value is an object or not, if object again call the same function to repeat the process
                                if (typeof object[x] === typeof {}) {
                                        findAndReplaceValueforKeyInJson(object[x], value, replacevalue, targetKey);
                                }
                                // if not object replace with new value & come out of for loop
                                if (object[x] === value) {
                                        object[x] = replacevalue;
                                        break;
                                }
                        }
                }
        }
}
{% endhighlight %}

Hope this helps..
