---
title: Start with Ionic
created: 2016-03-20 23:19
cover: ../../assets/covers//android.png
status: published
category: Mobile
tags: ["Ionic", "Android"]
identifier: post_37
---

# Start with Ionic

Ionic is a open source framework which is used to build Android and IOS apps  with "HTML 5, CSS & JavaScript". Ionic helps you to write applications which can be used either in Android/IOS. Ionic along with "Apache cordova" provides support to build hybrid apps. Ionic is completely built based on "AngularJs". So If you know angular, you know Ionic _**How to start ?**_ 1\. Install Nodejs (node pakage manager) & GitHub (source control) 2\. Install Java, Android sdk & apache-ant & configure your environmental variables 

**%PATH%;%JAVA_HOME%\bin;C:\Users\nandu\AppData\Roaming\npm;C:\apache-ant-1.9.6\bin;C:\Users\nandu\AppData\Local\Android\sdk;C:\Users\nandu\AppData\Local\Android\sdk\build-tools\23.0.1**

3\. Install Cordova, unorm, cordova-common, cordova-registry-mapper 

**npm install -g cordova** ** npm install -g unorm** ** npm install -g cordova-common** ** npm install -g cordova-registry-mapper**

4\. Install ionic 

**npm install -g ionic**

5\. Create new project on desktop 

**ionic start <<project-name>> blank**

6\. Add platform you app wants to run on like Android or OS. I'm showing Android here 

**ionic platform add android**

7\. Build and emulate your project. I'm considering only Android. In order "emulate" command to you need to install android sdk in our system. 

**ionic build android** ** ionic emulate android**

8\. Android emulate is very slow and will consume lot of time. So install "Genymotion" . It provides an actual android device, as if you connected one through usb. In order to use the device created in Genymotion, start the device and run the below command from application page 

**ionic run android**

9\. Ionic creates a whole project for you with the structure of real-time application. "www" is the folder where you need to write everything regarding your application like css, js, html etc… 10\. In order to deploy application into virtual machine, start the device from Genymotion and run "ionic run android". If you want to test the changes in browser run "ionic serve". This will open your application on browser. 12\. Once your application is ready run following commands from project folder to create and sign apk. 

**cordova build --release android**

**keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000**

**jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name**

**zipalign -v 4 android-release-unsigned.apk <<app-name>>.apk**

Oh!!! you are ready to go ?? Go and install the application in your android device and test it I have came up with this steps after referring to [Ionic website](http://ionicframework.com/docs/guide/installation.html). Refer to Ionic website for detailed information.