'use strict';

import angular from 'angular';

class DataService {
  // @ngInject
  constructor($http, $q, $log) {
    this.$http = $http;
    this.$q = $q;
    this.$log = $log;
  }
  getTodos(cb) {
    this.$http.get('/api/todos').then(cb);
  }
  
  deleteTodo(todo) {
    if (!todo._id) {
      return this.$q.resolve();
    }
    return this.$http.delete('/api/todos/' + todo._id)
      .then((result) => {      
        this.$log.log("I deleted the " + todo.name + " todo!");
      });
  }
  
  saveTodos(todos) {
    let queue = todos.map((todo) => {
      if (!todo._id) {
        return this.$http.post('/api/todos', todo);
      } else {
        return this.$http.put('/api/todos/' + todo._id, todo)
          .then((result) => result.data.todo);
      }
    });
    return this.$q.all(queue).then((results) => {
      this.$log.log("I saved " + todos.length + " todos!");
    });
  }  
}

// DataService.$inject = ['$http', '$q', '$log'];

export default DataService;
