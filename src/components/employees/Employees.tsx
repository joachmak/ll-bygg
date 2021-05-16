import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import EmployeeCard from "./EmployeeCard";

export default function Employees(props: {margin:number}) {
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
            }
        }),
    );
    const classes = useStyles()
    let employees = [
            {
                name: "Ludvig Vik Løite",
                role: "Innehaver",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur dolor eos et labore officia tempore ut! Alias amet beatae deserunt dolore fugiat id, in quo, recusandae sed ut voluptates.",
                url: "https://intern.orakel.ntnu.no/media/cache/80/c4/80c41993bd39581dcaec44b6b2101f36.png",
            },
            {
                name: "Torbjørn Øyan Sørdal",
                role: "Kjekkas",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur dolor eos et labore officia tempore ut! Alias amet beatae deserunt dolore fugiat id, in quo, recusandae sed ut voluptates.",
                url: "https://intern.orakel.ntnu.no/media/cache/71/ce/71cebc442e0df36b127db953852093e6.png",
            },
            {
                name: "Alf Berger Husem",
                role: "Stonksforvalter",
                description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aspernatur dolor eos et labore officia tempore ut! Alias amet beatae deserunt dolore fugiat id, in quo, recusandae sed ut voluptates.",
                url: "https://intern.orakel.ntnu.no/media/cache/5b/02/5b0266a495912db4a445ed14e20346ed.png",
            }
        ]

    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title}>
                        Våre ansatte
                    </Typography>
                    <Grid container spacing={3} className={classes.gridContainer}>
                        {
                            employees.map(employee =>
                                <EmployeeCard url={employee.url} name={employee.name} role={employee.role} description={employee.description} />
                            )
                        }
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
