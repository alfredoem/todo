// resources/assets/js/directives.js

angular
    .module('todo.directives', [])
    .directive('todoControls', function(){
        return {
            restrict: 'E',
            templateUrl: 'partials/todo-controls.html'
        }
    })
    .directive('todoPagination', function(){
        return {
            restrict: 'E',
            templateUrl: 'partials/todo-pagination.html'
        }
    })
    .directive('todoList', function(){
        return {
            restrict: 'E',
            templateUrl: 'partials/todo-list.html'
        }
    })
    .directive('todoCreate', function(){
        return {
        restrict: 'E',
        templateUrl: 'partials/todo-create.html'
    }})
    .directive('todoListTask', function(){
        return {
        restrict: 'E',
        templateUrl: 'partials/todo-list-task.html'
    }})
    .directive('todoDialog', function(){
        return {
            restrict: 'E',
            templateUrl: 'partials/todo-dialog.html'
    }});
