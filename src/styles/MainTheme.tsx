import { createTheme } from '@material-ui/core/styles';

const MainTheme = createTheme({
    // TODO: definire meglio la palette
    palette: {
      primary: {
        main: "#a83f4d",
      },
      secondary: {
        main: "#3c3a37",
      },
    },

    // https://material.io/design/typography/the-type-system.html#type-scale
    typography: {
      // TODO: modificare il size degli header in modo che siano belli anche
      // visione mobile
      h1: {
        fontSize: "4rem",
      },
      subtitle1: {
        fontSize: "1.5rem",
        lineHeight: "1.5"
      }
    }
    

    // TODO: Creare typography con anche i break
  });

export default MainTheme
