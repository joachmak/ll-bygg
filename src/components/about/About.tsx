import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import Employees from "../employees/Employees";
import {collection} from "typesaurus";
import {useGet} from "@typesaurus/react";
import {AboutSection} from "../../types";

export default function About(props: {margin:number, admin:boolean}) {
    const pageElem = collection("pageElements")
    let [aboutDoc] = useGet<AboutSection>(pageElem, "about")
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: "flex",
                justifyContent: "center",
                margin: props.margin + "px auto",
                textAlign: "left",
            },
            title: {
                marginBottom: 15,
            },
            text: {
                lineHeight: "200%",
            }
        }),
    );
    const classes = useStyles()
    return (
        <>

            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title}>
                        Om oss
                    </Typography>
                    <Employees admin={props.admin} margin={15} />
                    {
                        props.admin ?
                            <>
                                "About admin"
                            </>
                            :
                            <>
                                <Typography variant={"h5"} color={"textSecondary"} className={classes.title}>
                                    <b>
                                    {
                                        aboutDoc ?
                                            aboutDoc.data.title.toUpperCase()
                                            :
                                            "STIFTET I 2016"
                                    }
                                    </b>
                                </Typography>
                                <Typography variant={"body2"} color={"textSecondary"} className={classes.text}>
                                    {
                                        aboutDoc ?
                                            aboutDoc.data.description
                                            :
                                            "Beskrivelse laster..."
                                    }
                                </Typography>
                            </>
                    }
                </Grid>
            </Container>
        </>
    )
}