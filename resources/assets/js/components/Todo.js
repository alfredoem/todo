

class Todo {

    update(id) {

        let form = $(`#task_form_${id}`);
        var request = $.ajax({url: 'todo/' + id, type: 'patch', data: form.serialize()});

        request.done(function(res){
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
        $('#view_' + id).hide();
        $('#edit_' + id).show();
        $(`#task_input_${id}`).val(text.trim()).select();
    }
    
    createCancel() {
        $('.task-create-cancel').hide();
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
        let form_data = $('#task_form_0').serialize();
        let url = (this.getActivePage()) ? `todo?page=${this.getActivePage()}` : 'todo';
        let request = $.ajax({url: url, type: 'post', data: form_data});
        let self = this;
        request.done(function(res){
            self.renderTodo(res);
            $('.task-create-cancel').hide();
            $('.task-create').show();
        });
    }

    getActivePage() {
        let container = $('.pagination');
        let active = container.find('li.active');
        return (container.length && active.length) ? active.find('span').html().trim() : null;
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
        let url = (this.getActivePage()) ? `todo/${id}?page=${this.getActivePage()}`
                                         : `todo/${id}`;
        let request = $.ajax({url: url, type: 'delete', data: {_token: $('#_token').val()}});
        let self = this;

        request.done(function(res){
            modal.closeModal();
            self.renderTodo(res);
        });
    }

    renderTodo(res) {
        let list = $('#todo-list');
        let collection = list.find('li:eq(0)').prop('outerHTML');
        list.empty();

        if (res.data.length) {
            for (let i in res.data) {
                collection += this.li(res.data[i]);
            }

            list.append(collection);
            this.renderPagination(res)
        } else {
            list.append(collection);
            list.append(`<li class="collection-item grey lighten-4 grey-text">
                        [ Add Your first Task ]
                        </li>`);
        }
    }

    renderPagination(res) {
        let pagination = '';

        if ( ! $('.pagination').length && res.data.length) {
            console.log('create pagination ul');
            $('#pagination-container').append(`<ul class="pagination"></ul>`)
        }

        let container = $('.pagination');


        if (res.data.length) {

            container.empty();

            if (res.last_page > 1) {

                let url = location.protocol + "//" + location.host;

                let prev = (res.prev_page_url === null)
                    ? `<li><span> << </span></li>`
                    : `<li><a href="${res.prev_page_url}"> << </a></li>`;

                let next = (res.next_page_url === null)
                    ? `<li><span> >> </span></li>`
                    : `<li><a href="${res.next_page_url}"> >> </a></li>`;

                pagination += prev;

                for (let i = 1; i <= res.last_page; i++) {

                    let li = `<li><a href="${url}?page=${i}">${i}</a></li>`;

                    if (res.current_page == i) {
                        li = `<li class="active"><span class="active">${i}</span></li>`;
                    }

                    pagination += li;
                }

                pagination += next;
                container.append(pagination);
            }

        }

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
                                <a href="javascript:void(0)" class="secondary-content 
                                        task-edit-cancel red-text text-accent-2" 
                                         data-task-id="${res.id}">
                                        <i class="material-icons font-35">not_interested</i>
                                    </a>
                                    
                                    <a href="javascript:void(0)" class="secondary-content 
                                     task-update" data-task-id="${res.id}">
                                        <i class="material-icons font-35">done</i>
                                    </a>
                                </div>
                            </div>

                        </form>

                    </div>
                </li>`;
    }

}

module.exports = new Todo;