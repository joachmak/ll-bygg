import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import NavigationBar from "./components/NavigationBar";
import About from "./components/about/About";
import {createStyles, Divider, makeStyles, Theme} from "@material-ui/core";
import Services from "./components/services/Services";
import Footer from "./components/Footer";
import ContactForm from "./components/contactform/ContactForm";
import {
    createMuiTheme,
    ThemeProvider,
} from '@material-ui/core/styles';
import Projects from "./components/projects/Projects";


function App() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            divider: {
                width: "30vw",
                margin: "auto",
            }
        }),
    );
    const classes = useStyles()
    let margin = 50;
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#FF8C00"
            },
        }
    });
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <NavigationBar />
                <Header />
                <Services margin={margin} />
                <Divider className={classes.divider} />
                <About margin={margin} />
                <Divider className={classes.divider} />
                <Projects margin={margin} />
                <Divider className={classes.divider} />
                <ContactForm margin={margin} />
                <Footer />
            </ThemeProvider>
        </div>
    );
}

export default App;
