import {createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import EmployeeCard from "./EmployeeCard";
import {collection} from "typesaurus";
import {useOnAll} from "@typesaurus/react";
import {Employee} from "../../types";

export default function Employees(props: {margin:number, admin:boolean}) {
    const employeesCollection = collection("employees")
    let [employeeDocs] = useOnAll<Employee>(employeesCollection)

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
    if (props.admin) {
        return (
            <>
                <Typography variant={"body1"} className={classes.title} color={"textSecondary"}><b>Merk:</b> Høyere visningsprioritet vil gjøre at den ansatte vil dukke opp høyere på siden</Typography>
                <Grid container spacing={3} className={classes.gridContainer}>
                    {
                        employeeDocs ?
                            employeeDocs
                                .sort((a,b) => b.data.priority - a.data.priority)
                                .map(employee =>
                                    <EmployeeCard
                                        admin={props.admin}
                                        key={employee.ref.id}
                                        url={employee.data.imgUrl}
                                        name={employee.data.name}
                                        role={employee.data.role}
                                        priority={employee.data.priority}
                                        id={employee.ref.id}
                                        createEmployee={false}
                                        description={employee.data.description} />
                                )
                            :
                            "Vennligst vent mens seksjonen laster"
                    }
                    <EmployeeCard
                        admin={props.admin}
                        url={""}
                        name={""}
                        role={""}
                        priority={0}
                        id={""}
                        createEmployee={true}
                        description={""}
                    />
                </Grid>
            </>
        )
    }
    return (
        <>
            <Grid container spacing={3} className={classes.gridContainer}>
                {
                    employeeDocs ?
                        employeeDocs
                            .sort((a,b) => b.data.priority - a.data.priority)
                            .map(employee =>
                            <EmployeeCard
                                admin={props.admin}
                                key={employee.ref.id}
                                url={employee.data.imgUrl}
                                name={employee.data.name}
                                role={employee.data.role}
                                priority={employee.data.priority}
                                id={employee.ref.id}
                                createEmployee={false}
                                description={employee.data.description} />
                            )
                        :
                        "Vennligst vent mens seksjonen laster"
                }
            </Grid>
        </>
    )
}
