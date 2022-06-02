import '@reach/menu-button/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import '../styles/globals.css';

import RestProvider from '../components/rest-hooks/RestProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RestProvider>
        <Component {...pageProps} />
      </RestProvider>
    </>
  );
}

export default MyApp;
