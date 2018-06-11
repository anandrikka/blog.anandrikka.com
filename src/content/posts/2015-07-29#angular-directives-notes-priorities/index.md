---
layout: post
title: Angular Directives Notes - Priorities
date: 2015-07-29 23:31
categories: [AngularJs]
tags: [angular directives, AngularJs, angularjs directives priority, angularjs priority, compile, directive priorities, directives priority execution, prelink postlink execution based on priority]
permalink: /angularjs/directive-notes-priorities
---
compile and prelink functions of directives with lower priority are run last, whereas postlink functions of directives with lower priority are run first. Lower the number lower the priority.

Simple Example

{% highlight html %}
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <script src="lib/angular.js"></script>
    <script src="js/directives_u.js"></script>
    <script>
        angular.module('u_directives').directive('bbDir1', function(){
            return{
                priority:02,
                compile:function(){
                    console.log('compile-dir1');
                    return {
                        pre:function(){
                            console.log('pre-dir1');
                        },
                        post:function(){
                            console.log('post-dir1');
                        }
                    }
                }
            }}).directive('bbDir2', function(){
            return{
                priority:01,
                compile:function(){
                    console.log('compile-dir2');
                    return {
                        pre:function(){
                            console.log('pre-dir2');
                        },
                        post:function(){
                            console.log('post-dir2');
                        }
                    }
                }
            }})
    </script>
</head>
<body ng-app="u_directives">
    <div bb-dir1 bb-dir2></div>
</body>
</html>
{% endhighlight %}
