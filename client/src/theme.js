import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({

    palette: {
        primary: {
            main: '#90caf9',
            dark: '#5d99c6',
            contrastText: '#000000'
        },
        secondary: {
            main: '#0d47a1',
            dark: '#002171',
            contrastText: '#ffffff'
        }
    },
    typography: {
        fontFamily: "Rosario", 
    },
})

    export default theme;
    