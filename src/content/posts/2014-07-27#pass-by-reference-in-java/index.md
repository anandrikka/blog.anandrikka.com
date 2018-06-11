---
layout: post
title: Pass By Reference in Java
date: 2014-07-27 14:28
categories: [Java]
tags: [Java, java, pass by reference]
permalink: /java/pass-by-reference
---

<strong>Pass-By-Value:</strong> Pass-By-Value means to pass value from calling function to called function. The value passed will be local to function called and any changes to the passed value will not be reflected in original value passed.

<strong>Pass-By-Reference: </strong>Pass-by-reference means to pass the reference of value in the calling function to the called function. The called function can modify the value by using the reference passed in.

Java is strictly Pass-By-Value. But it do support a kind of Pass-By-Reference through java objects. When java objects are passed it doesn't actually pass the object, it makes a copy of object's reference value and passes it. It means both the original and copied object references will point to common reference which means any changes to object's value in called method will reflect in original object.

Let's see an example

{% highlight java %}
public class PassByRefExample {
	public static void main(String args[]){
		ObjectReference reference = new ObjectReference();
		reference.value="Value assigned !!!";
		ReferenceClass referenceClass = new ReferenceClass();
		referenceClass.ChangeValue(reference);
		System.out.println("Reference..."+reference.value);
	}
}

class ReferenceClass{
	public void ChangeValue(ObjectReference objectReference){
		objectReference.value = "Value Changed !!!";
	}
}

class ObjectReference{
	public Object value;
}
{% endhighlight %}
