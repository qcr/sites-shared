import FocusButton from '../lib/components/focus_button';
import {
  QcrBody,
  QcrBottomBar,
  QcrPage,
  QcrText,
  QcrTitle,
  QcrTopBar,
} from '../src';

export default function HomePage() {
  return (
    <QcrPage>
      <QcrTopBar
        title="Sample homepage"
        tabs={[
          {text: 'Home', target: '/'},
          {text: 'External', target: 'https://research.qut.edu.au/qcr'},
        ]}
        selected={0}
      />
      <QcrTitle variant="h3" color="primary">
        QCR title
      </QcrTitle>
      <QcrBody>
        <QcrText>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            commodi officiis aperiam odit qui eius reiciendis ipsum laborum
            provident accusantium cum, sint facere aspernatur repellat a ad
            atque repellendus consequatur.
          </p>
          <QcrTitle variant="h4" color="primary">
            Some cards
          </QcrTitle>
          <QcrTitle variant="h5" color="primary">
            Feature cards
          </QcrTitle>
          TODO
          <QcrTitle variant="h5" color="primary">
            Content cards
          </QcrTitle>
          <QcrTitle variant="h5" color="primary">
            A carousel of content cards
          </QcrTitle>
          <QcrTitle variant="h4" color="primary">
            Some buttons and dialogs
          </QcrTitle>
          <QcrTitle variant="h4" color="primary">
            Responsive media
          </QcrTitle>
          This supports multiple media sources, and handles both images and
          videos. Good for web optimisation where you have to balance supporting
          both highly-optimised and widely-supported media.
          <QcrTitle variant="h4" color="primary">
            Some placeholders
          </QcrTitle>
        </QcrText>
      </QcrBody>
      <QcrBottomBar />
    </QcrPage>
  );
}
