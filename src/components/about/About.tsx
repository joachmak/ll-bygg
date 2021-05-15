import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

export default function About(props: {margin:number}) {
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
                    <Typography variant={"caption"} color={"textSecondary"} className={classes.title}>
                        <b>STIFTET I 2019</b>
                    </Typography>
                    <Typography variant={"body2"} color={"textSecondary"} className={classes.text}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi commodi dignissimos error fugit iste labore, maxime necessitatibus vero! Consectetur, dignissimos fugit id ipsam iure laboriosam non quas quibusdam veritatis voluptate?
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cumque dolor maxime perspiciatis quia. Ab alias, assumenda, est ex, magnam molestiae mollitia natus numquam quas quasi totam velit vero voluptates?
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum itaque obcaecati optio saepe sequi? Beatae consequuntur corporis deleniti dolorem ex, incidunt libero nobis nulla obcaecati odio sequi, soluta unde vero?
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A autem beatae dolores eius error esse exercitationem fugit harum in incidunt ipsum, itaque, labore officiis praesentium provident repellendus repudiandae sapiente voluptatem?
                    </Typography>
                </Grid>
            </Container>
        </>
    )
}