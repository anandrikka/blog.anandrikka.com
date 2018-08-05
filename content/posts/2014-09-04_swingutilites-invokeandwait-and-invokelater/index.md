---
title: SwingUtilites - invokeAndWait() and invokeLater()
created: 2014/09/04 01:13
cover: ../../assets/covers//java.png
status: published
category: java
tags: ["java", "swings"]
identifier: post_20
---

# SwingUtilites - invokeAndWait() and invokeLater()

In Java after swing components displayed on the screen they should be operated by only one thread called "Event Handling Thread or Event Thread". We have an another alternative to make changes to Swing components. We can write our code in a separate block and can give this block reference to Event thread.

The SwingUtilitiesclass has a static **invokeAndWait()** and **invokeLater()** method available to use to put references to blocks of code onto the event queue

**                    public static void invokeAndWait (Runnable target)**  
**                           throws InterruptedException, InvocationTargetException**

**                    public static void invokeLater (Runnable target)**

The parameter target is a reference to an instance of Runnable. In this case the Runnable will not be passed to the constructor of Thread. The Runnable interface is simply being used as a means to identify the entry point for the event thread. Just as a newly spawned thread will invoke run(), the event thread will invoke run() when it has processed all the other events pending in the queue. An InterruptedExceptionis thrown if the thread that called **invokeAndWait() or invokeLater()** is interrupted before the block of code referred to by target completes. An InvocationTargetException is thrown if an uncaught exception is thrown by the code inside run().

_New thread is not created when we place runnable in **SwingUtilities.invokeLater() or SwingUtilities.invokeAndWait()** event thread will call run method of runnable when it trun comes up on event queue._

SwingUtilites.invokeAndWait() example:

```java
import java.lang.reflect.InvocationTargetException;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;
public class InvokeAndWaitMain {
 public static void main(String[] args) {
  final JButton button = new JButton(" Not Changed ");
  JPanel panel = new JPanel();
  panel.add(button);
  JFrame f = new JFrame(" InvokeAndWaitMain ");
  f.setContentPane(panel);
  f.setSize(300, 100);
  f.setVisible(true);
  f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
  System.out.println(Thread.currentThread().getName() + " is going into sleep
   for 3 sec ");
   try {
    Thread.sleep(3000);
   } catch (Exception e) {} //Preparing code for label change Runnable r = new Runnable(){ @Override public void run() { System.out.println(Thread.currentThread().getName()+&amp;quot; is going into sleep for 10 sec&amp;quot;); try{ Thread.sleep(10000); }catch(Exception e){ } button.setText(&amp;quot;Button Text Changed by &amp;quot;+Thread.currentThread().getName()); System.out.println(&amp;quot;Button changes ended&amp;quot;); } }; //putting the component change on to event thread using SwingUtilties.invokeAndWait() System.out.println(&amp;quot;Component changes put on the event thread by main thread&amp;quot;); try { SwingUtilities.invokeAndWait(r); } catch (InvocationTargetException | InterruptedException e) { e.printStackTrace(); } System.out.println(&amp;quot;Main thread reached end&amp;quot;); //output for invokeAndWait() /*main is going into sleep for 3 sec Component changes put on the event thread by main thread AWT-EventQueue-0 is going into sleep for 10 sec After 10sec Button changes ended Main thread reached end*/ //output for invokeLater() /*main is going into sleep for 3 sec Component changes put on the event thread by main thread Main thread reached end AWT-EventQueue-0 is going into sleep for 10 sec After 10sec Button changes ended*/
  }
 }
```

Replace try/catch block from line 40-44 with SwingUtilites.invokeLater(r) for **invokeLater()** example.

Main difference between invokeAndWait() and invokeLater() is invokeAndWait() keeps the code on to event thread and waits till the execution of run method is completed whereas invokeLater() keeps the code on event thread and runs the rest of code in the thread.