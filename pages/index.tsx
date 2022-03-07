import {styled} from '@mui/material';
import FocusButton from '../lib/components/focus_button';
import {
  QcrBody,
  QcrBottomBar,
  QcrPage,
  QcrText,
  QcrTitle,
  QcrTopBar,
} from '../src';
import CardCarousel from '../src/components/card_carousel';
import ContentCard from '../src/components/content_card';

const CONTENT_CARDS = Array.from({length: 10}, (_, i) => i + 1).map((i) => ({
  linkUrl: 'https://www.google.com',
  primaryText: `Content card ${i}`,
  ...(i < 5
    ? {secondaryText: 'extra text', secondaryTransform: 'capitalize'}
    : {}),
  mediaUrls: i % 5 ? [`/dummy_${i % 5}.jpg`] : undefined,
}));

const TABS = [
  {text: 'Home', target: '/'},
  {text: 'External', target: 'https://research.qut.edu.au/qcr'},
];

const StyledCards = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

export default function HomePage() {
  return (
    <QcrPage>
      <QcrTopBar title="Sample homepage" tabs={TABS} selected={0} />
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
          <StyledCards>
            {CONTENT_CARDS.map((c, i) => (
              <ContentCard key={i} {...c} />
            ))}
          </StyledCards>
          <QcrTitle variant="h5" color="primary">
            A carousel of content cards
            <CardCarousel cardsData={CONTENT_CARDS} itemsFactor={0.5} />
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
