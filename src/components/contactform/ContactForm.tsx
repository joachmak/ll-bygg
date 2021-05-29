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
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title} >
                        Kontakt oss
                    </Typography>
                    <form method={"post"} noValidate action="https://formspree.io/f/xnqldjry" autoComplete="off">
                        <TextField type={"email"} name={"_replyto"} required fullWidth id="standard-basic" label="E-post" className={classes.textField} /> {/* TODO: Enforce this */}
                        <TextField name={"Navn"} fullWidth id="standard-basic" label="Navn" className={classes.textField} />
                        <TextField name={"Adresse"} fullWidth id="standard-basic" label="Adresse" className={classes.textField} />
                        <TextField name={"Tema"} fullWidth id="standard-basic" label="Tema" className={classes.textField} />
                        <TextField name={"Melding"} multiline rows={5} fullWidth id="standard-basic" label="Melding" className={classes.textField} />
                        <Typography variant={"caption"} color={"textSecondary"} className={classes.title} >
                            Vennligst skriv 'ikkerobot' i tekstfeltet under for å bekrefte at du er en ekte person
                        </Typography>
                        <TextField multiline value={notRobot} onChange={(e) => setNotRobot(e.target.value)} fullWidth id="standard-basic" label="Skriv 'ikkerobot' her" className={classes.textField} />
                        <Button disabled={!notRobot.toLowerCase().includes("ikkerobot")} type={"submit"} variant={"outlined"} color={"primary"} >Send henvendelse</Button>
                    </form>
                </Grid>
            </Container>
        </>
    )
}