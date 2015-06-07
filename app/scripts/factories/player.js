'use strict';

angular
	.module( 'blackjackApp' )
  	.factory( 'Player', [ function () {
   		
  		var Player = function() {
			this.id = 0;
			this.name = '';
			this.points = 0;
			this.message = false;
			this.status = 0;
			this.turn = false;
			this.hand = [];
		};

  		Player.prototype.calculatePoints = function() {

			var ace = false;

			this.points = 0;

			angular.forEach( this.hand, function( card ) {

				if ( card.getCardValue() === 1 && !ace ) {
					ace = true;
				}

				this.points += card.getCardValue();

			}, this );
			
			if ( ace && ( this.points - 1 ) <= 10 ) {
				this.points = this.points + 10;
			}

			if ( this.points === 21 ) {
				this.hasMax();
				return true;
			}

			if ( this.points > 21 ) {
				this.isBusted();
				return true;
			}

			return false;
		};

		Player.prototype.isBusted = function() {
			this.message = 'Busted!';
			this.status = 3;
			return;
		};

		Player.prototype.hasMax = function() {
			if ( this.hasBlackJack() ) {
				this.message = 'BlackJack!!';
				this.status = 1;
				return;
			}
			this.message = '21 points!';
			this.status = 2;
			return ;
		};

		Player.prototype.hasBlackJack = function() {
			var firstCard,
				secondCard;

			if ( this.hand.length > 2 ) {
				return false;
			}

			firstCard = this.hand[0].getCardValue();
			secondCard = this.hand[1].getCardValue();

			if ( ( firstCard === 10 || firstCard === 1 ) && ( secondCard === 10 || secondCard === 1 ) && ( firstCard + secondCard === 11 || firstCard + secondCard === 21 ) ) {
				return true;
			}

			return false;
		};

		return Player;
  	}]);