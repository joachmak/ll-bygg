import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";

function ProjectGrid() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            projectGrid: {
                backgroundColor: "black",
                height: "100%",
                minHeight: 250,
            },
        }),
    );
    const classes = useStyles();
    return (
        <Grid item sm={6} xs={12}>
            <div className={classes.projectGrid}>
            </div>
        </Grid>
    )
}

function ProjectDesc() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            projectDesc: {
                padding: 15,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                maxHeight: "100%",
                maxWidth: "100%",
            },
            title: {
                marginBottom: 15,
            },
            text: {
                lineHeight: "200%",
            },
        }),
    );
    const classes = useStyles();
    const textTitleStyle = "h5"; // Anbefaler h5
    const textStyle = "body1"; // Anbefaler body1, body2 eller caption
    return (
        <Grid item sm={6} xs={12}>
            <div className={classes.projectDesc}>
                <div>
                    <Typography variant={textTitleStyle} className={classes.title} color={"textSecondary"}>
                        Prosjekt-tittel
                    </Typography>
                    <Typography variant={textStyle} className={classes.text} color={"textSecondary"}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum eos ex hic id non nostrum, obcaecati porro. Doloribus laboriosam laborum libero mollitia nisi, officia perspiciatis quia repudiandae sit tempora velit.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum eos ex hic id non nostrum, obcaecati porro. Doloribus laboriosam laborum libero mollitia nisi, officia perspiciatis quia repudiandae sit tempora velit.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum eos ex hic id non nostrum, obcaecati porro. Doloribus laboriosam laborum libero mollitia nisi, officia perspiciatis quia repudiandae sit tempora velit.
                    </Typography>
                </div>
            </div>
        </Grid>
    )
}

export default function Projects(props: {margin:number}) {
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
            }
        }),
    );
    const classes = useStyles();

    // Detect mobile screen
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    let isMobile: boolean = (width <= 599);

    let projects = ["", "","","",""];
    let toggle = false;
    console.log("Is mobile? " + isMobile)
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title}>Våre prosjekter</Typography>
                    <Grid container spacing={0}>
                        {

                            projects.map(project => {
                                toggle = !toggle
                                return isMobile ?
                                    <>
                                        <ProjectGrid />
                                        <ProjectDesc />
                                    </>
                                :
                                toggle ?
                                    <>
                                        <ProjectGrid />
                                        <ProjectDesc />
                                    </>
                                    :
                                    <>
                                        <ProjectDesc />
                                        <ProjectGrid />
                                    </>
                            }
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}