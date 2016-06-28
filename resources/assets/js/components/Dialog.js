var React = require('react');

module.exports = React.createClass({

    getActivePage: function() {
        let container = $('.pagination');
        let active = container.find('li.active');
        return (container.length && active.length) ? active.find('span').html().trim() : null;
    },

    deleteCancel: function(e){
        e.preventDefault();
        let modal = $('#modal-task-delete');
        $(`#task_${this.props.deleteId}`).removeClass('red accent-1');
        modal.closeModal();
    },

    delete: function(e) {
        e.preventDefault();
        let modal = $('#modal-task-delete');
        let page = this.getActivePage();
        let url = (page) ? `todo/${this.props.deleteId}?page=${page}` : `todo/${this.props.deleteId}`;
        let request = $.ajax({url: url, type: 'delete', data: {_token: $('#_token').val()}});
        var self = this;

        request.done(function(res){
            modal.closeModal();
            self.props.renderTodos(res);
        });
    },

    render: function() {
        return (
            <div id="modal-task-delete" className="modal" data-taget-id="0">
                <div className="modal-content">
                    <h4>Are sure want to delete record?</h4>
                    <p id="task-to-delete-text">---</p>
                </div>
                <div className="modal-footer">
                    <a href="javascript:void(0)" className="waves-effect waves-red btn-flat task-delete-cancel" onClick={this.deleteCancel}>Cancel</a>
                    <a href="javascript:void(0)" className="waves-effect waves-green btn-flat task-delete" onClick={this.delete}>Delete</a>
                </div>
            </div>
        );
    }
    
});