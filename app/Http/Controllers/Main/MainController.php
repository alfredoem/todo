<?php

namespace App\Http\Controllers\Main;

use App\Components\Todo\Todo;
use App\Http\Controllers\Controller;

class MainController extends Controller
{

    public function getIndex()
    {
        $todo = Todo::orderBy('id', 'desc')->paginate(7)->setPath(url('todo'));
        return view('index', compact('todo'));
    }


}