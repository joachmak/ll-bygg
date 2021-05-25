import {Backdrop, Button, Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import ProjectCarousel from "./ProjectCarousel";
import {collection, Doc} from "typesaurus";
import {Project} from "../../types";
import {useOnAll} from "@typesaurus/react";

function ProjectGrid(props: {projectData:Doc<Project> | undefined}) {
    let [projectHover, setProjectHover] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            projectGrid: {
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "100%",
                width: "100%",
                backgroundImage: "url('" + (props.projectData ? props.projectData.data.thumbnail : "") + "')",
                backgroundSize: "cover",
                minHeight: 250,
                padding: 0,
                borderRadius: 0,
            },
            displayProjectText: {
                color: "white",
                opacity: projectHover ? "100%" : "0%",
                transition: "all 0.2s ease-in-out",
            },
            projectHoverDiv: {
                width: "100%",
                height: projectHover ? "100%" : 0,
                bottom: "0",
                backgroundColor: "rgba(255,140,0, 0.9)",
                color: "white",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "0.2s ease-in-out",
            },
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
                backgroundColor: "rgba(0,0,0,0.8)"
            },
        }),
    );
    const classes = useStyles();
    if (!props.projectData) {
        return (
            <>
                Laster inn data...
            </>
        )
    }
    return (
        <Grid item sm={6} xs={12}>
            <Button
                id={props.projectData.ref!.id}
                className={classes.projectGrid}
                onMouseEnter={() => setProjectHover(true)}
                onMouseLeave={() => setProjectHover(false)}
                onClick={handleToggle}
            >
                <div className={classes.projectHoverDiv}>
                    <Typography variant={"body1"} className={classes.displayProjectText}>
                        <b>
                            Vis
                            {
                                " " + props.projectData.data.images.length + " bilde" + (props.projectData.data.images.length > 1 ? "r" : "")
                            }
                        </b>
                    </Typography>
                </div>
            </Button>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <ProjectCarousel imgUrls={props.projectData.data.images} />
            </Backdrop>
        </Grid>
    )
}

function ProjectDesc(props: {isMobile:boolean, toggle:boolean, isLast:boolean, projectData:Doc<Project> | undefined}) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            projectDesc: {
                padding: props.isMobile ? "5px 0" : (props.toggle ? "5px 15px" : "5px 15px 5px 0"),
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
                marginBottom: props.isMobile && !props.isLast ? "3.5em" : "0",
            },
        }),
    );
    const classes = useStyles();
    const textTitleStyle = "h5"; // Anbefaler h5
    const textStyle = "body2"; // Anbefaler body1, body2 eller caption
    if (!props.projectData) {
        return (
            <>
                Laster inn beskrivelse...
            </>
        )
    }
    return (
        <Grid item sm={6} xs={12}>
            <div className={classes.projectDesc}>
                <div>
                    <Typography variant={textTitleStyle} className={classes.title} color={"textPrimary"}>
                        { props.projectData.data.title }
                    </Typography>
                    <Typography variant={textStyle} className={classes.text} color={"textSecondary"}>
                        { props.projectData.data.description }
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
    let isMobile: boolean = (width <= 599); // Mobile if width <= 599px (Material UI Grid breakpoint)
    // Retrieve projects from db
    const projectsCol = collection<Project>("projects")
    const [projectDocs] = useOnAll(projectsCol)
    let toggle = false; // Controls whether to display text on left or right side
    let projectCount = 0; // Used to check which image is last
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title}>Våre prosjekter</Typography>
                    <Grid container spacing={0}>
                        {
                            projectDocs ?
                            projectDocs.map(project => {
                                toggle = !toggle
                                projectCount += 1
                                return (
                                    <Grid container key={project.ref.id}>
                                        {
                                            isMobile ?
                                                <>
                                                    <ProjectGrid projectData={project} />
                                                    <ProjectDesc toggle={toggle} projectData={project} isMobile={isMobile} isLast={projectCount === projectDocs.length} />
                                                </>
                                                :
                                                toggle ?
                                                    <>
                                                        <ProjectGrid projectData={project} />
                                                        <ProjectDesc toggle={toggle} projectData={project} isMobile={isMobile} isLast={projectCount === projectDocs.length} />
                                                    </>
                                                    :
                                                    <>
                                                        <ProjectDesc toggle={toggle} projectData={project} isMobile={isMobile} isLast={projectCount === projectDocs.length} />
                                                        <ProjectGrid projectData={project} />
                                                    </>
                                        }
                                    </Grid>
                                )
                            }
                            )
                                :
                                "Prosjekter laster"
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}