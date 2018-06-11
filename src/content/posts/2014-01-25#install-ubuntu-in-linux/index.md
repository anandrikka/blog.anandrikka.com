---
title: Install Hadoop in Ubuntu 12.04
date: 2014-01-25 17:29
categories: [Big Data]
tags: [Big Data, bigdata, hadoop, hadoop installation, mapreduce]
---
Prerequisites to learn hadoop are having good knowledge in Java and basics of Linux commands.

Lot of us face problems while installing Hadoop in our systems even I was one of them. Here I am going to tell you step by step produce to get error free hadoop environment in Ubuntu 12.04.

<strong>Install Java in your system:</strong>
<ul>
	<li>Download Oracle JDK from <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html" target="_blank">Oracle download page</a> <em>(I am using  jdk-7u25-linux-i586.tar.gz)</em></li>
	<li><span style="line-height:1.5em;">Open Terminal (Ctrl+T) and go to the folder where you downloaded Java.</span></li>
	<li><span style="line-height:1.5em;">Extract zip file, we will get a folder like jdk1.7.0_xx (In my case jdk1.7.0_25). Use the following command for extracting java.</span></li>
</ul>
<strong></strong><strong>                     </strong>tar -xvf jdk-7u25-linux-i586.tar.gz
<ul>
	<li>Make a directory /usr/lib/jvm</li>
</ul>
<strong></strong><strong>                     </strong>sudo mkdir -p /usr/lib/jvm
<ul>
	<li>Move extracted java folder to the directory created above</li>
</ul>
<i></i><strong></strong><strong>                     </strong>sudo mv jdk1.7.0_25 /usr/lib/jvm
<ul>
	<li>Update alternatives of java, javac, javaws and jps to Ubuntu environment</li>
</ul>
<i></i>                     sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk1.7.0_25/bin/java" 1

<i></i>                     sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk1.7.0_25/bin/javac" 1

<i></i>                     sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/lib/jvm/jdk1.7.0_25/bin/javaws" 1

<i></i>                     sudo update-alternatives --install "/usr/bin/jps" "jps" "/usr/lib/jvm/jdk1.7.0_25/bin/jps" 1

Now we successfully got java configured in our system.

<strong>Prerequisites for Hadoop Installation:</strong>
<ul>
	<li>Hadoop cluster works on SSH Networks so we install SSH and create password less sessions.</li>
</ul>
<i>                     </i>sudo apt-get install ssh
<ul>
	<li>Add dedicated user and group for hadoop related operations lets consider a user called <strong>hduser</strong> and group as <strong>hadoop</strong>, we can use any names in place of hduser and hadoop</li>
</ul>
<i>                     </i>sudo addgroup hadoop  <span style="color:#ff6600;"><em>This adds group called hadoop</em></span>

<i>                     </i>sudo adduser --ingroup hadoop hduser <span style="color:#ff6600;"><em>This adds user called hduser and keeps it in hadoop group</em></span>
<ul>
	<li>Login to <em>hduser</em> account through Terminal</li>
</ul>
<i></i><i>                     </i>su hduser <span style="color:#ff6600;">A<em><span style="color:#ff6600;">s</span>ks for a password, please give password that you have created for hduser in the above step</em></span>
<ul>
	<li>To create password-less SSH connection, create RSA key for <em>hduser</em>. It will ask for “file in which to save the key” just hit enter.</li>
</ul>
<i></i><i>                     </i>ssh-keygen -t rsa -P ""
<ul>
	<li>You have to enable SSH access to your local machine with this newly created key</li>
</ul>
<i></i><i>                     </i>cat $HOME/.ssh/id_rsa.pub &gt;&gt; $HOME/.ssh/authorized_keys
<ul>
	<li>Lets test above configured SSH setup by connecting to your local machine with <em>hduser</em> user. It will ask for confirmation, type <em>yes</em> to continue.</li>
</ul>
<i></i><i></i><i>                    </i> ssh localhost

Now we are set to install hadoop, if we reach this mark it's very easy to configure hadoop.<!--more-->

<strong>Hadoop Installation:</strong>
<ul>
	<li>Make sure to exit from <em>hduser</em> account because from now onward we need sudo access which is nothing but admin rights. we can unable root account easily by typing "<strong>sudo passwd</strong>" from terminal which asks to give password once password is set we can use root account by logging into it as "<strong>su root</strong>".</li>
	<li>Download <a href="https://hadoop.apache.org/releases.html#Download" target="_blank">Hadoop</a> from Apache site use stable version (In my case I am using hadoop-1.1.2)</li>
	<li>Unzip this file, move it to /usr/local/ folder and make <em>hduser</em> owner of this folder and sub-directories with file.</li>
</ul>
<i></i><i>                     </i>tar -xvf hadoop-1.1.2.tar.gz

<i>                     </i>sudo mv hadoop-1.1.2 /usr/local/

<i>                     </i>sudo chown -R hduser:hadoop /usr/local/hadoop-1.1.2
<ul>
	<li>Make temporary directory for local file system and Hadoop File System(HDFS) . Also make <em>hduser</em> its owner.</li>
</ul>
<i>                     </i>sudo mkdir -p /app/hadoop/tmp/

<i>                     </i>sudo chown -R hduser:hadoop /app

<i>                     </i>sudo chmod -R 750 /app
<ul>
	<li>Now let's begin configuring hadoop files.</li>
	<li>Configure Java and Hadoop folders to hduser home folder. This is very very important step and don't skip it. Log in as root user "<span style="color:#ff0000;"><strong>su root</strong></span>". Every step below is performed as root user only.</li>
</ul>
<i>                      </i>gedit /home/hduser/.bashrc [<span style="color:#ff6600;"><em>there is space between / &amp; .bashrc</em></span>]
<ul>
	<li>Copy below text at the end of above opened file</li>
</ul>
<i></i><i>                     </i># Set Hadoop-related environment variables
<i>                     </i><em>export HADOOP_PREFIX=/usr/local/hadoop-1.1.2</em>
<em> <i>                     </i>export HADOOP_HOME=/usr/local/hadoop-1.1.2</em>

<em><i>                     </i># Set JAVA_HOME (we will also configure JAVA_HOME directly for Hadoop later on)</em>
<em> <i>                     </i>export JAVA_HOME=/usr/lib/jvm/jdk1.7.0_25/</em>

<i></i><i>                     </i># Some convenient aliases and functions for running Hadoop-related commands
<i>                     </i>unalias fs &amp;&gt; /dev/null
<i>                     </i>alias fs=”hadoop fs”
<i>                     </i>unalias hls &amp;&gt; /dev/null
<i>                     </i>alias hls=”fs -ls”

<i></i><i>                     </i># If you have LZO compression enabled in your Hadoop cluster and
<i>                     </i># compress job outputs with LZOP (not covered in this tutorial):
<i>                     </i># Conveniently inspect an LZOP compressed file from the command
<i>                     </i># line; run via:
<i>                     </i>#
<i>                     </i># $ lzohead /hdfs/path/to/lzop/compressed/file.lzo
<i>                     </i>#
<i>                     </i># Requires installed ‘lzop’ command.
<i>                     </i>#
<i>                     </i>lzohead () {
<i>                     </i>hadoop fs -cat $1 | lzop -dc | head -1000 | less
<i>                     </i>}

<i></i><i>                     </i># Add Hadoop bin/ directory to PATH
<i>                     </i>export PATH=$PATH:$HADOOP_PREFIX/bin
<i>                     </i>export PATH=$PATH:$JAVA_HOME/bin
<ul>
	<li>We need to configure Java Home Folder path in <strong>hadoop-env.sh</strong> file and also disable IPv6 for Hadoop because of various network related issues with Hadoop trying to bind 0.0.0.0 IP.</li>
</ul>
<i></i><i>                      </i>cd /usr/local/hadoop-1.1.2/conf/

<i></i><i>                      </i>gedit hadoop-env.sh
<ul>
	<li>In above file search for <em>HADOOP_OPTS</em> and replace whole line with below to disable IPv6</li>
</ul>
<i></i><i>                      </i>export HADOOP_OPTS=-Djava.net.preferIPv4Stack=true
<ul>
	<li>Now search for <em>JAVA_HOME</em> and replace whole line with below to configure JAVA HOME path for hadoop usage.</li>
</ul>
<i></i><i>                      </i>export JAVA_HOME=/usr/lib/jvm/jdk1.7.0_25/
<ul>
	<li>Save and exit this file</li>
	<li>Disable IPv6 by editing the following file</li>
</ul>
<i>                      </i>gedit /etc/sysctl.conf
<ul>
	<li>Append the below text in the above opened file</li>
</ul>
<i>                     </i># disable ipv6

<i>                     </i>net.ipv6.conf.all.disable_ipv6 = 1

<i>                     </i>net.ipv6.conf.default.disable_ipv6 = 1

<i>                     </i>net.ipv6.conf.lo.disable_ipv6 = 1

Please restart the system in order to reflect the changes
<ul>
	<li>Check whether IPv6 disabled or not. If the below statement returns "1" its disabled</li>
</ul>
<i>                      </i>$ cat /proc/sys/net/ipv6/conf/all/disable_ipv6
<ul>
	<li>Open core-site.xml file</li>
</ul>
<i></i><i>                      </i>gedit /usr/local/hadoop/conf/core-site.xml

and add below text within &lt;configuration&gt;&lt;/configuration&gt; tag. After that save and exit file.

<i></i><i>                     </i>&lt;property&gt;
<i>                     </i>&lt;name&gt;hadoop.tmp.dir&lt;/name&gt;
<i>                     </i>&lt;value&gt;/app/hadoop/tmp&lt;/value&gt;
<i>                     </i>&lt;description&gt;Base folder for other temporary directories.&lt;/description&gt;
<i>                     </i>&lt;/property&gt;&lt;property&gt;
<i>                     </i>&lt;name&gt;fs.default.name&lt;/name&gt;
<i>                     </i>&lt;value&gt;hdfs://localhost:<i>54310</i><i>&lt;/value&gt;
</i><i>                     </i>&lt;description&gt;This is name of default file system.&lt;/description&gt;
<i>                     </i>&lt;/property&gt;
<ul>
	<li>Open mapred-site.xml file</li>
</ul>
<i></i><i>                      </i>gedit /usr/local/hadoop/conf/mapred-site.xml

and add below text within &lt;configuration&gt;&lt;/configuration&gt; tag. After that save and exit file.

<i></i><i>                     </i>&lt;property&gt;
<i>                     </i>&lt;name&gt;mapred.job.tracker&lt;/name&gt;
<i>                     </i>&lt;value&gt;localhost:<i>54311</i><i>&lt;/value&gt;
</i><i>                     </i>&lt;description&gt;The host and port that the MapReduce job tracker runs at.&lt;/description&gt;
<i>                     </i>&lt;/property&gt;
<ul>
	<li>Open hdfs-site.xml file</li>
</ul>
<i>                      </i>gedit /usr/local/hadoop/conf/hdfs-site.xml

and add below text within &lt;configuration&gt;&lt;/configuration&gt; tag. After that save and exit file as in step 12.

<i></i><i>                     </i>&lt;property&gt;
<i>                     </i>&lt;name&gt;dfs.replication&lt;/name&gt;
<i>                     </i>&lt;value&gt;1&lt;/value&gt;
<i>                     </i>&lt;description&gt;Default data blocks replication&lt;/description&gt;
<i>                     </i>&lt;/property&gt;
<ul>
	<li>Its time to format HDFS filesystem via the NameNode. This is only one-time activity, You need to do this the first time you set up a Hadoop cluster.</li>
</ul>
<i></i><i>                      </i>cd /usr/local/hadoop/bin

<i></i><i>                      </i>./hadoop namenode -format
<ul>
	<li>You should get below line somewhere in output , Bold text is important.</li>
</ul>
31/03/13 12:10:21 INFO common.Storage: Storage directory …/hadoop-hduser/dfs/name has been <strong>successfully formatted</strong>.
<ul>
	<li>Bingo Done !!!!!</li>
	<li>Below command will namenode, datanode, secondarynamenode, jobtracker and tasktracker.</li>
</ul>
<i></i><i>                      </i>/usr/local/hadoop/bin/start-all.sh
<ul>
	<li>Verify if all services are up. Execute below command in Terminal and you should be able to see all enlisted jobs with their PID(s).</li>
</ul>
<i></i><i>                      </i>jps
<ul>
	<li>To stop Hadoop services you can fire below command</li>
</ul>
<i></i><i>                      </i>/usr/local/hadoop/bin/stop-all.sh

<i></i><strong>Web Interfaces:</strong>
<ul>
	<li>http://localhost:50070/ –  NameNode daemon</li>
	<li>http://localhost:50030/ – JobTracker</li>
	<li>http://localhost:50060/ – TaskTracker</li>
</ul>
Got lot of help from <a href="http://www.michael-noll.com/tutorials/running-hadoop-on-ubuntu-linux-single-node-cluster" target="_blank">michael noll</a> hadoop installation tutorial.
