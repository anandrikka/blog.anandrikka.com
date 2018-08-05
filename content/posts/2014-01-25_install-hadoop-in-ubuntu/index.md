---
title: Install Hadoop in Ubuntu 12.04
created: 2014-01-25 17:29
cover: ../../assets/covers//ubuntu.jpg
status: published
category: "Ubuntu"
tags: ["Ubuntu", "Linux"]
indentifier: post_1
---
Prerequisites to learn hadoop are having good knowledge in Java and basics of Linux commands. Lot of us face problems while installing Hadoop in our systems even I'm one of them. Here I am going to tell you step by step procedure to have error free hadoop environment in Ubuntu 12.04.

__Install Java in your system:__

* Download Oracle JDK from [Oracle download page](http://www.oracle.com/technetwork/java/javase/downloads/index.html) _(I am using  jdk-7u25-linux-i586.tar.gz)_
* Open Terminal (Ctrl+T) and go to the folder where you downloaded Java.
* Extract zip file, we will get a folder like jdk1.7.0_xx (In my case jdk1.7.0_25). Use the following command for extracting java.
```bash
  tar -xvf jdk-7u25-linux-i586.tar.gz
```

* Make a directory /usr/lib/jvm
```bash
  sudo mkdir -p /usr/lib/jvm
```

* Move extracted java folder to the directory created above
```bash
  sudo mv jdk1.7.0_25 /usr/lib/jvm
```

* Update alternatives of java, javac, javaws and jps to Ubuntu environment
```bash
  sudo update-alternatives --install "/usr/bin/java" "java" "/usr/lib/jvm/jdk1.7.0_25/bin/java"
  sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/lib/jvm/jdk1.7.0_25/bin/javac" 1
  sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/lib/jvm/jdk1.7.0_25/bin/javaws" 1
  sudo update-alternatives --install "/usr/bin/jps" "jps" "/usr/lib/jvm/jdk1.7.0_25/bin/jps" 1
```
  
Now we successfully got java configured in our system.

__Prerequisites for Hadoop Installation:__

* Hadoop cluster works on SSH Networks so we install SSH and create password less sessions.
```bash
  sudo apt-get install ssh
```

* Add dedicated user and group for hadoop related operations lets consider a user called **hduser** and group as **hadoop**, we can use any names in place of hduser and hadoop
```bash
  sudo addgroup hadoop
  sudo adduser --ingroup hadoop hduser
```

* Login to _hduser_ account through Terminal `su hduser` asks for a password, please give password that you have created for hduser in the above step

* To create password-less SSH connection, create RSA key for `hduser`. It will ask for “file in which to save the key” just hit enter.
```bash
ssh-keygen -t rsa -P
```

* You have to enable SSH access to your local machine with this newly created key
```bash
  cat $HOME/.ssh/id_rsa.pub >> $HOME/.ssh/authorized_keys
```

* Lets test above configured SSH setup by connecting to your local machine with `hduser` user. It will ask for confirmation, type _yes_ to continue.
```bash
ssh localhost
```

Now we are set to install hadoop, if we reach this mark it's very easy to configure hadoop.
  
**Hadoop Installation:** {.sample}

* Make sure to exit from _hduser_ account because from now onward we need sudo access which is nothing but admin rights. we can unable root account easily by typing `sudo passwd` from terminal which asks to give password once password is set we can use root account by logging into it as `su root`.
* Download [Hadoop](https://hadoop.apache.org/releases.html#Download) from Apache site use stable version (In my case I am using hadoop-1.1.2)
* Unzip this file, move it to /usr/local/ folder and make _hduser_ owner of this folder and sub-directories with file.
```bash
  tar -xvf hadoop-1.1.2.tar.gz
  sudo mv hadoop-1.1.2 /usr/local/
  sudo chown -R hduser:hadoop /usr/local/hadoop-1.1.2 
```
* Make temporary directory for local file system and Hadoop File System(HDFS). Also make `hduser` its owner.
```bash
  sudo mkdir -p /app/hadoop/tmp/
  sudo chown -R hduser:hadoop /app
  sudo chmod -R 750 /app
```
* Now let's begin configuring hadoop files.
* Configure Java and Hadoop folders to hduser home folder. This is very very important step and don't skip it. Log in as root user `su root`. Every step below is performed as root user only.
```bash
  #[_there is space between / & .bashrc_]
  gedit /home/hduser/.bashrc
```
* Copy below text at the end of above opened file
```bash
  # Set Hadoop-related environment variables
  export HADOOP_PREFIX=/usr/local/hadoop-1.1.2
  export HADOOP_HOME=/usr/local/hadoop-1.1.2
  # Set JAVA_HOME (we will also configure JAVA_HOME directly for Hadoop later on
  export JAVA_HOME=/usr/lib/jvm/jdk1.7.0_25/
  # Some convenient aliases and functions for running Hadoop-related commands
  alias fs &> /dev/null
  alias fs=”hadoop fs”
  unalias hls &> /dev/null
  alias hls=”fs -ls”
  # If you have LZO compression enabled in your Hadoop cluster and
  # compress job outputs with LZOP (not covered in this tutorial):
  # Conveniently inspect an LZOP compressed file from the command line; run via:
  lzohead /hdfs/path/to/lzop/compressed/file.lzo
  # Requires installed ‘lzop’ command.
  lzohead () {
    hadoop fs -cat $1 | lzop -dc | head -1000 | less
  }
  # Add Hadoop bin/ directory to PATH
  export PATH=$PATH:$HADOOP_PREFIX/bin
  export PATH=$PATH:$JAVA_HOME/bin
```
* We need to configure Java Home Folder path in **hadoop-env.sh** file and also disable IPv6 for Hadoop because of various network related issues with Hadoop trying to bind 0.0.0.0 IP.
```bash
  cd /usr/local/hadoop-1.1.2/conf/
  gedit hadoop-env.sh
```

* In above file search for `HADOOP_OPTS` and replace whole line with below to disable IPv6