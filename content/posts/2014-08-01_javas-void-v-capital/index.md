---
title: Java's Void ('V' capital)
created: 2014-08-01 01:28
cover: ../../assets/covers//angular1.png
status: published
category: java
tags: ["java", "java void"]
identifier: post_19
---
Yesterday when I was searching for something related to ProgressBar came across something called "Void". I know about "void" which we use as a return type of method but I have never heard of "Void". So what is this "Void" ? when it is used ? Let's have a look into it. "Void" was there in java since JDK1.1. There are 8 predefined objects to represent eight primitive types and one more object to represent primitive type "void('v' small)". These objects can only be accessed via  public static final variables like INTEGER.TYPE, BOOLEAN.TYPE, VOID.TYPE etc.. Please see the Void.java

```java
/*Copyright (c) 1996, 2006, Oracle and/or its affiliates. All rights reserved. * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.*/
package java.lang;
public final class Void { /** * The {@code Class} object representing the pseudo-type corresponding to * the keyword {@code void}. */
 public static final Class < Void > TYPE = Class.getPrimitiveClass("void"); /* * The Void class cannot be instantiated. */
 private Void() {}
}
```

As the class is final and constructor is private it can't be instantiated nor extented to create a sub class. Therefore only value that can be assigned to variable of type Void is null. So you can think "Void" as an wrapper for primitive type "void" like "Integer" for "int". Void.TYPE is an object that represents void type and is returned by java.lang.reflect.Method.getReturnType() see the example below

```java
public class VoidExample {
 public static void main(String[] args) throws Exception {
  Class testClass = VoidClass.class.getMethod("VoidMethod", null).getReturnType();
  System.out.println(testClass == Void.TYPE);
 }
}
class VoidClass {
 public void VoidMethod() {}
}
```

After introduction of generics concepts this Void object is used more often in cases like Generic structure requires a class name but you didn't want to use any class to use the structure. Generics accept only objects but not primitive types Example: List<int>          // compilation error List<Integer> //no compilation error There are lot of examples where we can use them. The one which I have came across is SwingWorker<Void, Void>. This is used to create a background thread which completes defined job without freezing the actual thread on which program runs. You can have lot of examples on SwingWorker<Void, Void> you can have a look at them.