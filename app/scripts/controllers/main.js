'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Main Controller of the blackjackApp
 */
angular.module( 'blackjackApp' )
  .controller( 'MainCtrl', ['$scope', '$location', function ( $scope, $location ) {

  	$scope.players = 1;
  	$scope.invalid = false;

  	function validate( value ) {
  		if ( isNaN( parseInt( value ) ) && !isFinite( value ) ) {
  			return false;
  		} 
		if ( parseInt( value ) < 1 || parseInt( value ) > 7 ) {
			return false;
		}
		return true;
  	} 

  	$scope.play = function() {

  		if ( validate( $scope.players ) ) {
  			$location.path( '/play/' + $scope.players );
  		} else {
  			$scope.invalid = true;
  		}
  	};
    
  }]);