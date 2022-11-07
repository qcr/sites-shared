import {Drawer, ListItemText, styled, Toolbar} from '@mui/material';

interface SideDrawerProps {
  children: React.ReactNode;
  onClose?: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
  permanent?: boolean;
  show: boolean;
}

const StyledDrawer = styled(Drawer)(({theme}) => ({
  zIndex: theme.zIndex.appBar - 1,
}));

const StyledScroll = styled('div')({
  overflowY: 'scroll',
  marginTop: '16px',
  maxWidth: '300px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',

  '&::-webkit-scrollbar': {
    height: 0,
    width: 0,
  },
});

export default function SideDrawer({
  children,
  onClose,
  permanent = false,
  show = false,
}: SideDrawerProps) {
  return (
    <StyledDrawer
      variant={permanent ? 'permanent' : 'temporary'}
      open={show}
      onClose={onClose}
    >
      <Toolbar />
      <StyledScroll>{children}</StyledScroll>
    </StyledDrawer>
  );
}
