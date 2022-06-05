import { Endpoint } from 'rest-hooks';
import { Entity } from '@rest-hooks/endpoint';

class TodoEntity extends Entity {
  id = '';
  title = 'hello';
  completed = false;

  pk() {
    return this.id;
  }
}

const fetchTodoDetail = ({ id }) =>
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) =>
    res.json()
  );
const fetchTodoList = () =>
  fetch(`https://jsonplaceholder.typicode.com/todos`).then((res) => res.json());

const todoDetail = new Endpoint(fetchTodoDetail, {
  dataExpiryLength: 0,
  schema: TodoEntity,
});
const todoList = new Endpoint(fetchTodoList, {
  dataExpiryLength: 0,
});

export { todoDetail, todoList, TodoEntity };
