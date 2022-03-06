import {QcrBody, QcrBottomBar, QcrPage, QcrTitle, QcrTopBar} from '../src';

export default function HomePage() {
  return (
    <QcrPage>
      <QcrTopBar title="Dummy page" />
      <QcrTitle variant="h1">QCR Title</QcrTitle>
      <QcrBody>
        <p>working</p>
      </QcrBody>
      <QcrBottomBar />
    </QcrPage>
  );
}
