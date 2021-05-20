import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import Announcement, {announcementInterface} from "./Announcement";

export default function News(props:{margin:number}) {
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
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                    <Grid container direction={"column"}>
                        <Typography variant={"h4"} className={classes.title}>
                            Nyheter fra bedriften
                        </Typography>
                        <Grid container spacing={4}>
                            {
                                /* @ts-ignore */
                                news.sort((a,b) => b.date - a.date).map(announcement =>
                                    <Announcement announcement={announcement} />
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}