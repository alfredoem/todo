@extends('layouts.main')
@section('container')

    <main>
        <div id="todo-container">
            <div class="loader">Loading...</div>
        </div>
        <input type="hidden" id="_token" value="{{csrf_token()}}">
    </main>

@endsection