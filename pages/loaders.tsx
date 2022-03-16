import {
  QcrBody,
  QcrBottomBar,
  QcrPage,
  QcrText,
  QcrTitle,
  QcrTopBar,
} from 'qcr-sites-shared';

import {TABS} from './index';

export default function LoadersPage() {
  return (
    <QcrPage>
      <QcrTopBar title="Sample homepage" tabs={TABS} selected={1} />
      <QcrBody>
        <QcrText>
          <QcrTitle variant="h3" color="primary">
            Custom data loader demonstration
          </QcrTitle>
        </QcrText>
      </QcrBody>
      <QcrBottomBar />
    </QcrPage>
  );
}
