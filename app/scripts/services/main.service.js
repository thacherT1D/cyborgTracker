(function () {

  'use strict';

  angular
    .module('cyborgTrackerApp')
    .factory('MainService', MainService);

    function MainService ($http, $q) {
      var tasks = [];
      var resolvedData = false;

      return {
        getTasks: function () {
          if(tasks.length == 0 && !resolvedData) {
            return $http.get('../../tasks.json')
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
        },
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
