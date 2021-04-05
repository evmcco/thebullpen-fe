import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    lilac: '#d9b7e2',
    navy: '#0a2240',
    teal: '#007580',
    green: '#c2d500',
    purple: '#993dbb',
    cream: '#f0e78f'
  },
});

export default function Palette(props) {
  return (<ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
  )
}