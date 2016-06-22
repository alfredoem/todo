<?php

namespace App\Http\Controllers\Todo;

use App\Components\Todo\Todo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return "Aloha!";
    }

    public function destroy($id)
    {
        Todo::destroy($id);
    }

    public function update(Request $request, $id)
    {
        $task = Todo::find($id);
        $task->task = $request->task;
        $task->updatedAt = date('Y-m-d H:m:s');
        $task->save();

        return $task;
    }

    public function store(Request $request)
    {
        $task = new Todo;

        $task->task = $request->task;
        $task->createdAt = date('Y-m-d H:m:s');
        $task->save();

        return $task;
    }


}