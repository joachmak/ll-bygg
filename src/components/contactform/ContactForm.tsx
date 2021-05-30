import {Button, Container, createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {useState} from "react";

export default function ContactForm(props: {margin:number}) {
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
            textField: {
                marginBottom: 15,
            }
        }),
    );
    const classes = useStyles()
    const [notRobot, setNotRobot] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [hasSubmitted, setHasSubmitted] = useState(false)
    let isMessageOk = message !== ""
    const isEmailOk = () => {
        let isOk = true
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email === "" || !re.test(String(email).toLowerCase())) {
            isOk = false
        }
        return isOk
    }
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title} >
                        Kontakt oss
                    </Typography>
                    <form method={"post"} noValidate action="https://formspree.io/f/xnqldjry" autoComplete="off">
                        <TextField
                            error={!isEmailOk() && (hasSubmitted || notRobot.length > 0)}
                            helperText={(!isEmailOk() && (hasSubmitted || notRobot.length > 0)) ? "Vennligst skriv inn en gyldig e-post-adresse!" : ""}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            type={"email"}
                            name={"_replyto"}
                            required
                            fullWidth
                            id="standard-basic"
                            label="E-post"
                            className={classes.textField}
                        />
                        <TextField name={"Navn"} fullWidth id="standard-basic" label="Navn" className={classes.textField} />
                        <TextField name={"Adresse"} fullWidth id="standard-basic" label="Adresse" className={classes.textField} />
                        <TextField name={"Tema"} fullWidth id="standard-basic" label="Tema" className={classes.textField} />
                        <TextField
                            required
                            error={!isMessageOk && (hasSubmitted || notRobot.length > 0)}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            name={"Melding"}
                            multiline
                            rows={5}
                            fullWidth
                            id="standard-basic"
                            label="Melding"
                            className={classes.textField}
                            helperText={(!isMessageOk && (hasSubmitted || notRobot.length > 0)) ? "Vennligst skriv en melding!" : ""}
                        />
                        <Typography variant={"caption"} color={"textSecondary"} className={classes.title} >
                            Vennligst skriv 'ikkerobot' i tekstfeltet under for å bekrefte at du er en ekte person
                        </Typography>
                        <TextField multiline value={notRobot} onChange={(e) => setNotRobot(e.target.value)} fullWidth id="standard-basic" label="Skriv 'ikkerobot' her" className={classes.textField} />
                        <Button
                            disabled={!notRobot.toLowerCase().includes("ikkerobot") || notRobot.length >= 12 || !isMessageOk || !isEmailOk()}
                            type={(isMessageOk && isEmailOk() && message.length > 0 && email.length > 0) ? "submit" : "button"}
                            variant={"outlined"}
                            color={"primary"}
                            onClick={() => {
                                if((!isMessageOk || !isEmailOk())) {
                                    setHasSubmitted(true)
                                }
                            }}
                        >
                            Send henvendelse
                        </Button>
                    </form>
                </Grid>
            </Container>
        </>
    )
}