import {Typography, styled} from '@mui/material';

export type BreakPointName = 'phone' | 'tablet' | 'laptop' | 'hi-res';

const _mqs: {[key in BreakPointName]: number} = {
  phone: 320,
  tablet: 641,
  laptop: 1025,
  'hi-res': 1281,
};

export function qcr_mqs(name: BreakPointName) {
  return `@media (min-width: ${_mqs[name]}px)`;
}

export const QcrBody = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  margin: '0 auto',
});

export const QcrFocusBox = styled(Typography)({
  alignItems: 'center',
  backgroundColor: 'grey',
  borderColor: 'black',
  borderRadius: '10px',
  borderStyle: 'solid',
  borderWidth: '2px',
  display: 'flex',
  fontStyle: 'italic',
  fontSize: '1.5rem',
  justifyContent: 'center',
  margin: '30px auto',
  padding: '50px',
  textAlign: 'center',
});

export const QcrMissingContentBox = styled(QcrFocusBox)({
  backgroundColor: 'lightsalmon',
  borderColor: 'salmon',
  height: '1000px',
});

export const QcrNotificationBar = styled(QcrFocusBox)({
  backgroundColor: 'lightsalmon',
  borderColor: 'salmon',
});

export const QcrMarkdown = styled(Typography)({
  '&&': {
    margin: '0 auto',
    maxWidth: '45rem',
    '.embedded-block': {
      margin: '10px',
      textAlign: 'center',
    },
    'iframe, img, video': {
      maxWidth: '100%',
    },
    ":not(pre) > code[class*='language-']": {
      paddingLeft: '0.3em',
      paddingRight: '0.3em',
    },
  },
});

export const QcrPage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  a: {
    color: 'inherit',
  },
});

export const QcrTitle = styled(Typography)({
  marginTop: '48px',
});
