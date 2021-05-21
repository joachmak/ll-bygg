import {Button, createStyles, makeStyles, Theme, Typography} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {useState} from "react";
import firebase from "firebase/app"
import "firebase/auth"
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

export default function Login() {
    const classes = useStyles();
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [errorState, setErrorState] = useState("")
    const auth = firebase.app().auth()
    const history = useHistory()
    const submit = () => {
        setLoading(true)
        auth.signInWithEmailAndPassword(email, password).then(() => {
            setErrorState("")
            history.push("/adminPanel")
        }).catch(e => {
            setErrorState(e.message)
        }).finally(() => setLoading(false))
    }
    if (loading) {
        return (<>Loading...</>)
    }
    return (
        <>
            <form className={classes.root} noValidate autoComplete="off">
                <Typography variant={"h5"} >Logg inn</Typography>
                <TextField onChange={e => {setEmail(e.target.value)}} id="outlined-basic" label="E-post" className={classes.txtField} variant="outlined" />
                <TextField onChange={e => {setPassword(e.target.value)}} type="password" label="Passord" className={classes.txtField} variant="outlined" />
                {
                    errorState
                }
                <Button variant="contained" onClick={submit} color="primary" className={classes.btn}>
                    Logg inn
                </Button>
            </form>
        </>
    )
}