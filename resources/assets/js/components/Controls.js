// resources/assets/js/components/Controls.js

var React = require('react');

module.exports = React.createClass({

    render: function() {

        return (
            <div className="fixed-action-btn">
                <div className="row">
                    <a className={this.props.showCreate ? 'btn-floating btn-large right waves-effect waves-light red task-create' : 'hidden'} onClick={this.props.create}>
                        <i className="material-icons">add</i></a>

                    <a className={this.props.showCancel ? 'btn-floating btn-large right waves-effect waves-light red task-create-cancel' : 'hidden'} onClick={this.props.createCancel}><i className="material-icons">not_interested</i></a>
                </div>

            </div>
        );

    }


});