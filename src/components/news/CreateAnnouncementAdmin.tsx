import {
    Button,
    createStyles,
    Grid,
    makeStyles,
    TextField,
    Theme,
} from "@material-ui/core";
import {NewsDoc} from "../../types";
import {collection, add} from "typesaurus";
import {useState} from "react";
import {Add} from "@material-ui/icons";

interface announcementInterface {
    id:number;
    title:string;
    description:string;
    date:Date;
}

export default function Announcement() {
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
                borderColor: "green",
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
    let [desc, setDesc] = useState("")
    let [title, setTitle] = useState("")
    let [isProcessing, setIsProcessing] = useState(false)
    let [error, setError] = useState(false)
    const newsCollection = collection<NewsDoc>("news")
    const createAnnouncement = () => {
        setIsProcessing(true)
        if (title.length === 0 || desc.length === 0) {
            alert("Nyheten trenger en tittel og beskrivelse!")
            setError(true)
            setIsProcessing(false)
            return
        }
        add(newsCollection, {datetime: new Date(), description: desc, title: title})
            .then(() => {
                alert("Nyheten har blitt publisert!")
                setTitle("")
                setDesc("")
                setIsProcessing(false)
                setError(false)
            }).catch((e) => {
                setError(true)
                console.error(e)
                alert(e)
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
                    error={error}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    className={classes.txtField}
                    fullWidth
                    multiline
                    variant={"outlined"}
                    label={"Beskrivelse"}
                    value={desc}
                    error={error}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <Button startIcon={<Add />} disabled={isProcessing} className={classes.btn + " " + classes.greenBtn} variant={"contained"} onClick={() => {
                    createAnnouncement()
                }}>Publiser nyhet</Button>
            </Grid>
        </>
    )
}

export type {announcementInterface}