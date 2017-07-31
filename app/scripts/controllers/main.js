'use strict';

import angular from 'angular';

class MainController {
  // @ngInject
  constructor($scope, $log, $interval, dataService) {
    $scope.seconds = 0;
    $scope.counter = () => {
      $scope.seconds++;
      $log.log($scope.seconds + ' seconds have passed!');
    };

    $interval($scope.counter, 1000, 10);

    dataService.getTodos((response) => {
      var todos = response.data.todos;  
      $scope.todos =  todos;
    });
    
    $scope.addTodo = () => {
      $scope.todos.unshift({name: "This is a new todo.",
                        completed: false});
    };
  }
}

MainController.$inject = ['$scope', '$log', '$interval', 'dataService'];

export default MainController;