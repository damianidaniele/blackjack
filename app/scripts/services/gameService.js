'use strict';

angular
	.module( 'blackjackApp' )
	.service( 'GameService', [ '$http', 'Player', 'Card', function ( $http, Player, Card ) {
  		
		function getDeck() {
  			return $http
 		    		.get( 'data.json' )
		 			.success( function( data ) {
						return data;
					}); 
 		}

		var GameService = {
			dealer: undefined,
			players: undefined,
			deck: undefined,
			status: 0,
			message: 'Playing...',

			init: function( numberOfPlayers ) {

			var iter,
				tempPlayer;
			
			this.players = [];
			this.deck = [];
			this.status = 0;

			return getDeck()
				.then( function( result ) {

	 				angular.forEach( result.data, function( card ) {
	 					var tempCard = new Card();
	 					tempCard.suit = card.suit;
	 					tempCard.point = card.point;
 						this.push( tempCard );
					}, GameService.deck );
					
					GameService.deck.sort( function(){ return 0.5 - Math.random(); });

					for ( iter = 0; iter < numberOfPlayers; iter++ ) {
						tempPlayer = new Player();
						tempPlayer.name = 'Player ' + ( iter + 1 );
						tempPlayer.id = iter;
						tempPlayer.hand = [ GameService.deck.shift(), GameService.deck.shift() ];
						tempPlayer.calculatePoints();

						GameService.players.push( tempPlayer );
					}

					GameService.dealer = new Player();
					GameService.dealer.name = 'Dealer';
					GameService.dealer.id = -1;
					GameService.dealer.risk = false;
					GameService.dealer.hand = [ GameService.deck.shift(), GameService.deck.shift() ];

					if ( GameService.dealer.calculatePoints() ) {
						GameService.endGame();
						return;
					};

					if ( !GameService.players[0].calculatePoints() ) {
						GameService.players[0].turn = true;
					} else {
						GameService.nextPlayer( GameService.players[0] );
					}

					return { 
						'players' : GameService.players,
						'dealer' : GameService.dealer,
						'deck' : GameService.deck
					};
				});
			},

			nextPlayer: function( player ) {

				player.turn = false;

				if ( player.id < this.players.length - 1 ) {
					if ( this.players[ player.id + 1].status === 1 || this.players[ player.id + 1].status === 2 ) {
						this.nextPlayer( this.players[ player.id + 1] );
						return;
					}

					this.players[ player.id + 1].turn = true; 
				} else {
					this.dealer.turn = true;
					this.playDealer();
				}
			},

			playDealer: function() {

				if ( this.dealer.points === 21 ) {
					this.endGame();
					return;
				} 

				if ( this.dealer.points <= 16 ) {
					this.dealer.hand.push( this.deck.shift() );
					this.dealer.calculatePoints();
					this.playDealer();
					return;
				} 
 
				angular.forEach( this.players, function( player ){
					if ( player.status !== 3 && player.points > this.dealer.points ) {
						this.dealer.risk = true;
					}
				}, this );

				if ( this.dealer.risk ) {
					this.dealer.risk = false;
					
					if ( Math.random() > 0.5 ) {
						this.dealer.hand.push( this.deck.shift() );
						this.dealer.calculatePoints();
						this.playDealer();
						return;
					} 	
				}
				
				this.endGame();
			},

			endGame: function() {
				this.dealer.turn = false;
				this.dealer.risk = false;
				this.status = 1;
				this.message = 'End Game!';

				if ( this.dealer.status === 1) {
					this.message = 'Dealer won (Blackjack)';
					return;
				}

				angular.forEach( this.players, function( player ) {
					if ( player.status !==3 ) {

						if ( this.dealer.status === 3 ) {
							player.status = 2;
							player.message = 'Dealer is busted, you won!';
							return;
						}

						if ( player.points > this.dealer.points ) {
							player.status = 2;
							player.message = 'You won!';
							return;
						}

						if ( player.points === this.dealer.points) {
							player.status = 2;
							player.message = 'Draw game';
							return;
						}

						if ( player.points < this.dealer.points ) {
							player.status = 2;
							player.message = 'You lose!';
							return;
						}
					}

				}, this );

			}
		};

		return GameService;
		
  	}]); 