---
title: Change Final variable value in Java
created: 2014-07-21 23:03
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_16
---
Have you ever thought of changing final variable in Java !!. We all know that once the final variable is assigned value we can't change it. When ever we try to change the value we get compilation error. But there is an option to change the value at runtime through Reflection API. Reflection is the process of examining or modifying the runtime behavior of a class at runtime though we can't change the structure of the class. The java.lang.Class class provides many methods that can be used to get metadata, examine and change the runtime behaviour of a class. We can do any thing related to object like changing variables, invoking methods, calling constructors, changing accessibility of the variables, methods etc... So let's see how we change final value 

```java
public class ReflectionExample {
    public static void main(String args[]) throws Exception {
        ChangeFinalVariable cv = new ChangeFinalVariable();
        System.out.println("Before: " + cv.getMessage());
        Field f = cv.getClass().getDeclaredField("message");
        f.setAccessible(true);
        f.set(cv, "No that's not true you are changed now!!!");
        System.out.println("After: " + cv.getMessage());
    }
}
class ChangeFinalVariable {
    public final String message;
    public ChangeFinalVariable() {
        this.message = "You Can't Change Me";
    }
    public String getMessage() {
        return message;
    }
}
```
