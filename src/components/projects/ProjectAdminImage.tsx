import {Button, createStyles, InputAdornment, makeStyles, TextField, Theme} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Delete} from "@material-ui/icons";
import LinkIcon from "@material-ui/icons/Link";

export default function ProjectAdminImage(props:{onDeleteFunc:(id:number) => any, rerender:boolean, id:number, otherImages:string[], initUrl:string, onChangeFunc:(id:number, val:string) => any}) {
    const [duplicate, setDuplicate] = useState(false)
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
                marginBottom: 5,
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
                marginBottom: 12,
                color: "white",
                flexBasis: "5%",
                height: 55,
            },
            div: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            },
            inputDuplicate: {
                color: "red",
            }
        }),
    );
    const classes = useStyles()
    const [url, setUrl] = useState(props.initUrl)
    useEffect(() => {
        setUrl(props.initUrl)
    }, [props.initUrl, props.rerender])
    useEffect(() => {
        let count = 0
        for (let i = 0; i<props.otherImages.length; i++) {
            if (props.otherImages[i] === url) {
                count++
            }
        }
        setDuplicate(count > 1)
    }, [props.otherImages, url])
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
                    InputProps={{
                        className: duplicate ? classes.inputDuplicate : "",
                        startAdornment: (
                            <InputAdornment position="start">
                                <LinkIcon />
                            </InputAdornment>
                        ),
                    }}
                    helperText={duplicate ? "OBS: Dette bildet har blitt lagt til flere ganger i dette prosjektet!" : " "}
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