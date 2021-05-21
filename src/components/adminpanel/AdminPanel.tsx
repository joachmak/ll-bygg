import {Button, createStyles, makeStyles, Theme} from "@material-ui/core";
import firebase from "firebase";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: "10px auto",
                display: "flex",
                flexDirection: "column",
            },
            margin: "150px auto 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        txtField: {
            width: "400px",
        },
        btn: {
            color: "white",
            width: "200px",
        }
    }),
);
export default function AdminPanel() {
    const classes = useStyles()
    const history = useHistory()
    const submit = () => {
        firebase.app().auth().signOut().then(() => {
            history.push("/")
        })
    }
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <Button variant="contained" onClick={submit} color="primary" className={classes.btn}>
                    Logg ut
                </Button>
            </form>
        </>
    )
}