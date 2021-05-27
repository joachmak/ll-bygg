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
                        <TextField type={"email"} name={"_replyto"} required fullWidth id="standard-basic" label="E-post" className={classes.textField} />
                        <TextField required fullWidth id="standard-basic" label="Navn" className={classes.textField} />
                        <TextField required fullWidth id="standard-basic" label="Adresse" className={classes.textField} />
                        <TextField required fullWidth id="standard-basic" label="Tema" className={classes.textField} />
                        <TextField name={"message"} required multiline rows={5} fullWidth id="standard-basic" label="Melding" className={classes.textField} />
                        <TextField value={notRobot} onChange={(e) => setNotRobot(e.target.value)} required fullWidth id="standard-basic" label="Vennligst skriv 'ikkerobot' for å bekrefte at du er en ekte person" className={classes.textField} />
                        <Button disabled={notRobot !== "ikkerobot"} type={"submit"} variant={"outlined"} color={"primary"} >Send henvendelse</Button>


                    </form>
                </Grid>
            </Container>
        </>
    )
}