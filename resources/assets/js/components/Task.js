var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            modeEdit: false,
            id: 0,
            task: '',
            editTask: ''
        }
    },

    componentDidMount: function() {
        this.setState({
            id: this.props.data.id,
            task: this.props.data.task, editTask:
            this.props.data.task}
        );
    },

    update: function() {
        let id = this.state.id;

        let form = $(`#task_form_${id}`);
        let request = $.ajax({url: 'todo/' + id, type: 'patch', data: form.serialize()});
        let self = this;

        request.done(function(res){
            self.setState({modeEdit: false, id: res.id, task: res.task})
        });
    },

    edit: function() {
        this.setState({modeEdit: true});
    },

    editCancel: function() {
         this.setState({modeEdit: false, editTask: this.state.task});
    },

    onChange: function(a, e) {
        this.setState({editTask: e.target.value});
    },

    getActivePage: function() {
        let container = $('.pagination');
        let active = container.find('li.active');
        return (container.length && active.length) ? active.find('span').html().trim() : null;
    },

    render: function() {

        let id = this.state.id;

        return (
            <li key={id} id={`task_${id}`} className="collection-item">
            <div id={`view_${id}`} className={this.state.modeEdit ? 'hidden' : 'view-mode row m0'}>
                <div className="text-justify col s12">
                    <span className="break-word" id={`task_span_${id}`}>{this.state.task}</span>
                </div>
                <div className="right-align col s12">
                    <a href="#modal-task-delete" className="secondary-content task-delete-dialog
                            red-text text-accent-2" title="Delete Task"
                       onClick={this.props.deleteDialog.bind(null, id)}>
                        <i className="material-icons">delete</i>
                    </a>

                    <a href="javascript:void(0)" className="secondary-content task-edit"
                       onClick={this.edit.bind(this, null)}>
                        <i className="material-icons">mode_edit</i>
                    </a>
                </div>
            </div>

            <div id={`edit_${id}`} className={this.state.modeEdit ? 'edit-mode' : 'hidden'}>
                <form id={`task_form_${id}`} className="col s10">
                    <input type="hidden" name="_token" value={this.props.token} />
                    <div className="row valign-wrapper">
                        <div className="input-field col s10">
                            <textarea id={`task_input_${id}`} name="task"
                                className="materialize-textarea validate" maxlength="255"
                                  value={this.state.editTask} onChange={this.onChange.bind(this, null)}></textarea>
                        </div>
                        <div className="col s2 valign">
                            <a href="javascript:void(0)" className="secondary-content
                                        task-edit-cancel red-text text-accent-2"
                            onClick={this.editCancel}>
                                <i className="material-icons font-35">not_interested</i>
                            </a>

                            <a href="javascript:void(0)" className="secondary-content task-update"
                            onClick={this.update}>
                                <i className="material-icons font-35">done</i>
                            </a>
                        </div>

                    </div>

                </form>

            </div>

        </li>
        );
    }

});