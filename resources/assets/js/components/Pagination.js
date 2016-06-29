// resources/assets/js/components/Pagination.js

var React = require('react');

module.exports = React.createClass({
    
    paginate: function(e) {
        e.preventDefault();

        let page = $(e.target).attr('href').split('page=')[1];

        $('.pagination').find('li').removeClass('active disabled');

        if ($(e.target).data('apply-active')) {
            $(e.target).parent().addClass('active');
        }

        let container = $('#pagination-container');
        container.addClass('overlay');

        let request = $.ajax({url : 'todo?page=' + page, dataType: 'json'});
        let self = this;

        request.done(function (res) {
            container.removeClass('overlay');
            self.props.renderTodos(res);
        }).fail(function () {
            alert('Posts could not be loaded.');
        });
    },
    
    render: function() {

        let pagination = this.props.pagination;

        return (
            <div id="pagination-container">
                <ul className={pagination.total ? 'pagination' : 'hidden'}>
                    <li>
                        <a className={pagination.prev_page_url ? '' : 'hidden'}
                           href={this.props.pagination.prev_page_url} aria-label="Previous"
                           onClick={this.paginate}>&laquo;</a>

                        <span className={ ! pagination.prev_page_url ? '' : 'hidden'} aria-hidden="true">
                            &laquo;</span>

                    </li>

                        {Array(this.props.pagination.last_page).join().split(',').map(function(e, f) {

                            return <li key={f + 1}
                                       className={pagination.current_page == f + 1 ? 'active' : ''}>

                                <a className={pagination.current_page == f + 1 ? 'hidden' : ''}
                                   href={`todo?page=${f + 1}`} data-apply-active="true"
                                   onClick={this.paginate}>{ f + 1 }</a>

                                <span className={pagination.current_page == f + 1 ? '' : 'hidden'}>
                                    { f + 1 }</span>
                            </li>;

                         }, this) }

                    <li>
                        <a className={pagination.next_page_url ? '' : 'hidden'}
                           href={pagination.next_page_url} aria-label="Next" onClick={this.paginate}>
                            &raquo;</a>

                        <span className={ ! pagination.next_page_url ? '' : 'hidden'}
                              aria-hidden="true">&raquo;</span>

                    </li>
                </ul>
            </div>
        );


    }


});