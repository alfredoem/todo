@extends('layouts.main')
@section('container')

    <main>
        <ul id="todo-list" class="collection with-header">
            <li class="collection-header"><h4>TODO</h4></li>

            @forelse($todo as $row)

                <li id="task_{{$row->id}}" class="collection-item">
                    <div id="view_{{$row->id}}" class="view-mode">
                        <span id="task_span_{{$row->id}}">{{$row->task}}</span>

                        <a href="#modal-task-delete" class="secondary-content task-delete-dialog red-text text-accent-2"
                           data-task-id="{{$row->id}}" title="Delete Task">
                            <i class="material-icons">delete</i>
                        </a>
                        <a href="javascript:void(0)" class="secondary-content task-edit"
                           data-task-id="{{$row->id}}" title="Edit Task">
                            <i class="material-icons">mode_edit</i>
                        </a>
                    </div>

                    <div id="edit_{{$row->id}}" class="edit-mode" style="display: none">
                        <form id="task_form_{{$row->id}}" class="col s10">
                            <input type="hidden" name="_token" value="{{csrf_token()}}">
                            <div class="row valign-wrapper">
                                <div class="input-field col s10">
                                    <input placeholder="Enter task name" id="task_input_{{$row->id}}"
                                           type="text" class="validate task-input" name="task"
                                           data-task-id="{{$row->id}}">
                                </div>
                                <div class="col s2">
                                    <a href="javascript:void(0)" class="secondary-content task-edit-cancel
                                        red-text text-accent-2" data-task-id="{{$row->id}}">
                                        <i class="material-icons font-35">not_interested</i>
                                    </a>
                                    <a href="javascript:void(0)" class="secondary-content task-update valign"
                                       data-task-id="{{$row->id}}">
                                        <i class="material-icons font-35">done</i>
                                    </a>
                                </div>
                            </div>

                        </form>

                    </div>
                </li>

            @empty

                <li class="collection-item grey lighten-4 grey-text">[ Add Your first Task ]</li>

            @endforelse
        </ul>

        <div id="pagination-container">
            @if(! empty($todo))
                {!! $todo->render() !!}
            @endif
        </div>


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