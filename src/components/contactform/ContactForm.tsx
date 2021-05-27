import {Button, Container, createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core";

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
                        <Button type={"submit"} variant={"outlined"} color={"primary"} >Send henvendelse</Button>


                    </form>
                </Grid>
            </Container>
        </>
    )
}