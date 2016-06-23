<?php

namespace App\Http\Controllers\Main;

use App\Components\Todo\Todo;
use App\Http\Controllers\Controller;

class MainController extends Controller
{

    public function getIndex()
    {
        return view('index');
    }


}