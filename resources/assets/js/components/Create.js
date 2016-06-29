// resources/assets/js/components/Create.js

var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            value: '',
            loader: false
        }
    },

    handleKeyUp: function(e) {
        if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
            return this.store();
        } else if (e.keyCode == 27) {
            this.setState({value: ''});
            return this.props.cancel();
        }
    },

    store: function() {

        if (this.state.value.trim()) {

            this.setState({loader: true});

            let form_data = $('#task_form_0').serialize();
            let url = (this.props.activePage()) ? `todo?page=${this.props.activePage()}` : 'todo';
            let request = $.ajax({url: url, type: 'post', data: form_data});
            var self = this;

            request.done(function(res){
                self.setState({value: '', loader: false});
                self.props.renderTodos(res);
            });

        } else {
            $('#task_input_0').addClass('invalid').focus();
        }
    },

    onChange: function(e) {
        this.setState({value: e.target.value});
    },

    render: function() {
        let token = $('#_token').val();

        return (
            <div id="task_0" className={this.props.show ? 'hidden' : 'collection-item ' + (this.state.loader ? 'overlay' : '')}>
                <div id="edit_0" className="edit-mode">
                    <form id="task_form_0" className="col s10">
                        <input type="hidden" name="_token" value={token}/>
                        <div className="row valign-wrapper">
                            <div className="input-field col s10">
                                <textarea id="task_input_0" name="task"
                                  className="materialize-textarea validate" maxlength="255"
                                  value={this.state.value}
                                  onChange={this.onChange} onKeyUp={this.handleKeyUp}>
                                </textarea>
                                <label for="task_input_0">Task Description</label>
                            </div>
                            <div className="col s2 valign">
                                <a href="javascript:void(0)" className="secondary-content"
                                   onClick={this.store}>
                                    <i className="medium material-icons ">done</i>
                                </a>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }

});