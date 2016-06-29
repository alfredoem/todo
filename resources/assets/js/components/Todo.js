var React = require('react');
var Task = require('./Task');
var Dialog = require('./Dialog');
var Pagination = require('./Pagination');
var Create = require('./Create');
var Controls = require('./Controls');
var List = require('./List');

module.exports = React.createClass({

    getInitialState: function () {
        return {
            todo: [],
            pagination: {},
            token: '',
            showCreate: true,
            showCancel: false,
            showLoading: true
        }
    },

    componentDidMount: function() {

        this.serverRequest = $.get(this.props.source, function(res){

            let data = res.data;
            delete res.data;

            this.setState({
                todo: data,
                pagination: res,
                token: document.getElementById('_token').value,
                showLoading: false
            });

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

    create: function(e) {

        e.preventDefault();
        this.setState({showCreate: false, showCancel: true}, () => {
            $('#task_0').find('#task_input_0').focus();
        });

    },

    createCancel: function() {
        this.setState({showCreate: true, showCancel: false});
    },

    renderTodos: function(res) {

        let data = res.data;
        delete res.data;
        this.setState({todo: data, pagination: res});
    },

    getActivePage: function() {
        let container = $('.pagination');
        let active = container.find('li.active');
        return (container.length && active.length) ? active.find('span').html().trim() : null;
    },

    render: function() {

        return (
            <div>
                <div className="container">
                    <h4 className="red-text">TODO React</h4>
                    <Create show={this.state.showCreate} renderTodos={this.renderTodos}
                            cancel={this.createCancel} activePage={this.getActivePage}>
                    </Create>
                </div>

                <div className={this.state.showLoading ? 'loader' : 'hidden'}>Loading...</div>

                <List todo={this.state.todo} token={this.state.token}
                      deleteDialog={this.deleteDialog}>
                </List>

                <Dialog deleteId={this.state.deleteId} renderTodos={this.renderTodos}
                        activePage={this.getActivePage}>
                </Dialog>

                <Pagination pagination={this.state.pagination} renderTodos={this.renderTodos} >
                </Pagination>

                <Controls showCreate={this.state.showCreate} showCancel={this.state.showCancel}
                          create={this.create} createCancel={this.createCancel}>
                </Controls>

            </div>
        );
    }

});