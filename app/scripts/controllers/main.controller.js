(function() {

'use strict';

  angular
    .module('cyborgTrackerApp')
    .controller('MainController', MainController);

    MainController.$inject = ['MainService'];

  function MainController (MainService) {
    var vm = this;

    vm.task_name = '';
    vm.task_notes = '';

    MainService.getTasks()
      .then(function(tasks) {
        vm.tasks = tasks;
      });

    vm.newTaskEvent = function(task) {
      MainService.newTaskEvent(task);
    };
    vm.newTask = function() {
      MainService.newTask(vm.task_name, vm.task_notes);
      vm.task_name = '';
      vm.task_notes = '';
    };
    vm.updateTask = function(task) {
      MainService.updateTask(vm.task_name, vm.task_notes)
      console.log(task);
    }
  }
})();
