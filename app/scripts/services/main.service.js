(function () {

  'use strict';

  angular
    .module('cyborgTrackerApp')
    .factory('MainService', MainService);

    function MainService ($http, $q) {
      var tasks = [];
      var task = {};
      var add = {};
      var resolvedData = false;

      return {
        getTasks: function () {
          if(tasks.length == 0 && !resolvedData) {
            return $http.get('../../data/tasks.json')
              .then(function(result) {
                tasks = result.data;
                resolvedData = true;
                return tasks;
              });
          } else {
            return $q(function (resolve, reject) {
              resolve(tasks);
            });
          }
        },
        doIt: function (task) {
          task.completed += 1;
          task.last_event = new Date();
          task.events.push(new Date());
        },
        newTask: function() {
          tasks.push({
            task_name: task.task_name,
            task_notes: task.task_notes,
            completed: 0,
            last_event: '',
            events: []
          });
          task = {};
        },
        clearTaskForm: function() {

        }
        // toggleButtons: function(task) {
        //     if(task.showButtons == true) {
        //       task.showButtons = false;
        //     } else {
        //       task.showButtons = true;
        //     }
        // }
      }
    }
})();
