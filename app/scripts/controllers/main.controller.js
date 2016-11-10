(function() {

'use strict';

  angular
    .module('cyborgTrackerApp')
    .controller('MainController', MainController);

    MainController.$inject = ['MainService'];

  function MainController ($scope, MainService) {
    var vm = this;
    $scope.task = {};
    $scope.add = {};
    MainService.getTasks()
      .then(function(tasks) {
        vm.tasks = tasks;
      });

    vm.addOne = function(task) {
      MainService.doIt(task);
      console.log(task);
    };
    // vm.addTask = function() {
    //   MainService.newTask();
    // };
    $scope.add.addTask = function () {
      vm.tasks.push({
        task_name: $scope.task.task_name,
        task_notes: $scope.task.task_notes,
        completed: 0,
        last_event: '',
        events: []
      })
      $scope.task = {};
    }
    // vm.switch = function(task) {
    //   MainService.toggleButtons(task);
    //   console.log('toggled!');
    // };
  }
})();
