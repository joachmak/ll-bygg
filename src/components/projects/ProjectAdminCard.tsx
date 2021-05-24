import {createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {Project} from "../../types";
import {Doc} from "typesaurus";
import {useState} from "react";
import ProjectAdminImage from "./ProjectAdminImage";

export default function ProjectAdminCard(props:{project:Doc<Project>}) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                //border: "1px solid orange",
                padding: "15px 15px 0",
                margin: "15px 0 30px",
                borderRadius: 10,
                boxShadow: "0 3px 5px rgba(0,0,0,0.2)"
            },
            txtField: {
                marginBottom: 15,
            },
            img: {
                maxWidth: "50%",
                maxHeight: 300,
                display: "block",
                margin: "15px auto",
            }
        }),
    );
    const classes = useStyles()
    const [title, setTitle] = useState(props.project.data.title)
    const [description, setDescription] = useState(props.project.data.description)
    const [thumbnailUrl, setThumbnailUrl] = useState(props.project.data.thumbnail)
    const [images, setImages] = useState(props.project.data.images)
    const setImageByID = (id:number, value:string) => {
        let res = []
        for (let i = 0; i < images.length; i++) {
            if (i === id) {
                res.push(value)
            } else {
                res.push(images[i])
            }
        }
        setImages(res)
        console.log("TRIGGERED! ID: " + id)
    }
    let i = 0
    return (
        <>
            <Grid item xs={12} className={classes.root}>
                <TextField
                    variant={"outlined"}
                    className={classes.txtField}
                    label={"Tittel"}
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    fullWidth
                />
                <TextField
                    variant={"outlined"}
                    className={classes.txtField}
                    label={"Beskrivelse"}
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                    fullWidth
                />
                <Typography variant={"h5"} color={"textSecondary"}>Thumbnail</Typography>
                <img src={thumbnailUrl} alt={props.project.data.title + " thumbnail"} className={classes.img} />
                <TextField
                    variant={"outlined"}
                    className={classes.txtField}
                    label={"Thumbnail-URL"}
                    value={thumbnailUrl}
                    onChange={(e) => {setThumbnailUrl(e.target.value)}}
                    fullWidth
                />
                <Typography variant={"h5"} color={"textSecondary"}>Images</Typography>
                {
                    props.project.data.images.map(projectImage =>
                        <ProjectAdminImage id={i++} onChangeFunc={(id, val) => setImageByID(id, val)} initUrl={projectImage} />
                    )
                }
            </Grid>
        </>
    )
}