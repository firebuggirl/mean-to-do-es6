'use strict';

import angular from 'angular';

export default function todo() {
  return {
    templateUrl: 'templates/todo.html',
    replace: true,
    controller: 'todoCtrl'
  }
}
