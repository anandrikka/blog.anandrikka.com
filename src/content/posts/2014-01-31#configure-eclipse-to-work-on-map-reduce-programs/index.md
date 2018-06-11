---
title: Configure eclipse to run map reduce programs
date: 2014-01-31 00:10
categories: [Big Data]
tags: [Big data, map reduce, hadoop]
---
As hadoop is written in java, we can execute map reduce programs from eclipse itself. All you need to do is to create a plugin that can support map reduce programs. There are lot of ways to  create map reduce plugin, after doing lot of research I came up with simple solution

Download hadoop plugin from <a href="http://www.mediafire.com/download/kfahrdsvlb7zqg9/hadoop-eclipse-plugin-0.20.203.0.jar" target="_blank">here</a> and save it on your desktop. Move plugin to the plugins folder of the eclipse.

Start hadoop and make sure all nodes are up. Start eclipse and create new Project called "Map Reduce". This project comes into picture when you place plugin at a right place

Now fill up the blanks as shown in the image and that's it you will get a DFS in your project explorer in which you upload, delete files in your Hadoop Distributed File System.
<p style="text-align:center;"><a href="http://techanand.files.wordpress.com/2014/01/untitled.png"><img class="aligncenter size-full wp-image-66" alt="Configure eclipse for hadoop" src="http://techanand.files.wordpress.com/2014/01/untitled.png" width="500" height="327" /></a></p>
<p style="text-align:center;"></p>
