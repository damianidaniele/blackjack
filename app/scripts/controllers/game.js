'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Game Controller of the blackjackApp
 */

(function() {
	function GameCtrl( $routeParams, GameService ) {
		
		var vm = this;

		this.init = function( numberOfPlayers ) { 
			var howManyPlayers = numberOfPlayers !== undefined ? numberOfPlayers : $routeParams.players;
			this.gameService = GameService;

			this.gameService
				.init( howManyPlayers )
				.then( function( data ) {
					vm.gameData = data;
				});
		};

		this.hit = function( player ) {
			player.hand.push( vm.gameData.deck.shift() );

			if ( player.calculatePoints() ) {
				vm.gameService.nextPlayer( player );
			}
		};

		this.stick = function( player ) {
			vm.gameService.nextPlayer( player );
		};

		this.newGame = function() {
			vm.init();
		};

		this.splitHand = function( player ) {
			vm.gameService.splitHand( player );
		};
	}

	angular.module( 'blackjackApp' )
	  .controller( 'GameCtrl', [ '$routeParams', 'GameService', GameCtrl]);

  })();