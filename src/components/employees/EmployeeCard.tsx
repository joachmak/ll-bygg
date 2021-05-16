import {Card, CardMedia, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

interface employeeCardInterface {
    name: string;
    role: string;
    description: string;
    url: string;
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
        }),
    );
    const classes = useStyles()
    return (
        <>
            <Grid item xs={8} sm={5} xl={4}>
                <Card className={classes.card}>
                    <CardMedia
                        image={props.url}
                        className={classes.media}
                    />
                    <Typography variant={"h5"} className={classes.title}>
                        {props.name}
                    </Typography>
                    <Typography variant={"caption"} color={"textSecondary"}>
                        <b>{props.role.toUpperCase()}</b>
                    </Typography>
                    <Typography variant={"body2"} color={"textSecondary"} className={classes.text}>
                        {props.description}
                    </Typography>
                </Card>
            </Grid>
        </>
    )
}