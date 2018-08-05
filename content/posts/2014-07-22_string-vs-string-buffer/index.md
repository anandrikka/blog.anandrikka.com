---
title: String Vs String Buffer in Java
created: 2014-07-22 00:25
cover: ../../assets/covers//java.png
status: published
category: Java
tags: ["java", "string buffer"]
identifier: post_17
---
**String:** String is immutable means we can't modify a string object once it is created. We can replace it by another instance of String. **StringBuffer:** StringBuffer is mutable means it's value can be changed. Taking into consideration that your string operations are not in any thread. **StringBuffer** is more efficient way than using **String** if your string contains more computations . If string is modified in a thread then it is better to use String class because immutable classes are thread safe. Let's see an example

```java
public class StringVsStringBuffer {
 public static void main(String args[]) {
  long startTime = System.currentTimeMillis();
  String message = "append to";
  for (int i = 0; i < 1000; i++) {
   message = message + i + " ";
   //Here String objects are created and destroyed immediately.
   // Creating instances involves more effort
  }
  long stopTime = System.currentTimeMillis();
  System.out.println("Run time for String.." + (stopTime - startTime));
  // Output on Average : 12ms
  startTime = System.currentTimeMillis();
  StringBuffer messageBuffer = new StringBuffer();
  for (int i = 0; i < 1000; i++) {
   //Here only one object is created and is used through out the loop
   messageBuffer = messageBuffer.append(i + " ");
  }
  stopTime = System.currentTimeMillis();
  System.out.println("Run time for String Buffer.." + (stopTime - startTime));
  //Output on Average : 4ms 
 }

}
```
