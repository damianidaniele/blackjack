'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('blackjackApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it( 'should do nothing..', function () {
    expect(1).toBe(1);
  });
});
