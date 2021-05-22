import {Button, createStyles, Divider, makeStyles, Theme, Typography} from "@material-ui/core";
import firebase from "firebase";
import {useHistory} from 'react-router-dom'
import Services from "../services/Services";
import About from "../about/About";
import Projects from "../projects/Projects";
import News from "../news/News";
import ContactForm from "../contactform/ContactForm";
import Footer from "../Footer";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: "10px auto",
                display: "flex",
                flexDirection: "column",
            },
            margin: "150px auto 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        btn: {
            color: "white",
            backgroundColor: theme.palette.success.main,
            width: "300px",
            "&:hover": {
                backgroundColor: theme.palette.success.dark,
            }
        },
        divider: {
            width: "30vw",
            margin: "auto",
        },
    }),
);
export default function AdminPanel() {
    const classes = useStyles()
    const history = useHistory()
    let margin = 15
    const submit = () => {
        firebase.app().auth().signOut().then(() => {
            history.push("/")
        })
    }
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <Typography variant={"h4"}>Administrator-panel</Typography>
                <Button fullWidth variant="contained" onClick={submit} className={classes.btn}>
                    Lagre endringer og logg ut
                </Button>
            </form>

            <Services margin={margin} />
            <Divider className={classes.divider} />

            <About margin={margin} />
            <Divider className={classes.divider} />

            <Projects margin={margin} />
            <Divider className={classes.divider} />

            <News news={[]} margin={margin} />
            <Divider className={classes.divider} />

            <ContactForm margin={margin} />

            <Footer />
        </>
    )
}