import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHammer, faHouseDamage, faTools } from '@fortawesome/free-solid-svg-icons'

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
            subtitle: {
                marginBottom: 5,
            },
            text: {
                lineHeight: "200%",
            },
            gridContainer: {
                display: "flex",
                flexDirection: "row",
                margin: "auto",
            },
            iconContainer: {
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
            },
            icon: {
                color: theme.palette.primary.main,
                fontSize: 45,
                display: "flex",
                margin: "10px auto",
            }
        }),
    );
    const classes = useStyles()
    let services = [["Bygg", "Beskrivelse", faHammer], ["Rehabilitering", "Beskrivelse", faHouseDamage], ["Montering", "Beskrivelse", faTools]]
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
                                        <div className={classes.iconContainer}>
                                            <div className={classes.iconContainer}>
                                                {/* @ts-ignore */}
                                                <FontAwesomeIcon className={classes.icon} icon={service[2]} />
                                            </div>
                                            <Typography variant={"h5"} className={classes.subtitle} color={"textSecondary"}>
                                                <b>{service[0]}</b>
                                            </Typography>
                                            <Typography variant={"body2"} className={classes.text} color={"textSecondary"}>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, autem excepturi? Ad aliquam aliquid at atque, ex facere magnam modi nostrum perspiciatis repellat sapiente tempore totam. Adipisci corporis dolorem ipsa.
                                            </Typography>
                                        </div>
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