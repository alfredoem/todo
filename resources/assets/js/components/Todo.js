

class Todo {

    getAll () {
        let request = $.ajax({url : 'todo?page=1', dataType: 'json'});
        return request;
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
            this.renderPagination(res);
            $('.task-delete-dialog').leanModal({dismissible: false});
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
                    <div id="view_${res.id}" class="view-mode row m0">
                        <div class="text-justify col s12">
                            <span class="break-word" id="task_span_${res.id}">${res.task}</span>
                        </div>
                        <div class="right-align col s12">
                            <a href="#modal-task-delete" class="secondary-content task-delete-dialog
                            red-text text-accent-2"
                            data-task-id="${res.id}" title="Delete Task">
                                <i class="material-icons">delete</i>
                            </a>
                            
                            <a href="javascript:void(0)" class="secondary-content task-edit"
                            data-task-id="${res.id}">
                                <i class="material-icons">mode_edit</i>
                            </a>
                        </div>  
                    </div>
                    
                    <div id="edit_${res.id}" class="edit-mode" style="display: none">
                        <form id="task_form_${res.id}" class="col s10">
                            <input type="hidden" name="_token" value="${token}">
                            <div class="row valign-wrapper">
                                <div class="input-field col s10">
                                                                                
                                   <textarea id="task_input_${res.id}" name="task" 
                                    class="materialize-textarea validate" 
                                    data-task-id="${res.id}"
                                    maxlength="255"></textarea>
                                </div>
                                <div class="col s2 valign">
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