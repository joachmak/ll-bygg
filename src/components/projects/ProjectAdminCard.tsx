import {
    Backdrop,
    Button,
    createStyles,
    Grid,
    InputAdornment,
    Link,
    makeStyles,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import {Project} from "../../types";
import {add, collection, Doc, remove, update} from "typesaurus";
import {useState} from "react";
import ProjectAdminImage from "./ProjectAdminImage";
import {Add, Backspace, Delete, Description, Title, Update} from "@material-ui/icons";
import ProjectCarousel from "./ProjectCarousel";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import LinkIcon from '@material-ui/icons/Link';

export default function ProjectAdminCard(props:{create:boolean, project?:Doc<Project>}) {
    const [thumbnailUrl, setThumbnailUrl] = useState(props.project ? props.project.data.thumbnail : "")
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
            projectGrid: {
                backgroundColor: "rgba(0,0,0,0.1)",
                height: "100%",
                width: 400,
                display: "block",
                margin: "15px auto",
                backgroundImage: "url('" + thumbnailUrl + "')",
                backgroundSize: "cover",
                minHeight: 250,
                padding: 0,
                borderRadius: 0,
                cursor: "context-menu",
            },
        }),
    );
    const classes = useStyles()
    const [title, setTitle] = useState(props.project ? props.project.data.title : "")
    const [description, setDescription] = useState(props.project ? props.project.data.description : "")
    const [images, setImages] = useState(props.project ?props.project.data.images : [""])
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
    }
    const deleteImageByID = (id:number) => {
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
        if (props.project) {
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
    }
    const deleteProject = () => {
        if (props.project) {
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
    }
    const createProject = () => {
        setIsProcessing(true)
        add(projectCollection, {title:title, description:description, images:images,thumbnail:thumbnailUrl})
            .then(() => {
                alert("Prosjektet har blitt slettet!")
                setIsProcessing(false)
                setTitle("")
                setDescription("")
                setImages([""])
                setThumbnailUrl("")
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
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Title />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    variant={"outlined"}
                    className={classes.txtField}
                    label={"Beskrivelse"}
                    multiline
                    value={description}
                    onChange={(e) => {setDescription(e.target.value)}}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Description />
                            </InputAdornment>
                        ),
                    }}
                />
                <Typography variant={"h5"} color={"textSecondary"}>Thumbnail</Typography>
                <Button
                    id={"0"}
                    className={classes.projectGrid}
                />
                <TextField
                    variant={"outlined"}
                    className={classes.txtField}
                    label={"Thumbnail-URL"}
                    value={thumbnailUrl}
                    onChange={(e) => {setThumbnailUrl(e.target.value)}}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LinkIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Typography variant={"h5"} color={"textSecondary"}>Images</Typography>
                {
                    images.map(projectImage =>
                        <ProjectAdminImage
                            key={props.project ? (props.project.data.images[i] + " " + i) : i}
                            otherImages={images}
                            rerender={rerender}
                            id={i++}
                            onChangeFunc={(id, val) => {
                                setImageByID(id, val)
                            }}
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
                {
                    (!props.create && props.project) ?
                        <>
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
                                    setImages(props.project!.data.images)
                                    setTitle(props.project!.data.title)
                                    setDescription(props.project!.data.description)
                                    setThumbnailUrl(props.project!.data.thumbnail)
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
                        </>
                        :
                        <>
                            <Button
                                className={classes.btn + " " + classes.btnGreen}
                                startIcon={<Add />}
                                variant={"contained"}
                                disabled={isProcessing}
                                onClick={() => createProject()}
                            >
                                Legg til prosjekt
                            </Button>
                        </>

                }
                <Backdrop className={classes.backdrop} open={open} onClick={() => {setOpen(false)}}>
                    <ProjectCarousel imgUrls={images} />
                </Backdrop>
            </Grid>
        </>
    )
}