@extends('layouts.main')
@section('container')

    <main>
        <ul id="todo-list" class="collection with-header">
            <li class="collection-header"><h4 class="red-text">TODO VueJS</h4></li>
            <li><div class="loader">Loading...</div></li>
        </ul>

        <div id="pagination-container"></div>

        <input type="hidden" id="_token" value="{{csrf_token()}}">

        <!-- Modal Structure -->
        <div id="modal-task-delete" class="modal" data-taget-id="0">
            <div class="modal-content">
                <h4>Are sure want to delete record?</h4>
                <p id="task-to-delete-text">---</p>
            </div>
            <div class="modal-footer">
                <a href="javascript:void(0)" class="waves-effect waves-red btn-flat task-delete-cancel">Cancel</a>
                <a href="javascript:void(0)" class="waves-effect waves-green btn-flat task-delete">Delete</a>
            </div>
        </div>

    </main>

    <div class="fixed-action-btn">
        <div class="row">
            <a class="btn-floating btn-large right waves-effect waves-light red task-create"><i class="material-icons">add</i></a>

            <a class="btn-floating btn-large right waves-effect waves-light red task-create-cancel" style="display: none"><i class="material-icons">not_interested</i></a>
        </div>

    </div>
@endsection