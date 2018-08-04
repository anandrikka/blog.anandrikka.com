---
title: Singleton - Creational Design Pattern
created: 2017-02-15 23:25
cover: ../../assets/covers/design_patterns.png
category: "design patterns"
tags: ["java", "design patterns"]
identifier: post_42
---
Singleton Design Pattern is one of the creational design pattern which creates only one instance of the class. Only one instance of the class is created per Java Virtual Machine. Singleton pattern is used for logging, drivers object and thread pool. There are different ways to create singleton design pattern, but all of them follow three concepts

* private constructor to restrict access to other classes.
* private static variable of the same class that is only instance of the class.
* public static method to return the instance of the class.

```java
  class SingletonPattern {
    private static SingletonPattern defaultInstance;
    private SingletonPattern() {

    }
    public static SingletonPattern getInstance() {
      if(defaultInstance == null) {
        System.out.println("Singleton Pattern Default Instance Created");
        defaultInstance = new SingletonPattern();
      }
      return defaultInstance;
    }
  }
```

The above singleton class is not thread-safe and may not be useful in multi-thread environment. Need to take necessary steps to make it thread safe. The below method of creating singleton pattern is the most widely used and doesn't require any synchronization techniques.

```java
  class SingletonPattern {
    private SingletonPattern() {

    }
    private static class SingletonHelper {
      private static final SingletonPattern INSTANCE = new SingletonPattern();
    }
    public static SingletonPattern getInstance() {
      return SingletonHelper.INSTANCE;
    }
  }
```
