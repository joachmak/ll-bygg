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
import {useState} from "react";
import {Add, Email, Facebook, Instagram, Phone, Room, Update} from "@material-ui/icons";

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
            }
        }),
    );
    const classes = useStyles()
    const [countryCode, setCountryCode] = useState(47)
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [ig, setIg] = useState("")
    const [fb, setFb] = useState("")

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
                            <Button
                                variant={"outlined"}
                                startIcon={<Update />}
                                className={classes.btnGreen}
                            >
                                Oppdater
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}