import {Container, createStyles, Grid, Link, makeStyles, Theme, Typography} from "@material-ui/core";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import RoomIcon from '@material-ui/icons/Room';
import {useState} from "react";

function FooterIcon(props:{text:string, linkTo:string, icon:JSX.Element}) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            text: {
                lineHeight: "200%",
                color: "white",
                display: "flex",
                flexDirection: "row",
                transition: "all 0.2s ease-in-out",
            },
            textHover: {
                lineHeight: "200%",
                color: "orange",
                display: "flex",
                flexDirection: "row",
                paddingLeft: 5,
                transition: "all 0.2s ease-in-out",
            },
            iconText: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textDecoration: "none",
            },
            iconDiv: {
                marginRight: 10,
                color: "white",
            },
            iconDivHover: {
                marginRight: 10,
                color: "orange",
            }
        }),
    );
    const classes = useStyles()
    let [hover, setHover] = useState(false);
    return (
        <>
            <Link
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                href={props.linkTo}
                underline={"none"}
                className={classes.iconText}
            >
                <Typography variant={"body2"} className={hover ? classes.textHover : classes.text}>
                    <div className={hover ? classes.iconDivHover : classes.iconDiv}>{props.icon}</div> {props.text}
                </Typography>
            </Link>
        </>
    )
}

export default function Footer() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                backgroundColor: "#222",
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
                marginRight: 10,
                transition: "all 0.2s ease-in-out",
            },
            iconHover: {
                marginRight: 10,
                color: theme.palette.primary.main,
                transition: "all 0.2s ease-in-out",
            },
            iconText: {
                display: "flex",
                alignItems: "center",
                color: "white",
                textDecoration: "none",
            },
            map: {
                maxHeight: "400px",
                minHeight: "300px",
                maxWidth: "400px",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg')",
                backgroundSize: "cover",
            },
            link: {
                color: "orange",
            }
        }),
    );
    const classes = useStyles()
    let [iconHoverInsta, setIconHoverInsta] = useState(false);
    let [iconHoverFb, setIconHoverFb] = useState(false);
    return (
        <>
            <div className={classes.root}>
                <Container className={classes.container}>
                    <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                        <Grid container spacing={4} alignItems={"center"}>
                            <Grid item xs={12} className={classes.center}>
                                <Link
                                    onMouseEnter={() => setIconHoverInsta(true)}
                                    onMouseLeave={() => setIconHoverInsta(false)}
                                    href={"#"}
                                    className={iconHoverInsta ? classes.iconHover : classes.icon}
                                >
                                    <InstagramIcon />
                                </Link>
                                <Link
                                    onMouseEnter={() => setIconHoverFb(true)}
                                    onMouseLeave={() => setIconHoverFb(false)}
                                    href={"#"}
                                    className={iconHoverFb ? classes.iconHover : classes.icon}
                                >
                                    <FacebookIcon />
                                </Link>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <FooterIcon text={"(+47) 473 00 567"} linkTo={"tel: 4747300567"} icon={<PhoneIcon />}/>
                                <FooterIcon text={"Kontakt oss via e-post"} linkTo={"mailto: joachimmaksim@gmail.com"} icon={<EmailIcon />}/>
                                <FooterIcon text={"Odd Brochmanns veg 2, 7051 Trondheim"} linkTo={"#"} icon={<RoomIcon />}/>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <div className={classes.map}>
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