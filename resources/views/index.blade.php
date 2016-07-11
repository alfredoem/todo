@extends('layouts.main')
@section('container')

    <main data-ng-app="todoApp">

        <div id="todo-container" data-ng-controller="TodoController">

            <div class="container">
                <h4 class="red-text">TODO AngularJS</h4>
                <todo-create></todo-create>
            </div>

            <todo-list></todo-list>
            <todo-pagination></todo-pagination>
            <todo-controls></todo-controls>
            <todo-dialog></todo-dialog>

            <input type="hidden" data-ng-model="_token" value="{{csrf_token()}}">

        </div>

        <input type="hidden" id="_token" value="{{csrf_token()}}">
    </main>

@endsection