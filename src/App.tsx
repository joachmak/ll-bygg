import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import NavigationBar from "./components/NavigationBar";
import About from "./components/about/About";
import {CircularProgress, createStyles, Divider, makeStyles, Theme} from "@material-ui/core";
import Services from "./components/services/Services";
import Footer from "./components/Footer";
import ContactForm from "./components/contactform/ContactForm";
import News from "./components/news/News"
import {
    createMuiTheme,
    ThemeProvider,
} from '@material-ui/core/styles';
import Projects from "./components/projects/Projects";
import { ScrollingProvider, Section } from "react-scroll-section";
import {announcementInterface} from "./components/news/Announcement";
import {BrowserRouter as Router, Switch, Route, RouteProps} from "react-router-dom";
import { Redirect } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase/app'
import Login from "./components/login/Login";
import AdminPanel from "./components/adminpanel/AdminPanel";

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
    const news:announcementInterface[] = [
        {
            id: 1,
            title: "Vi inngår i samarbeid med Montér",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus excepturi obcaecati sed. Cum dolor exercitationem facilis ipsa iste molestias praesentium! Aliquid dolores dolorum ex ipsa nisi nulla quam reprehenderit vitae?",
            date: new Date(Date.parse('04 Dec 2019 17:12:00')),
        },
        {
            id: 2,
            title: "Vi er åpne for jobber igjen!",
            description: "Etter nok et vellykket prosjekt, lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus excepturi obcaecati sed. Cum dolor exercitationem facilis ipsa iste molestias praesentium! Aliquid dolores dolorum ex ipsa nisi nulla quam reprehenderit vitae?",
            date: new Date(Date.parse('17 Jan 2020 17:12:00')),
        },
        {
            id: 3,
            title: "Vi tar midlertidig ikke imot flere henvendelser",
            description: "Grunnet stor etterspørsel, lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus excepturi obcaecati sed. Cum dolor exercitationem facilis ipsa iste molestias praesentium! Aliquid dolores dolorum ex ipsa nisi nulla quam reprehenderit vitae?",
            date: new Date(Date.parse('01 Jan 2020 14:35:21')),
        }
    ]
    const menuItems =
        news.length > 0 ?
            [ // [section-reference, menu-text]
                ["hjemRef", "hjem"],
                ["tjenesteRef", "våre tjenester"],
                ["omRef", "om oss"],
                ["prosjektRef", "våre prosjekter"],
                ["nyhetRef", "Nyheter"],
                ["kontaktRef", "kontakt oss"]
            ]
            :
            [ // [section-reference, menu-text]
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
                    <Router>
                        <Switch>
                            <DisallowAuthenticatedRoute path={"/admin"}>
                                <Login />
                            </DisallowAuthenticatedRoute>
                            <AuthenticatedRoute path={"/adminPanel"}>
                                <AdminPanel />
                            </AuthenticatedRoute>
                            <UnAuthenticatedRoute path={"/"}>
                                <NavigationBar menuItems={menuItems} />

                                <Section id={"hjemRef"}>
                                    <Header />
                                </Section>

                                <Section id={"tjenesteRef"}>
                                    <Services margin={margin} admin={false} />
                                </Section>
                                <Divider className={classes.divider} />

                                <Section id={"omRef"}>
                                    <About admin={false} margin={margin} />
                                </Section>
                                <Divider className={classes.divider} />

                                <Section id={"prosjektRef"}>
                                    <Projects margin={margin} />
                                </Section>
                                <Divider className={classes.divider} />
                                {
                                    news.length > 0 &&
                                    <>
                                        <Section id={"nyhetRef"}>
                                            <News admin={false} news={news} margin={margin} />
                                        </Section>
                                        <Divider className={classes.divider} />
                                    </>
                                }
                                <Section id={"kontaktRef"}>
                                    <ContactForm margin={margin} />
                                </Section>
                                <Footer />
                            </UnAuthenticatedRoute>
                        </Switch>
                    </Router>
                </ThemeProvider>
            </ScrollingProvider>
        </div>
    );
}

export default App;

// Redirect user
interface AuthRouteProps extends RouteProps {
    redirect?: string
}

function AuthenticatedRoute({ children, redirect = "/", ...rest }: AuthRouteProps) {
    const [user, loading, error] = useAuthState(firebase.app().auth())
    error && console.error(error)
    return (
        <Route {...rest}>
            {loading && <CircularProgress />}
            {((!user && !loading) || error) && <Redirect to={redirect} />}
            {user && children}
        </Route>
    )
}

function UnAuthenticatedRoute({ children, redirect = "/", ...rest }: AuthRouteProps) {
    return (
        <Route {...rest}>
            {children}
        </Route>
    )
}

function DisallowAuthenticatedRoute({ children, redirect = "/adminPanel", ...rest }: AuthRouteProps) {
    const [user, loading, error] = useAuthState(firebase.app().auth())
    error && console.error(error)
    return (
        <Route {...rest}>
            {loading && <CircularProgress />}
            {((user && !loading)) && <Redirect to={redirect} />}
            {(!user || error) && !loading && children}
        </Route>
    )
}

