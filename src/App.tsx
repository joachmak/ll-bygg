import {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/header/Header";
import NavigationBar from "./components/NavigationBar";
import About from "./components/about/About";
import {Backdrop, CircularProgress, createStyles, Divider, makeStyles, Theme} from "@material-ui/core";
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
import {HashRouter as Router, Switch, Route, RouteProps} from "react-router-dom";
import { Redirect } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import "./firebase"
import Login from "./components/login/Login";
import AdminPanel from "./components/adminpanel/AdminPanel";
import {collection} from "typesaurus";
import {NewsDoc} from "./types";
import {useOnAll} from "@typesaurus/react";
import { auth } from "./firebase";


function App() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            divider: {
                width: "30vw",
                margin: "auto",
            },
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
                backgroundColor: "black",
            },
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
    const newsCol = collection<NewsDoc>("news")
    const [news] = useOnAll(newsCol)
    const [displayOverlay, setDisplayOverlay] = useState(true)
    if (news && displayOverlay) {
        setTimeout(() => {
            setDisplayOverlay(false);
        }, 1000);
    }
    const menuItems =
        news && news.length > 0 ?
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
    // Detect mobile screen
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    let isMobile: boolean = (width <= 599); // Mobile if width <= 599px (Material UI Grid breakpoint)
    let isIpad: boolean = !isMobile && width <= 1366
    return (
        <div className="App">
            <Backdrop
                className={classes.backdrop}
                open={displayOverlay}
                onClick={(e) => e}
                transitionDuration={{appear:0, enter:0, exit:2000}}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#f0852b" strokeWidth="45" width={isMobile ? "25vw" : "10vw"}
                     viewBox="0 0 521.42 368.27">
                    <polyline
                        className="path"
                        points="92.31 344.77 22.5 344.77 22.5 200.11 190.43 32.19 358.83 199.6 358.83 345.77 163.78 345.77 163.78 199.6 331.31 31.79 498.92 198.4 498.92 345.77 426.27 345.77"
                    />
                </svg>
            </Backdrop>
            {
                news &&
                <ScrollingProvider scrollBehavior={"smooth"}>
                    <ThemeProvider theme={theme}>
                        <Router basename={process.env.PUBLIC_URL}>
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
                                        <Header isMobile={isMobile} isIpad={isIpad} />
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
                                        news && news.length > 0 &&
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
            }
        </div>
    );
}

export default App;

// Redirect user
interface AuthRouteProps extends RouteProps {
    redirect?: string
}

function AuthenticatedRoute({ children, redirect = "/", ...rest }: AuthRouteProps) {
    const [user, loading, error] = useAuthState(auth)
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
    const [user, loading, error] = useAuthState(auth)
    error && console.error(error)
    return (
        <Route {...rest}>
            {loading && <CircularProgress />}
            {((user && !loading)) && <Redirect to={redirect} />}
            {(!user || error) && !loading && children}
        </Route>
    )
}

