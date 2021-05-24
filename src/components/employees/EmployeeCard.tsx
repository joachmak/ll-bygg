import {Button, Card, CardMedia, createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {useState} from "react";

interface employeeCardInterface {
    name: string;
    role: string;
    description: string;
    url: string;
    admin: boolean;
    priority: number;
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
                                <Button fullWidth variant={"outlined"} className={classes.btnUpdate + " " + classes.btn}>Oppdater</Button>
                                <Button fullWidth variant={"outlined"} color={"secondary"} className={classes.btn}>Slett</Button>
                                <Button fullWidth variant={"outlined"} color={"default"} className={classes.btn} onClick={() => {
                                    setName(props.name)
                                    setDesc(props.description)
                                    setRole(props.role)
                                    setImgUrl(props.url)
                                    setDisplayPriority(props.priority)
                                }
                                }>Angre endringer</Button>
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