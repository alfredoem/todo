var React = require('react');
var ReactDOM = require('react-dom');
var Task = require('../components/Task');
var Dialog = require('../components/Dialog');

var Todo = React.createClass({

    getInitialState: function () {
      return {
          todo: [],
          pagination: {},
          token: ''
      }
    },

    componentDidMount: function() {

        this.serverRequest = $.get(this.props.source, function(res){

           let data = res.data;
           delete res.data;

           this.setState({
               todo: data,
               pagination: res,
               token: document.getElementById('_token').value});

        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    deleteDialog: function(id, e) {
        e.preventDefault();

        this.setState({deleteId: id});

        let modal = $('#modal-task-delete');
        let task = $(`#task_span_${id}`);

        $(`#task_${id}`).addClass('red accent-1');

        modal.find('#task-to-delete-text').html(task.html().trim());
        modal.openModal({dismissible: false});
    },

    renderTodos: function(res) {

        let data = res.data;
        delete res.data;

        this.setState({todo: data, pagination: res});
    },

    render: function() {

        return (
            <div>
                <ul id="todo-list" className="collection with-header">
                    <li className="collection-header"><h4 className="red-text">TODO React</h4></li>
                    {
                        this.state.todo.map(function(row){
                            return <Task key={row.id} token={this.state.token} data={row}
                                         deleteDialog={this.deleteDialog} ></Task>
                        }, this)
                    }
                </ul>
    
                <Dialog deleteId={this.state.deleteId} renderTodos={this.renderTodos}></Dialog>
            </div>
        );
    }

});


ReactDOM.render(
  <Todo source="todo"/>, document.getElementById('todo-container')
);
