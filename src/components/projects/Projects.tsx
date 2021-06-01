import {Backdrop, Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
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
                width: "100%",
                padding: 0,
                marginBottom: -4,
                position: "relative",
            },
            displayProjectText: {
                color: "white",
                opacity: projectHover ? "100%" : "0%",
                transition: "all 0.2s ease-in-out",
                margin: 0,
                padding: 0,
            },
            projectHoverDiv: {
                width: "100%",
                height: projectHover ? "100%" : 0,
                backgroundColor: "rgba(255,140,0, 0.9)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                wrap: "nowrap",
                transition: "0.2s ease-in-out",
                position: "absolute",
                bottom: 0,
                pointerEvents: "none",
                padding: 0,
            },
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
                backgroundColor: "rgba(0,0,0,0.8)"
            },
            imgContainerDiv: {
                position: "relative",
                cursor: "pointer",
                margin: 0,
                padding: 0,
            }
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
            <div className={classes.imgContainerDiv}>
                <img
                    alt={props.projectData.data.title + " bilde"}
                    src={props.projectData.data.thumbnail}
                    className={classes.projectGrid}
                    onMouseEnter={() => setProjectHover(true)}
                    onMouseLeave={() => setProjectHover(false)}
                    onClick={handleToggle}
                />
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
            </div>
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <ProjectCarousel imgUrls={props.projectData.data.images} />
            </Backdrop>
        </Grid>
    )
}

function ProjectDesc(props: {isMobile:boolean, toggle:boolean | undefined, isLast:boolean, projectData:Doc<Project> | undefined}) {
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
    const [toggleStates, setToggleStates] = useState<Map<string, boolean>>(new Map())
    useEffect(() => {
        if (projectDocs) {
            let toggleState = true
            let tempMap:Map<string, boolean> = new Map()
            projectDocs.forEach(project => {
                tempMap.set(project.ref.id, toggleState)
                toggleState = !toggleState
            })
            setToggleStates(tempMap)
        }
    }, [projectDocs])
    let projectCount = 0
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title}>Noen av våre prosjekter</Typography>
                    <Grid container spacing={0}>
                        {
                            projectDocs ?
                            projectDocs.map(project => {
                                projectCount++

                                    return (
                                    <Grid container key={project.ref.id}>
                                        {
                                            isMobile ?
                                                <>
                                                    <ProjectGrid projectData={project} />
                                                    <ProjectDesc toggle={false} projectData={project} isMobile={isMobile} isLast={projectCount === projectDocs.length} />
                                                </>
                                                :
                                                (toggleStates && toggleStates.has(project.ref.id) ? toggleStates.get(project.ref.id) : false) ?
                                                    <>
                                                        <ProjectGrid projectData={project} />
                                                        <ProjectDesc toggle={(toggleStates && toggleStates.has(project.ref.id) ? toggleStates.get(project.ref.id) : true)} projectData={project} isMobile={isMobile} isLast={projectCount === projectDocs.length} />
                                                    </>
                                                    :
                                                    <>
                                                        <ProjectDesc toggle={toggleStates && toggleStates.has(project.ref.id) ? toggleStates.get(project.ref.id) : false} projectData={project} isMobile={isMobile} isLast={projectCount === projectDocs.length} />
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