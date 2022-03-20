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

import customComponents from 'demo_assets/custom_components';
import {components} from 'qcr-sites-shared/loaders/handlebars-helpers';

import Mdx from 'demo_assets/markdown_demo.md?full';

const cs = {};
[...Object.entries(components), ...Object.entries(customComponents)].forEach(
  ([k, v]) => (cs[k] = v.render)
);

export default function MarkdownPage() {
  return (
    <QcrPage>
      <QcrTopBar title="Sample homepage" tabs={TABS} selected={1} />
      <QcrBody>
        <QcrText>
          <QcrTitle>Demonstration of markdown capabilities</QcrTitle>
          <QcrMarkdown>
            <Mdx components={cs} />
          </QcrMarkdown>
        </QcrText>
      </QcrBody>
      <QcrBottomBar />
    </QcrPage>
  );
}
