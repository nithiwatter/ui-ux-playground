import React, { Suspense } from 'react';
import { CacheProvider, useSuspense } from 'rest-hooks';

import {
  useMounted,
  useRerender,
  useSwitch,
} from '../components/rest-hooks/hooks';
import { todoDetail, todoList } from '../components/rest-hooks/endpoints';
import { ModifiedNetworkManager } from '../components/rest-hooks/managers';

const managers = [new ModifiedNetworkManager()];

let global;
let globals;

function API() {
  const todos = useSuspense(todoList);
  const { onClick } = useRerender();
  const { on, onClick: onClickSwitch } = useSwitch();
  console.log('before todos', globals === todos);
  globals = todos;

  return (
    <div>
      <div>
        <button onClick={onClick}>Click</button>
      </div>
      <div>
        <button onClick={onClickSwitch}>Click On</button>
      </div>
      {on && <API2 />}
    </div>
  );
}

function API2() {
  console.log('render child');
  const todo = useSuspense(todoDetail, { id: 1 });
  console.log('before', global === todo);
  global = todo;

  return <div>API2</div>;
}

export default function RestHooks() {
  const { mounted } = useMounted();

  if (!mounted) return <></>;

  return (
    <CacheProvider managers={managers}>
      <div>API</div>
      <Suspense fallback={<div>loading...</div>}>
        <API />
      </Suspense>
    </CacheProvider>
  );
}
