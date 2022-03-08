import React from 'react';
import Head from 'next/head';

// This is stored in "QCR Websites\" folder of QCR's shared CloudStor storage.
// Ideally this would be stored in this library, but I ran out of ideas for how
// to create this component without the aid of a bundler. This is the simple
// solution, but definitely not the best.
const FAV_ICON_URL =
  'https://cloudstor.aarnet.edu.au/plus/s/8a2qxqCHQ6WMjzL/download';

export default function QcrFavicon() {
  return (
    <Head>
      <link rel="shortcut icon" href={FAV_ICON_URL} />
    </Head>
  );
}
