import {
    Button,
    Container,
    createStyles,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Add, Backspace, Email, Facebook, Instagram, Link, Map, Phone, Room, Update} from "@material-ui/icons";
import {collection, update} from "typesaurus";
import {FooterSection} from "../types";
import {useOnGet} from "@typesaurus/react";

export default function FooterAdmin() {
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
            div: {
                display: "flex",
                flexDirection: "row",
                width: "100%",
            },
            txtField: {
                margin: "7.5px 15px 7.5px 0"
            },
            btnGreen: {
                backgroundColor: "green",
                color: "white",
                "&:hover": {
                    backgroundColor: "darkgreen",
                },
                marginBottom: 50,
                marginRight: 10,
            },
            btnGrey: {
                backgroundColor: "grey",
                color: "white",
                "&:hover": {
                    backgroundColor: "#333",
                },
                marginBottom: 50,
                marginRight: 10,
                border: "none",
            }
        }),
    );
    const classes = useStyles()
    const pageElements = collection("pageElements")
    const [footerDoc, status] = useOnGet<FooterSection>(pageElements, "footer")
    const [countryCode, setCountryCode] = useState(47)
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [mapsUrl, setMapsUrl] = useState("")
    const [ig, setIg] = useState("")
    const [fb, setFb] = useState("")
    const [mapEmbed, setMapEmbed] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    useEffect(() => {
        if (footerDoc && !status.loading && !status.error) {
            setCountryCode(footerDoc.data.countryCode)
            setPhoneNumber(footerDoc.data.phone)
            setAddress(footerDoc.data.address)
            setMapsUrl(footerDoc.data.mapsUrl)
            setEmail(footerDoc.data.email)
            setIg(footerDoc.data.igLink)
            setFb(footerDoc.data.fbLink)
            setMapEmbed(footerDoc.data.mapsEmbed)
        }
    }, [footerDoc, status.error, status.loading])
    const updateFooter = () => {
        setIsProcessing(true)
        update(pageElements, "footer", {countryCode:countryCode, address:address, email:email, fbLink:fb, igLink:ig, phone:phoneNumber, mapsUrl:mapsUrl, mapsEmbed:mapEmbed})
            .then(() => {
                alert("Footeren har blitt oppdatert!")
                setIsProcessing(false)
            })
            .catch((e) => {
                alert(e)
                console.error(e)
                setIsProcessing(false)
            })
    }
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                    <Grid container spacing={4} alignItems={"center"}>
                        <Grid item xs={12}>
                            <Typography variant={"h4"}>
                                Rediger footer
                            </Typography>
                            <div className={classes.div}>
                                <TextField
                                    className={classes.txtField}
                                    fullWidth
                                    variant={"outlined"}
                                    label={"Landkode"}
                                    value={countryCode}
                                    type={"number"}
                                    onChange={(e) => setCountryCode(parseInt(e.target.value))}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Add />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    className={classes.txtField}
                                    fullWidth
                                    variant={"outlined"}
                                    label={"Telefonnummer"}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <TextField
                                className={classes.txtField}
                                fullWidth
                                variant={"outlined"}
                                label={"E-post"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={classes.txtField}
                                fullWidth
                                variant={"outlined"}
                                label={"Adresse"}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Room />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={classes.txtField}
                                fullWidth
                                variant={"outlined"}
                                label={"Google Maps URL"}
                                value={mapsUrl}
                                onChange={(e) => setMapsUrl(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Map />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={classes.txtField}
                                variant={"outlined"}
                                fullWidth
                                label={"Instagram-URL"}
                                value={ig}
                                onChange={(e) => setIg(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Instagram />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={classes.txtField}
                                variant={"outlined"}
                                fullWidth
                                label={"Facebook-URL"}
                                value={fb}
                                onChange={(e) => setFb(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Facebook />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className={classes.txtField}
                                variant={"outlined"}
                                fullWidth
                                label={"Google maps embed-src"}
                                value={mapEmbed}
                                onChange={(e) => setMapEmbed(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Link />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                variant={"outlined"}
                                startIcon={<Update />}
                                className={classes.btnGreen}
                                disabled={isProcessing}
                                onClick={() => updateFooter()}
                            >
                                Oppdater
                            </Button>
                            <Button
                                variant={"outlined"}
                                startIcon={<Backspace />}
                                className={classes.btnGrey}
                                disabled={isProcessing}
                                onClick={() => {
                                    if (footerDoc) {
                                        setPhoneNumber(footerDoc.data.phone)
                                        setMapEmbed(footerDoc.data.mapsEmbed)
                                        setEmail(footerDoc.data.email)
                                        setAddress(footerDoc.data.address)
                                        setMapsUrl(footerDoc.data.mapsUrl)
                                        setIg(footerDoc.data.igLink)
                                        setFb(footerDoc.data.fbLink)
                                        setCountryCode(footerDoc.data.countryCode)
                                    }
                                }}
                            >
                                Angre alle endringer
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}