import {
    Button,
    createStyles,
    Grid,
    makeStyles,
    TextField,
    Theme,
} from "@material-ui/core";
import {NewsDoc} from "../../types";
import {collection, Doc, update, remove} from "typesaurus";
import {useState} from "react";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import {Backspace, Delete, Update} from "@material-ui/icons";

interface announcementInterface {
    id:number;
    title:string;
    description:string;
    date:Date;
}

export default function Announcement(props:{announcement:Doc<NewsDoc>}) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            txtField: {
                marginBottom: 15,
            },
            root: {
                //border: "1px solid orange",
                padding: "15px 15px 0",
                margin: "15px 0 ",
                borderRadius: 10,
                boxShadow: "0 3px 5px rgba(0,0,0,0.2)"
            },
            btn: {
                marginBottom: 15,
                marginRight: 10,
                color: "white",
            },
            deleteBtn: {
                margin: 15,
            },
            deleteDiv: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            },
            greyBtn: {
                backgroundColor: "grey",
                "&:hover": {
                    backgroundColor: "#333"
                }
            },
            greenBtn: {
                backgroundColor: "green",
                "&:hover": {
                    backgroundColor: "darkgreen"
                }
            }
        }),
    );
    const classes = useStyles()
    const [openDialog, setOpenDialog] = useState(false);
    let [desc, setDesc] = useState(props.announcement.data.description)
    let [title, setTitle] = useState(props.announcement.data.title)
    let [isProcessing, setIsProcessing] = useState(false)
    const newsCollection = collection<NewsDoc>("news")
    const updateAnnouncement = () => {
        setIsProcessing(true)
        update(newsCollection, props.announcement.ref.id, {title: title, description: desc})
            .then(() => {
                setIsProcessing(false)
            })
            .catch((e) => {
                alert(e)
                console.error(e)
                setIsProcessing(false)
            })
    }
    const deleteAnnouncement = () => {
        setIsProcessing(true)
        remove(newsCollection, props.announcement.ref.id)
            .then(() => {
                setIsProcessing(false)
            })
            .catch((e) => {
                alert(e)
                console.error(e)
                setIsProcessing(false)
            })
    }
    return (
        <>
            <Grid className={classes.root} item xs={12}>
                <TextField
                    className={classes.txtField}
                    fullWidth
                    multiline
                    variant={"outlined"}
                    label={"Tittel"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    className={classes.txtField}
                    fullWidth
                    multiline
                    variant={"outlined"}
                    label={"Beskrivelse"}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <Button startIcon={<Update />} disabled={isProcessing} className={classes.btn + " " + classes.greenBtn} variant={"contained"} color={"primary"} onClick={() => {
                    updateAnnouncement()
                }}>Oppdater</Button>
                <Button className={classes.btn + " " + classes.greyBtn} variant={"contained"} startIcon={<Backspace />} color={"default"} onClick={() => {
                    setDesc(props.announcement.data.description)
                    setTitle(props.announcement.data.title)
                }}>Angre alle endringer</Button>
                <Button startIcon={<Delete />} disabled={isProcessing} className={classes.btn} variant={"contained"} onClick={() => {setOpenDialog(true)}} color={"secondary"}>Slett</Button>
                <ConfirmDeleteDialog key={props.announcement.ref.id} setIsOpen={setOpenDialog} isOpen={openDialog} title={"Er du sikker på at du vil slette nyheten?"} information={"Nyheten det gjelder: " + props.announcement.data.title} deleteFunc={deleteAnnouncement} />
            </Grid>
        </>
    )
}

export type {announcementInterface}