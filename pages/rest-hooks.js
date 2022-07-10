import React, { Suspense } from 'react';
import { CacheProvider, useController, useSuspense } from 'rest-hooks';

import { useMounted, useSwitch } from '../components/rest-hooks/hooks';
import {
  todoDelete,
  todoDetail,
  todoList,
} from '../components/rest-hooks/endpoints';

function Feature() {
  const featuredTodo = useSuspense(todoDetail, { id: 1 });

  return (
    <div className="bg-purple-500">
      Featured Todo: {featuredTodo.title} {featuredTodo.pk()}
    </div>
  );
}

function API() {
  const { on, onClick } = useSwitch(true);
  const { fetch } = useController();
  const todos = useSuspense(todoList);

  return (
    <>
      <Suspense fallback={<div>deleting...</div>}>{on && <Feature />}</Suspense>
      <div>
        {todos.map((todo) => {
          return (
            <div
              key={todo.pk()}
              className="m-2 flex items-center gap-4 bg-blue-300 p-2"
            >
              <h4>
                {todo.title} {todo.pk()}
              </h4>
              <button
                className="block rounded-md bg-blue-600 p-2 text-white"
                onClick={async () => {
                  await fetch(todoDelete, { id: todo.pk() });

                  if (todo.pk() === 1) {
                    onClick();
                  }
                }}
              >
                Remove this todo
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function RestHooks() {
  const { mounted } = useMounted();

  if (!mounted) return <></>;

  return (
    <CacheProvider>
      <div>API</div>
      <Suspense fallback={<div>loading...</div>}>
        <API />
      </Suspense>
    </CacheProvider>
  );
}
