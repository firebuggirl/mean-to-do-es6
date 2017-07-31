'use strict';

import angular from 'angular';
import MainController from './scripts/controllers/main';
import TodoController from './scripts/controllers/todo';
import todo from './scripts/directives/todo';
import DataService from './scripts/services/data';
angular.module('todoListApp', [])
  .controller('mainCtrl', MainController)
  .controller('todoCtrl', TodoController)
  .service('dataService', DataService)
  .directive('todo', todo);