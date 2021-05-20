import {Backdrop, Button, Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useEffect, useState} from "react";
import ProjectCarousel from "./ProjectCarousel";

interface projectObj {
    key: number;
    imgUrl: string;
    description: string;
    images: string[];
    title: string;
}

function ProjectGrid(props: {projectData:projectObj}) {
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
                backgroundImage: "url('" + props.projectData.imgUrl + "')",
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
                minHeight: 50,
                backgroundColor: "rgba(255,140,0, 0.9)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: projectHover ? "100%" : "0%",
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
    return (
        <Grid item sm={6} xs={12}>
            <Button
                id={"" + props.projectData.key}
                className={classes.projectGrid}
                onMouseEnter={() => setProjectHover(true)}
                onMouseLeave={() => setProjectHover(false)}
                onClick={handleToggle}
            >
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
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <ProjectCarousel imgUrls={props.projectData.images} />
            </Backdrop>
        </Grid>
    )
}

function ProjectDesc(props: {isMobile:boolean, toggle:boolean, isLast:boolean, projectData:projectObj}) {
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
    return (
        <Grid item sm={6} xs={12}>
            <div className={classes.projectDesc}>
                <div>
                    <Typography variant={textTitleStyle} className={classes.title} color={"textSecondary"}>
                        { props.projectData.title }
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
    let isMobile: boolean = (width <= 599); // Mobile if width <= 599px (Material UI Grid breakpoint)

    let projects:projectObj[] = [
        {key: 1, title: "Bygging av hytte", imgUrl:"https://i2.wp.com/www.homesteadbuildingsystemsinc.com/wp-content/uploads/2016/09/Project-Manager-Walking-through-Framed-House.jpg?fit=1920%2C1080&ssl=1", description:"", images:["https://www.thespruce.com/thmb/TIUYmTRJ3NOFnY9LJ6FzMd_9oBc=/2571x1928/smart/filters:no_upscale()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg", "https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg", "https://static.toiimg.com/thumb/68007187/garden.jpg?width=1200&height=900"]},
        {key: 2, title: "Måling av ting", imgUrl:"https://media.istockphoto.com/photos/carpenter-working-with-equipment-on-wooden-table-in-carpentry-shop-picture-id1147804793?k=6&m=1147804793&s=612x612&w=0&h=dB2GkD3p9cz-icf56LGcKQZggtUA4Rp_KU5WxKMfFfM=", description:"", images:["", ""]},
        {key: 3, title: "Prosjekt med tresag", imgUrl:"https://www.careersinconstruction.ca/sites/default/files/styles/career_banner/public/images/careers/4841_stone_farmhouse_reno_8x12_low_0.jpg?itok=VJi18X5T", description:"", images:["", "", "", "", "", ""]},
        {key: 4, title: "Stol-prosjekt", imgUrl:"https://www.homestratosphere.com/wp-content/uploads/2019/12/wooden-chair-woodworker-dec142019-min.jpg", description:"", images:["", "", ""]}];
    let toggle = false; // Controls whether to display text on left or right side
    let projectCount = 0; // Used to check which image is last
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title}>Våre prosjekter</Typography>
                    <Grid container spacing={0}>
                        {
                            projects.map(project => {
                                toggle = !toggle
                                projectCount += 1
                                return isMobile ?
                                    <>
                                        <ProjectGrid key={project.key} projectData={project} />
                                        <ProjectDesc toggle={toggle} projectData={project} isMobile={isMobile} isLast={projectCount === projects.length} />
                                    </>
                                :
                                toggle ?
                                    <>
                                        <ProjectGrid key={project.key} projectData={project} />
                                        <ProjectDesc toggle={toggle} projectData={project} isMobile={isMobile} isLast={projectCount === projects.length} />
                                    </>
                                    :
                                    <>
                                        <ProjectDesc toggle={toggle} projectData={project} isMobile={isMobile} isLast={projectCount === projects.length} />
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