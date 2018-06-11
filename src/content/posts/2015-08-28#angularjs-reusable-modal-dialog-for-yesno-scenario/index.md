---
layout: post
title: Reusable $modal dialog for Yes/No scenario !!
date: 2015-08-28 02:43
author: anandrikka
comments: true
categories: [AngularJs]
tips: [$modal, $modal yes no dialog, AngularJs, angularjs, bootstrap modal, no, reusable $modal dialog, yes, yes or no dialog, yes/no dialog, yes/no dialog using angularjs, Yes/No dialog using bootstrap in angularjs]
permalink: angularjs/reusable-modal-yes-no
---

Every project requires a standard popup where we display error messages, or alerts with yes/no options. Every time we cannot write $modal window for this purpose, how about a standard dialog which can be used across application. copy &amp; paste below code snippets directly !!

Controller for modal window:

{% highlight  javascript %}
(function () {
    'use strict';

    angular.module('test').controller('MessageDialogCtrl',
        ['$scope', '$modalInstance', 'params', MessageDialog]);

    function MessageDialog($scope, $modalInstance, params) {

        $scope.title = params.title;
        $scope.message = params.message;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');

        };

        $scope.ok = function () {
            $modalInstance.close();
        };

    }
})();
{% endhighlight %}

Create dialog:

{% highlight  javascript %}
    function showYesNoDialog(title, message, yescallback, nocallback) {

    var modalInstance = $modal.open({
        templateUrl: 'yesno-dialog.html',
        controller: 'MessageDialogCtrl',
        resolve: {
            params: function () {
                return {
                    title: title,
                    message: message
                };
            }
        }
    });

    modalInstance.result.then(function (value) {
        if (yescallback) {
            yescallback(value);
        }
    }, function () {
        if (nocallback) {
            nocallback();
        }
    });
};
{% endhighlight %}

How to use ??

{% highlight  javascript %}
showYesNoDialog('title',message, function () {
    //yes callback - do when yes is pressed
}, function () {
    //no callback - do when no is pressed
});
{% endhighlight %}

Happy coding !!
