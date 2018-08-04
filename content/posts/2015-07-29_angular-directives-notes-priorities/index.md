---
title: Angular Directives Notes - Priorities
created: 2015-07-29 23:31
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_29
---
# Angular Directives Notes - Priorities

compile and prelink functions of directives with lower priority are run last, whereas postlink functions of directives with lower priority are run first. Lower the number lower the priority. Simple Example [code language="html"] <!DOCTYPE html> <html> <head lang="en"> <meta charset="UTF-8"> <title></title> <script src="lib/angular.js"></script> <script src="js/directives_u.js"></script> <script> angular.module('u_directives').directive('bbDir1', function(){ return{ priority:02, compile:function(){ console.log('compile-dir1'); return { pre:function(){ console.log('pre-dir1'); }, post:function(){ console.log('post-dir1'); } } } }}).directive('bbDir2', function(){ return{ priority:01, compile:function(){ console.log('compile-dir2'); return { pre:function(){ console.log('pre-dir2'); }, post:function(){ console.log('post-dir2'); } } } }}) </script> </head> <body ng-app="u_directives"> <div bb-dir1 bb-dir2></div> </body> </html> [/code]

## Comments

**[dineshramitc](#39 "2015-08-13 09:01:43"):** Reblogged this on [Dinesh Ram Kali.](https://dineshramitc.wordpress.com/2015/08/13/angular-directives-notes-priorities/).

