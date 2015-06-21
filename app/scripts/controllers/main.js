'use strict';

/**
 * @ngdoc function
 * @name blackjackApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Main Controller of the blackjackApp
 */
(function() {
    function validate( value ) {
        if ( isNaN( parseInt( value ) ) && !isFinite( value ) ) {
            return false;
        } 
        
        if ( parseInt( value ) < 1 || parseInt( value ) > 7 ) {
            return false;
        }
        return true;
    } 

    function MainCtrl( $location ) {

      this.players = 1;
      this.invalid = false;

      this.play = function() {

          if ( validate( this.players ) ) {
            $location.path( '/play/' + this.players );
          } else {
            this.invalid = true;
          }
        };
    }

    angular.module( 'blackjackApp' )
      .controller( 'MainCtrl', ['$location', MainCtrl]);
    
})();

