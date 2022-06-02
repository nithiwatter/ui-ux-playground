import React from 'react';
import { CacheProvider } from 'rest-hooks';

import { useMounted } from '../components/rest-hooks/hooks';
import { todoDetail } from '../components/rest-hooks/endpoints';

function API() {
  React.useEffect(() => {
    const testTodoDetail = async () => {
      console.log(await todoDetail({ id: '1' }));
    };
    console.log(todoDetail.key({ id: '1' }));
    testTodoDetail();
  }, []);

  return <></>;
}

export default function RestHooks() {
  const { mounted } = useMounted();

  if (!mounted) return <></>;

  return (
    <CacheProvider>
      <div>API</div>
      <API />
    </CacheProvider>
  );
}
