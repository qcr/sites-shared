import Link from 'next/link';
import React, {useState} from 'react';

import {Card, CardActionArea, Typography, styled} from '@mui/material';

import ResponsiveMedia from '../components/responsive_media';

const ELEVATION_DEFAULT = 2;
const ELEVATION_HIGHLIGHT = 8;

export interface ContentCardProps {
  linkUrl: string;
  mediaFit?: string;
  mediaPosition?: string;
  mediaUrls?: string[];
  primaryText: string;
  secondaryText?: string;
  secondaryTransform: 'capitalize' | 'lowercase' | 'none';
}

const CARD_HEIGHT = '265px';
const CARD_WIDTH = '300px';

const StyledCard = styled(Card)({
  borderRadius: 0,
  height: CARD_HEIGHT,
  margin: '8px',
  width: CARD_WIDTH,
});

const StyledClickable = styled(CardActionArea)({
  height: '100%',
  position: 'relative',
});

const StyledFooter = styled('div')(({theme}) => ({
  backgroundColor: theme.palette.primary.main,
  bottom: 0,
  color: theme.palette.primary.contrastText,
  display: 'flex',
  flexDirection: 'column',
  height: '95px',
  opacity: 0.9,
  padding: '10px',
  position: 'absolute',
  width: '100%',
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

const StyledInfo = styled(Typography)({
  marginBottom: '8px',
  marginLeft: 'auto',
  minHeight: '1.5em',
  opacity: 0.7,
  textAlign: 'right',
});

const StyledName = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-around',
  p: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
    display: '-webkit-box',
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export default function ContentCard({
  linkUrl,
  mediaFit,
  mediaPosition,
  mediaUrls,
  primaryText,
  secondaryText,
  secondaryTransform = 'none',
}: ContentCardProps) {
  const [elevation, setElevation] = useState(ELEVATION_DEFAULT);
  return (
    <StyledCard
      elevation={elevation}
      onMouseOver={() => setElevation(ELEVATION_HIGHLIGHT)}
      onMouseOut={() => setElevation(ELEVATION_DEFAULT)}
      square={true}
    >
      <Link href={linkUrl} passHref>
        <StyledClickable>
          <StyledMedia
            altText=""
            images={mediaUrls ? mediaUrls : []}
            style={
              {
                objectPosition: mediaPosition,
                objectFit: mediaFit,
              } as React.CSSProperties
            }
          />
          <StyledFooter>
            <StyledInfo
              variant="body2"
              style={{textTransform: secondaryTransform}}
            >
              {secondaryText}
            </StyledInfo>
            <StyledName>
              <Typography variant="body1">{primaryText}</Typography>
            </StyledName>
          </StyledFooter>
        </StyledClickable>
      </Link>
    </StyledCard>
  );
}
