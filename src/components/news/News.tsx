import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import Announcement, {announcementInterface} from "./Announcement";
import React from "react";

export default function News(props:{margin:number, news:announcementInterface[]}) {
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
            },
            gridContainer: {
                display: "flex",
                flexDirection: "row",
                margin: "auto",
            }
        }),
    );
    const classes = useStyles()

    if (props.news.length <= 0) {
        return (<></>)
    }
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                    <Grid container direction={"column"}>
                        <Typography variant={"h4"} className={classes.title}>
                            Siste nyheter
                        </Typography>
                        <Grid container spacing={4}>
                            {
                                /* @ts-ignore */
                                props.news.sort((a,b) => b.date - a.date).map(announcement =>
                                    <Announcement key={announcement.id} announcement={announcement} />
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}