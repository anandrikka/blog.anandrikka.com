---
layout: post
title: String Vs String Buffer in Java
date: 2014-07-22 00:25
categories: [Java]
tags: [Immutable, Java, java, String class, StringBuffer]
permalink: java/string-vs-stringbuffer
---

<strong>String: </strong>String is immutable means we can't modify a string object once it is created. We can replace it by another instance of String.

<strong>StringBuffer: </strong>StringBuffer is mutable means it's value can be changed.

Taking into consideration that your string operations are not in any thread. <strong>StringBuffer</strong> is more efficient way than using <strong>String</strong> if your string contains more computations . If string is modified in a thread then it is better to use String class because immutable classes are thread safe.

Let's see an example

{% highlight java %}
public class StringVsStringBuffer {
	public static void main(String args[]){
		
		long startTime = System.currentTimeMillis();
		String message = "append to";
		for(int i=0; i&lt;1000;i++){
			message = message + i + " ";
			//Here String objects are created and destroyed immediately.
			// Creating instances involves more effort
		}
		
		long stopTime = System.currentTimeMillis();
		System.out.println("Run time for String.."+(stopTime-startTime));
		
		// Output on Average : 12ms
		
		startTime = System.currentTimeMillis();
		StringBuffer messageBuffer = new StringBuffer();
		for(int i=0; i&lt;1000;i++){
			//Here only one object is created and is used through out the loop
			messageBuffer = messageBuffer.append(i + " ");
		}
		stopTime = System.currentTimeMillis();
		System.out.println("Run time for String Buffer.."+(stopTime-startTime));
		
		//Output on Average : 4ms
	}	
}
{% endhighlight %}

