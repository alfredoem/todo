<?php

namespace App\Http\Controllers\Main;

use App\Components\Todo\Todo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class MainController extends Controller
{

    public function getIndex()
    {
        $todo = Todo::orderBy('id', 'desc')->paginate(7);

        if (request()->ajax()) {

            return $todo;
            //return Response::json(view('ajax-posts')->with(compact('posts'))->render());
        }

        return view('index', compact('todo'));
    }


}