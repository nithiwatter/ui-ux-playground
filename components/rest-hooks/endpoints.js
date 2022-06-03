import { Endpoint } from 'rest-hooks';

const fetchTodoDetail = ({ id }) =>
  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) =>
    res.json()
  );

const todoDetail = new Endpoint(fetchTodoDetail, { dataExpiryLength: 0 });

export { todoDetail };
