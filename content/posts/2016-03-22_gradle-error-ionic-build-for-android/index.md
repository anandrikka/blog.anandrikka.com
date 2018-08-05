---
title: Gradle Error - Ionic build for android
created: 2016-03-22 02:00
cover: ../../assets/covers//android.png
status: published
category: Mobile
tags: ["Angular", "Ionic"]
identifier: post_38
---
I'm learning Ionic framework to develop hybrid apps. However when I'm trying to build the application encountered "gradle" errors. If you encountered any of these errors follow below instructions

  1. Download gradle distribution from [here](http://services.gradle.org/distributions).
  2. Go to `<<project>>/platforms/android/gradle/wrapper` paste the downloaded zip file at this location
  3. Edit `<<project>>/platforms/android/gradle/wrapper/gradle-wrapper.properties` replace distributionUrl to "gradle-x.x.x.zip" which you copied in above step.
This should solve gradle errors.