<?php

namespace App\Http\Controllers\Todo;

use App\Components\Todo\Todo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;

class TodoController extends Controller
{
    public function index()
    {
        sleep(2);
        return Todo::orderBy('id', 'desc')->paginate(7)->setPath(url('todo'));
    }

    public function destroy($id)
    {
        Todo::destroy($id);

        $todo = $this->index();

        if ($todo->isEmpty()) {

            Paginator::currentPageResolver(function () {
                return (request()->page > 1) ? request()->page - 1 : request()->page;
            });

            $todo = $this->index();
        }

        return $todo;
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

        return $this->index();
    }


}