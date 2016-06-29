// resources/assets/js/components/List.js

var React = require('react');
var Task = require('./Task');

module.exports = React.createClass({

    render: function() {
        return (
            <ul id="todo-list"
                className={this.props.todo.length ? 'collection with-header' : 'hidden'}>
                {
                    this.props.todo.map(function(row){
                        return <Task key={row.id} token={this.props.token} data={row}
                                     deleteDialog={this.props.deleteDialog}>
                        </Task>
                    }, this)
                }
            </ul>
        );
    }

});