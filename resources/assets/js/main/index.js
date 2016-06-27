var vm = new Vue({
    el: 'main',
    data: {
        title: 'TODO Vue.js',
        todos: [],
        loading: true,
        taskDialog: { id: 0, task: ''},
        showCreate: true,
        showCancel: false,
        pagination: { total: 0, per_page: 0, current_page: 0, last_page: 0, next_page_url: null,
                        prev_page_url: null, from: 0, to: 0 }
    },
    ready: function () {
        let self = this;

        let request = $.ajax({url : 'todo?page=1', dataType: 'json'});
        request.done(function(res){
            self.loading = false;
            self.renderTodos(res);
        });
    },

    computed: {
        pages: function() {
            let pages = [];

            for (let i = 1; i <= this.pagination.last_page; i++) {

                if (this.pagination.current_page == i) {
                    pages.push({n: i, clase: 'active'});
                } else {
                    pages.push({n: i, clase: ''});
                }

            }
            
            return pages;
        }
    },
    methods: {
        paginate: function(e) {
            e.preventDefault();
            let page = $(e.target).attr('href').split('page=')[1];

            this.createCancel();

            $('.pagination').find('li').removeClass('active disabled');

            if ($(e.target).data('apply-active')) {
                $(e.target).parent().addClass('active');
            }

            let container = $('#pagination-container');
            container.fadeTo('slow', .6);
            container.append('<div id="container-disabled" class="overlay"></div>');

            let request = $.ajax({url : 'todo?page=' + page, dataType: 'json'});
            let self = this;
            
            request.done(function (res) {
                container.fadeTo('slow', 1);
                container.find('#container-disabled').remove();
                self.renderTodos(res);
            }).fail(function () {
                alert('Posts could not be loaded.');
            });
        },

        create: function(e) {
            e.preventDefault();
            this.showCreate = false;
            this.showCancel = true;

            $('#todo-list').find('li:eq(0)').append(this.templateCrate());
            this.$compile(this.$el);

            $('#task_0').find('#task_input_0').focus();
        },

        createCancel: function() {
            this.showCancel = false;
            this.showCreate = true;
            $('#task_0').remove();
        },

        store: function() {

            let input = $('#task_input_0');

            if (input.val().trim()) {

                let form_data = $('#task_form_0').serialize();
                let url = (this.getActivePage()) ? `todo?page=${this.getActivePage()}` : 'todo';
                let request = $.ajax({url: url, type: 'post', data: form_data});
                var self = this;

                request.done(function(res){
                    $('#task_0').remove();
                    self.showCancel = false;
                    self.showCreate = true;
                    self.renderTodos(res);
                });
            } else {
                input.addClass('invalid').focus();
            }
        },

        edit: function(id, e) {
            e.preventDefault();
            $('#view_' + id).hide();
            $('#edit_' + id).show();
            $(`#task_input_${id}`).select();
        },
        editCancel: function(id, e) {
            e.preventDefault();
            let text = $('#task_span_' + id).html();
            $(`#task_input_${id}`).val(text.trim());
            $('#edit_' + id).hide();
            $('#view_' + id).show();
        },
        update: function(id, index, e) {
            e.preventDefault();

            let form = $(`#task_form_${id}`);
            let request = $.ajax({url: 'todo/' + id, type: 'patch', data: form.serialize()});
            let self = this;

            request.done(function(res){
                let task =  self.todos[index];
                task.id = res.id;
                task.task = res.task;
                task.createdAt = res.createdAt;
                task.UpdatedAt = res.UpdatedAt;
                $('#view_' + id).show();
                $('#edit_' + id).hide();
            });
        },
        deleteDialog: function(id, e) {
            e.preventDefault();

            let task = $(`#task_span_${id}`);

            $(`#task_${id}`).addClass('red accent-1');

            this.taskDialog.id = id;
            this.taskDialog.task = task.html().trim();

            $('#modal-task-delete').openModal({dismissible: false});
        },
        deleteCancel: function(e) {
            e.preventDefault();
            let modal = $('#modal-task-delete');
            $(`#task_${this.taskDialog.id}`).removeClass('red accent-1');
            modal.closeModal();
        },
        delete: function(e) {
            e.preventDefault();
            let modal = $('#modal-task-delete');
            let page = this.getActivePage();
            let url = (page) ? `todo/${this.taskDialog.id}?page=${page}` : `todo/${page}`;
            let request = $.ajax({url: url, type: 'delete', data: {_token: $('#_token').val()}});
            var self = this;

            request.done(function(res){
                modal.closeModal();
                self.renderTodos(res);
            });
        },

        renderTodos: function(res) {
            this.todos = res.data;
            this.pagination = res;
        },

        getActivePage: function() {
            let container = $('.pagination');
            let active = container.find('li.active');
            return (container.length && active.length) ? active.find('span').html().trim() : null;
        },
        
        templateCrate: function() {
            let token = $('#_token').val();

            return `<li id="task_0" class="collection-item">                    
                    <div id="edit_0" class="edit-mode">
                        <form id="task_form_0" class="col s10">
                            <input type="hidden" name="_token" value="${token}">
                            <div class="row valign-wrapper">
                                <div class="input-field col s10">
                                    <textarea id="task_input_0" name="task" 
                                    class="materialize-textarea validate" maxlength="255" 
                                     v-on:keyup.enter="store" 
                                     v-on:keyup.esc="createCancel"></textarea>
                                    <label for="task_input_0">Task Description</label>
                                </div>
                                <div class="col s2 valign">
                                    <a href="javascript:void(0)" class="secondary-content task-store"
                                      v-on:click="store">
                                        <i class="medium material-icons">done</i>
                                    </a>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                </li>`;
        }
    }
});
