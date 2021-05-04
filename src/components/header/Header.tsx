import {createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
//import headerImage from "./header.JPG"

let img = require("./header.JPG")
const darkness = 0.25 // Higher = darker
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            height: "100vh",

            background: "linear-gradient( rgba(0, 0, 0, " + darkness + "), rgba(0, 0, 0, " + darkness + ") ), url('" + img.default + "')",
            backgroundSize: "cover",
            // @ts-ignore
            boxShadow: "inset 0 0 7em 1em #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },
        typography: {
            color: "white",
            marginTop: 20,
        }
    }),
);

export default function Header() {
    const classes = useStyles()
    return (
        <div className={classes.header}>
            <Typography variant={"h2"} className={classes.typography}>
                <b>LYKKE ER ET SOLID BYGG</b>
            </Typography>
            <Typography variant={"h5"} className={classes.typography}>
                <b>BYGGET MED KUNNSKAP & KJÆRLIGHET AV LOKALE HÅNDVERKERE</b>
            </Typography>
        </div>
    )
}