import {Container, createStyles, Grid, Link, makeStyles, Theme, Typography} from "@material-ui/core";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import RoomIcon from '@material-ui/icons/Room';
import {useState} from "react";
import {collection} from "typesaurus";
import {FooterSection} from "../types";
import {useOnGet} from "@typesaurus/react";


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
                target={"_blank"}
                className={classes.iconText}
            >
                <Typography variant={"body2"} className={hover ? classes.textHover + " " + classes.iconDivHover : classes.text + " " + classes.iconDiv}>
                    {props.icon} {props.text}
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
            marginRight10: {
                marginRight: 10,
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
            },
        }),
    );
    const classes = useStyles()
    let [iconHoverInsta, setIconHoverInsta] = useState(false);
    let [iconHoverFb, setIconHoverFb] = useState(false);
    const pageElems = collection("pageElements")
    const [footerDoc] = useOnGet<FooterSection>(pageElems, "footer")

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
                                    href={footerDoc ? footerDoc.data.igLink : ""}
                                    className={iconHoverInsta ? classes.iconHover : classes.icon}
                                >
                                    <InstagramIcon />
                                </Link>
                                <Link
                                    onMouseEnter={() => setIconHoverFb(true)}
                                    onMouseLeave={() => setIconHoverFb(false)}
                                    href={footerDoc ? footerDoc.data.fbLink : ""}
                                    className={iconHoverFb ? classes.iconHover : classes.icon}
                                >
                                    <FacebookIcon />
                                </Link>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <FooterIcon
                                    text={
                                        "(+" +
                                        (footerDoc ? footerDoc.data.countryCode : "") +") " +
                                        (footerDoc ? footerDoc.data.phone.slice(0,3) + " " +
                                            footerDoc.data.phone.slice(3,5) + " " +
                                            footerDoc.data.phone.slice(5,8) : "")
                                    }
                                    linkTo={"tel: " +
                                    (footerDoc ? footerDoc.data.countryCode + footerDoc.data.phone : "")
                                    }
                                    icon={<PhoneIcon className={classes.marginRight10} />}/>
                                <FooterIcon
                                    text={"Kontakt oss via e-post"}
                                    linkTo={footerDoc ? "mailto:" + footerDoc.data.email : ""}
                                    icon={<EmailIcon className={classes.marginRight10} />}
                                />
                                <FooterIcon
                                    text={footerDoc ? footerDoc.data.address : ""}
                                    linkTo={footerDoc ? footerDoc.data.mapsUrl : ""}
                                    icon={
                                        <RoomIcon className={classes.marginRight10} />
                                    }
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1785.6085223286616!2d10.413453516317942!3d63.41395388406932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x466d31c7583d2bb7%3A0x262e43399830a637!2sOdd%20Brochmanns%20veg%202%2C%207030%20Trondheim!5e0!3m2!1sen!2sno!4v1622100492231!5m2!1sen!2sno"
                                    width="100%" height="350" frameBorder={"none"} title={"kart"}
                                    loading="lazy">
                                </iframe>
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