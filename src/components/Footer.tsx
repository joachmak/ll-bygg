import {Container, createStyles, Grid, Link, makeStyles, Theme, Typography} from "@material-ui/core";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';

export default function Footer() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                backgroundColor: "#111",
                width: "100%",
                padding: "50px 0"
            },
            container: {
                display: "flex",
                justifyContent: "center",
                textAlign: "left",
            },
            gridContainer: {
                display: "flex",
                flexDirection: "column",
                margin: "auto",
            },
            title: {
                marginBottom: 15,
                color: "white",
            },
            text: {
                lineHeight: "200%",
                color: "white",
            },
            textFaded: {
                lineHeight: "200%",
                color: "#888",
            },
            center: {
                margin: "auto",
                textAlign: "center",
            },
            marginTop15: {
                marginTop: 15
            },
            icon: {
                color: "white",
                marginRight: 5
            }
        }),
    );
    const classes = useStyles()
    return (
        <>
            <div className={classes.root}>
                <Container className={classes.container}>
                    <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                        <Grid item xs={12} className={classes.center}>
                            <Link href={"#"}><InstagramIcon className={classes.icon} /></Link>
                            <Link href={"#"}><FacebookIcon className={classes.icon} /></Link>
                        </Grid>
                        <Grid item lg={6} sm={12}>
                            <Typography variant={"body2"} color={"textSecondary"} className={classes.text}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi commodi dignissimos error fugit iste labore, maxime necessitatibus vero! Consectetur, dignissimos fugit id ipsam iure laboriosam non quas quibusdam veritatis voluptate?
                                <br /><br />
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cumque dolor maxime perspiciatis quia. Ab alias, assumenda, est ex, magnam molestiae mollitia natus numquam quas quasi totam velit vero voluptates?
                            </Typography>
                        </Grid>
                        <Grid item lg={6} sm={12}>

                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body2"} className={classes.textFaded + " " + classes.center + " " + classes.marginTop15}>
                                <b>Nettside laget av <Link href={"#"}>Joachim Maksim</Link></b>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    )
}