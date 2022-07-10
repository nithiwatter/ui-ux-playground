import React, { Suspense } from "react";
import { CacheProvider, useController, useSuspense } from "rest-hooks";

import { useMounted } from "../components/rest-hooks/hooks";
import { todoList } from "../components/rest-hooks/endpoints";

function API() {
  const { fetch } = useController();
  const todos = useSuspense(todoList);

  return (
    <div>
      {todos.map((todo) => {
        return (
          <div key={todo.pk()} className="m-2 p-2">
            <h4>{todo.title}</h4>
          </div>
        );
      })}
    </div>
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
