@extends('layouts.main')
@section('container')


    <main>
        <div id="todo-container"><div class="loader">Loading...</div></div>

        <div id="pagination-container"></div>

        <input type="hidden" id="_token" value="{{csrf_token()}}">

    </main>

    <div class="fixed-action-btn">
        <div class="row">
            <a class="btn-floating btn-large right waves-effect waves-light red task-create"><i class="material-icons">add</i></a>

            <a class="btn-floating btn-large right waves-effect waves-light red task-create-cancel" style="display: none"><i class="material-icons">not_interested</i></a>
        </div>

    </div>
@endsection