import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {collection} from "typesaurus";
import {Project} from "../../types";
import {useOnAll} from "@typesaurus/react";
import ProjectAdminCard from "./ProjectAdminCard";

export default function ProjectsAdmin(props: {margin:number}) {
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
        }),
    );
    const classes = useStyles();
    // Retrieve projects from db
    const projectsCol = collection<Project>("projects")
    const [projectDocs] = useOnAll(projectsCol)
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title}>Våre prosjekter</Typography>
                    <ProjectAdminCard create={true} key={0} />
                    {
                        projectDocs &&
                            projectDocs.map(project =>
                            <ProjectAdminCard create={false} key={project.ref.id} project={project} />
                        )
                    }
                </Grid>
            </Container>
        </>
    )
}