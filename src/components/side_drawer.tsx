import {Drawer, ListItemText, styled, Toolbar} from '@mui/material';

interface SideDrawerProps {
  children: React.ReactNode;
}

const StyledDrawer = styled(Drawer)(({theme}) => ({
  zIndex: theme.zIndex.appBar - 1,
}));

const StyledScroll = styled('div')({
  overflowY: 'scroll',
  marginLeft: '12px',
  marginTop: '16px',
  maxWidth: '300px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',

  '&::-webkit-scrollbar': {
    height: 0,
    width: 0,
  },
});

export default function SideDrawer({children}: SideDrawerProps) {
  return (
    <StyledDrawer variant="permanent">
      <Toolbar />
      <StyledScroll>{children}</StyledScroll>
    </StyledDrawer>
  );
}
