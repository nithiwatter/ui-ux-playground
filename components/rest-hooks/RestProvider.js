import React from 'react';
import { CacheProvider } from 'rest-hooks';

export default function RestProvider({ children }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return <CacheProvider>{children}</CacheProvider>;
}
