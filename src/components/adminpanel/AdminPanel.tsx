import {Button, createStyles, Divider, makeStyles, Theme, Typography} from "@material-ui/core";
import firebase from "firebase";
import {useHistory} from 'react-router-dom'
import Services from "../services/Services";
import About from "../about/About";
import News from "../news/News";
import React from "react";
import ProjectsAdmin from "../projects/ProjectsAdmin";
import FooterAdmin from "../FooterAdmin";
import HeaderAdmin from "../header/HeaderAdmin";
import {NewsDoc} from "../../types";
import {collection} from "typesaurus";
import {useOnAll} from "@typesaurus/react";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: "10px auto",
                display: "flex",
                flexDirection: "column",
            },
            margin: "20px auto 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        btn: {
            color: "white",
            backgroundColor: "green",
            width: "300px",
            "&:hover": {
                backgroundColor: "darkgreen",
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
    const newsCollection = collection<NewsDoc>("news")
    const [newsDocs] = useOnAll(newsCollection)
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
                <Button startIcon={<MeetingRoomIcon />} fullWidth variant="contained" onClick={submit} className={classes.btn}>
                    Logg ut
                </Button>
            </form>
            <HeaderAdmin />
            <Services admin={true} margin={margin} />
            <Divider className={classes.divider} />

            <About admin={true} margin={margin} />
            <Divider className={classes.divider} />

            <ProjectsAdmin margin={15} />
            <Divider className={classes.divider} />

            <News admin={true} news={newsDocs ? newsDocs : []} margin={margin} />


            <FooterAdmin />
        </>
    )
}