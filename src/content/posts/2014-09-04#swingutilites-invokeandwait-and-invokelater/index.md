---
layout: post
title: SwingUtilites - invokeAndWait() and invokeLater()
date: 2014-09-04 01:13
categories: [Java]
permalink: /java/invokeandwait-invokelater
---

<p>In Java after swing components displayed on the screen they should be operated by only one thread called "Event Handling Thread or Event Thread". We have an another alternative to make changes to Swing components. We can write our code in a separate block and can give this block reference to Event thread.</p><p>The SwingUtilitiesclass has a static <strong>invokeAndWait()</strong> and <strong>invokeLater()</strong> method available to use to put references to blocks of code onto the event queue</p><p><strong>                    public static void invokeAndWait (Runnable target)</strong><br /> <strong>                           throws InterruptedException, InvocationTargetException</strong></p><p><strong>                    public static void invokeLater (Runnable target)</strong></p><p>The parameter target is a reference to an instance of Runnable. In this case the Runnable will not be passed to the constructor of Thread. The Runnable interface is simply being used as a means to identify the entry point for the event thread. Just as a newly spawned thread will invoke run(), the event thread will invoke run() when it has processed all the other events pending in the queue. An InterruptedExceptionis thrown if the thread that called <strong>invokeAndWait() or invokeLater()</strong> is interrupted before the block of code referred to by target completes. An InvocationTargetException is thrown if an uncaught exception is thrown by the code inside run().</p><p><em>New thread is not created when we place runnable in <strong>SwingUtilities.invokeLater() or SwingUtilities.invokeAndWait() </strong>event thread will call run method of runnable when it trun comes up on event queue.</em></p><p>SwingUtilites.invokeAndWait() example:</p>

{% highlight java %}
import java.lang.reflect.InvocationTargetException;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

public class InvokeAndWaitMain {
	public static void main(String[] args) {
		final JButton button = new JButton(&amp;amp;"Not Changed&amp;amp;");
		JPanel panel = new JPanel();
		panel.add(button);
		JFrame f = new JFrame(&amp;amp;"InvokeAndWaitMain&amp;amp;");
		f.setContentPane(panel);
		f.setSize(300, 100);
		f.setVisible(true);
		f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		System.out.println(Thread.currentThread().getName()+&amp;amp;" is going into sleep for 3 sec&amp;amp;");
		try{
			Thread.sleep(3000);
		}catch(Exception e){

		}
		//Preparing code for label change
		Runnable r = new Runnable(){
			@Override
			public void run() {
				System.out.println(Thread.currentThread().getName()+&amp;amp;" is going into sleep for 10 sec&amp;amp;");
				try{
					Thread.sleep(10000);
				}catch(Exception e){

				}
				button.setText(&amp;amp;"Button Text Changed by &amp;amp;"+Thread.currentThread().getName());
				System.out.println(&amp;amp;"Button changes ended&amp;amp;");
			}
		};

		//putting the component change on to event thread using SwingUtilties.invokeAndWait()
		System.out.println(&amp;amp;"Component changes put on the event thread by main thread&amp;amp;");
		try {
			SwingUtilities.invokeAndWait(r);
		} catch (InvocationTargetException | InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println(&amp;amp;"Main thread reached end&amp;amp;");
                
    //output for invokeAndWait()
		/*main is going into sleep for 3 sec
		Component changes put on the event thread by main thread
		AWT-EventQueue-0 is going into sleep for 10 sec
		After 10sec Button changes ended
		Main thread reached end*/

		//output for invokeLater()
		/*main is going into sleep for 3 sec
		Component changes put on the event thread by main thread
		Main thread reached end
		AWT-EventQueue-0 is going into sleep for 10 sec
		After 10sec Button changes ended*/
	}
}
{% endhighlight %}

[sourcecode lang="java"]

[/sourcecode]<p>Replace try/catch block from line 40-44 with SwingUtilites.invokeLater(r) for <strong>invokeLater()</strong> example.</p><p>Main difference between invokeAndWait() and invokeLater() is invokeAndWait() keeps the code on to event thread and waits till the execution of run method is completed whereas invokeLater() keeps the code on event thread and runs the rest of code in the thread.</p><p> </p>
