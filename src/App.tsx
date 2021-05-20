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
import { ScrollingProvider, Section } from "react-scroll-section";


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
    const menuItems = [ // [section-reference, menu-text]
        ["hjemRef", "hjem"],
        ["tjenesteRef", "våre tjenester"],
        ["omRef", "om oss"],
        ["prosjektRef", "våre prosjekter"],
        ["kontaktRef", "kontakt oss"]
    ]
    return (
        <div className="App">
            <ScrollingProvider scrollBehavior={"smooth"}>
                <ThemeProvider theme={theme}>
                    <NavigationBar menuItems={menuItems} />
                    <Section id={"hjemRef"}>
                        <Header />
                    </Section>
                    <Section id={"tjenesteRef"}>
                        <Services margin={margin} />
                    </Section>
                    <Divider className={classes.divider} />
                    <Section id={"omRef"}>
                        <About margin={margin} />
                    </Section>
                    <Divider className={classes.divider} />
                    <Section id={"prosjektRef"}>
                        <Projects margin={margin} />
                    </Section>
                    <Divider className={classes.divider} />
                    <Section id={"kontaktRef"}>
                        <ContactForm margin={margin} />
                    </Section>
                    <Footer />
                </ThemeProvider>
            </ScrollingProvider>
        </div>
    );
}

export default App;
