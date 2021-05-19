import {Button, Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
interface projectObj {
    key: number;
    imgUrl: string;
    description: string;
    images: string[];
}

function ProjectGrid(props: {projectData:projectObj}) {
    let [projectHover, setProjectHover] = useState(false);
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            projectGrid: {
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "100%",
                width: "100%",
                backgroundImage: "url('https://previews.123rf.com/images/panoramarx/panoramarx1512/panoramarx151200001/49902703-construction-of-a-wood-plastic-composite-garden-terrace.jpg')",
                backgroundSize: "cover",
                minHeight: 250,
                padding: 0,
                display: "flex",
                alignItems: "flex-end",
            },
            displayProjectText: {
                color: "white",
            },
            projectHoverDiv: {
                minWidth: "100%",
                minHeight: 75,
                backgroundColor: "rgba(0,0,0,0.8)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: projectHover ? "100%" : "0%",
                transition: "0.2s ease-in-out"
            }
        }),
    );
    const classes = useStyles();
    return (
        <Grid item sm={6} xs={12}>
            {/*@ts-ignore*/}
            <Button id={"" + props.id} className={classes.projectGrid} onMouseEnter={() => setProjectHover(true)} onMouseLeave={() => setProjectHover(false)} onClick={e => {console.log("Click " + e.target.id)}}>
                <div className={classes.projectHoverDiv}>
                    <Typography variant={"body2"} className={classes.displayProjectText}>
                        <b>
                            Vis
                            {
                                " " + props.projectData.images.length + " bilde" + (props.projectData.images.length > 1 ? "r" : "")
                            }
                        </b>
                    </Typography>
                </div>
            </Button>
        </Grid>
    )
}

function ProjectDesc(props: {isMobile:boolean}) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            projectDesc: {
                padding: props.isMobile ? "5px 0" : 5,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "100%",
                maxWidth: "100%",
            },
            title: {
                marginBottom: 15,
            },
            text: {
                lineHeight: "200%",
                marginBottom: props.isMobile ? "3.5em" : "0",
            },
        }),
    );
    const classes = useStyles();
    const textTitleStyle = "h5"; // Anbefaler h5
    const textStyle = "body2"; // Anbefaler body1, body2 eller caption
    return (
        <Grid item sm={6} xs={12}>
            <div className={classes.projectDesc}>
                <div>
                    <Typography variant={textTitleStyle} className={classes.title} color={"textSecondary"}>
                        Prosjekt-tittel
                    </Typography>
                    <Typography variant={textStyle} className={classes.text} color={"textSecondary"}>
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

    let projects:projectObj[] = [
        {key: 1, imgUrl:"", description:"", images:[""]},
        {key: 2, imgUrl:"", description:"", images:[""]},
        {key: 3, imgUrl:"", description:"", images:[""]},
        {key: 4, imgUrl:"", description:"", images:[""]}];
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
                                        <ProjectGrid key={project.key} projectData={project} />
                                        <ProjectDesc isMobile={isMobile} />
                                    </>
                                :
                                toggle ?
                                    <>
                                        <ProjectGrid key={project.key} projectData={project} />
                                        <ProjectDesc isMobile={isMobile} />
                                    </>
                                    :
                                    <>
                                        <ProjectDesc isMobile={isMobile} />
                                        <ProjectGrid key={project.key} projectData={project} />
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