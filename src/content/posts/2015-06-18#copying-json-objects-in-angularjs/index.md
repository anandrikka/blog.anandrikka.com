---
layout: post
title: Copying JSON objects
date: 2015-06-18 00:46
categories: [AngularJs]
tags: [angular, AngularJs, angularjs, copy without reference, copying in angularjs, copying objects, Javascript]
permalink: /angularjs/copy-json-objects
---

We all might be facing issues while making a copy of json object in angularjs. Mostly the copied object also changes when the original object is changed, this is because original &amp; the copied both point to the same reference. There are different ways to overcome the issue, I'm using serialize and de-serialize of json object which will remove the hash reference.

<span style="color:#0000ff;"><strong>var jsonString = angular.toJson(sourceObject</strong>)</span> - returns the string format of json object

<strong><span style="color:#0000ff;">var jsonObj = angualr.fromJson(jsonString)</span></strong> - returns json object from json string

This way we can avoid copying of objects by reference.
