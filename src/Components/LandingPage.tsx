import { Box, Grid } from "@material-ui/core";
import { Typography, ThemeProvider, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { ReactComponent as StudyingImage } from "../Images/studying.svg"
import MainTheme from "../styles/MainTheme";

function IntroText() {
    return( 
        <React.Fragment>
            <ThemeProvider theme={MainTheme}> 
                <Box pt="5vh">
                    <Typography align="left" variant="h1">
                        Trova gli appunti di cui <em>hai bisogno</em>
                    </Typography>
                </Box>

                <Box pt="3vh">
                    <Typography align="left" variant="subtitle1" display="block">
                        Nome è un'app che raccoglie e condivide storie, appunti e consigli utili a uno studente di Scienze informatiche a Unibo
                    </Typography>
                </Box>
                
                <Box pt="3vh">
                    <Button variant="contained" color="secondary">
                        Ai corsi
                    </Button>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
}

function IntroTextBlock() {
    return(
        <Box pt="20vh" mx="10vmin">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <IntroText/>
                </Grid>
                <Grid container item xs={12} sm={6}>
                    <StudyingImage/>
                </Grid>
            </Grid>
        </Box>
    );
}

export default IntroTextBlock