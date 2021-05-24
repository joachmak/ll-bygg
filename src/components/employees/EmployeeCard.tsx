import {Button, Card, CardMedia, createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {useState} from "react";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import {collection, remove, update} from "typesaurus";
import {Employee} from "../../types";

interface employeeCardInterface {
    name: string;
    role: string;
    description: string;
    url: string;
    admin: boolean;
    priority: number;
    id: string;
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
                height: 0,
                paddingTop: '100%',
                filter: "grayscale(100%)",
                borderRadius: 1,
                marginBottom: 15,
            },
            txtField: {
                margin: "10px 0"
            },
            btn: {
                marginBottom: 10,
            },
            btnUpdate: {
                color: "green",
                borderColor: "green",
            }
        }),
    );
    const classes = useStyles()
    const [name, setName] = useState(props.name)
    const [role, setRole] = useState(props.role)
    const [desc, setDesc] = useState(props.description)
    const [imgUrl, setImgUrl] = useState(props.url)
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
    return (
        <>
            <Grid item xs={8} sm={5} xl={4}>
                <Card className={classes.card}>
                    <CardMedia
                        image={imgUrl}
                        className={classes.media}
                    />
                    {
                        props.admin ?
                            <>
                                <TextField value={name} onChange={(e) => {setName(e.target.value)}} className={classes.txtField} fullWidth variant={"outlined"} label={"Navn"} />
                                <TextField value={role} onChange={(e) => {setRole(e.target.value)}} className={classes.txtField} fullWidth variant={"outlined"} label={"Rolle"} />
                                <TextField value={desc} onChange={(e) => {setDesc(e.target.value)}} className={classes.txtField} multiline fullWidth variant={"outlined"} label={"Beskrivelse"} />
                                <TextField value={imgUrl} onChange={(e) => {setImgUrl(e.target.value)}} className={classes.txtField} fullWidth variant={"outlined"} label={"Bilde-URL"} />
                                <TextField value={displayPriority} onChange={(e) => {setDisplayPriority(parseInt(e.target.value))}} className={classes.txtField} fullWidth variant={"outlined"} label={"Visningsprioritet"} type="number" />
                                <Button disabled={isProcessing} onClick={() => updateEmployee()} fullWidth variant={"outlined"} className={classes.btnUpdate + " " + classes.btn}>Oppdater</Button>
                                <Button disabled={isProcessing} onClick={() => setOpenDialog(true)} fullWidth variant={"outlined"} color={"secondary"} className={classes.btn}>Slett</Button>
                                <Button disabled={isProcessing} fullWidth variant={"outlined"} color={"default"} className={classes.btn} onClick={() => {
                                    setName(props.name)
                                    setDesc(props.description)
                                    setRole(props.role)
                                    setImgUrl(props.url)
                                    setDisplayPriority(props.priority)
                                }
                                }>Angre endringer</Button>
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