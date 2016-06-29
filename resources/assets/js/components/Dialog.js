// resources/assets/js/components/Dialog.js

var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
      return {
          loader: false
      }
    },

    deleteCancel: function(e){
        e.preventDefault();
        let modal = $('#modal-task-delete');
        $(`#task_${this.props.deleteId}`).removeClass('red accent-1');
        modal.closeModal();
    },

    delete: function(e) {
        e.preventDefault();
        this.setState({loader: true});
        let modal = $('#modal-task-delete');
        let page = this.props.activePage();
        let url = (page) ? `todo/${this.props.deleteId}?page=${page}` : `todo/${this.props.deleteId}`;
        let request = $.ajax({url: url, type: 'delete', data: {_token: $('#_token').val()}});
        var self = this;

        request.done(function(res){
            self.setState({loader: false});
            modal.closeModal();
            self.props.renderTodos(res);
        });
    },

    render: function() {
        return (
            <div id="modal-task-delete" className="modal">
                <div className="modal-content">
                    <h4>Are sure want to delete record?</h4>
                    <p id="task-to-delete-text">---</p>
                </div>
                <div className={this.state.loader ? 'overlay modal-footer' : "modal-footer"}>
                    <a href="javascript:void(0)" className="waves-effect waves-red btn-flat" onClick={this.deleteCancel}>Cancel</a>
                    <a href="javascript:void(0)" className="waves-effect waves-green btn-flat" onClick={this.delete}>Delete</a>
                </div>
            </div>
        );
    }
    
});