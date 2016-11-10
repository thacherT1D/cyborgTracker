(function() {

'use strict';

  angular
    .module('cyborgTrackerApp')
    .controller('MainController', MainController);

    MainController.$inject = ['MainService'];

  function MainController (MainService) {
    var vm = this;
    MainService.getTasks()
      .then(function(tasks) {
        vm.tasks = tasks;
      });

    vm.addOne = function(task) {
      console.log('I did it!');
      MainService.doIt(task);
      console.log(task.task_name, ': ', task.completed);
      console.log(task.last_event);

    };
    vm.addTask = function() {
      MainService.newTask();
    };
    // vm.switch = function(task) {
    //   MainService.toggleButtons(task);
    //   console.log('toggled!');
    // };
  }
})();
