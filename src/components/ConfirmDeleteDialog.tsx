import {Button, createStyles, Dialog, DialogTitle, makeStyles, Theme, Typography} from "@material-ui/core";

export default function ConfirmDeleteDialog(props:{setIsOpen:(arg:boolean) => any, isOpen:boolean, title:string, information:string, deleteFunc:() => any}) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            deleteBtn: {
                margin: 15,
            },
            deleteDiv: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            },
        }),
    );
    const classes = useStyles()

    return (
        <Dialog onClose={() => {props.setIsOpen(false)}} aria-labelledby="Slett nyhet" open={props.isOpen}>
            <DialogTitle>{props.title}</DialogTitle>
            <div className={classes.deleteDiv}>
                <Typography variant={"caption"} color={"textSecondary"}>DET VIL IKKE VÆRE MULIG Å ANGRE NÅR DETTE ER GJORT!</Typography>
                <Typography variant={"caption"} color={"textSecondary"}>{props.information}</Typography>
                <Typography variant={"body2"} color={"textSecondary"}>Klikk utenfor dette vinduet for å angre sletting.</Typography>
                <Button
                    className={classes.deleteBtn}
                    variant={"outlined"}
                    color={"secondary"}
                    onClick={() => {
                        props.setIsOpen(false)
                        props.deleteFunc()
                    }}
                >
                    Bekreft sletting
                </Button>
            </div>
        </Dialog>
    )
}