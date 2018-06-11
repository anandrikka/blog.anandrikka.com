---
layout: post
title: Start with Ionic
date: 2016-03-20 23:19:29.000000000 +05:30
type: post
published: true
status: publish
categories:
- Mobile Apps
tags:
- apps
- build apps using iconic
- iconic
- iconic installation
- iconic introduction
- install iconic
- mobile
- setup iconic
permalink: mobile-apps/start-ionic
---

Ionic is a open source framework which is used to build Android and IOS apps  with "HTML 5, CSS and JavaScript". Ionic helps you to write applications which can be used either in Android/IOS. Ionic along with "Apache cordova" provides support to build hybrid apps. Ionic is completely built based on "AngularJs". So If you know angular, you know Ionic

__How to start ?__

* Install Nodejs (node pakage manager) and GitHub (source control)
* Install Java, Android sdk and apache-ant and configure your environmental variables
`%PATH%;%JAVA_HOME%\bin;C:\Users\nandu\AppData\Roaming\npm;C:\apache-ant-1.9.6\bin;C:\Users\nandu\AppData\Local\Android\sdk;C:\Users\nandu\AppData\Local\Android\sdk\build-tools\23.0.1`
*  Install Cordova, unorm, cordova-common, cordova-registry-mapper ```npm install -g cordova unorm cordova-common cordova-registry-mapper```
* Install ionic `npm install -g ionic`
* Create new project on desktop `ionic start <<project-name>> blank`
* Add platform you app wants to run on like Android or OS. I'm showing Android here `ionic platform add android`
* Build and emulate your project. I'm considering only Android. In order "emulate" command to you need to install android sdk in our system. `ionic build android` `ionic emulate android`
* Android emulate is very slow and will consume lot of time. So install "Genymotion" . It provides an actual android device, as if you connected one through usb. In order to use the device created in Genymotion, start the device and run the below command from application page
`ionic run android`
* Ionic creates a whole project for you with the structure of real-time application. "www" is the folder where you need to write everything regarding your application like css, js, html etc…
* In order to deploy application into virtual machine, start the device from Genymotion and run "ionic run android". If you want to test the changes in browser run "ionic serve". This will open your application on browser.
* Once your application is ready run following commands from project folder to create and sign apk. 
  - `cordova build --release android` <br/>
  - `keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000` <br/>
  - `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name` <br/>
  - `zipalign -v 4 android-release-unsigned.apk <<app-name>>.apk`

Oh!!! you are ready to go ?? Go and install the application in your android device and test it

I have came up with this steps after referring to <a href="http://ionicframework.com/docs/guide/installation.html" target="_blank">Ionic website</a>. Refer to Ionic website for detailed information.
