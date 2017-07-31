webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	var _main = __webpack_require__(3);
	
	var _main2 = _interopRequireDefault(_main);
	
	var _todo = __webpack_require__(4);
	
	var _todo2 = _interopRequireDefault(_todo);
	
	var _todo3 = __webpack_require__(5);
	
	var _todo4 = _interopRequireDefault(_todo3);
	
	var _data = __webpack_require__(6);
	
	var _data2 = _interopRequireDefault(_data);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_angular2.default.module('todoListApp', []).controller('mainCtrl', _main2.default).controller('todoCtrl', _todo2.default).service('dataService', _data2.default).directive('todo', _todo4.default);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MainController =
	// @ngInject
	function MainController($scope, $log, $interval, dataService) {
	  _classCallCheck(this, MainController);
	
	  $scope.seconds = 0;
	  $scope.counter = function () {
	    $scope.seconds++;
	    $log.log($scope.seconds + ' seconds have passed!');
	  };
	
	  $interval($scope.counter, 1000, 10);
	
	  dataService.getTodos(function (response) {
	    var todos = response.data.todos;
	    $scope.todos = todos;
	  });
	
	  $scope.addTodo = function () {
	    $scope.todos.unshift({ name: "This is a new todo.",
	      completed: false });
	  };
	};
	
	MainController.$inject = ['$scope', '$log', '$interval', 'dataService'];
	
	exports.default = MainController;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TodoController =
	// @ngInject
	function TodoController($scope, dataService) {
	  _classCallCheck(this, TodoController);
	
	  $scope.deleteTodo = function (todo, index) {
	    dataService.deleteTodo(todo).then(function () {
	      $scope.todos.splice(index, 1);
	    });
	  };
	
	  $scope.saveTodos = function () {
	    var filteredTodos = $scope.todos.filter(function (todo) {
	      return todo.edited;
	    });
	    dataService.saveTodos(filteredTodos).finally($scope.resetTodoState());
	  };
	
	  $scope.resetTodoState = function () {
	    $scope.todos.forEach(function (todo) {
	      todo.edited = false;
	    });
	  };
	};
	
	TodoController.$inject = ['$scope', 'dataService'];
	
	exports.default = TodoController;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = todo;
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function todo() {
	  return {
	    templateUrl: 'templates/todo.html',
	    replace: true,
	    controller: 'todoCtrl'
	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _angular = __webpack_require__(1);
	
	var _angular2 = _interopRequireDefault(_angular);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DataService = function () {
	  // @ngInject
	  function DataService($http, $q, $log) {
	    _classCallCheck(this, DataService);
	
	    this.$http = $http;
	    this.$q = $q;
	    this.$log = $log;
	  }
	
	  _createClass(DataService, [{
	    key: 'getTodos',
	    value: function getTodos(cb) {
	      this.$http.get('/api/todos').then(cb);
	    }
	  }, {
	    key: 'deleteTodo',
	    value: function deleteTodo(todo) {
	      var _this = this;
	
	      if (!todo._id) {
	        return this.$q.resolve();
	      }
	      return this.$http.delete('/api/todos/' + todo._id).then(function (result) {
	        _this.$log.log("I deleted the " + todo.name + " todo!");
	      });
	    }
	  }, {
	    key: 'saveTodos',
	    value: function saveTodos(todos) {
	      var _this2 = this;
	
	      var queue = todos.map(function (todo) {
	        if (!todo._id) {
	          return _this2.$http.post('/api/todos', todo);
	        } else {
	          return _this2.$http.put('/api/todos/' + todo._id, todo).then(function (result) {
	            return result.data.todo;
	          });
	        }
	      });
	      return this.$q.all(queue).then(function (results) {
	        _this2.$log.log("I saved " + todos.length + " todos!");
	      });
	    }
	  }]);
	
	  return DataService;
	}();
	
	// DataService.$inject = ['$http', '$q', '$log'];
	
	exports.default = DataService;

/***/ }
]);
//# sourceMappingURL=todo.bundle.js.map