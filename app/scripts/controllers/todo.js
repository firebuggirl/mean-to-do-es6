'use strict';

import angular from 'angular';

class TodoController {
  // @ngInject
  constructor($scope, dataService) {
    $scope.deleteTodo = (todo, index) => {
      dataService.deleteTodo(todo).then(() => {
        $scope.todos.splice(index, 1);
      });
    };
    
    $scope.saveTodos = () => {
      let filteredTodos = $scope.todos.filter((todo) => todo.edited)
      dataService.saveTodos(filteredTodos)
        .finally($scope.resetTodoState());
    };

    $scope.resetTodoState = () => {
      $scope.todos.forEach((todo) => {
        todo.edited = false;
      });
    }
  }
}

TodoController.$inject = ['$scope', 'dataService'];

export default TodoController;
