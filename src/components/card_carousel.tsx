import React from 'react';
import Carousel from 'react-multi-carousel';

import {styled} from '@mui/material';

import ContentCard, {ContentCardProps} from './content_card';

interface CardCarouselProps {
  cardsData: ContentCardProps[];
  itemsFactor?: number;
}

const StyledCarousel = styled(Carousel)(({theme}) => ({
  '.react-multiple-carousel__arrow': {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.75,
  },
  '.react-multi-carousel-dot button': {
    border: 'none',
    backgroundColor: 'lightgrey',
  },
  '.react-multi-carousel-dot--active button': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const StyledItem = styled('div')({
  marginBottom: '30px',
});

export default function CardCarousel({
  cardsData,
  itemsFactor = 1,
}: CardCarouselProps) {
  return (
    <StyledCarousel
      autoPlay={true}
      showDots={true}
      responsive={{
        big: {breakpoint: {max: 100000, min: 1300}, items: 4 * itemsFactor},
        med: {breakpoint: {min: 1000, max: 1300}, items: 3 * itemsFactor},
        small: {breakpoint: {min: 650, max: 1000}, items: 2 * itemsFactor},
        mini: {breakpoint: {min: 0, max: 650}, items: 1 * itemsFactor},
      }}
    >
      {Object.values(cardsData).map((c, i) => (
        <StyledItem key={i}>
          <ContentCard {...c} />
        </StyledItem>
      ))}
    </StyledCarousel>
  );
}
