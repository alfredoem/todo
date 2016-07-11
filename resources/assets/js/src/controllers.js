// resources/assets/js/src/controllers.js

angular
    .module('todo.controllers', [])
    .controller('TodoController', ['$scope', '$http', function($scope, $http){
        $scope.todos = [];
        $scope.loading = true;
        $scope.pagination = [];
        $scope._token = '';
        $scope.deleteTarget = {id: 0, task: ''};
        $scope.create = {show: true, cancel: false};
        
        $http.get('todo?page=1').then(function(res) {
            $scope.loading = false;
            $scope.renderTodo(res);
        });

        $scope.renderTodo = function(res) {
            $scope.todos = res.data.data;
            delete res.data.data;
            $scope.pagination = res.data;
        };

        $scope.getActivePage = function() {
            let container = $('.pagination');
            let active = container.find('li.active');
            return (container.length && active.length)
                        ? active.find('span').html().trim() : null;
        };

        $scope.createShow = function(e) {
            e.preventDefault();
            $scope.create.show = false;
            $scope.create.cancel = true;
        };

        $scope.createCancel = function() {
            $scope.create.show = true;
            $scope.create.cancel = false;
        };

    }])
    .controller('PaginationController', ['$scope', '$http', function($scope, $http){

        $scope.paginationClass = function() {
            return ($scope.pagination.total > 1 &&
                    $scope.pagination.current_page < $scope.pagination.last_page)
                    ? 'pagination' : 'hide';
        };

        $scope.paginate = function(e) {
            e.preventDefault();

            let page = $(e.target).attr('href').split('page=')[1];

            $('.pagination').find('li').removeClass('active disabled');

            if ($(e.target).data('apply-active')) {
                $(e.target).parent().addClass('active');
            }

            let container = $('#pagination-container');
            container.addClass('overlay');

            $http.get('todo?page=' + page).then(function(res){
                container.removeClass('overlay');
                $scope.renderTodo(res);
            }, function(){
                alert('Posts could not be loaded.');
            });
        }
    }])
    .controller('CreateController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){
        $scope.loader = false;
        $scope.value = '';

        $scope.createClass = function() {
            return ($scope.create.show) ? 'hidden'
                                        : ($scope.loader ? 'overlay' : '');
        };

        $scope.$watch('create.cancel', function(){
            if ($scope.create.show == false && $scope.create.cancel == true) {
                $timeout(function () {
                    $('#task_input_0').focus();
                });
            }
        });

        $scope.handleKeyUp = function(e) {

            if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
                return $scope.store();
            } else if (e.keyCode == 27) {
                $scope.value = '';
                return $scope.createCancel();
            }
        };

        $scope.store = function() {

            if ($scope.value.trim()) {

                $scope.loader = true;

                let url = ($scope.getActivePage())
                            ? `todo?page=${$scope.getActivePage()}`
                            : 'todo';

                $http.post(url, {task: $scope.value}).then(function(res){
                    $scope.value = '';
                    $scope.loader = false;
                    $scope.renderTodo(res);
                });


            } else {
                $('#task_input_0').addClass('invalid').focus();
            }
        }
    }])
    .controller('TaskController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout){

        $scope.loader = false;
        $scope.task = $scope.todo.task;
        $scope.editTask = $scope.todo.task;
        $scope.id = $scope.todo.id;
        $scope.modeEdit = false;


        $scope.$watch('modeEdit', function(newValue){

            if (newValue == true) {
                $timeout(function () {
                    $(`#task_input_${$scope.id}`).select();
                });
            }
        });

        $scope.update = function() {

            if ($scope.editTask.trim()) {
                $scope.loader = true;

                let id =  $scope.id;
                let url ='todo/' + id;
                let data = {_token: $scope._token, task: $scope.editTask };

                $http.patch(url, data).then(function(res){
                    $scope.modeEdit = false;
                    $scope.id = res.data.id;
                    $scope.task = res.data.task;
                    $scope.loader = false;
                });
                
            } else {
                $(`#task_input_${$scope.id}`).addClass('invalid').focus();
            }
        };

        $scope.edit = function() {
            $scope.modeEdit = true;
        };

        $scope.editCancel = function() {
            $scope.modeEdit = false;
            $scope.editTask = $scope.task;
        };

        $scope.handleKeyUp = function(e) {
            if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
                return $scope.update();
            } else if (e.keyCode == 27) {
                $scope.task = '';
                return $scope.editCancel();
            }
        };

        $scope.deleteDialog = function(e) {
            e.preventDefault();

            $scope.deleteTarget.id = $scope.id;
            $scope.deleteTarget.task = $scope.task;

            let modal = $('#modal-task-delete');
            let task = $(`#task_span_${$scope.id}`);

            $(`#task_${$scope.id}`).addClass('red accent-1');

            modal.openModal({dismissible: false});
        };
    }])
    .controller('DialogController', ['$scope', '$http', function($scope, $http){

        $scope.loader = false;

        $scope.deleteCancel = function(e){
            e.preventDefault();
            let modal = $('#modal-task-delete');
            $(`#task_${$scope.deleteTarget.id}`).removeClass('red accent-1');
            modal.closeModal();
        };

        $scope.delete = function(e) {
            e.preventDefault();
            $scope.loader = true;
            let modal = $('#modal-task-delete');
            let page = $scope.getActivePage();
            let url = (page) ? `todo/${$scope.deleteTarget.id}?page=${page}` : `todo/${$scope.deleteTarget.id}`;

            $http.delete(url, {_token: $scope._token}).then(function(res){
                $scope.loader = false;
                modal.closeModal();
                $scope.renderTodo(res);
            });
        };

    }]);