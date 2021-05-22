import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

let img = require("./header.JPG")
let logoImg = require("./llbygg_redusert.png")
const darkness = 0.25 // Higher = darker

export default function HeaderAdmin() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: "flex",
                justifyContent: "center",
                margin: "15px auto",
                textAlign: "left",
            },
            title: {
                marginBottom: 15,
            },
            header: {
                height: "85vh",
                background: "linear-gradient( rgba(0, 0, 0, " + darkness + "), rgba(0, 0, 0, " + darkness + ") ), url('" + img.default + "')",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                boxShadow: "inset 0 0 7em 1em #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            },
            typography: {
                color: "white",
                marginTop: 20,
            },
            imgBg: {
                backgroundColor: "rgba(0,0,0,0.5)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
            },
            gridContainer: {
                display: "flex",
                flexDirection: "row",
                margin: "auto",
            },
        }),
    );
    const classes = useStyles()
    return (
        <>
            <div className={classes.header}>
                <img alt={"Header"} className={"headerAnim"} src={logoImg.default} height={200} />
            </div>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                    <Grid container direction={"column"}>
                        <Typography variant={"h4"} className={classes.title}>
                            Rediger header
                        </Typography>
                        <div>
                            *Admin-funksjonalitet for redigering av header*
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}