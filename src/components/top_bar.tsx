import Link from 'next/link';
import React, { ReactElement } from 'react';

import MenuItem from '@mui/icons-material/Menu';
import {AppBar, Tab, Tabs, styled, Typography, IconButton} from '@mui/material';

import {qcr_mqs} from '../styles/components';

import QutLogo from '../assets/QutLogoLight';

interface TopBarProps {
  burger?: boolean;
  burgerOnClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  selected?: number | false;
  title?: string;
  tabs?: {
    text: string;
    target: string;
  }[];
  logo?: ReactElement
}

const StyledBar = styled(AppBar)({
  alignItems: 'center',
});

const StyledDivider = styled('div')(({theme}) => ({
  border: `1px solid ${theme.palette.primary.contrastText}`,
  height: '40px',
  margin: '12px 36px',
}));

const StyledDrawerButton = styled(IconButton)({
  position: 'absolute',
  left: '12px',
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
  paddingTop: '14px',
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
  height: '100px',
  [qcr_mqs('tablet')]: {
    height: '80px',
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
  fontWeight: '900',
  height: 'fit-content',
  textAlign: 'center',
  textTransform: 'capitalize',
  whiteSpace: 'pre-line',
}));
StyledTitle.defaultProps = {variant: 'h6'};

export default function TopBar({
  burger = false,
  burgerOnClick,
  className,
  title,
  tabs,
  logo,
  selected = false,
}: TopBarProps) {
  console.log(logo)
  return (
    <>
      <StyledBar className={className}>
        <StyledRow>
          {burger && (
            <StyledDrawerButton
              color="inherit"
              size="large"
              onClick={burgerOnClick}
            >
              <MenuItem />
            </StyledDrawerButton>
          )}
          <StyledHome>
            <Link href="https://research.qut.edu.au/qcr">
              <a style={{display: 'flex', textDecoration: 'none'}}>
                <StyledLogo />
                <StyledLogoTitle>Centre for{'\n'}Robotics</StyledLogoTitle>
              </a>
            </Link>
            { logo }
            {title && (
              <>
                <StyledDivider />
                <Link href="/">
                  <a style={{textDecoration: 'none'}}>
                    <StyledTitle>{title}</StyledTitle>
                  </a>
                </Link>
              </>
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
