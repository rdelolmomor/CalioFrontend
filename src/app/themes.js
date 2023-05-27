import { createMuiTheme } from '@material-ui/core/styles';

const _palette = (primaryColor) => ({
  primary: {
    main: primaryColor,
  },
  secondary: {
    main: '#0088ff',
  },
  tonalOffset: 0.2,
});

export const lightTheme = (primaryColor) => createMuiTheme({
  palette: {
    type: 'light',
    ..._palette(primaryColor),
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'none',
      },
    },
  },
});

export const darkTheme = (primaryColor) => createMuiTheme({
  palette: {
    type: 'dark',
    ..._palette(primaryColor),
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'none',
      },
    },
  },
});
