import {Card, CardActionArea, styled, Typography} from '@mui/material';
import Link from 'next/link';
import React, {useState} from 'react';

import ResponsiveMedia from './responsive_media';

export interface FeatureCardProps {
  linkUrl: string;
  mediaUrls?: string[];
  text: string;
}

const ELEVATION_DEFAULT = 2;
const ELEVATION_HIGHLIGHT = 16;

const CARD_HEIGHT = '265px';
const CARD_WIDTH = '300px';

const StyledCard = styled(Card)({
  borderRadius: 0,
  height: CARD_HEIGHT,
  margin: '8px',
  width: CARD_WIDTH,
});

const StyledClickable = styled(CardActionArea)(({theme}) => ({
  height: '100%',
  position: 'relative',
}));

const StyledMedia = styled(ResponsiveMedia)({
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  width: '100%',
  'img,source': {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  },
});

const StyledOverlay = styled('div')(({theme}) => ({
  backgroundColor: theme.palette.primary.main,
  height: '100%',
  opacity: 0.8,
  position: 'absolute',
  top: 0,
  width: '100%',
}));

const StyledText = styled(Typography)(({theme}) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  textAlign: 'center',
  width: '100%',
  whiteSpace: 'pre-line',
}));
StyledText.defaultProps = {variant: 'h3'};

const StyledTextBox = styled('div')({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  position: 'absolute',
  top: 0,
  width: '100%',
});

export default function FeatureCard({
  linkUrl,
  text,
  mediaUrls,
}: FeatureCardProps) {
  const [elevation, setElevation] = useState(ELEVATION_DEFAULT);
  return (
    <StyledCard
      elevation={elevation}
      onMouseOver={() => setElevation(ELEVATION_HIGHLIGHT)}
      onMouseOut={() => setElevation(ELEVATION_DEFAULT)}
    >
      <Link href={linkUrl} passHref>
        <StyledClickable>
          {mediaUrls && <StyledMedia altText="" images={mediaUrls} />}
          <StyledOverlay />
          <StyledTextBox>
            <StyledText>{text.replace(/ /g, '\n')}</StyledText>
          </StyledTextBox>
        </StyledClickable>
      </Link>
    </StyledCard>
  );
}
