import {Drawer, ListItemText, styled, Toolbar} from '@mui/material';

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

export default function SideDrawer() {
  return (
    <StyledDrawer variant="permanent">
      <Toolbar />
      <StyledScroll>
        {Array.from(Array(50).keys()).map((s) => (
          <ListItemText key={s} sx={{width: '1000px'}}>
            {`List item number ${s}`}
          </ListItemText>
        ))}
      </StyledScroll>
    </StyledDrawer>
  );
}
