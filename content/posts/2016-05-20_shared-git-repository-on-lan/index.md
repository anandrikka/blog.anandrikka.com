---
title: Shared Git repository on lan
created: 2016-05-20 11:00
status: published
cover: ../../assets/covers/git.png
category: "Git"
tags: ["git", "version control"]
identifier: post_39
---
Few days back me along with my colleagues came up with an idea to do POC on healthcare mobile app using ionic. I thought of creating a common code repository in one of our systems and share that code repository using office LAN. A part from pull and push commands in git I didn't know anything. So obviously like any other developer I googled, after lot of research I successfully created a Git repository in our LAN. Here are the steps

Create a bare repository (`Bare repository` is the one that has no working tree. It means its whole contents is what you have in .`git` directory. You can only commit to `bare repository` by pushing to it from your local clone. It has no working tree, so it has no files modified, no changes)

```bash
git init --bare project1.git
```

Share it to the users on LAN

Clone this project in some other location on our system using command.

```bash
git clone //192.168.xxx.xxx/xx/xx/project1.git
```

Create you project setup files here or dump project into cloned `project1` folder and Add the files to cloned repository using

```bash
git add .
```

Then commit the files using

```bash
git commit -m "First commit"
```

At this point your bare repository doesn't have any branches, when you commit the files in our local cloned project repository it creates a `master branch` local to our codebase.

Push the changes to the newly created master branch in local code using

```bash
git push
```

The default branch of bare repository is "origin" and default branch of your local cloned repository is "master". You can check it by commands from cloned repository

```bash
git remote (returns origin)
git branch (returns master)
```

Now it's very simple, we know the branch of our remote repository &amp; our local branch. Now we need to push the local changes on master to origin.

```bash
git push [remote-repository-name] [local-branch-name]
git push origin master
```

It's done !! Now any one who has access to `project1.git` can simply clone the project using command

```bash
git clone //192.168.xxx.xx/*/*/project1.git
```

Finally we can use the most used command pull &amp; push to do our daily activities on code base. Hope this helps.