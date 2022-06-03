import React, { Suspense } from 'react';
import { CacheProvider, useSuspense } from 'rest-hooks';

import { useMounted, useRerender } from '../components/rest-hooks/hooks';
import { todoDetail } from '../components/rest-hooks/endpoints';

function API() {
  console.log('render');
  const todo = useSuspense(todoDetail, { id: 1 });
  const { onClick } = useRerender();

  return (
    <div>
      {todo.title}
      <div>
        <button onClick={onClick}>Click</button>
      </div>
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
