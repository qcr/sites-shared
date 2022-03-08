import React from 'react';

import {
  Dialog,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from '@mui/material';

export type DialogOnClose = (
  event: {},
  reason: 'backdropClick' | 'escapeKeyDown'
) => void;

interface SimpleDialogProps {
  items: {
    primaryText: string;
    secondaryText?: string;
    linkUrl: string;
  }[];
  newTab?: boolean;
  open: boolean;
  onClose: DialogOnClose;
  title: string;
}

const StyledDialog = styled(Dialog)({
  '.MuiDialog-paper': {
    borderRadius: '0px',
  },
});

const StyledListItem = styled(ListItemButton)({
  paddingRight: '48px',
});

const StyledTitle = styled(DialogTitle)(({theme}) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

export default function SimpleDialog({
  items,
  newTab = false,
  open,
  onClose,
  title,
}: SimpleDialogProps) {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledTitle>{title}</StyledTitle>
      <List>
        {items.map((i, ind) => (
          <StyledListItem
            key={ind}
            // @ts-ignore
            component="a"
            href={i.linkUrl}
            target={newTab && '_blank'}
          >
            <ListItemText
              primary={i.primaryText}
              secondary={i.secondaryText ? i.secondaryText : ' '}
            />
          </StyledListItem>
        ))}
      </List>
    </StyledDialog>
  );
}
