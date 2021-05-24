import {Button, createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {NewsDoc} from "../../types";
import {Doc} from "typesaurus";

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
            }
        }),
    );
    const classes = useStyles()
    return (
        <>
            <Grid className={classes.root} item xs={12}>
                <TextField
                    className={classes.txtField}
                    fullWidth
                    multiline
                    variant={"outlined"}
                    label={"Tittel"}
                    defaultValue={props.announcement.data.title}
                />
                <TextField
                    className={classes.txtField}
                    fullWidth
                    multiline
                    variant={"outlined"}
                    label={"Beskrivelse"}
                    defaultValue={props.announcement.data.description}
                />
                <Button className={classes.btn} variant={"outlined"} color={"primary"}>Oppdater</Button>
                <Button className={classes.btn} variant={"outlined"} color={"secondary"}>Slett</Button>
            </Grid>
        </>
    )
}

export type {announcementInterface}