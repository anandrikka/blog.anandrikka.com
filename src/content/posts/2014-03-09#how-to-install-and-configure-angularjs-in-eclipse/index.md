---
title: How to Install and configure AngularJs in eclipse
date: 2014-03-09 01:17
categories: [AngularJs]
tags: [angular, AngularJs, angularjs, eclipse angularjs]
---

AngularJs is a JavaScript framework  developed and maintained by Google. It's main goal is to develop web based applications with Model-View-Controller capability. JetBrains developed an IDE based on open source framework Intellij Idea called <a title="WebStrom" href="http://www.jetbrains.com/webstorm/whatsnew/" target="_blank">WebStrom </a> which is a perfect IDE to work with AngularJs. Still I love to work on eclipse, here's how we can do it....

This plugin is developed based on powerful JavaScript inference engine called "tern.js" For AngularJs to work in eclipse we need to install "node.js" We can install it by <a title="Clicking here" href="http://nodejs.org/" target="_blank">clicking here</a>. After installation make sure we contain the installation path in class path.

AngularJs doesn't have a plugin which we can use directly, but I have found a snapshot by a person called "Angelo" where the project is build in Jenkins at this <a title="link" href="https://opensagres.ci.cloudbees.com/job/angularjs-eclipse/" target="_blank">link</a>.

Steps to Follow:

1. Get the most latest version of eclipse By the time I have created the post latest version  is Kepler. Go to help - install new software - and install the snapshot provided @ <a title="http://oss.opensagres.fr/angularjs-eclipse/1.0.0-SNAPSHOT/" href="http://oss.opensagres.fr/angularjs-eclipse/1.0.0-SNAPSHOT/" target="_blank">http://oss.opensagres.fr/angularjs-eclipse/1.0.0-SNAPSHOT</a>/<span style="color:#ff6600;"> Install only the marked items</span>
<p style="text-align:center;"><a href="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_1.png"><img class="aligncenter  wp-image-76" alt="how-to-install-and-configure-angularjs-in-eclipse_1" src="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_1.png" width="570" height="300" /></a></p>
2. Create a dynamic web project and make sure that all the html pages run smoothly on local server like tomcat, JBoss or glass fish.
3. Now convert created project to AngularJs project by Right Click on the project - Configure - Convert to AngularJs Project
<p style="text-align:center;"><a href="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_21.jpg"><img class="aligncenter  wp-image-82" alt="how-to-install-and-configure-angularjs-in-eclipse_2" src="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_21.jpg" width="570" height="300" /></a></p>
4. Open eclipse - window - preferences - tern - configure as mentioned in the below image
<p style="text-align:center;"><a href="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_3.jpg"><img class="aligncenter  wp-image-83" alt="how-to-install-and-configure-angularjs-in-eclipse_3" src="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_3.jpg" width="570" height="300" /></a></p>
5. Right Click on  project - properties - Tern - Plugins - Select "angular"
<p style="text-align:center;"><a href="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_4.png"><img class="aligncenter  wp-image-85" alt="how-to-install-and-configure-angularjs-in-eclipse_4" src="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_4.png" width="570" height="300" /></a></p>
<p style="text-align:left;"><!--more--></p>
6. Follow the same steps in the above point and now select Type Definitions - browser
<p style="text-align:center;"><a href="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_5.png"><img class="aligncenter  wp-image-86" alt="how-to-install-and-configure-angularjs-in-eclipse_5" src="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_5.png" width="570" height="300" /></a></p>
7. Now we must give path for all the script files that we are going to write. For this right click on project - properties - tern - Script Paths. Click on Add Folder button and select a folder under Web Content where all the JavaScript files will be available.
8. To disable warnings that will generate while coding in AngularJs.
<p style="text-align:center;"><a href="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_6.png"><img class="aligncenter  wp-image-88" alt="how-to-install-and-configure-angularjs-in-eclipse_6" src="http://techanand.files.wordpress.com/2014/03/how-to-install-and-configure-angularjs-in-eclipse_6.png" width="570" height="300" /></a></p>
9. Download AngularJs JavaScript file from official <a title="website" href="http://angularjs.org/" target="_blank">website</a> and copy js file to the folder that mentioned in 7.
10. Create a new html file and copy the following code snippet and run the file on local server. If everything went correctly whatever you type in the text box will appear as heading dynamically.

[code language="html"]
&lt;html&gt;
  &lt;head&gt;
    &lt;script src=&quot;angular.js&quot;&gt;&lt;/script&gt;
   &lt;/head&gt;
  &lt;body&gt;
  	&lt;div ng-app&gt;
  	&lt;input type=&quot;text&quot; ng-model=&quot;data.message&quot; /&gt;
 	&lt;h1&gt;{{ data.message }}&lt;/h1&gt;
    &lt;/div&gt;
  &lt;/body&gt;
&lt;/html&gt;
[/code]
