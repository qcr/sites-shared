import {ListItemText, styled} from '@mui/material';
import {
  QcrBody,
  QcrBottomBar,
  QcrCardCarousel,
  QcrContentCard,
  QcrDrawer,
  QcrFeatureCard,
  QcrFocusButton,
  QcrMissingContentBox,
  QcrNotificationBar,
  QcrPage,
  QcrResponsiveMedia,
  QcrSimpleDialog,
  QcrText,
  QcrTitle,
  QcrTopBar,
} from 'qcr-sites-shared';

import DownloadIcon from '!@svgr/webpack!/public/icon_download.svg';
import {useState} from 'react';

const QCR_URL = 'https://research.qut.edu.au/qcr';

const CONTENT_CARDS = Array.from({length: 10}, (_, i) => i + 1).map((i) => ({
  linkUrl: QCR_URL,
  primaryText: `Content card ${i}`,
  ...(i < 5 ? {secondaryText: 'extra text'} : {}),
  mediaUrls: i % 5 ? [`/dummy_${i % 5}.jpg`] : undefined,
}));

const DIALOG_ITEMS = Array.from({length: 5}, (_, i) => i + 1).map((i) => ({
  primaryText: `Primary text ${i}`,
  secondaryText: `extra ${i}`,
  linkUrl: QCR_URL,
}));

const FEATURE_CARDS = Array.from({length: 5}, (_, i) => i).map((i) => ({
  linkUrl: QCR_URL,
  text: i ? `Image card` : `Video card`,
  mediaUrls: i ? [`/dummy_${i}.jpg`] : ['/panda.mp4'],
}));

export const TABS = [
  {text: 'Home', target: '/'},
  {text: 'Markdown', target: '/markdown'},
  {text: 'Loaders', target: '/loaders'},
  {text: 'External', target: QCR_URL},
];

const StyledCards = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
});

export default function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <QcrPage>
      <QcrTopBar
        burger
        burgerOnClick={() => setDrawerOpen(!drawerOpen)}
        title="Sample homepage"
        tabs={TABS}
        selected={0}
      />
      <QcrDrawer show={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {Array.from(Array(50).keys()).map((s) => (
          <ListItemText key={s} sx={{width: '1000px'}}>
            {`List item number ${s}`}
          </ListItemText>
        ))}
      </QcrDrawer>
      <QcrBody>
        <QcrText>
          <QcrTitle>QCR title</QcrTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            commodi officiis aperiam odit qui eius reiciendis ipsum laborum
            provident accusantium cum, sint facere aspernatur repellat a ad
            atque repellendus consequatur.
          </p>
          <QcrTitle variant="h4">Cards</QcrTitle>
          <QcrTitle variant="h5">Feature cards</QcrTitle>
          <StyledCards>
            {FEATURE_CARDS.map((f, i) => (
              <QcrFeatureCard key={i} {...f} />
            ))}
          </StyledCards>
          <QcrTitle variant="h5">Content cards</QcrTitle>
          <StyledCards>
            {CONTENT_CARDS.map((c, i) => (
              <QcrContentCard key={i} {...c} />
            ))}
          </StyledCards>
          <QcrTitle variant="h5">
            A carousel of content cards
            <QcrCardCarousel cardsData={CONTENT_CARDS} itemsFactor={0.5} />
          </QcrTitle>
          <QcrTitle variant="h4">Buttons and dialogs</QcrTitle>
          <QcrFocusButton url={QCR_URL} text="QCR homepage" newTab />
          <br />
          <br />
          <QcrFocusButton
            url={QCR_URL}
            text="With icon"
            newTab
            icon={<DownloadIcon />}
          />
          <br />
          <br />
          <QcrFocusButton
            text="Open dialog"
            onClick={() => setDialogOpen(true)}
          />
          <QcrSimpleDialog
            title="Dummy dialog"
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            items={DIALOG_ITEMS}
          />
          <QcrTitle variant="h4" color="primary">
            Responsive media
          </QcrTitle>
          This supports multiple media sources, and handles both images and
          videos. Good for web optimisation where you have to balance supporting
          both highly-optimised and widely-supported media.
          <br />
          <br />
          Raw GIF:
          <QcrResponsiveMedia altText="Raw GIF" images={['/panda.gif']} />
          <br />
          <br />
          Multi-source video:
          <QcrResponsiveMedia
            altText="Multi-source video"
            images={['/panda.webm', '/panda.mp4']}
          />
          <br />
          <br />
          Multi-source image:
          <QcrResponsiveMedia
            altText="Multi-source image"
            images={['/panda.webp', '/panda.jpg']}
          />
          <QcrTitle variant="h4" color="primary">
            Placeholders
          </QcrTitle>
          <QcrMissingContentBox>Missing content</QcrMissingContentBox>
          <QcrNotificationBar>Notification bar</QcrNotificationBar>
        </QcrText>
      </QcrBody>
      <QcrBottomBar />
    </QcrPage>
  );
}
