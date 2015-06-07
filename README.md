# blackjack

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.


## Purpose

In frontend and/or backend, using javascript, make a simplified blackjack game (Draw cards and try and get close but not above 21)
The rules of the game can be found at: http://en.wikipedia.org/wiki/Blackjack.

### ELEMENTS:
	- 1 standard card deck
	- 1 dealer
	- X players

### CORE STEPS:
Dealer shuffles deck
Dealer deals 2 cards per player
Dealer declares win/loss/players out of game
One at a time, players in the game can either (repeatable)
	- keep the cards they have or (stick)
 	- get dealt another card (hit)
 	- dealer declares win/loss/players out of game


NOTES
-   The dealer is also a player, who auto plays (very simple rules that are up to you).
-   Add functionality for Splitting (if you are dealt cards of the same value you can split and play them as two hands simultaneously)
