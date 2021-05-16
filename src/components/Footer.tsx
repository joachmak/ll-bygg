import {Container, createStyles, Grid, Link, makeStyles, Theme, Typography} from "@material-ui/core";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import RoomIcon from '@material-ui/icons/Room';

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
                marginRight: 10
            },
            iconText: {
                display: "flex",
                alignItems: "center",
                color: "white",
                textDecoration: "none",
            },
            map: {
                height: "300px",
                border: "5px solid #999",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            },
            link: {
                color: "orange",
            }
        }),
    );
    const classes = useStyles()
    return (
        <>
            <div className={classes.root}>
                <Container className={classes.container}>
                    <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                        <Grid container spacing={4} alignItems={"center"}>
                            <Grid item xs={12} className={classes.center}>
                                <Link href={"#"} className={classes.icon}><InstagramIcon /></Link>
                                <Link href={"#"} className={classes.icon}><FacebookIcon /></Link>
                            </Grid>
                            <Grid item lg={6} sm={12}>
                                <Typography variant={"body2"} className={classes.text}>
                                    <Link href={"tel: 4747300567"} className={classes.iconText}>
                                        <PhoneIcon className={classes.icon} /> (+47) 473 00 567
                                    </Link>
                                </Typography>
                                <Typography variant={"body2"} className={classes.text}>
                                    <Link href={"mailto: joachimmaksim@gmail.com"} className={classes.iconText}>
                                        <EmailIcon className={classes.icon} /> joachimmaksim@gmail.com
                                    </Link>
                                </Typography>
                                <Typography variant={"body2"} className={classes.text}>
                                    <Link href={"mailto: joachimmaksim@gmail.com"} className={classes.iconText}>
                                        <RoomIcon className={classes.icon} /> Odd Brochmanns veg 2, 7051 Trondheim
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item lg={6} sm={12}>
                                <div className={classes.map}>
                                    <Typography variant={"body2"} className={classes.text}>Kart vil vises her</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant={"body2"} className={classes.textFaded + " " + classes.center + " " + classes.marginTop15}>
                                    <b>Nettside laget av <Link href={"https://joachimmaksim.no/"} target="_blank" className={classes.link}>Foxden Consulting</Link> (2021)</b>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </>
    )
}