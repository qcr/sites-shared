import {
  QcrBody,
  QcrBottomBar,
  QcrMarkdown,
  QcrPage,
  QcrText,
  QcrTitle,
  QcrTopBar,
} from 'qcr-sites-shared';

import {TABS} from './index';

import md from 'demo_assets/markdown_demo.md';

console.log(md);

export default function MarkdownPage() {
  return (
    <QcrPage>
      <QcrTopBar title="Sample homepage" tabs={TABS} selected={2} />
      <QcrBody>
        <QcrText>
          <QcrTitle>Demonstration of markdown capabilities</QcrTitle>
          <QcrMarkdown>{md()}</QcrMarkdown>
        </QcrText>
      </QcrBody>
      <QcrBottomBar />
    </QcrPage>
  );
}
