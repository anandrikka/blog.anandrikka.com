---
layout: post
title: Share files to download from tomcat
date: 2016-09-21 18:48:33.000000000 +05:30
categories: [General]
tags:
- directory sharing
- file sharing
- tomcat
- tomcat file sharing
- tomcat listing
permalink: /tips/share-files-to-download-from-tomcat
---

Sharing files with friends or colleagues who are in same network is every easy now. All you need is tomcat and name of your computer. So let's see how we can do it.

I'm assuming tomcat installation be `tomcat="C:\tomcat"`

* Download Apache Tomcat and Java. Configure environmental variable "JAVA_HOME" with path for Java installation directory and "CATALINA_HOME" with path for Tomcat installation directory.
* Go to tomcat/bin and run "startup" batch file. check from browser whether you able to access tomcat home page(http://localhost:8080). if you reach here it means your tomcat installation is good, now lets do some setup.
* Go to folder that you want to share and create a simple web.xml file in it.
* Go to tomcat/conf open server.xml file and add context for the directory that you want to share like `<Context docBase="D:\Personal\Tutorials" path="/Tutorials" reloadable="true" source="D:\Personal\Tutorials"/>"`
* Go to `tomcat/conf` open `web.xml`, search for `listings` in `init-param` tag you will find param-name as `listings` change its corresponding param-value to `true`

That's all now save all the changes and run tomcat, folder you shared will be available in the path you mentioned in step 4.

For example in my case directory is available at 
`http://localhost:8080/Tutorials`
