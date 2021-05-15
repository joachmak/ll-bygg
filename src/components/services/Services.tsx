import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

export default function Services(props:{margin:number}) {
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
            gridContainer: {
                display: "flex",
                flexDirection: "row",
                margin: "auto",
            }
        }),
    );
    const classes = useStyles()
    let services = [["Rådgivning", "Beskrivelse "], ["Tilbygg", "Beskrivelse"], ["Bolighus", "Beskrivelse"]]
    return(
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                    <Grid container direction={"column"}>
                        <Typography variant={"h4"} className={classes.title}>
                            Våre tjenester
                        </Typography>
                        <Grid container spacing={4}>
                            {
                                services.map(service =>
                                    <Grid item xl={4} lg={6} md={8} sm={10} xs={12}>
                                        <Typography variant={"h5"} className={classes.title} color={"textSecondary"}>
                                            <b>{service[0]}</b>
                                        </Typography>
                                        <Typography variant={"body2"} className={classes.text} color={"textSecondary"}>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, autem excepturi? Ad aliquam aliquid at atque, ex facere magnam modi nostrum perspiciatis repellat sapiente tempore totam. Adipisci corporis dolorem ipsa.
                                        </Typography>
                                    </Grid>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}