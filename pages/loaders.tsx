import React from 'react';
import {renderToString} from 'react-dom/server';
import {
  QcrBody,
  QcrBottomBar,
  QcrPage,
  QcrText,
  QcrTitle,
  QcrTopBar,
} from 'qcr-sites-shared';
import {styled} from '@mui/material';

import {TABS} from './index';

import filesRaw from '!!demo_assets/example.files?raw';
import yamlRaw from '!!demo_assets/example.yaml?raw';
import mdRaw from '!!demo_assets/example.md?raw';
import handlebarsRaw from '!!demo_assets/example.handlebars?raw';

import filesLd from 'demo_assets/example.files';
import yamlLd from 'demo_assets/example.yaml';
import * as mdLd from 'demo_assets/example.md';
import handlebarsLd from 'demo_assets/example.handlebars';

console.log(Object.entries(mdLd));

const LOADS = [
  ['.files', 'File list loader', filesRaw, filesLd],
  ['.yaml', 'YAML loader', yamlRaw, yamlLd],
  [
    '.md',
    'Markdown loader',
    mdRaw,
    `Front matter:\n${Object.entries(mdLd.matter)
      .map(([k, v]) => `\t${k}:\t${v.toString()}\n`)
      .join('')}\nHTML:\n${renderToString(mdLd.default({}))}`,
  ],
  ['.handlebars', 'Handlebars templating loader', handlebarsRaw, handlebarsLd],
].map((e) => ({
  ld: e[3],
  path: `demo_assets/example${e[0]}`,
  raw: e[2],
  title: e[1],
}));

const StyledCode = styled('code')({
  display: 'inline-block',
  border: '2px black solid',
  margin: '8px 0px',
  minHeight: '2.5em',
  overflowWrap: 'break-word',
  padding: '8px',
  whiteSpace: 'pre-wrap',
  width: '100%',
});

export default function LoadersPage() {
  return (
    <QcrPage>
      <QcrTopBar title="Sample homepage" tabs={TABS} selected={2} />
      <QcrBody>
        <QcrText>
          <QcrTitle>Custom data loader demonstration</QcrTitle>
          <p>
            This page demonstrates each of our custom loaders, showing the
            transformation from input to output for a given file.
          </p>
          {LOADS.map((l, i) => (
            <React.Fragment key={i}>
              <QcrTitle variant="h4">{l.title}</QcrTitle>
              <p>{l.path}</p>
              <StyledCode>{l.raw}</StyledCode>
              <StyledCode>
                {typeof l.ld === 'string'
                  ? l.ld
                  : JSON.stringify(l.ld, null, 2)}
              </StyledCode>
            </React.Fragment>
          ))}
        </QcrText>
      </QcrBody>
      <QcrBottomBar />
    </QcrPage>
  );
}
