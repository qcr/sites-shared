import {
  QcrBody,
  QcrBottomBar,
  QcrMarkdown,
  QcrPage,
  QcrText,
  QcrTitle,
  QcrTopBar,
} from 'qcr-sites-shared';

import {MDXProvider} from '@mdx-js/react';

import {TABS} from './index';

import Md from 'demo_assets/markdown_demo.md?full';

import DemoComponent from 'demo_assets/component_demo';

import {Button} from '@mui/material';

const cs = {
  DemoComponent: (props) => (
    <DemoComponent
      name={props.name}
      description={props.description}
      image={props.image}
      features={props.features}
    />
  ),
};

export default function MarkdownPage() {
  return (
    <QcrPage>
      <QcrTopBar title="Sample homepage" tabs={TABS} selected={1} />
      <QcrBody>
        <QcrText>
          <QcrTitle>Demonstration of markdown capabilities</QcrTitle>
          <QcrMarkdown>
            <Md components={cs} />
          </QcrMarkdown>
        </QcrText>
      </QcrBody>
      <QcrBottomBar />
    </QcrPage>
  );
}
