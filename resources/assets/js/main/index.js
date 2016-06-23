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
    Todo.createCancel();
});

$(document).on('click', '.task-store', function(e){
    e.preventDefault();
    console.log('create');
    Todo.store();
});

$(document).on("keypress", "textarea", function(e) {

    if (e.keyCode == 13) {
        e.preventDefault();
        let id = $(this).data('task-id');

        if ($('#task_0').length) {
            Todo.store();
        } else {
            Todo.update(id);
        }

        return false;
    } else if (e.keyCode == 27) {
        let id = $(this).data('task-id');
        if (id == 0) {
            Todo.createCancel();
        } else {
            Todo.editCancel(id);
        }
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

$('main').on('click', '.pagination a', function (e) {
    $('.pagination').find('li').removeClass('active disabled');
    $(this).parent().addClass('active');
    Todo.all($(this).attr('href').split('page=')[1]);
    e.preventDefault();
});

$(document).ready(function(){
    Todo.all(1);
});