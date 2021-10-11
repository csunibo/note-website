import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useClasses from '../styles/MainStyles';
import { ThemeProvider } from '@material-ui/styles';
import MainTheme from '../styles/MainTheme';


function Navbar() {
    const classes = useClasses();
    return (
        <ThemeProvider theme={MainTheme}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h4" align="left" className={classes.flexGrow_1}>
                        Nomeapp
                    </Typography>
                    {/* 
                    TODO: creare i link per i bottoni, fare con Next.js
                    migliore stile dei bottoni? 
                    La scritta sembra piccola
                    */}
                    <Button color="inherit">Corsi</Button>
                    <Button color="inherit">Blog</Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default Navbar;
