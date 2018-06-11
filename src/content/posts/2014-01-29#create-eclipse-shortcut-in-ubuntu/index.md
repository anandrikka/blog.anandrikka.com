---
title: create eclipse shortcut in ubuntu
date: 2014-01-29 23:56
tags: [Big Data, eclipse shortcut, ubuntu eclispe]
categories: [Big Data]
---

Lot of us download eclipse as zip file extract it to a location and start using it. Every time we have to go to the eclipse path and open the application. Ubuntu doesn't provide create shortcut as Windows do....

Don't worry there are few steps which will allow you to create shortcut at a place where you want

Install gnome-tweak-tool using command: <span style="color:#ff6600;"><em>sudo apt-get install gnome-tweak-tool</em></span>

after installing tool use the following command to get popup for creating shortcut:

<span style="color:#ff6600;"><em> /usr/bin/gnome-desktop-item-edit /home/user account name(xxxx)/Desktop/ --create-new</em></span>

<a href="http://techanand.files.wordpress.com/2014/01/1.jpg"><img class="aligncenter size-medium wp-image-59" alt="shortcut_eclipse" src="http://techanand.files.wordpress.com/2014/01/1.jpg?w=300" width="300" height="153" /></a>For command press browse button and select path for eclipse and press OK. Done !!!! your shortcut is waiting on your desktop
