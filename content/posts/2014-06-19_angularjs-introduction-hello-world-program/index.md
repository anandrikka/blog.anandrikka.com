---
title: AngularJs Introduction & Hello World Program
created: 2014-06-19 22:55
status: published
cover: ../../assets/covers//angular1.png
category: "Angular"
tags: ["Angular"]
identifier: "post_5"
---
# AngularJs Introduction & Hello World Program

AngularJs is an open source framework maintained by Google. This is client side framework and was entirely developed in JavaScript. It comes with following features inbuilt data-binding, basic template directives, form validation, routing, deep linking, dependency injection, unit testing, end-to-end testing  and mock testing. **What you must know before jumping into AngularJs ?** We must have some !dea on below topics 

  1. Basic knowledge on HTML & CSS.
  2. Good Knowledge on JavaScript concepts like arrays, objects, functions and event listeners.
  3. What are Document Object Model’s (DOM) and how DOM’s are modified using JavaScript.
  4. Difference b/w JSON and JavaScript object.
**Important Features**

  1. MVC Architecture
  2. Declarative UI
  3. Data models are POJO
  4. New Directives for HTML
  5. Filters
  6. Less Code
  7. Service Providers
  8. Unit Testing
  9. Quality and Robustness
We have wonderful material that is required to learn AngularJs at their [website](https://docs.angularjs.org) AngularJs applications are [Single Page Applications](http://en.wikipedia.org/wiki/Single-page_application) which means all required information is loaded within a single page or dynamically loaded and will be added to parts of the page based on user actions. Most important thing is page will never ever be loaded in AngularJs Applications. Most important feature of AngularJs is two-way data binding which simply means view and model are binded in both the directions. If we change anything in **view** **model** gets updated similarly if anything changes in **model** **view** gets updated. As it contains only JavaScript files it is independent of IDE. You can write your logic even using a simple notepad, but it would be difficult to remember each and every dependency. JetBrains provide a provide IDE called WebStrom but it is a paid version alternatively we can use Eclipse IDE with some plugins installation. Please refer my post on [how to configure AngularJs in eclipse](http://techanand.wordpress.com/2014/03/09/how-to-install-and-configure-angularjs-in-eclipse/) for more information. In order to start our first application we need to download **angular.js** file. It is available at [angularjs.org](https://angularjs.org/). Download most stable version of angular.js Create a project folder and create another folder called **lib** in it. Now place downloaded angular.js script file in lib folder. Create a new html file and copy below code into it.

```html
  <html ng-app>
    <head>
      <title>Introduction</title>
      <script src="lib/angular.js"></script>
    </head>
    <body>
      <input type="text" ng-model="sampleSrc" placeholder="Enter a name here"/>
      <h2>{{sampleSrc}}</h2>
    </body>
  </html>
```

If everything goes fine whatever you type in input field will be coming in header. Don't worry about how it was done. For now you are ready with your setup for learning AngularJs. In the above example we have something called **ng-app** this directive tell the angular to be active in this area in our case it is full document. All the directives start with **ng- or data-ng-** whenever we see these type of directives or elements they belong to AngularJs. **Topics to know:** MVC Architecture, Declarative UI, Single Page Applications, JSON Objects, Document Object Model