'use strict';

angular
	.module( 'blackjackApp' )
  	.factory( 'Card', [ function () {
   		
  		var Card = function() {};

		Card.prototype.getCardValue = function() {
			
			if ( this.point === 'J' || this.point === 'Q' || this.point === 'K' ) {
				return 10;
			}

			if ( this.point === 'A' ) {
				return 1;
			} 

			return parseInt( this.point );
		};

		return Card;

  	}]);