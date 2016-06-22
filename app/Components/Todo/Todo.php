<?php

namespace App\Components\Todo;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $table = 'todo';
    public $timestamps = false;

}