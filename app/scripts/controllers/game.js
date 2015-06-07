'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Game Controller of the blackjackApp
 */

angular.module( 'blackjackApp' )
  .controller( 'GameCtrl', [  '$scope', '$routeParams', 'GameService', function ( $scope, $routeParams, GameService ) {
   	
 
    $scope.init = function( numberOfPlayers ) { 
    	var howManyPlayers = numberOfPlayers !== undefined ? numberOfPlayers : $routeParams.players;
		$scope.GameService = GameService;

    	GameService
		.init( howManyPlayers )
		.then( function( data ) {
			$scope.game = data;
		});
	};

	$scope.hit = function( player ) {
		player.hand.push( $scope.game.deck.shift() );

		if ( player.calculatePoints() ) {
			$scope.GameService.nextPlayer( player );
		}
	};

	$scope.stick = function( player ) {
		$scope.GameService.nextPlayer( player );
	};

	$scope.newGame = function() {
		$scope.init();
	};
  }]);