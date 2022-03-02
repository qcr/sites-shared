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
  open: boolean;
  onClose: DialogOnClose;
  items: {
    primaryText: string;
    secondaryText?: string;
    linkUrl: string;
  }[];
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
  open,
  onClose,
  items,
}: SimpleDialogProps) {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledTitle>Select dataset variant</StyledTitle>
      <List>
        {items.map((i, ind) => (
          <StyledListItem key={ind}>
            <a href={i.linkUrl} target="_blank" rel="noreferrer">
              <ListItemText
                primary={i.primaryText}
                secondary={i.secondaryText ? i.secondaryText : ' '}
              />
            </a>
          </StyledListItem>
        ))}
      </List>
    </StyledDialog>
  );
}
