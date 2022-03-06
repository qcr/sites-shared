import Link from 'next/link';
import React from 'react';

import {AppBar, Tab, Tabs, styled, Typography} from '@mui/material';

import {qcr_mqs} from '../styles/components';

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
});

const StyledHome = styled('div')({
  display: 'flex',
});

const StyledLogo = styled(QcrLogo)({
  width: '100px',
  margin: '0px 6px',
  cursor: 'pointer',
  [qcr_mqs('tablet')]: {
    width: '150px',
  },
});

const StyledRow = styled('div')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  width: '90%',
  [qcr_mqs('tablet')]: {
    flexDirection: 'row',
  },
});

const StyledSpace = styled('div')({
  height: '128px',
  [qcr_mqs('tablet')]: {
    height: '92px',
  },
});

const StyledTab = styled(Tab)(({theme}) => ({
  color: theme.palette.primary.contrastText,
  opacity: 1.0,
  textTransform: 'capitalize',
}));

const StyledTabs = styled(Tabs)({
  maxHeight: '48px',
});

const StyledTitle = styled(Typography)(({theme}) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 'bold',
  marginLeft: '12px',
  marginRight: '12px',
  textAlign: 'center',
}));

export default function TopBar({title, tabs, selected = false}: TopBarProps) {
  return (
    <>
      <StyledBar>
        <StyledRow>
          <StyledHome>
            <Link href="/" passHref>
              <a>
                <StyledLogo />
              </a>
            </Link>
            {title && (
              <StyledTitle variant="h4">
                {title.replace(' ', '\\n')}
              </StyledTitle>
            )}
          </StyledHome>
          {tabs && (
            <StyledTabs
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
            </StyledTabs>
          )}
        </StyledRow>
      </StyledBar>
      <StyledSpace />
    </>
  );
}
