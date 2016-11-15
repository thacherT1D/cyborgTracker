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
      var task_name = '';
      var task_notes = '';

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
        newTaskEvent: function (task) {
          task.completed += 1;
          task.last_event = new Date();
          task.events.push(new Date());
          console.log(task.last_event);
          console.log(task);

        },
        newTask: function(task_name, task_notes) {
          tasks.push({
            task_name: task_name,
            task_notes: task_notes,
            completed: 0,
            last_event: '',
            events: []
          });
          task_name = {};
          task_notes = {};
        },
        updateTask: function (new_task_name, new_task_notes) {
          task.task_name = new_task_name;
          task.task_notes = new_task_notes;
        }
      }
    }
})();
