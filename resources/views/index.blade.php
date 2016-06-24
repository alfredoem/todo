@extends('layouts.main')
@section('container')

    <main>
        <ul id="todo-list" class="collection with-header">
            <li class="collection-header"><h4 class="red-text">@{{ title }}</h4></li>
            <li v-show="loading"><div class="loader">Loading...</div></li>

            <li v-for="todo in todos" id="task_@{{ todo.id }}" class="collection-item">
                <div id="view_@{{todo.id}}" class="view-mode row m0">
                    <div class="text-justify col s12">
                        <span class="break-word" id="task_span_@{{todo.id}}">
                            @{{ todo.task }}</span>
                    </div>
                    <div class="right-align col s12">
                        <a href="#modal-task-delete" class="secondary-content
                            red-text text-accent-2" data-task-id="@{{todo.id}}"
                           title="Delete Task" v-on:click="deleteDialog(todo.id, $event)">
                            <i class="material-icons">delete</i>
                        </a>

                        <a href="javascript:void(0)" class="secondary-content task-edit"
                           data-task-id="@{{todo.id}}" v-on:click="edit(todo.id, $event)">
                            <i class="material-icons">mode_edit</i>
                        </a>
                    </div>
                </div>

                <div id="edit_@{{todo.id}}" class="edit-mode" style="display: none">
                    <form id="task_form_@{{todo.id}}" class="col s10">
                        <input type="hidden"
                               name="_token" value="{{csrf_token()}}">
                        <div class="row valign-wrapper">
                            <div class="input-field col s10">
                                   <textarea id="task_input_@{{todo.id}}" name="task"
                                     class="materialize-textarea validate" data-task-id="@{{todo.id}}"
                                     maxlength="255" v:on:keyup:esc="editCancel(todo.id, $event)"
                                     v-on:keyup.enter="update(todo.id, $index, $event)">@{{ todo.task }}</textarea>
                            </div>
                            <div class="col s2 valign">
                                <a href="javascript:void(0)" class="secondary-content
                                   red-text text-accent-2" data-task-id="@{{todo.id}}"
                                   v-on:click="editCancel(todo.id, $event)" >
                                    <i class="material-icons font-35">not_interested</i>
                                </a>

                                <a href="javascript:void(0)" class="secondary-content"
                                   v-on:click="update(todo.id, $index, $event)">
                                    <i class="material-icons font-35">done</i>
                                </a>
                            </div>
                        </div>

                    </form>

                </div>
            </li>
        </ul>

        <div id="pagination-container"></div>

        <input type="hidden" id="_token" value="{{csrf_token()}}">

        <!-- Modal Structure -->
        <div id="modal-task-delete" class="modal">
            <div class="modal-content">
                <h4>Are sure want to delete record?</h4>
                <p id="task-to-delete-text">@{{ taskDialog.task }}</p>
            </div>
            <div class="modal-footer">
                <a href="javascript:void(0)" v-on:click="deleteCancel" class="waves-effect waves-red btn-flat">Cancel</a>
                <a href="javascript:void(0)" class="waves-effect waves-green btn-flat task-delete"
                v-on:click="delete">Delete</a>
            </div>
        </div>

        <div class="fixed-action-btn">
            <div class="row">
                <a href="javascript:void(0)" class="btn-floating btn-large right waves-effect
            waves-light red task-create"
                   v-on:click="create" v-show="showCreate"><i class="material-icons">add</i></a>

                <a href="javascript:void(0)" class="btn-floating btn-large right waves-effect
            waves-light red task-create-cancel"
                   v-on:click="createCancel" v-show="showCancel"><i class="material-icons">not_interested</i></a>
            </div>

        </div>

    </main>


@endsection