// resources/assets/js/main/index.js
var ReactDOM = require('react-dom');
var Todo = require('../components/Todo');

ReactDOM.render(
  <Todo source="todo"/>, document.getElementById('todo-container')
);
