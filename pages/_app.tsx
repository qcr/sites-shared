import type {AppProps} from 'next/app';
import Head from 'next/head';

import {ThemeProvider} from '@mui/material/styles';

import {qcrTheme} from '../src';

import '../src/styles/styles.css';

const theme = qcrTheme();

function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>My dummy QCR page</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;