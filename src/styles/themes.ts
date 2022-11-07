import {createTheme} from '@mui/material/styles';

export function qcrTheme() {
  return createTheme({
    palette: {mode: 'light', primary: {main: '#00407a'}},
    typography: {
      fontFamily:
        'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      h3: {
        fontWeight: 'bold',
        marginBottom: '40px',
        marginTop: '16px',
        textAlign: 'center',
      },
      button: {
        textTransform: 'capitalize',
        fontSize: '1.0rem',
        fontWeight: 'bold',
      },
      subtitle1: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '16px',
      },
    },
  });
}
