---
title: How to Install and configure AngularJs in eclipse
created: 2014-03-09 01:17
status: published
cover: ../../assets/covers//angular1.png
category: "Angular"
tags: ["angular", "angular in eclipse"]
identifier: "post_4"
---
# How to Install and configure AngularJs in eclipse

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

9\. Download AngularJs JavaScript file from official [website](http://angularjs.org/) and copy js file to the folder that mentioned in 7. 10\. Create a new html file and copy the following code snippet and run the file on local server. If everything went correctly whatever you type in the text box will appear as heading dynamically. [code language="html"] <html> <head> <script src="angular.js"></script> </head> <body> <div ng-app> <input type="text" ng-model="data.message" /> <h1>{{ data.message }}</h1> </div> </body> </html> [/code]

## Comments

**[Glenn Picher](#14 "2014-09-05 20:55:30"):** Unfortunately I've had little luck installing AngularJS Eclipse 0.5 on several machines with the latest Luna or Mars release of Eclipse. There is now, more recently than this blog entry, an Eclipse plugin update site for this plugin. But it does not successfully display help for directives. It seems to boil down to a version mismatch in expectations for org.mozilla.javascript, and I can't find any update sites to address this. The Error Log console says... org.osgi.framework.BundleException: Could not resolve module: tern.eclipse.ide.server.rhino.core [855] Unresolved requirement: Require-Bundle: tern.server.rhino; bundle-version="0.2.0" -> Bundle-SymbolicName: tern.server.rhino; bundle-version="0.5.0.201409012129" tern.server.rhino [860] Unresolved requirement: Import-Package: org.mozilla.javascript; bundle-version="1.7.4" at org.eclipse.osgi.container.Module.start(Module.java:434) at org.eclipse.osgi.container.ModuleContainer$ContainerStartLevel.incStartLevel(ModuleContainer.java:1582) at org.eclipse.osgi.container.ModuleContainer$ContainerStartLevel.incStartLevel(ModuleContainer.java:1561) at org.eclipse.osgi.container.ModuleContainer$ContainerStartLevel.doContainerStartLevel(ModuleContainer.java:1533) at org.eclipse.osgi.container.ModuleContainer$ContainerStartLevel.dispatchEvent(ModuleContainer.java:1476) at org.eclipse.osgi.container.ModuleContainer$ContainerStartLevel.dispatchEvent(ModuleContainer.java:1) at org.eclipse.osgi.framework.eventmgr.EventManager.dispatchEvent(EventManager.java:230) at org.eclipse.osgi.framework.eventmgr.EventManager$EventThread.run(EventManager.java:340)﻿

**[rachita baderai](#22 "2014-11-06 15:01:56"):** i have problem in first step .it is unable to download the angular-js from that link..and after it will ask for a repository name..what is the solution for this plz help me out for this problem?

**[VIKAS BANSAL](#51 "2016-02-22 21:18:59"):** how to run it on local host?

**[Ashish Ranjan](#81 "2016-06-25 02:22:47"):** NO static page doesnot run in localhost ......

**[anand reddy rikka](#122 "2017-02-07 00:28:48"):** Hi Vikash, AngularJs doesn't on Java. Project is served as static files from WEB-INF/webapp folder if you are using with java application. Data is served through restful webservices. Coming to this post it's very old and may not be relevant with v2 available in the market. There are lot of IDE's available in market right now with lot of plugin for angularJs. Try Microsoft Visual Code, its very nice !!

**[Vikash](#121 "2017-02-06 15:40:34"):** what is version requrement create angularjs mvc project with java . like eclips,html,angularjs,javascript et

**[anand reddy rikka](#55 "2016-02-28 18:05:39"):** Once you configured it. You can create a static web project to run it on local host.

**[Tasmeen](#61 "2016-03-31 22:14:06"):** http://oss.opensagres.fr/angularjs-eclipse/1.1.0/

