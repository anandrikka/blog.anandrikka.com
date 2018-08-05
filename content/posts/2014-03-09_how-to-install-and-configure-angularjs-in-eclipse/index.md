---
title: How to Install and configure AngularJs in eclipse
created: 2014-03-09 01:17
status: published
cover: ../../assets/covers//angular1.png
category: "Angular"
tags: ["angular", "angular in eclipse"]
identifier: "post_4"
---
AngularJs is a JavaScript framework  developed and maintained by Google. It's main goal is to develop web based applications with Model-View-Controller capability. JetBrains developed an IDE based on open source framework Intellij Idea called [WebStrom ](http://www.jetbrains.com/webstorm/whatsnew/) which is a perfect IDE to work with AngularJs. Still I love to work on eclipse, here's how we can do it.... This plugin is developed based on powerful JavaScript inference engine called "tern.js" For AngularJs to work in eclipse we need to install "node.js" We can install it by [clicking here](http://nodejs.org/). After installation make sure we contain the installation path in class path. AngularJs doesn't have a plugin which we can use directly, but I have found a snapshot by a person called "Angelo" where the project is build in Jenkins at this [link](https://opensagres.ci.cloudbees.com/job/angularjs-eclipse/). Steps to Follow: 1\. Get the most latest version of eclipse By the time I have created the post latest version  is Kepler. Go to help - install new software - and install the snapshot provided @ [http://oss.opensagres.fr/angularjs-eclipse/1.0.0-SNAPSHOT](http://oss.opensagres.fr/angularjs-eclipse/1.0.0-SNAPSHOT/)/ Install only the marked items

![how-to-install-and-configure-angularjs-in-eclipse_1](http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_1.png)

2\. Create a dynamic web project and make sure that all the html pages run smoothly on local server like tomcat, JBoss or glass fish. 3\. Now convert created project to AngularJs project by Right Click on the project - Configure - Convert to AngularJs Project 

![how-to-install-and-configure-angularjs-in-eclipse_2](http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_21.jpg)

4\. Open eclipse - window - preferences - tern - configure as mentioned in the below image 

![how-to-install-and-configure-angularjs-in-eclipse_3](http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_3.jpg)

5\. Right Click on  project - properties - Tern - Plugins - Select "angular" 

![how-to-install-and-configure-angularjs-in-eclipse_4](http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_4.png)

6\. Follow the same steps in the above point and now select Type Definitions - browser 

![how-to-install-and-configure-angularjs-in-eclipse_5](http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_5.png)

7\. Now we must give path for all the script files that we are going to write. For this right click on project - properties - tern - Script Paths. Click on Add Folder button and select a folder under Web Content where all the JavaScript files will be available. 8\. To disable warnings that will generate while coding in AngularJs. 

![how-to-install-and-configure-angularjs-in-eclipse_6](http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_6.png)

9\. Download AngularJs JavaScript file from official [website](http://angularjs.org/) and copy js file to the folder that mentioned in 7. 10\. Create a new html file and copy the following code snippet and run the file on local server. If everything went correctly whatever you type in the text box will appear as heading dynamically.

```html
<html>
  <head>
    <script src="angular.js"></script> 
  </head>
  <body>
    <div ng-app>
      <input type="text" ng-model="data.message" /> 
      <h1>{{ data.message }}</h1>
    </div>
  </body>
</html>
```