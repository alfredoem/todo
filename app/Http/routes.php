<?php

Route::get('/', 'Main\MainController@getIndex');
Route::resource('/todo', 'Todo\TodoController');
