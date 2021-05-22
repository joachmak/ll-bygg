import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import EmployeeCard from "./EmployeeCard";
import {collection} from "typesaurus";
import {useAll} from "@typesaurus/react";
import {Employee} from "../../types";

export default function Employees(props: {margin:number, admin:boolean}) {
    const employeesCollection = collection("employees")
    let [employeeDocs] = useAll<Employee>(employeesCollection)

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: "flex",
                justifyContent: "center",
                margin: props.margin + "px auto",
                textAlign: "left",
            },
            title: {
                marginBottom: 15,
            },
            gridContainer: {
                display: "flex",
                justifyContent: "center",
                marginBottom: props.margin,
            }
        }),
    );
    const classes = useStyles()

    return (
        <>
            <Grid container spacing={3} className={classes.gridContainer}>
                {
                    employeeDocs ?
                        employeeDocs
                            .sort((a,b) => a.data.priority - b.data.priority)
                            .map(employee =>
                            <EmployeeCard
                                admin={props.admin}
                                key={employee.ref.id}
                                url={employee.data.imgUrl}
                                name={employee.data.name}
                                role={employee.data.role}
                                description={employee.data.description} />
                            )
                        :
                        "Vennligst vent mens seksjonen laster"
                }
            </Grid>
        </>
    )
}
