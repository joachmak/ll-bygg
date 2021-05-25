import {Button, Card, CardMedia, createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {useState} from "react";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import {add, collection, remove, update} from "typesaurus";
import {Employee} from "../../types";
import {Add, Backspace, Delete, Update} from "@material-ui/icons";

interface employeeCardInterface {
    name: string;
    role: string;
    description: string;
    url: string;
    admin: boolean;
    priority: number;
    id: string;
    createEmployee: boolean;
}
export default function EmployeeCard(props:employeeCardInterface) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            title: {

            },
            text: {
                lineHeight: "200%",
            },
            card: {
                boxShadow: "none",
            },
            media: {
                height: 10,
                paddingTop: '100%',
                filter: "grayscale(100%)",
                borderRadius: 1,
                marginBottom: 15,
                backgroundColor: "#EEE",
            },
            txtField: {
                margin: "10px 0"
            },
            btn: {
                marginBottom: 10,
            },
            btnUpdate: {
                color: "white",
                backgroundColor: "green",
                "&:hover": {
                    backgroundColor: "darkgreen",
                }
            },
            btnGrey: {
                color: "white",
                backgroundColor: "grey",
                "&:hover": {
                    backgroundColor: "#333",
                }
            }
        }),
    );
    const classes = useStyles()
    const [name, setName] = useState(props.name)
    const [role, setRole] = useState(props.role)
    const [desc, setDesc] = useState(props.description)
    const [imgUrl, setImgUrl] = useState(props.url ? props.url : "")
    const [displayPriority, setDisplayPriority] = useState(props.priority)
    const [openDialog, setOpenDialog] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)
    const employeeCollection = collection<Employee>("employees")
    const deleteEmployee = () => {
        setIsProcessing(true)
        remove(employeeCollection, props.id)
            .then(() => {
                alert("Den ansatte har blitt slettet!")
                setIsProcessing(false)
            })
            .catch((e) => {
                alert(e)
                console.error(e)
                setIsProcessing(false)
            })
    }
    const updateEmployee = () => {
        setIsProcessing(true)
        update(employeeCollection, props.id, {name:name, description:desc, imgUrl:imgUrl, priority:displayPriority, role:role})
            .then(() => {
                alert("Den ansatte har blitt oppdatert!")
                setIsProcessing(false)
            })
            .catch((e) => {
                alert(e)
                console.error(e)
                setIsProcessing(false)
            })
    }
    const createEmployee = () => {
        add(employeeCollection, {name:name, description:desc, imgUrl:imgUrl, priority:displayPriority, role:role})
            .then(() => {
                setName("")
                setRole("")
                setDesc("")
                setImgUrl("")
                setDisplayPriority(0)
                alert("Den ansatte har blitt lagt til!")
                setIsProcessing(false)
            }).catch((e) => {
            console.error(e)
            alert(e)
            setIsProcessing(false)
        })
    }
    return (
        <>
            <Grid item xs={8} sm={5} xl={4}>
                <Card className={classes.card}>
                    <CardMedia
                        title={props.name}
                        image={imgUrl ? imgUrl : "empty"}
                        className={classes.media}
                    />
                    {
                        props.admin ?
                            props.createEmployee ?
                                <>
                                    <TextField value={name} onChange={(e) => {setName(e.target.value)}} className={classes.txtField} fullWidth variant={"outlined"} label={"Navn"} />
                                    <TextField value={role} onChange={(e) => {setRole(e.target.value)}} className={classes.txtField} fullWidth variant={"outlined"} label={"Rolle"} />
                                    <TextField value={desc} onChange={(e) => {setDesc(e.target.value)}} className={classes.txtField} multiline fullWidth variant={"outlined"} label={"Beskrivelse"} />
                                    <TextField value={imgUrl} onChange={(e) => {setImgUrl(e.target.value)}} className={classes.txtField} fullWidth variant={"outlined"} label={"Bilde-URL"} />
                                    <TextField value={displayPriority} onChange={(e) => {setDisplayPriority(parseInt(e.target.value))}} className={classes.txtField} fullWidth variant={"outlined"} label={"Visningsprioritet"} type="number" />
                                    <Button disabled={isProcessing} startIcon={<Add />} onClick={() => createEmployee()} fullWidth variant={"contained"} className={classes.btnUpdate + " " + classes.btn}>Legg til ansatt</Button>
                                </>
                                :
                                <>
                                    <TextField value={name} onChange={(e) => {setName(e.target.value)}} className={classes.txtField} fullWidth variant={"outlined"} label={"Navn"} />
                                    <TextField value={role} onChange={(e) => {setRole(e.target.value)}} className={classes.txtField} fullWidth variant={"outlined"} label={"Rolle"} />
                                    <TextField value={desc} onChange={(e) => {setDesc(e.target.value)}} className={classes.txtField} multiline fullWidth variant={"outlined"} label={"Beskrivelse"} />
                                    <TextField value={imgUrl} onChange={(e) => {setImgUrl(e.target.value)}} className={classes.txtField} fullWidth variant={"outlined"} label={"Bilde-URL"} />
                                    <TextField value={displayPriority} onChange={(e) => {setDisplayPriority(parseInt(e.target.value))}} className={classes.txtField} fullWidth variant={"outlined"} label={"Visningsprioritet"} type="number" />
                                    <Button disabled={isProcessing} startIcon={<Update />} onClick={() => updateEmployee()} fullWidth variant={"contained"} className={classes.btnUpdate + " " + classes.btn}>Oppdater</Button>
                                    <Button disabled={isProcessing} startIcon={<Backspace />} fullWidth variant={"contained"} color={"default"} className={classes.btn + " " + classes.btnGrey} onClick={() => {
                                        setName(props.name)
                                        setDesc(props.description)
                                        setRole(props.role)
                                        setImgUrl(props.url)
                                        setDisplayPriority(props.priority)
                                    }
                                    }>Angre endringer</Button>
                                    <Button disabled={isProcessing} startIcon={<Delete />} onClick={() => setOpenDialog(true)} fullWidth variant={"contained"} color={"secondary"} className={classes.btn}>Slett</Button>
                                    <ConfirmDeleteDialog key={props.id} setIsOpen={setOpenDialog} isOpen={openDialog} title={"Er du sikker på at du vil slette den ansatte?"} information={"Ansatt det gjelder: " + props.name} deleteFunc={deleteEmployee} />
                                </>
                            :
                            <>
                                <Typography variant={"h5"} className={classes.title}>
                                    {props.name}
                                </Typography>
                                <Typography variant={"caption"} color={"textSecondary"}>
                                    <b>{props.role.toUpperCase()}</b>
                                </Typography>
                                <Typography variant={"body2"} color={"textSecondary"} className={classes.text}>
                                    {props.description}
                                </Typography>
                            </>
                    }
                </Card>
            </Grid>
        </>
    )
}