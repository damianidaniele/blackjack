'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blackjackApp
 */
angular.module('blackjackApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
