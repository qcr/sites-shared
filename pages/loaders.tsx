import React from 'react';
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
import mdLd from 'demo_assets/example.md';
import handlebarsLd from 'demo_assets/example.handlebars';

const LOADS = [
  ['.files', 'File list loader', filesRaw, filesLd],
  ['.yaml', 'YAML loader', yamlRaw, yamlLd],
  ['.md', 'Markdown loader', mdRaw, mdLd],
  ['.handlebars', 'Handlebars templating loader', handlebarsRaw, handlebarsLd],
].map((e) => ({
  ld: e[3],
  path: `demo_assets/example${e[0]}`,
  raw: e[2],
  title: e[1],
}));

const StyledCode = styled('code')({
  display: 'block',
  border: '2px black solid',
  margin: '8px 0px',
  minHeight: '2.5em',
  padding: '8px',
  width: '100%',
});

export default function LoadersPage() {
  return (
    <QcrPage>
      <QcrTopBar title="Sample homepage" tabs={TABS} selected={1} />
      <QcrBody>
        <QcrText>
          <QcrTitle>Custom data loader demonstration</QcrTitle>
          {LOADS.map((l, i) => (
            <React.Fragment key={i}>
              <QcrTitle variant="h4">{l.title}</QcrTitle>
              <p>{l.path}</p>
              <StyledCode>{l.raw}</StyledCode>
              <StyledCode>{JSON.stringify(l.ld, null, 2)}</StyledCode>
            </React.Fragment>
          ))}
        </QcrText>
      </QcrBody>
      <QcrBottomBar />
    </QcrPage>
  );
}
