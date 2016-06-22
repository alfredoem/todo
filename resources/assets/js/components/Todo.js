

class Todo {

    update(id) {

        let form = $(`#task_form_${id}`);
        var request = $.ajax({url: 'todo/' + id, type: 'patch', data: form.serialize()});

        request.done(function(res){
            console.log(res);
            $(`#task_span_${id}`).html(res.task);
            $('#view_' + id).show();
            $('#edit_' + id).hide();
        });


    }

    editCancel(id) {
        let text = $('#task_span_' + id).html();
        $(`#task_input_${id}`).val(text.trim());
        $('#edit_' + id).hide();
        $('#view_' + id).show();
    }

    edit(id) {
        let text = $('#task_span_' + id).html();
        console.log('Aloha!');
        $('#view_' + id).hide();
        $('#edit_' + id).show();
        $(`#task_input_${id}`).val(text.trim()).select();
    }
    
    createCancel() {
        $('#task_0').remove();
        $('.task-create').show();
    }

    create() {
        $('.task-create-cancel').show();

        let token = $('#_token').val();

        let li = `<li id="task_0" class="collection-item">                    
                    <div id="edit_0" class="edit-mode">
                        <form id="task_form_0" class="col s10">
                            <input type="hidden" name="_token" value="${token}">
                            <div class="row">
                                <div class="input-field col s10">
                                    <input placeholder="Enter task name" id="task_input_0"
                                           type="text" class="validate" name="task" 
                                            data-task-id="0">
                                </div>
                                <div class="col s2">
                                    <a href="javascript:void(0)" class="secondary-content task-store"
                                       data-task-id="0">
                                        <i class="medium material-icons">done</i>
                                    </a>
                                </div>
                            </div>

                        </form>
                        
                    </div>
                </li>`;


        $('#todo-list').append(li);
        $('#task_0').find('#task_input_0').focus();

    }

    store() {
        let form = $('#task_form_0');
        var request = $.ajax({url: 'todo', type: 'post', data: form.serialize()});

        request.done(function(res){
            location.reload();

            /*let task = $('#task_0');
            let token = $('#_token').val();
            task.remove();*/

            /*let li = `<li id="task_${res.id}" class="collection-item">
                    <div id="view_${res.id}" class="view-mode">
                        <span id="task_span_${res.id}">${res.task}</span>
                        
                        <a href="javascript:void(0)" class="secondary-content task-delete-dialog
                            red-text text-accent-2"
                           data-task-id="${res.id}" title="Delete Task">
                            <i class="material-icons">delete</i>
                        </a>
                        
                        <a href="javascript:void(0)" class="secondary-content task-edit"
                           data-task-id="${res.id}">
                            <i class="material-icons">mode_edit</i>
                        </a>
                    </div>
                    
                    <div id="edit_${res.id}" class="edit-mode" style="display: none">
                        <form id="task_form_${res.id}" class="col s10">
                            <input type="hidden" name="_token" value="${token}">
                            <div class="row">
                                <div class="input-field col s10">
                                    <input placeholder="Enter task name" id="task_input_${res.id}"
                                           type="text" class="validate" name="task" 
                                           data-task-id="${res.id}">
                                </div>
                                <div class="col s2">
                                    <a href="javascript:void(0)" class="secondary-content task-update"
                                       data-task-id="${res.id}">
                                        <i class="medium material-icons">done</i>
                                    </a>
                                </div>
                            </div>

                        </form>

                    </div>
                </li>`;

            let list = $('#todo-list');

            list.find('li:eq(0)').after(li);

            if (list.find('li').length == 9) {
                list.find('li').last().remove();
            }

            $('.task-create-cancel').hide();
            $('.task-create').show();*/
        });
    }

    deleteDialog(id) {
        let modal = $('#modal-task-delete');
        let task = $(`#task_span_${id}`);

        $(`#task_${id}`).addClass('red accent-1');

        modal.data('target-id', id);

        modal.find('#task-to-delete-text').html(task.html().trim());
        modal.openModal();
    }

    deleteCancel() {
        let modal = $('#modal-task-delete');
        let id = modal.data('target-id');
        $(`#task_${id}`).removeClass('red accent-1');
        modal.closeModal();

    }
    
    delete() {
        let modal = $('#modal-task-delete');
        let id = modal.data('target-id');
        let request = $.ajax({url: `todo/${id}`, type: 'delete', data: {_token: $('#_token').val()}});
        request.done(function(res){
            location.reload();
        });
    }

    renderTodo(res) {
        console.log('render');
        let list = $('#todo-list');
        let collection = list.find('li:eq(0)').prop('outerHTML');
        list.empty();

        for (let i in res.data) {
            collection += this.li(res.data[i]);
        }

        list.append(collection);
        this.renderPagination(res)
    }

    renderPagination(res) {
        let pagination = '';
        let container = $('.pagination');
        let url = location.protocol + "//" + location.host;

        let prev = (res.prev_page_url === null)
                        ? `<li><span> << </span></li>`
                        : `<li><a href="${res.prev_page_url}"> << </a></li>`;

        let next = (res.next_page_url === null)
                        ? `<li><span> >> </span></li>`
                        : `<li><a href="${res.next_page_url}"> >> </a></li>`;

        pagination += prev;

        for (let i = 1; i <= res.last_page; i++) {

            let li = `<li><a href="${url}?page=${i}" >${i}</a></li>`;

            if (res.current_page == i) {
                li = `<li class="active"><span class="active">${i}</span></li>`;
            }

            pagination += li;
        }

        pagination += next;

        console.log(`Current page: ${res.current_page}`);

        container.empty().append(pagination);
    }
    
    li (res) {
        let token = $('#_token').val();

        return `<li id="task_${res.id}" class="collection-item">
                    <div id="view_${res.id}" class="view-mode">
                        <span id="task_span_${res.id}">${res.task}</span>
                        
                        <a href="javascript:void(0)" class="secondary-content task-delete-dialog
                            red-text text-accent-2"
                           data-task-id="${res.id}" title="Delete Task">
                            <i class="material-icons">delete</i>
                        </a>
                        
                        <a href="javascript:void(0)" class="secondary-content task-edit"
                           data-task-id="${res.id}">
                            <i class="material-icons">mode_edit</i>
                        </a>
                    </div>
                    
                    <div id="edit_${res.id}" class="edit-mode" style="display: none">
                        <form id="task_form_${res.id}" class="col s10">
                            <input type="hidden" name="_token" value="${token}">
                            <div class="row">
                                <div class="input-field col s10">
                                    <input placeholder="Enter task name" id="task_input_${res.id}"
                                           type="text" class="validate" name="task" 
                                           data-task-id="${res.id}">
                                </div>
                                <div class="col s2">
                                    <a href="javascript:void(0)" class="secondary-content task-update"
                                       data-task-id="${res.id}">
                                        <i class="medium material-icons">done</i>
                                    </a>
                                </div>
                            </div>

                        </form>

                    </div>
                </li>`;
    }

}

module.exports = new Todo;