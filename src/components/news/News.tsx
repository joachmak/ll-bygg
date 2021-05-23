import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import Announcement from "./Announcement";
import {NewsDoc} from "../../types";
import {Doc} from "typesaurus";
import NewsAdmin from "./NewsAdmin";

export default function News(props:{margin:number, admin:boolean, news:Doc<NewsDoc>[]}) {
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

    if (props.news.length <= 0 && !props.admin) {
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
                        {
                            props.admin ?
                                <>
                                    <NewsAdmin existingNewsDocs={props.news} />
                                </>
                                :
                                <>
                                    <Grid container spacing={4}>
                                        {
                                            /* @ts-ignore */
                                            props.news.sort((a,b) => b.date - a.date).map(announcement =>
                                                <Announcement key={announcement.ref.id} announcement={announcement} />
                                            )
                                        }
                                    </Grid>
                                </>
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}