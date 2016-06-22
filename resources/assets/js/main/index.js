//$(".button-collapse").sideNav();

var Todo = require('../components/Todo');

$(document).on('click', '.task-create', function(e){
    e.preventDefault();
    console.log('create');
    $('.task-create').hide();
    Todo.create();
});

$(document).on('click', '.task-create-cancel', function(e){
    e.preventDefault();
    console.log('task-create-cancel');
    $('.task-create-cancel').hide();
    Todo.createCancel();
});

$(document).on('click', '.task-store', function(e){
    e.preventDefault();
    console.log('create');
    Todo.store();
});

$(document).on("keypress", "input", function(e) {


    if (e.keyCode == 13) {
        e.preventDefault();
        let id = $(this).data('task-id');

        if ($('#task_0').length) {

            console.log('I Could die for you');

            Todo.store();
        } else {
            Todo.update(id);
        }


        return false;
    }

});


$(document).on('click', '.task-edit', function(e){
    e.preventDefault();
    console.log('edit');
    let id = $(this).data('task-id');
    Todo.edit(id);
});

$(document).on('click', '.task-edit-cancel', function(e){
    e.preventDefault();
    console.log('edit-cancel');
    let id = $(this).data('task-id');
    Todo.editCancel(id);
});

$(document).on('click', '.task-update', function(e){
    e.preventDefault();
    console.log('update');
    let id = $(this).data('task-id');
    Todo.update(id);
});

$(document).on('click', '.task-delete-dialog', function(e){
    e.preventDefault();
    console.log('delete-dialog');
    let id = $(this).data('task-id');
    Todo.deleteDialog(id);
});

$(document).on('click', '.task-delete-cancel', function(e){
    e.preventDefault();
    Todo.deleteCancel();
});

$(document).on('click', '.task-delete', function(e){
    e.preventDefault();
    console.log('delete');
    Todo.delete();
});

$(function() {
    $('main').on('click', '.pagination a', function (e) {
        $('.pagination').find('li').removeClass('active disabled');

        $(this).parent().addClass('active');
        getTodo($(this).attr('href').split('page=')[1]);
        e.preventDefault();
    });
});

function getTodo(page) {
    $.ajax({
        url : '?page=' + page,
        dataType: 'json'
    }).done(function (res) {
        Todo.renderTodo(res);
    }).fail(function () {
        alert('Posts could not be loaded.');
    });
}
