import {createStyles, makeStyles, Theme} from "@material-ui/core";
//import headerImage from "./header.JPG"

let img = require("./header.JPG")

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            height: "100vh",

            backgroundImage: "url('" + img.default + "')",
            backgroundSize: "cover",
            // @ts-ignore
            boxShadow: "inset 0 0 7em 1em #000",
        },
    }),
);

export default function Header() {
    const classes = useStyles()
    return (
        <div className={classes.header}>
        </div>
    )
}