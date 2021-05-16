import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import NavigationBar from "./components/NavigationBar";
import About from "./components/about/About";
import {createStyles, Divider, makeStyles, Theme} from "@material-ui/core";
import Services from "./components/services/Services";
import Footer from "./components/Footer";
import Employees from "./components/employees/Employees";

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
    return (
        <div className="App">
            <NavigationBar />
            <Header />
            <About margin={margin} />
            <Divider className={classes.divider} />
            <Services margin={margin} />
            <Divider className={classes.divider} />
            <Employees margin={margin} />
            <Footer />
        </div>
    );
}

export default App;
