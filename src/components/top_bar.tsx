import Link from 'next/link';
import React from 'react';

import {AppBar, Tab, Tabs, styled, Typography} from '@mui/material';

import {qcr_mqs} from '../styles/components';

import QutLogo from '../assets/QutLogoLight';

interface TopBarProps {
  selected?: number | false;
  title?: string;
  tabs?: {
    text: string;
    target: string;
  }[];
}

const StyledBar = styled(AppBar)({
  alignItems: 'center',
});

const StyledHome = styled('div')({
  alignItems: 'center',
  display: 'flex',
});

const StyledLogo = styled(QutLogo)({
  height: '50px',
  width: '50px',
  margin: '12px 6px',
  cursor: 'pointer',
  [qcr_mqs('tablet')]: {
    width: '75px',
  },
});

const StyledLogoTitle = styled(Typography)({
  fontSize: '1.15rem',
  lineHeight: '1.2',
  marginTop: '-4px',
  whiteSpace: 'pre',
});
StyledLogoTitle.defaultProps = {variant: 'h6'};

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
  borderLeft: `2px solid ${theme.palette.primary.contrastText}`,
  fontWeight: '900',
  height: 'fit-content',
  marginLeft: '30px',
  marginRight: '12px',
  paddingBottom: '8px',
  paddingLeft: '30px',
  paddingTop: '8px',
  textAlign: 'center',
  textTransform: 'capitalize',
  whiteSpace: 'pre-line',
}));
StyledTitle.defaultProps = {variant: 'h6'};

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
            <StyledLogoTitle>Centre for{'\n'}Robotics</StyledLogoTitle>
            {title && <StyledTitle>{title}</StyledTitle>}
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
