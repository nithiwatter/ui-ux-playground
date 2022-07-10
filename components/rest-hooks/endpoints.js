import { Endpoint } from "rest-hooks";
import { Entity, schema } from "@rest-hooks/endpoint";

class TodoEntity extends Entity {
  id = "";
  title = "hello";
  completed = false;

  pk() {
    return this.id;
  }
}

const fetchTodoDetail = ({ id }) =>
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) =>
    res.json()
  );
const fetchTodoDelete = ({ id }) =>
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  }).then(() => ({ id }));
const fetchTodoList = () =>
  fetch(`https://jsonplaceholder.typicode.com/todos`).then((res) => res.json());

const todoDetail = new Endpoint(fetchTodoDetail, {
  dataExpiryLength: 0,
  schema: TodoEntity,
});
const todoDelete = new Endpoint(fetchTodoDelete, {
  schema: new schema.Delete(TodoEntity),
  sideEffect: true,
});
const todoList = new Endpoint(fetchTodoList, {
  dataExpiryLength: 0,
  schema: [TodoEntity],
});

export { todoDetail, todoDelete, todoList, TodoEntity };
