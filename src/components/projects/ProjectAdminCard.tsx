import {Backdrop, Button, createStyles, Grid, Link, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {Project} from "../../types";
import {collection, Doc, remove, update} from "typesaurus";
import {useState} from "react";
import ProjectAdminImage from "./ProjectAdminImage";
import {Add, Backspace, Delete, Update} from "@material-ui/icons";
import ProjectCarousel from "./ProjectCarousel";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

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
            },
            btn: {
                margin: "0 10px 15px 0",
                color: "white",
            },
            btnGreen: {
                backgroundColor: "green",
                "&:hover": {
                    backgroundColor: "darkgreen",
                }
            },
            btnGrey: {
                backgroundColor: "grey",
                "&:hover": {
                    backgroundColor: "#333",
                }
            },
            link: {
                color: "darkblue",
                cursor: "pointer",
                marginBottom: 15,
            },
            backdrop: {
                zIndex: theme.zIndex.drawer + 1,
                color: '#fff',
                backgroundColor: "rgba(0,0,0,0.8)"
            },
        }),
    );
    const classes = useStyles()
    const [title, setTitle] = useState(props.project.data.title)
    const [description, setDescription] = useState(props.project.data.description)
    const [thumbnailUrl, setThumbnailUrl] = useState(props.project.data.thumbnail)
    const [images, setImages] = useState(props.project.data.images)
    const [open, setOpen] = useState(false)
    const [rerender, setRerender] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
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
    const deleteImageByID = (id:number) => {
        console.log("TRIGGERED! ID: " + id)
        let res = []
        for (let i = 0; i < images.length; i++) {
            if (i !== id) {
                res.push(images[i])
            }
        }
        setImages(res)
        setRerender(!rerender)
    }
    const projectCollection = collection<Project>("projects")
    const updateProject = () => {
        setIsProcessing(true)
        update(projectCollection, props.project.ref.id, {title: title, description: description, thumbnail: thumbnailUrl, images:images})
            .then(() => {
                alert("Prosjektet har blitt oppdatert!")
                setIsProcessing(false)
            })
            .catch((e) => {
                alert(e)
                console.error(e)
                setIsProcessing(false)
            })
    }
    const deleteProject = () => {
        setIsProcessing(true)
        remove(projectCollection, props.project.ref.id)
            .then(() => {
                alert("Prosjektet har blitt slettet!")
                setIsProcessing(false)
            })
            .catch((e) => {
                alert(e)
                console.error(e)
                setIsProcessing(false)
            })
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
                    multiline
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
                    images.map(projectImage =>
                        <ProjectAdminImage
                            otherImages={images}
                            rerender={rerender}
                            id={i++}
                            onChangeFunc={(id, val) => setImageByID(id, val)}
                            initUrl={projectImage}
                            onDeleteFunc={(id:number) => deleteImageByID(id)}
                        />
                    )
                }
                <Button
                    className={classes.btn + " " + classes.btnGreen}
                    startIcon={<Add />}
                    variant={"contained"}
                    onClick={() => {
                        let temp = images
                        temp.push("")
                        setImages(temp)
                        setRerender(!rerender)
                    }}
                    disabled={isProcessing}
                >
                    Legg til bilde
                </Button>
                <div className={classes.link}>
                    <Link underline={"always"} color={"textPrimary"} onClick={() => {setOpen(true)}}>Forhåndsvis karusell</Link>
                </div>
                <Button
                    className={classes.btn + " " + classes.btnGreen}
                    startIcon={<Update />}
                    variant={"contained"}
                    disabled={isProcessing}
                    onClick={() => updateProject()}
                >
                    Oppdater
                </Button>
                <Button
                    className={classes.btn + " " + classes.btnGrey}
                    startIcon={<Backspace />}
                    variant={"contained"}
                    color={"secondary"}
                    disabled={isProcessing}
                    onClick={() => {
                        setImages(props.project.data.images)
                        setTitle(props.project.data.title)
                        setDescription(props.project.data.description)
                        setThumbnailUrl(props.project.data.thumbnail)
                        setRerender(!rerender)
                    }}
                >
                    Angre alle endringer
                </Button>
                <Button
                    className={classes.btn}
                    startIcon={<Delete />}
                    variant={"contained"}
                    color={"secondary"}
                    disabled={isProcessing}
                    onClick={() => {
                        setOpenDialog(true)
                    }}
                >
                    Slett
                </Button>
                <ConfirmDeleteDialog
                    key={props.project.ref.id}
                    setIsOpen={setOpenDialog}
                    isOpen={openDialog}
                    title={"Er du sikker på at du vil slette prosjektet?"}
                    information={"Prosjektet det gjelder: " + props.project.data.title}
                    deleteFunc={deleteProject}
                />
                <Backdrop className={classes.backdrop} open={open} onClick={() => {setOpen(false)}}>
                    <ProjectCarousel imgUrls={images} />
                </Backdrop>
            </Grid>
        </>
    )
}