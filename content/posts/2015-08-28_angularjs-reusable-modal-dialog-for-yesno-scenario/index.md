---
title: AngularJs# Reusable $modal dialog for Yes/No scenario !!
created: 2015/-08-28 02:43:05
cover: ../../assets/covers//angular1.png
status: published
category: Angular
tags: ["Angular"]
identifier: post_32
---
# AngularJs: Reusable $modal dialog for Yes/No scenario !!

Every project requires a standard popup where we display error messages, or alerts with yes/no options. Every time we cannot write $modal window for this purpose, how about a standard dialog which can be used across application. copy & paste below code snippets directly !! Controller for modal window: [code language="javascript"] (function () { 'use strict'; angular.module('test').controller('MessageDialogCtrl', ['$scope', '$modalInstance', 'params', MessageDialog]); function MessageDialog($scope, $modalInstance, params) { $scope.title = params.title; $scope.message = params.message; $scope.cancel = function () { $modalInstance.dismiss('cancel'); }; $scope.ok = function () { $modalInstance.close(); }; } })(); [/code] Create dialog: [code language="javascript"] function showYesNoDialog(title, message, yescallback, nocallback) { var modalInstance = $modal.open({ templateUrl: 'yesno-dialog.html', controller: 'MessageDialogCtrl', resolve: { params: function () { return { title: title, message: message }; } } }); modalInstance.result.then(function (value) { if (yescallback) { yescallback(value); } }, function () { if (nocallback) { nocallback(); } }); }; [/code] How to use ?? [code language="javascript"] showYesNoDialog('title',message, function () { //yes callback - do when yes is pressed }, function () { //no callback - do when no is pressed } ); [/code] Happy coding !!