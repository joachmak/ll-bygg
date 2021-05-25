import {Button, createStyles, makeStyles, TextField, Theme} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Delete} from "@material-ui/icons";

export default function ProjectAdminImage(props:{onDeleteFunc:(id:number) => any, rerender:boolean, id:number, initUrl:string, onChangeFunc:(id:number, val:string) => any}) {
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
                flexWrap: "wrap",
                flexBasis: "90%",
            },
            img: {
                maxWidth: "50%",
                maxHeight: 300,
                display: "block",
                margin: "15px auto",
            },
            btn: {
                marginLeft: 5,
                color: "white",
                flexBasis: "5%",
                height: 55,
            },
            div: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }
        }),
    );
    const classes = useStyles()
    const [url, setUrl] = useState(props.initUrl)
    useEffect(() => {
        setUrl(props.initUrl)
    }, [props.initUrl, props.rerender])
    return (
        <>
            <div className={classes.div}>
                <TextField
                    variant={"outlined"}
                    className={classes.txtField}
                    label={"Bilde " + (props.id + 1) + " URL"}
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value)
                        props.onChangeFunc(props.id, e.target.value)
                    }}
                />
                <Button
                    variant={"contained"}
                    className={classes.btn}
                    color={"secondary"}
                    onClick={(e) => {
                        props.onDeleteFunc(props.id)
                    }}
                >
                    <Delete />
                </Button>
            </div>
        </>
    )
}