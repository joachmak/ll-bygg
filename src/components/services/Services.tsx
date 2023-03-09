import {Button, Container, createStyles, Grid, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHammer, faHouseDamage, faTools } from '@fortawesome/free-solid-svg-icons'
import {collection, update} from "typesaurus";
import {useGet} from "@typesaurus/react";
import {ServicesSection} from "../../types";
import {useEffect, useState} from "react";
import {Update} from "@material-ui/icons";

let pageElementsCol = collection("pageElements")
export default function Services(props:{margin:number, admin:boolean}) {
    const pageElem = collection("pageElements")
    let [servicesDoc] = useGet<ServicesSection>(pageElem, "services")
    let [error, setError] = useState("")
    const uploadServiceDescriptions = async (descs:string[]) => {
        update(pageElementsCol, "services", { byggDesc: descs[0], rehabiliteringDesc: descs[1], monteringDesc: descs[2] })
            .then(() => {
                setError("")
                alert("Beskrivelsen ble oppdatert")
            })
            .catch(e => {
                console.error(e)
                alert(e)
                setError(e)
            })
    }

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: "flex",
                justifyContent: "center",
                margin: props.margin + "px auto",
                textAlign: "left",
                position: "relative",
            },
            title: {
                marginBottom: 15,
            },
            subtitle: {
                marginBottom: 5,
            },
            text: {
                lineHeight: "200%",
            },
            gridContainer: {
                display: "flex",
                flexDirection: "row",
                margin: "auto",
            },
            iconContainer: {
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
            },
            icon: {
                color: theme.palette.primary.main,
                fontSize: 45,
                display: "flex",
                margin: "10px auto",
            },
            saveBtn: {
                marginBottom: 15,
                marginLeft: 15,
                color: "white",
                backgroundColor: "green",
                "&:hover": {
                    backgroundColor: "darkgreen",
                }
            },
            btnDiv: {
                width: "100%",
            },
            gridContainerCenter: {
                display: "flex",
                justifyContent: "center",
            }
        }),
    );
    const classes = useStyles()
    const tempDescription = "Beskrivelse laster inn, vennligst vent..."
    let services = [
        [0, "Bygg", (servicesDoc ? servicesDoc.data.byggDesc : tempDescription), faHammer],
        [1, "Prosjektering", (servicesDoc ? servicesDoc.data.rehabiliteringDesc : tempDescription), faHouseDamage],
        [2, "Montering", (servicesDoc ? servicesDoc.data.monteringDesc : tempDescription), faTools]
    ]
    let [descs, setDescs] = useState(["","",""])
    useEffect(() => {
        if (servicesDoc) {
            setDescs([
                servicesDoc.data.byggDesc,
                servicesDoc.data.rehabiliteringDesc,
                servicesDoc.data.monteringDesc
            ])
        }
    }, [servicesDoc])

    return(
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12} className={classes.gridContainer}>
                    <Grid container direction={"column"}>
                        <Typography variant={"h4"} className={classes.title}>
                            Våre tjenester
                        </Typography>
                        <Grid container className={classes.gridContainerCenter} spacing={4}>
                            {
                                services.map(service =>
                                    // @ts-ignore
                                    <Grid key={service[0]} item md={4} sm={10} xs={12}>
                                        <div className={classes.iconContainer}>
                                            <div className={classes.iconContainer}>
                                                {/* @ts-ignore */}
                                                <FontAwesomeIcon className={classes.icon} icon={service[3]} />
                                            </div>
                                            <Typography variant={"h5"} className={classes.subtitle} color={"textSecondary"}>
                                                <b>{service[1]}</b>
                                            </Typography>
                                            {
                                                props.admin ?
                                                    <>
                                                        <TextField
                                                            label="Beskrivelse"
                                                            variant="outlined"
                                                            multiline
                                                            /* @ts-ignore */
                                                            value={descs[service[0]]}
                                                            onChange = {
                                                                e =>
                                                                {
                                                                    let temp = ["","",""]
                                                                    for (let i = 0; i<3; i++) {
                                                                        if (i === service[0]) {
                                                                            temp[i] = e.target.value
                                                                        } else {
                                                                            temp[i] = descs[i]
                                                                        }
                                                                    }
                                                                    setDescs(temp)
                                                                }
                                                            }
                                                        />
                                                    </>
                                                    :
                                                    <Typography variant={"body2"} className={classes.text} color={"textSecondary"}>
                                                        {service[2]}
                                                    </Typography>
                                            }
                                        </div>
                                    </Grid>
                                )
                            }
                            <div className={classes.btnDiv}>
                                {
                                    props.admin &&
                                    <>
                                        <Button
                                            className={classes.saveBtn}
                                            variant={"contained"}
                                            startIcon={<Update />}
                                            onClick={() =>
                                            {
                                                uploadServiceDescriptions(descs)
                                            }
                                            }
                                        >
                                            Oppdater
                                        </Button>
                                        {
                                            error !== "" &&
                                            <Typography variant={"caption"}>
                                                {error}
                                            </Typography>
                                        }
                                    </>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}