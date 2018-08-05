---
title: AngularJs Copying JSON objects
created: 2015-06-18 00:46
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_21
---
We all might be facing issues while making a copy of json object in angularjs. Mostly the copied object also changes when the original object is changed, this is because original & the copied both point to the same reference. There are different ways to overcome the issue, I'm using serialize and de-serialize of json object which will remove the hash reference. **var jsonString = angular.toJson(sourceObject**) \- returns the string format of json object **var jsonObj = angualr.fromJson(jsonString)** \- returns json object from json string This way we can avoid copying of objects by reference.