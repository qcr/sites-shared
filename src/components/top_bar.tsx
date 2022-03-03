import Link from 'next/link';
import React from 'react';

import {AppBar, Tab, Tabs, styled, Typography} from '@mui/material';

import {mq} from '../styles/components';

import QcrLogo from '../assets/QcrLogoLight.js';

interface TopBarProps {
  selected: number | false;
  title?: string;
  tabs: {
    text: string;
    target: string;
  }[];
}

const StyledBar = styled(AppBar)({
  alignItems: 'center',
  justifyContent: 'space-between',
  [mq('tablet')]: {
    flexDirection: 'row',
  },
});

const StyledLogo = styled(QcrLogo)({
  width: '100px',
  margin: '0px 6px',
  cursor: 'pointer',
  [mq('tablet')]: {
    width: '150px',
  },
});

const StyledRow = styled('div')({
  width: '90%',
});

const StyledTab = styled(Tab)(({theme}) => ({
  color: theme.palette.primary.contrastText,
  opacity: 1.0,
  textTransform: 'capitalize',
}));

const StyledTitle = styled(Typography)(({theme}) => ({
  color: theme.palette.primary.contrastText,
}));

export default function TopBar({title, tabs, selected = false}: TopBarProps) {
  return (
    <StyledBar>
      <StyledRow>
        <div>
          <Link href="/" passHref>
            <a>
              <StyledLogo />
            </a>
          </Link>
          {title && <StyledTitle>{title}</StyledTitle>}
        </div>
        {tabs && (
          <Tabs
            value={selected}
            TabIndicatorProps={{
              style: {
                backgroundColor: 'white',
              },
            }}
          >
            {tabs.map((t, i) => (
              <Link key={i} href={t.target} passHref>
                <StyledTab label={t.text} />
              </Link>
            ))}
          </Tabs>
        )}
      </StyledRow>
    </StyledBar>
  );
}
