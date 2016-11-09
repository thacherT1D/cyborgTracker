'use strict';

/**
 * @ngdoc function
 * @name cyborgTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cyborgTrackerApp
 */
angular.module('cyborgTrackerApp')
  .controller('MainCtrl', function () {
    this.tasks = [
      'New OmniPod',
      'Restart Dexcom',
      'New Dexcom Sensor',
      'New PDM Batteries',
      'Charged Dexcom',
      'New Lancet'
    ];
  });
