---
layout: post
title: 'Gradle Error: Ionic build for android'
date: 2016-03-22 02:00:07.000000000 +05:30
type: post
published: true
status: publish
categories:
- Mobile Apps
tags:
- gradle error
- ionic build android gradle error
- ionic gradle error
permalink: mobile-apps/gradle-error-for-ionic
---
I'm learning Ionic framework to develop hybrid apps. However when I'm trying to build the application encountered "gradle" errors. If you encountered any of these errors follow below instructions

  * Download gradle distribution from <a href="http://services.gradle.org/distributions">here</a>.
  * Go to `<<project>>/platforms/android/gradle/wrapper` paste the downloaded zip file at this location
  * Edit `<<project>>/platforms/android/gradle/wrapper/gradle-wrapper.properties` replace distributionUrl to `gradle-x.x.x.zip` which you copied in above step.

This should solve gradle errors.
