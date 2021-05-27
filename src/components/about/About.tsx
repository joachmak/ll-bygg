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
import Employees from "../employees/Employees";
import {collection, update} from "typesaurus";
import {useGet} from "@typesaurus/react";
import {AboutSection} from "../../types";
import {useEffect, useState} from "react";
import {Description, Title, Update} from "@material-ui/icons";

export default function About(props: {margin:number, admin:boolean}) {
    const pageElem = collection("pageElements")
    let [aboutDoc] = useGet<AboutSection>(pageElem, "about")
    let [description, setDescription] = useState("")
    let [title, setTitle] = useState("")
    let [isProcessing, setIsProcessing] = useState(false)
    useEffect(() => {
        if (aboutDoc) {
            setDescription(aboutDoc.data.description)
            setTitle(aboutDoc.data.title)
        }
    }, [aboutDoc])
    const updateAboutSection = () => {
        if (!aboutDoc) {
            alert("Vent til informasjonen laster fra databasen")
            return
        }
        setIsProcessing(true)
        update(pageElem, aboutDoc.ref.id, {title:title, description:description})
            .then(() => {
                alert("Beskrivelsen har blitt oppdatert!")
                setIsProcessing(false)
            })
            .catch((e) => {
                alert(e)
                console.error(e)
                setIsProcessing(false)
            })
    }
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
            txtField: {
                margin: "15px 0",
                whiteSpace: "pre-line",
            },
            btnUpdate: {
                color: "white",
                backgroundColor: "green",
                "&:hover": {
                    backgroundColor: "darkgreen",
                }
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
                                <Typography variant={"h5"}>Rediger "Om oss"-seksjon</Typography>
                                <TextField
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    className={classes.txtField}
                                    multiline
                                    variant={"outlined"}
                                    label={"Tittel"}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Title />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    className={classes.txtField}
                                    multiline
                                    variant={"outlined"}
                                    label={"Beskrivelse"}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Description />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    variant={"contained"}
                                    className={classes.btnUpdate}
                                    onClick={() => {
                                        updateAboutSection()
                                    }}
                                    disabled={isProcessing}
                                    startIcon={<Update />}
                                >
                                    Oppdater
                                </Button>
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
                                <Typography style={{whiteSpace: 'pre-line'}} display="block" variant={"body2"} color={"textSecondary"} className={classes.text}>
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