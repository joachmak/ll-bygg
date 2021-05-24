import {createStyles, makeStyles, TextField, Theme} from "@material-ui/core";
import {useState} from "react";

export default function ProjectAdminImage(props:{id:number, initUrl:string, onChangeFunc:(id:number, val:string) => any}) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                //border: "1px solid orange",
                padding: "15px 15px 0",
                margin: "15px 0 ",
                borderRadius: 10,
                boxShadow: "0 3px 5px rgba(0,0,0,0.2)"
            },
            txtField: {
                marginBottom: 15,
                marginTop: 15,
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
    const [url, setUrl] = useState(props.initUrl)
    return (
        <>
            {"ID: " + props.id}
            <TextField
                variant={"outlined"}
                className={classes.txtField}
                label={"Thumbnail-URL"}
                value={url}
                onChange={(e) => {
                    setUrl(e.target.value)
                    props.onChangeFunc(props.id, e.target.value)
                }}
                fullWidth
            />
        </>
    )
}