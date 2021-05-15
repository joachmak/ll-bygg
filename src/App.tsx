import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import NavigationBar from "./components/NavigationBar";
import About from "./components/about/About";
import {createStyles, Divider, makeStyles, Theme} from "@material-ui/core";
import Services from "./components/services/Services";

function App() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            divider: {
                width: "20vw",
                margin: "auto",
            }
        }),
    );
    const classes = useStyles()
    let margin = 50;
    return (
        <div className="App">
            <NavigationBar />
            <Header />
            <About margin={margin} />
            <Divider className={classes.divider} />
            <Services margin={margin} />
            <Divider className={classes.divider} />
        </div>
    );
}

export default App;
