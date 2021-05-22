import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

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
            title: {
                marginBottom: 15,
                color: "white",
            },
            text: {
                lineHeight: "200%",
                color: "white",
            },
            textFaded: {
                lineHeight: "200%",
                color: "#888",
            },
            center: {
                margin: "auto",
                textAlign: "center",
            },
            marginTop15: {
                marginTop: 15
            },
            marginRight10: {
                marginRight: 10,
            },
            icon: {
                color: "white",
                marginRight: 10,
                transition: "all 0.2s ease-in-out",
            },
            iconHover: {
                marginRight: 10,
                color: theme.palette.primary.main,
                transition: "all 0.2s ease-in-out",
            },
            iconText: {
                display: "flex",
                alignItems: "center",
                color: "white",
                textDecoration: "none",
            },
            map: {
                maxHeight: "400px",
                minHeight: "300px",
                maxWidth: "400px",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: "url('https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg')",
                backgroundSize: "cover",
            },
            link: {
                color: "orange",
            }
        }),
    );
    const classes = useStyles()

    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                    <Grid container spacing={4} alignItems={"center"}>
                        <Grid item sm={6} xs={12}>
                            {
                                /* Textfields here
                                * urls: instagram, facebook, google maps
                                * contact info: email, phone number, address
                                * extra: map radius, map location(?)
                                * WARNING: Changing this email will possibly change the email form - email!
                                * (we'll see after implementation)
                                * */
                            }
                            <Typography variant={"h4"}>
                                Rediger footer
                            </Typography>
                            Footer-admin
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}